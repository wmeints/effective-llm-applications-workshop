using System.Text.Json;
using System.Text.Json.Serialization;
using InfoSupport.AgentWorkshop.Chat.Data;
using InfoSupport.AgentWorkshop.Chat.Endpoints;
using InfoSupport.AgentWorkshop.Chat.Services;
using InfoSupport.Ricardo.Chat.Data;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.SemanticKernel;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
builder.AddAzureOpenAIClient("languagemodel");
builder.AddNpgsqlDbContext<ApplicationDbContext>("chatservicedb");

// TODO: Configure the kernel object.
// See the documentation for instructions: https://learn.microsoft.com/en-us/semantic-kernel/concepts/ai-services/chat-completion/

builder.Services.AddScoped<IAgentCompletionService, AgentCompletionService>();

builder.Services.AddOpenApi();

builder.Services.Configure<JsonOptions>(options =>
{
    options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

var app = builder.Build();

app.MapCompletionEndpoints();
app.MapConversationEndpoints();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi("/swagger/{documentName}/swagger.json");
    app.UseReDoc(config => { config.RoutePrefix = "docs"; });
}

if (app.Environment.IsDevelopment())
{
    await using (var scope = app.Services.CreateAsyncScope())
    await using (var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>())
    {
        await dbContext.Database.MigrateAsync();
    }
}

app.Run();
