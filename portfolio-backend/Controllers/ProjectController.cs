using Projects.Models;
using Projects.Services;
using Microsoft.AspNetCore.Mvc;

namespace Projects.Controllers;

[ApiController]
[Route("[controller]")]
public class ProjectController : ControllerBase
{
    public ProjectController()
    {
    }

    // GET all action
    [HttpGet]
    public ActionResult<List<Project>> GetAll() =>
        ProjectService.GetAll();

    // GET by Id action
    [HttpGet("{id}")]
    public ActionResult<Project> GetById(long id) {
        var project = ProjectService.Get(id);
        return project is null ? NotFound() : project;
    }

    // POST action
    [HttpPost]
    public IActionResult Create(Project p){
        ProjectService.Add(p);
        return CreatedAtAction(nameof(GetById),new {Id = p.Id}, p);
    }

    // PUT action
    [HttpPut("{id}")]
    public IActionResult Put(long id, Project p){
        if(id != p.Id)
            return BadRequest();
        
        if(ProjectService.Get(id) is null)
            return NotFound();

        ProjectService.Update(p);

        return NoContent();
    }
    
    // DELETE action
    [HttpDelete("{id}")]
    public ActionResult Delete(long id){
        ProjectService.Delete(id);
        return NoContent();
    }
}