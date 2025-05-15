using InfoSupport.AgentWorkshop.Indexer.Services;
using Microsoft.SemanticKernel;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
builder.AddAzureOpenAIClient("languagemodel");

builder.Services.AddHostedService<ContentIndexerService>();

var app = builder.Build();

app.Run();
