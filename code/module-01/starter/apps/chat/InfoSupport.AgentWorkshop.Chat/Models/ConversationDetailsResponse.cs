namespace InfoSupport.AgentWorkshop.Chat.Models;

public record ConversationDetailsResponse(int Id, DateTime DateCreated, DateTime? DateModified, List<ConversationMessage> Messages);
