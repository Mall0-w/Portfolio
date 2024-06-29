using Projects.Models;
using Projects.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.db;

namespace Projects.Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectController : ControllerBase
{

    private ProjectService service; 
    public ProjectController(PortfolioDb db, ILogger<ProjectService> logger)
    {
        service = new ProjectService(db,logger);
    }

    // GET all action
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetAll(){
        return await service.GetAll();
    }
        

    // GET by Id action
    [HttpGet("{id}")]
    public async Task<ActionResult<ProjectDto?>> GetById(long id) {
        var project = await service.Get(id);
        return project is null ? NotFound() : project;
    }


    // POST action
    [HttpPost]
    public async Task<IActionResult> Create(ProjectWithIdArray p){
        try{
            await service.Add(p);
        }catch(ArgumentException e){
            return NotFound(e.Message);
        }
        return CreatedAtAction(nameof(GetById),new {id = p.Project.Id}, p.Project);
    }

    // PUT action
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(long id, ProjectWithIdArray p){
        if(id != p.Project.Id)
            return BadRequest();
        try{
            await service.Update(p);
        }catch(ArgumentException e){
            return NotFound(e.Message);
        }

        return NoContent();
    }
    // public async Task<IActionResult> Put(long id, Project p){
    //     if(id != p.Id)
    //         return BadRequest();
    //     try{
    //         await service.Update(p);
    //     }catch(DbUpdateConcurrencyException){
    //         if(service.Get(id) is null)
    //             return NotFound();
    //         else
    //             throw;
    //     }

    //     return NoContent();
    // }
    
    // DELETE action
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(long id){
        await service.Delete(id);
        return NoContent();
    }
}