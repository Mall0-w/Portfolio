using Tech.Models;
using Tech.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.db;

namespace Tech.Controllers;

[ApiController]
[Route("[controller]")]
public class TechController : ControllerBase{
    private TechService service; 
    public TechController(PortfolioDb db)
    {
        service = new TechService(db);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Technology>>> GetAll(){
        return await this.service.GetAll();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Technology?>> GetById(long id){
        return await this.service.Get(id);
    }

    [HttpPut]
    public async Task<IActionResult> Add(Technology t){
        await this.service.Add(t);
        return CreatedAtAction(nameof(GetById),new {id = t.Id}, t);
    }
}