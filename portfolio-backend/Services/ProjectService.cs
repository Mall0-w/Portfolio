using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.db;
using Projects.Models;
using Tech.Models;

namespace Projects.Services;

public class ProjectService{
    private PortfolioDb db;
    private readonly ILogger<ProjectService> _logger;
    public ProjectService(PortfolioDb db, ILogger<ProjectService> logger){
        this.db = db;
        this._logger = logger;
    }

    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetPagination(int page=0, int limit=10){
        //have to select or else technologies will infinetly recurse with projects because many to many
         var projects = await db.Projects
                           .Include(p => p.Technologies)
                           .Take((page+1)*limit)
                           .OrderByDescending(p => p.Id)
                           .ToListAsync();

        var projectDtos = projects.Select(project => new ProjectDto
        {
            Id = project.Id,
            Name = project.Name,
            Desc = project.Desc,
            FinishedOn = project.FinishedOn,
            Link = project.Link,
            Technologies = project.Technologies.Select(t => new TechnologyDto
            {
                Id = t.Id,
                Name = t.Name
            }).ToList()
        }).ToList();

        return projectDtos;
    }

    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetAll(){
        var projects = await db.Projects
                           .Include(p => p.Technologies)
                           .OrderByDescending(p => p.Id)
                           .ToListAsync();

        var projectDtos = projects.Select(project => new ProjectDto
        {
            Id = project.Id,
            Name = project.Name,
            Desc = project.Desc,
            FinishedOn = project.FinishedOn,
            Link = project.Link,
            Technologies = project.Technologies.Select(t => new TechnologyDto
            {
                Id = t.Id,
                Name = t.Name
            }).ToList()
        }).ToList();

        return projectDtos;
    }

    public async Task<ActionResult<ProjectDto?>> Get(long id){
        var project = await db.Projects
                          .Include(p => p.Technologies)
                          .FirstOrDefaultAsync(p => p.Id == id);
        if(project == null)
            return null;

        var projectDto = new ProjectDto
        {
            Id = project.Id,
            Name = project.Name,
            Desc = project.Desc,
            FinishedOn = project.FinishedOn,
            Link = project.Link,
            Technologies = project.Technologies.Select(t => new TechnologyDto
            {
                Id = t.Id,
                Name = t.Name
            }).ToList()
        };

        return projectDto;
    }

    public async Task Add(ProjectWithIdArray p){
        var project = p.Project;
        var ids = p.Technologies;
        if(ids is not null){
            var Technologies = await db.Technologies.Where(t => ids.Contains(t.Id)).ToListAsync();
            if(Technologies.Count() != ids.Length)
                throw new ArgumentException("id array contains an id that does not exist");
            project.Technologies = new List<Technology>(Technologies);
        }

        db.Projects.Add(project);
        await db.SaveChangesAsync();

        return;
    }   

    public async Task Delete(long id){
        var p = await db.Projects.FindAsync(id);
        if(p == null)
            return;
        db.Projects.Remove(p);
        await db.SaveChangesAsync();
        return;
    }

    public async Task Update(ProjectWithIdArray proj){
        var project = proj.Project;
        var ids = proj.Technologies;
        using (var transaction = await db.Database.BeginTransactionAsync()){
            try{
                //find project (will throw error later if not found which is no big deal)
                var existingProject = await db.Projects
                .Include(p => p.Technologies)
                .FirstOrDefaultAsync(p => p.Id == project.Id);
                if(existingProject is null)
                    throw new ArgumentException("Project with given id does not exist");
                
                //handle technologies if given an id array

                db.Entry(existingProject).CurrentValues.SetValues(project);

                if(ids != null){
                    //clear its list of technologies
                    existingProject.Technologies.Clear();
                
                    var newTechnologies = await db.Technologies.Where(t => ids.Contains(t.Id)).ToListAsync();
                    foreach(var tech in newTechnologies){
                        existingProject.Technologies.Add(tech);
                    }

                    var techToRemove = await db.Technologies.
                        Where(t => t.Projects.Any(p => p.Id == project.Id) && !ids.Contains(t.Id)).ToListAsync();

                    foreach(var tech in techToRemove){
                        tech.Projects.Remove(existingProject);
                    }
                }

                db.Entry(existingProject).State = EntityState.Modified;
                await db.SaveChangesAsync();
                await transaction.CommitAsync();
                return;
            }catch{
                await transaction.RollbackAsync();
                throw;
            }
        }
       
    }
}