using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.db;
using Projects.Models;
using Tech.Models;
using DotNetEnv;

namespace Projects.Services;

public class ProjectService{
    private PortfolioDb db;
    private readonly ILogger<ProjectService> _logger;
    public ProjectService(PortfolioDb db, ILogger<ProjectService> logger){
        this.db = db;
        this._logger = logger;
        Env.Load();
    }

    private bool isProduction(){
        return Env.GetBool("PRODUCTION");
    }

    public async Task<ActionResult<IEnumerable<Project>>> GetPagination(int page=0, int limit=10){
        //have to select or else technologies will infinetly recurse with projects because many to many
         var projects = await db.Projects
                           .Include(p => p.Technologies)
                           .OrderBy(p => p.FinishedOn == null ? 0 : 1) // nulls first
                           .ThenByDescending(p => p.FinishedOn)
                           .ThenBy(p => p.Id)
                           .Skip(page * limit)
                           .Take(limit)
                           .ToListAsync();

        return projects;
    }

    public async Task<ActionResult<IEnumerable<Project>>> GetAll(){
        var projects = await db.Projects
                           .Include(p => p.Technologies)
                           .OrderBy(p => p.FinishedOn == null ? 0 : 1) // nulls first
                           .ThenByDescending(p => p.FinishedOn)
                           .ThenBy(p => p.Id)
                           .ToListAsync();

        return projects;
    }

    public async Task<ActionResult<Project?>> Get(long id){
        var project = await db.Projects
                          .Include(p => p.Technologies)
                          .FirstOrDefaultAsync(p => p.Id == id);
        return project;
    }

    public async Task Add(ProjectWithIdArray p){
        if(isProduction())
            throw new InvalidOperationException("Can't add Projects while in production");
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
        if(isProduction())
            throw new InvalidOperationException("Can't Delete while in production");
        var p = await db.Projects.FindAsync(id);
        if(p == null)
            return;
        db.Projects.Remove(p);
        await db.SaveChangesAsync();
        return;
    }

    public async Task Update(ProjectWithIdArray proj){
        if(isProduction())
            throw new InvalidOperationException("Can't Update while in production");
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