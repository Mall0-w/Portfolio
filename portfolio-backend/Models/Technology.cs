namespace Tech.Models;

using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Projects.Models;

public class TechnologyBase{
    [Key]
    public int Id {get; set;}
    [Column(TypeName = "varchar(255)")]
    public required string Name {get; set;}
}
public class Technology : TechnologyBase{
    [JsonIgnore]
     public List <Project> Projects {get; set;} = new List<Project>();
}

public class TechnologyDto : TechnologyBase{}