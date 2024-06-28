namespace Projects.Models;

public class Project
{
    public long Id { get; set; }
    public required string Name { get; set; }
    public string? Desc { get; set; }

    public DateOnly? FinishedOn {get; set;}
}

public class ProjectWithIdArray{
    public required Project Project {get; set;}
    public long[]? Ids {get; set;}
}

public class ProjectTechMapping{
    public long Id {get; set;}
    public required long ProjectId {get; set;}
    public required long TechId {get; set;}
}