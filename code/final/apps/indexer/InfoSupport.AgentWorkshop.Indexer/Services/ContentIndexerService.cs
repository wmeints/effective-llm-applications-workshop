using InfoSupport.AgentWorkshop.Indexer.Models;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Embeddings;
using Microsoft.SemanticKernel.Text;

namespace InfoSupport.AgentWorkshop.Indexer.Services;

public class ContentIndexerService(
    IConfiguration configuration,
    ITextEmbeddingGenerationService embeddingGenerationService,
    IVectorStore vectorStore,
    ILogger<ContentIndexerService> logger) : BackgroundService
{
    private const int ChunkSize = 1000;
    private const int OverlapSize = 250;
    private ulong _currentIdentifier = 1L;

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("Indexing content at: {time}", DateTimeOffset.Now);
        await ProcessContentFilesAsync(configuration["Indexing:ContentDirectory"]!, stoppingToken);
        logger.LogInformation("Finished indexing content at: {time}", DateTimeOffset.Now);
    }

    private async Task ProcessContentFilesAsync(string contentDirectory, CancellationToken cancellationToken)
    {
        var files = Directory.GetFiles(contentDirectory, "*.md", SearchOption.AllDirectories);

        foreach (var file in files)
        {
            var text = await File.ReadAllTextAsync(file, cancellationToken);
            await ChunkFileContentAsync(file, text, cancellationToken);
        }
    }

    private async Task ChunkFileContentAsync(string fileName, string fileContent, CancellationToken cancellationToken)
    {
        var lines = fileContent.Split(["\r\n", "\n"], StringSplitOptions.None);
        var chunks = TextChunker.SplitMarkdownParagraphs(lines, ChunkSize, OverlapSize);

        foreach (var chunk in chunks)
        {
            await UpsertChunkAsync(fileName, chunk, cancellationToken);
        }
    }

    private async Task UpsertChunkAsync(string fileName, string chunk, CancellationToken cancellationToken)
    {
        var embeddingVector = await embeddingGenerationService.GenerateEmbeddingAsync(
            chunk, cancellationToken: cancellationToken);

        var textUnit = new TextUnit
        {
            Content = chunk,
            Embedding = embeddingVector,
            Id = _currentIdentifier++,
            OriginalFileName = fileName,
        };

        var collection = vectorStore.GetCollection<ulong, TextUnit>("content");
        await collection.CreateCollectionIfNotExistsAsync(cancellationToken);

        await collection.UpsertAsync(textUnit);
    }
}