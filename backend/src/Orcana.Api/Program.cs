using Orcana.Api;
using Orcana.Application;
using Orcana.Infrastructure;
using Orcana.ServiceDefaults;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.AddApplicationServices();
builder.AddInfrastructureServices();
builder.AddApiServices();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    await app.InitializeDatabaseAsync();
}

app.MapDefaultEndpoints();

app.UseApi();

await app.RunAsync();
