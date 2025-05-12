using System.Text;
using InfoSupport.AgentWorkshop.Chat.Data;
using InfoSupport.AgentWorkshop.Chat.Models;
using InfoSupport.AgentWorkshop.Chat.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.AzureOpenAI;

namespace InfoSupport.AgentWorkshop.Chat.Services;

/// <summary>
/// Provides services for managing conversations and generating agent responses.
/// </summary>
public class AgentCompletionService(Kernel kernel, ApplicationDbContext applicationDbContext) : IAgentCompletionService
{
    // TODO: Configure a chat completion agent class for use in the service. Make sure to name the field _chatCompletionAgent.
    // See the documentation for more information: https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/chat-completion-agent

    /// <summary>
    /// Generate a response using the agent.
    /// </summary>
    /// <param name="request">Completion request to generate a response for.</param>
    /// <returns>Returns the response as an async enumerable stream.</returns>
    public async IAsyncEnumerable<AgentResponseItem<StreamingChatMessageContent>> GenerateResponseAsync(AgentCompletionRequest request)
    {
        // TODO: Use the ApplicationDbContext instance to retrieve the conversation.
        // Validate that the conversation exists, create a new one if it doesn't exist yet.
        // Store the conversation in a variable named `conversation`.

        // TODO: Use the method BuildChatHistory to create a `ChatHistory` object
        // from the messages collection in the conversation. Use only assistant and user 
        // messages in the chat history.
        // Create a new ChatHistoryAgentThread object from the chat history we constructed.
        // Store the result in a variable called `thread`.

        // TODO: Record the user message with the current conversation.

        // TODO: Invoke the _chatCompletionAgent using InvokeStreamingAsync with the 
        // user's prompt and the thread.

        // TODO: Iterate over the chunks returned by the agent and record their content 
        // so we can store the response with the conversation. You can use the `Message`
        // property from the returned chunk to gain access to the message content. 
        // The message contains a `Content` property that stores the text generated
        // by the LLM.
        //
        // NOTE: Use await foreach, we're working with an async enumerable :-)

        // TODO: Use the `AppendAssistantResponse` method on the conversation to 
        // store the new response with the conversation. Make sure to call `SaveChanges`
        // on the ApplicationDbContext instance to store the conversation in the
        // database.

        throw new NotImplementedException();
    }

    private ChatHistory BuildChatHistory(Conversation conversation)
    {
        // TODO: Create a new ChatHistory object from the conversation's messages.
        throw new NotImplementedException();
    }
}