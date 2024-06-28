using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.db;
using Tech.Models;

namespace Tech.Services;

public class TechService{
    PortfolioDb db;
    public TechService(PortfolioDb db){
        this.db = db;
    }

    public async Task<ActionResult<IEnumerable<Technology>>> GetAll(){
        return await db.Technologies.ToListAsync();
    }

    public async Task<ActionResult<Technology?>> Get(long id){
        return await db.Technologies.FindAsync(id);
    }

    public async Task Add(Technology t){
        db.Technologies.Add(t);
        await db.SaveChangesAsync();
        return;
    }
}