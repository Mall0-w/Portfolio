namespace Portfolio.db;
using Microsoft.EntityFrameworkCore;
using Projects.Models;
using Tech.Models;
using DotNetEnv;

public class PortfolioDb : DbContext
{

    //override OnConfiguring to configure the database connection
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = string.Format("Server='{0}';Port='{1}';Database='{2}';User='{3}';Password='{4}';",
        Env.GetString("SQL_SERVER"), Env.GetString("SQL_PORT"), Env.GetString("SQL_DATABASE"), Env.GetString("SQL_USER"), Env.GetString("SQL_PASSWORD"));
        // Use your MySQL connection string here
        optionsBuilder.UseMySql(
            connectionString,
            ServerVersion.AutoDetect(connectionString)
        );
    }

    public PortfolioDb(DbContextOptions options) : base(options) { }
    public DbSet<Project> Projects { get; set; } = null!;
    public DbSet<Technology> Technologies {get; set;} = null!;
    
}