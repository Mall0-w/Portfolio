namespace Portfolio.db;
using Microsoft.EntityFrameworkCore;
using Projects.Models;
using Tech.Models;

public class PortfolioDb : DbContext
{
    public PortfolioDb(DbContextOptions options) : base(options) { }
    public DbSet<Project> Projects { get; set; } = null!;
    public DbSet<Technology> Technologies {get; set;} = null!;
    
}