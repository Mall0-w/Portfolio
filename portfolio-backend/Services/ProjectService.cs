using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projects.Models;

namespace Projects.Services;

public class ProjectService{
    private ProjectDb db;
    public ProjectService(ProjectDb db){
        this.db = db;
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

    public async Task Update(Project proj){
        db.Entry(proj).State = EntityState.Modified;
        await db.SaveChangesAsync();
        return;
    }
}