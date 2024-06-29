using Tech.Models;

namespace Projects.Models;

public class Project
{
    public long Id { get; set; }
    public required string Name { get; set; }
    public string? Desc { get; set; }

    public DateOnly? FinishedOn {get; set;}

    public string? Link {get; set;}
    public List <Technology> Technologies {get;set;} = new List<Technology>();
}

public class ProjectWithIdArray{
    public required Project Project {get; set;}
    public long[]? Ids {get; set;}
}

// public class ProjectWithTechnologies{
//     public required Project Project {get; set;}
//     public Technology[]? Technologies {get; set;}
// }