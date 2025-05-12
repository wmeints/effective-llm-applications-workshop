using InfoSupport.AgentWorkshop.Indexer.Services;
using Microsoft.SemanticKernel;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();
builder.AddAzureOpenAIClient("languagemodel");
builder.AddQdrantClient("qdrant");

builder.Services.AddKernel()
    .AddAzureOpenAITextEmbeddingGeneration(
        builder.Configuration["LanguageModel:TextEmbeddingDeploymentName"]!);

builder.Services.AddQdrantVectorStore();
builder.Services.AddHostedService<ContentIndexerService>();

var app = builder.Build();

app.Run();
