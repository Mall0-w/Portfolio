using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using Portfolio.db;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure; 

var builder = WebApplication.CreateBuilder(args);
Env.Load();

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = string.Format("Server='{0}';Port='{1}';Database='{2}';User='{3}';Password='{4}';",
        Env.GetString("SQL_SERVER"), Env.GetString("SQL_PORT"), Env.GetString("SQL_DATABASE"), Env.GetString("SQL_USER"), Env.GetString("SQL_PASSWORD"));

Console.WriteLine("connectionString: " + connectionString);

builder.Services.AddDbContext<PortfolioDb>(options =>
{
    // Use MySQL instead of SQL Server
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var MyAllowSpecificOrigins = "PortfolioCors";
 
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
        policy => policy.WithOrigins($"{Env.GetString("FRONTEND")}", "http://host.docker.internal:80")
                           .AllowAnyMethod()
                           .WithHeaders(["Content-Type", "Authorization", "X-Requested-With"])
        );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/", () =>
{
    return "Hello World :)";
});

app.UseRouting();

app.UseAuthorization();
app.UseAuthentication();
// ... 
// UseCors must be between routing and endpoints
app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();

app.Run();
