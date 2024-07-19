using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.db;
using Tech.Models;
using DotNetEnv;

namespace Tech.Services;

public class TechService{
    PortfolioDb db;
    public TechService(PortfolioDb db){
        this.db = db;
        Env.Load();
    }

    private bool isProduction(){
        return Env.GetBool("PRODUCTION");;
    }

    public async Task<ActionResult<IEnumerable<Technology>>> GetAll(){
        return await db.Technologies.ToListAsync();
    }

    public async Task<ActionResult<Technology?>> Get(long id){
        return await db.Technologies.FindAsync(id);
    }

    public async Task Add(Technology t){
        if(isProduction())
            throw new InvalidOperationException("Cannot add while in production");
        db.Technologies.Add(t);
        await db.SaveChangesAsync();
        return;
    }
}