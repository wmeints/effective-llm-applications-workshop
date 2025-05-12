using Microsoft.Extensions.VectorData;

namespace InfoSupport.AgentWorkshop.Indexer.Models;

public class TextUnit
{
    [VectorStoreRecordKey]
    public ulong Id { get; set; }
    
    [VectorStoreRecordData] 
    public required string OriginalFileName { get; set; }

    [VectorStoreRecordData(IsFullTextIndexed = true)] 
    public required string Content { get; set; }
    
    [VectorStoreRecordVector(1536)]
    public ReadOnlyMemory<float> Embedding { get; set; }
}