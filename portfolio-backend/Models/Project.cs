using Microsoft.EntityFrameworkCore;

namespace Projects.Models;

public class Project
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string? Desc { get; set; }

    public DateOnly? FinishedOn {get; set;}
}

public class ProjectDb : DbContext
{
    public ProjectDb(DbContextOptions options) : base(options) { }
    public DbSet<Project> Projects { get; set; } = null!;
}