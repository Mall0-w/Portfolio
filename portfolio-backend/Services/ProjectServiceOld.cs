using Projects.Models;

namespace Projects.Services;

public static class ProjectServiceOld
{
    static List<Project> Projects { get; }
    static int nextId = 3;
    static ProjectServiceOld()
    {
        Projects = new List<Project>
        {
            new Project { Id = 1, Name = "JC4", Desc="A cute little console connect 4 game designed using Java", FinishedOn = new DateOnly(2024, 6, 27) },
            new Project { Id = 2, Name = "Portfolio", Desc="My own webportfolio (The website you're on now!).  Stack: React, ASP.Net MSSQL"}
        };
    }

    public static List<Project> GetAll() => Projects;

    public static Project? Get(long id) => Projects.FirstOrDefault(p => p.Id == id);

    public static void Add(Project Project)
    {
        Project.Id = nextId++;
        Projects.Add(Project);
    }

    public static void Delete(long id)
    {
        var Project = Get(id);
        if(Project is null)
            return;

        Projects.Remove(Project);
    }

    public static void Update(Project Project)
    {
        var index = Projects.FindIndex(p => p.Id == Project.Id);
        if(index == -1)
            return;

        Projects[index] = Project;
    }
}