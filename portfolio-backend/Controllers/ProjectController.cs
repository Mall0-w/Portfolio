using Projects.Models;
using Projects.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Projects.Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectController : ControllerBase
{

    private ProjectService service; 
    public ProjectController(ProjectDb db)
    {
        service = new ProjectService(db);
    }

    // GET all action
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Project>>> GetAll(){
        return await service.GetAll();
    }
        

    // GET by Id action
    [HttpGet("{id}")]
    public async Task<ActionResult<Project?>> GetById(long id) {
        var project = await service.Get(id);
        return project is null ? NotFound() : project;
    }


    // POST action
    [HttpPost]
    public async Task<IActionResult> Create(Project p){
        await service.Add(p);
        return CreatedAtAction(nameof(GetById),new {id = p.Id}, p);
    }

    // PUT action
    [HttpPut("{id}")]
    public async Task<IActionResult> Put(long id, Project p){
        if(id != p.Id)
            return BadRequest();
        try{
            await service.Update(p);
        }catch(DbUpdateConcurrencyException){
            if(service.Get(id) is null)
                return NotFound();
            else
                throw;
        }

        return NoContent();
    }
    
    // DELETE action
    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(long id){
        await service.Delete(id);
        return NoContent();
    }
}