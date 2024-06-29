using Tech.Models;

namespace Projects.Models;


public class ProjectBase{
    public long Id { get; set; }
    public required string Name { get; set; }
    public string? Desc { get; set; }

    public DateOnly? FinishedOn {get; set;}

    public string? Link {get; set;}
}
public class Project : ProjectBase
{
    
    public List <Technology> Technologies {get;set;} = new List<Technology>();
}

public class ProjectWithIdArray{
    public required Project Project {get; set;}
    public long[]? Technologies {get; set;}
}

public class ProjectDto : ProjectBase
{
    public List<TechnologyDto> Technologies { get; set; } = new List<TechnologyDto>();
}

// public class ProjectWithTechnologies{
//     public required Project Project {get; set;}
//     public Technology[]? Technologies {get; set;}
// }