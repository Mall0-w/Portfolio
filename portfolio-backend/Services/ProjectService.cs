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

    public async Task<ActionResult<IEnumerable<Project>>> GetAll(){
        return await db.Projects.ToListAsync();
    }

    public async Task<ActionResult<Project?>> Get(long id){
        return await db.Projects.FindAsync(id);
    }

    public async Task Add(Project project){
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
        var ids = proj.Ids;
        using (var transaction = await db.Database.BeginTransactionAsync()){
            try{
                //find project (will throw error later if not found which is no big deal)
                var existingProject = await db.Projects
                .Include(p => p.Technologies)
                .FirstOrDefaultAsync(p => p.Id == project.Id);
                if(existingProject is null)
                    throw new ArgumentException("Project with given id does not exist");
                
                //handle technologies if given an id array

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

                await db.SaveChangesAsync();
                await transaction.CommitAsync();
                return;
            }catch{
                await transaction.RollbackAsync();
                throw;
            }
        }
       
    }

    // public async Task Update(Project proj){
    //     db.Entry(proj).State = EntityState.Modified;
    //     await db.SaveChangesAsync();
    //     return;
    // }
}