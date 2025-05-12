namespace InfoSupport.AgentWorkshop.Chat.Shared;

public class ConversationNotFoundException : Exception
{
    public ConversationNotFoundException(int conversationId) : base($"Conversation with id {conversationId} not found.")
    {
    }
}
