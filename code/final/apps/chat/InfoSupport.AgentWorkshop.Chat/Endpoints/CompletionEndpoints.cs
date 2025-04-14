using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using InfoSupport.AgentWorkshop.Chat.Models;
using InfoSupport.AgentWorkshop.Chat.Services;

namespace InfoSupport.AgentWorkshop.Chat.Endpoints;

public static class CompletionEndpoints
{
    public static void MapCompletionEndpoints(this WebApplication app)
    {
        app.MapPost("/completions", GenerateResponse)
            .WithName("GenerateResponse")
            .WithDescription("Generates a response as part of an existing conversation")
            .WithTags("Conversations");
    }

    private static IResult GenerateResponse(HttpContext context,
        IAgentCompletionService completionService,
        AgentCompletionRequest requestData)
    {
        var serializerOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            Converters = { new JsonStringEnumConverter() }
        };

        var responseStream = completionService.GenerateResponseAsync(requestData);

        return Results.Stream(async stream =>
        {
            await foreach (var responseChunk in responseStream)
            {
                var deltaPayload = new ResponseDeltaPayload(responseChunk.Thread.Id!, responseChunk.Message.Content!);

                var serializedPayload = JsonSerializer
                    .Serialize(deltaPayload, serializerOptions)
                    .Replace("\n", "").Replace("\n", " ");

                // We're writing out streaming event of type delta so we can figure out how to parse the response on the client.
                // We're serializing the response content as JSON on a single line as per the SSE protocol.
                await stream.WriteAsync(Encoding.UTF8.GetBytes("event: delta\n"));
                await stream.WriteAsync(Encoding.UTF8.GetBytes($"data: {serializedPayload}\n\n"));
                await stream.FlushAsync();
            }

            await stream.FlushAsync();
        }, contentType: "text/event-stream");
    }
}