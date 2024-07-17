using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using Portfolio.db;

var builder = WebApplication.CreateBuilder(args);
Env.Load();

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = string.Format("Server={0};Database={1};User Id={2};Password=\"{3}\";Trusted_Connection=False;TrustServerCertificate=True",
        Env.GetString("SQL_SERVER"), Env.GetString("SQL_DATABASE"), Env.GetString("SQL_USER"), Env.GetString("SQL_PASSWORD"));

builder.Services.AddDbContext<PortfolioDb>(options =>
{
    options.UseSqlServer(connectionString);
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
    return "Hello World";
});

app.UseRouting();

app.UseAuthorization();
app.UseAuthentication();
// ... 
// UseCors must be between routing and endpoints
app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();

app.Run();
