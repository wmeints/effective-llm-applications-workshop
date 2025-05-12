namespace InfoSupport.AgentWorkshop.Chat.Models;

public class Conversation
{
    private List<ConversationMessage> _messages = new();

    private Conversation()
    {
    }

    public Conversation(string threadId)
    {
        ThreadId = threadId;
        DateCreated = DateTime.UtcNow;
    }

    public int Id { get; private set; }
    public string ThreadId { get; private set; } = default!;
    public IReadOnlyCollection<ConversationMessage> Messages => _messages.AsReadOnly();
    public DateTime DateCreated { get; private set; }
    public DateTime? DateModified { get; private set; }

    public void AppendUserMessage(string content)
    {
        _messages.Add(new ConversationMessage(
            Guid.NewGuid().ToString(),
            DateTime.UtcNow,
            ConversationMessageRole.User,
            content));

        DateModified = DateTime.UtcNow;
    }

    public void AppendAssistantResponse(string content)
    {
        _messages.Add(new ConversationMessage(
            Guid.NewGuid().ToString(),
            DateTime.UtcNow,
            ConversationMessageRole.Assistant,
            content));

        DateModified = DateTime.UtcNow;
    }
}