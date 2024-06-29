namespace Tech.Models;
using Microsoft.EntityFrameworkCore;
using Projects.Models;

public class Technology{
    public int Id {get; set;}
    public required string Name {get; set;}
     public List <Project> Projects {get; set;} = new List<Project>();
}