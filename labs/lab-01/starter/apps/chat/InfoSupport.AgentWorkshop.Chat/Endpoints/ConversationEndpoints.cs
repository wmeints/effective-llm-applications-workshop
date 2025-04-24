using InfoSupport.AgentWorkshop.Chat.Data;
using Microsoft.EntityFrameworkCore;

namespace InfoSupport.AgentWorkshop.Chat.Endpoints;

public static class ConversationEndpoints
{
    public static void MapConversationEndpoints(this WebApplication app)
    {
        app.MapGet("/conversations/{threadId:guid}/messages", GetConversationMessages);
        app.MapGet("/conversations", GetConversations);
    }

    private static async Task<IResult> GetConversationMessages(string threadId, ApplicationDbContext applicationDbContext)
    {
        var conversation = await applicationDbContext.Conversations
            .SingleOrDefaultAsync(x => x.ThreadId == threadId);

        if (conversation is null)
        {
            return Results.NotFound();
        }

        return Results.Ok(conversation.Messages.OrderBy(x => x.Timestamp));
    }

    private static async Task<IResult> GetConversations(int pageIndex, ApplicationDbContext applicationDbContext)
    {
        var totalItems = await applicationDbContext.Conversations.CountAsync();

        var items = await applicationDbContext.Conversations
            .OrderByDescending(x => x.DateModified)
            .Skip(pageIndex * 10).Take(10)
            .ToListAsync();

        return Results.Ok(new
        {
            TotalItems = totalItems,
            Items = items,
            PageIndex = pageIndex,
            PageSize = 10
        });
    }
}