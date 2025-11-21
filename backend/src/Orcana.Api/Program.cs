using Orcana.Api;
using Orcana.Application;
using Orcana.Infrastructure;
using Orcana.Infrastructure.Data;
using Orcana.ServiceDefaults;

var builder = WebApplication.CreateBuilder(args);

builder.AddServiceDefaults();

builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddApiServices();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    await app.InitializeDatabaseAsync();
}

app.MapDefaultEndpoints();

app.UseApi();

await app.RunAsync();
