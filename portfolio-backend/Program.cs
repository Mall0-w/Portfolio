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
builder.Services.AddDbContext<PortfolioDb>(options => {
    options.UseSqlServer(string.Format("Server={0};Database={1};Trusted_Connection=True;TrustServerCertificate=True",
        Env.GetString("SQL_SERVER"), Env.GetString("SQL_DATABASE")));
    });
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var  MyAllowSpecificOrigins = "PortfolioCors";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins($"{Env.GetString("FRONTEND")}")
                          .AllowAnyMethod()
                          .WithHeaders(["Content-Type", "Authorization", "X-Requested-With"]);
                      });
});

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/", ()=>{
    return "Hello World!";
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
