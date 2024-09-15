using Tech.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Projects.Models;


public class ProjectBase{

    [Key]
    public long Id { get; set; }
    [Required]
    [Column(TypeName = "varchar(255)")]
    public required string Name { get; set; }
    [Column(TypeName = "text")]
    public string? Desc { get; set; }

    public DateOnly? FinishedOn {get; set;}

    [Column(TypeName = "varchar(255)")]
    public string? Link {get; set;}

    [Column(TypeName = "varchar(255)")]
    public string? Github {get; set;}
    
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