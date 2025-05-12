using InfoSupport.AgentWorkshop.Indexer.Services;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
builder.AddAzureOpenAIClient("languagemodel");

builder.Services.AddHostedService<ContentIndexerService>();

var app = builder.Build();

app.Run();
