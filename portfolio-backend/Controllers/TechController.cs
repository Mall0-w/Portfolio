using Tech.Models;
using Tech.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.db;
using Microsoft.AspNetCore.Http.HttpResults;

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

    [HttpPost]
    public async Task<IActionResult> Add(Technology t){
        try{
            await this.service.Add(t);
        }catch(InvalidOperationException e){
            return BadRequest(new {Status = 400, Message = e.Message});
        }
        
        return CreatedAtAction(nameof(GetById),new {id = t.Id}, t);
    }
}