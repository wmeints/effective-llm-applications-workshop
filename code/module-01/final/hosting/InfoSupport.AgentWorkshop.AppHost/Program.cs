using Projects;

var builder = DistributedApplication.CreateBuilder(args);

var postgresServer = builder.AddPostgres("postgres").WithDataVolume();
var chatDatabase = postgresServer.AddDatabase("chatservicedb", "chat");

var qdrantServer = builder.AddQdrant("qdrant").WithDataVolume();

var languageModel = builder.AddConnectionString("languagemodel");

var chatService = builder.AddProject<InfoSupport_AgentWorkshop_Chat>("chatservice")
    .WithReference(chatDatabase)
    .WithReference(languageModel)
    .WaitFor(chatDatabase);

var indexerService = builder.AddProject<InfoSupport_AgentWorkshop_Indexer>("indexerservice")
    .WithReference(qdrantServer)
    .WithReference(languageModel)
    .WaitFor(qdrantServer);


var frontend = builder.AddNpmApp("frontend", "../../apps/frontend", "dev")
    .WithExternalHttpEndpoints()
    .WithHttpEndpoint(3000, env: "PORT")
    .WithReference(chatService)
    .WaitFor(chatService);

builder.Build().Run();