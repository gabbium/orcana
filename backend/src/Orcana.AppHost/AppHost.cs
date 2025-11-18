var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres")
    .WithDataVolume()
    .WithHostPort(5432)
    .WithLifetime(ContainerLifetime.Persistent);

var orcanaDb = postgres.AddDatabase("orcanadb");

var openAiApiKey = builder.AddParameter("OpenAiApiKey", true);
var openAiModel = builder.AddParameter("OpenAiModel");

builder.AddProject<Projects.Orcana_Api>("orcana-api")
    .WithReference(orcanaDb).WaitFor(orcanaDb)
    .WithEnvironment("OpenAI__ApiKey", openAiApiKey)
    .WithEnvironment("OpenAI__Model", openAiModel);

var app = builder.Build();

await app.RunAsync();
