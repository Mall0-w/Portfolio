using AWS.Services;
using Emails.Models;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
public class EmailController : ControllerBase {
    private SESService service;

    public EmailController(ILogger<SESService> logger){
        this.service = new SESService(logger);
    }

    [HttpPost("/contact")]
    public async Task<ActionResult> SendContactEmail(ContactEmailReq req){
        try{
            var results = await service.HandleContactExchange(req);

            return Ok(results);
        }catch(Exception e){
            return StatusCode(500, new {message =e.Message});
        }
        
    }
}