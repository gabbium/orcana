var builder = DistributedApplication.CreateBuilder(args);

var postgres = builder.AddPostgres("postgres")
    .WithHostPort(54320);

var orcanaDb = postgres.AddDatabase("orcanadb");

builder.AddProject<Projects.Orcana_Api>("orcana-api")
    .WithReference(orcanaDb).WaitFor(orcanaDb);

var app = builder.Build();

await app.RunAsync();
