using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Data;

namespace InfoSupport.AgentWorkshop.Chat.Models;

public class TextUnit
{
    [VectorStoreRecordKey]
    public ulong Id { get; set; }

    [VectorStoreRecordData]
    public required string OriginalFileName { get; set; }

    [TextSearchResultValue]
    [VectorStoreRecordData(IsFullTextIndexed = true)]
    public required string Content { get; set; }

    [TextSearchResultName]
    [VectorStoreRecordVector(1536)]
    public ReadOnlyMemory<float> Embedding { get; set; }
}