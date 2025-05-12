using InfoSupport.AgentWorkshop.Chat.Models;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Agents;

namespace InfoSupport.AgentWorkshop.Chat.Services;

public interface IAgentCompletionService
{
    IAsyncEnumerable<AgentResponseItem<StreamingChatMessageContent>> GenerateResponseAsync(AgentCompletionRequest request);
}