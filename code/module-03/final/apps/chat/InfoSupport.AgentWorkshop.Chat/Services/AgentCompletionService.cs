﻿using System.Text;
using InfoSupport.AgentWorkshop.Chat.Data;
using InfoSupport.AgentWorkshop.Chat.Models;
using InfoSupport.AgentWorkshop.Chat.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.AI;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.AzureOpenAI;
using Microsoft.SemanticKernel.Connectors.Qdrant;
using Microsoft.SemanticKernel.Data;
using Microsoft.SemanticKernel.Embeddings;
using OpenAI.Chat;

namespace InfoSupport.AgentWorkshop.Chat.Services;

/// <summary>
/// Provides services for managing conversations and generating agent responses.
/// </summary>
public class AgentCompletionService(Kernel kernel, ApplicationDbContext applicationDbContext, IVectorStore vectorStore) : IAgentCompletionService
{
    // The chat completion agent is an agent that has no persistent backend on its own.
    // Instead we're relying on our custom thread implementation to persist the conversation history.
    // We're including custom function choice behavior to make sure our agent can use tools.


    /// <summary>
    /// Generate a response using the agent.
    /// </summary>
    /// <param name="request">Completion request to generate a response for.</param>
    /// <returns>Returns the response as an async enumerable stream.</returns>
    public async IAsyncEnumerable<AgentResponseItem<StreamingChatMessageContent>> GenerateResponseAsync(
        AgentCompletionRequest request)
    {
        var agent = ConfigureAgent();

        var conversation = await applicationDbContext.Conversations
            .SingleOrDefaultAsync(x => x.ThreadId == request.ThreadId)
            .ConfigureAwait(false);

        if (conversation is null)
        {
            conversation = new Conversation(request.ThreadId);
            await applicationDbContext.AddAsync(conversation);
        }

        var chatHistory = BuildChatHistory(conversation);
        ChatHistoryAgentThread? thread = new ChatHistoryAgentThread(chatHistory);

        // Record the user message with the current conversation.
        conversation.AppendUserMessage(request.Prompt);

        var responseStream = agent.InvokeStreamingAsync(request.Prompt, thread);
        var assistantResponseMessageBuilder = new StringBuilder();

        await foreach (var chunk in responseStream)
        {
            assistantResponseMessageBuilder.Append(chunk.Message.Content);

            // The agent sometimes produces empty chunks, these add no value and we should
            // filter them out here to prevent bad things from happening in the frontend.
            if (!string.IsNullOrEmpty(chunk.Message.Content))
            {
                yield return chunk;
            }
        }

        conversation.AppendAssistantResponse(assistantResponseMessageBuilder.ToString());

        await applicationDbContext.SaveChangesAsync().ConfigureAwait(false);
    }

    private ChatCompletionAgent ConfigureAgent()
    {
        var contentCollection = vectorStore.GetCollection<ulong, TextUnit>("Content");
        var embeddingGenerator = kernel.GetRequiredService<ITextEmbeddingGenerationService>();
        var textSearch = new VectorStoreTextSearch<TextUnit>(contentCollection, embeddingGenerator);

        kernel.Plugins.Add(textSearch.CreateWithGetTextSearchResults("BookContent"));

        var agent = new ChatCompletionAgent()
        {
            Name = "Mike",
            Instructions = EmbeddedResource.Read("instructions.txt"),
            Kernel = kernel,
            Arguments = new KernelArguments(new AzureOpenAIPromptExecutionSettings
            {
                FunctionChoiceBehavior = FunctionChoiceBehavior.Auto()
            })
        };

        return agent;
    }

    private ChatHistory BuildChatHistory(Conversation conversation)
    {
        var chatHistory = new ChatHistory();

        foreach (var message in conversation.Messages.OrderBy(x => x.Timestamp))
        {
            if (message.Author == ConversationMessageRole.Assistant)
            {
                chatHistory.AddAssistantMessage(message.Content);
            }
            else
            {
                chatHistory.AddUserMessage(message.Content);
            }
        }

        return chatHistory;
    }
}