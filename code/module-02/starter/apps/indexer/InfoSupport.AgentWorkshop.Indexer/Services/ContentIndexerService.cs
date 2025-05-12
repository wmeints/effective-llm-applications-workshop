using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Embeddings;

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
        //TODO: Find files to index and iterate over them to process them.
    }

    private async Task ChunkFileContentAsync(string fileName, string fileContent, CancellationToken cancellationToken)
    {
        //TODO: Split the file content into lines.
        //TODO: Use TextChunker.SplitMarkdownParagraphs method to split the content into chunks.
        //TODO: Upsert each chunk into the vector store.
    }

    private async Task UpsertChunkAsync(string fileName, string chunk, CancellationToken cancellationToken)
    {
        //TODO: Generate an embedding for the chunk using the embedding generation service.
        //TODO: Upsert the chunk into the vector store.
    }
}