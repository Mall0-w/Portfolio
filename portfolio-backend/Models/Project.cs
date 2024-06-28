namespace Projects.Models;

public class Project
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string? Desc { get; set; }

    public DateOnly? FinishedOn {get; set;}
}