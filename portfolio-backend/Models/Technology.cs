namespace Tech.Models;

using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Projects.Models;

public class TechnologyBase{
    public int Id {get; set;}
    public required string Name {get; set;}
}
public class Technology : TechnologyBase{
    [JsonIgnore]
     public List <Project> Projects {get; set;} = new List<Project>();
}

public class TechnologyDto : TechnologyBase{}