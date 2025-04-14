namespace InfoSupport.AgentWorkshop.Chat.Models;

public record PagedResultSet<T>(IEnumerable<T> Items, int TotalCount, int PageIndex, int PageSize);