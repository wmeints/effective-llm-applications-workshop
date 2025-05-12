namespace InfoSupport.AgentWorkshop.Chat.Models;

public record ConversationMessage(string MessageId, DateTime Timestamp, ConversationMessageRole Author, string Content);
