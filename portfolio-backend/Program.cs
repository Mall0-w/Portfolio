using Microsoft.AspNetCore.Http.HttpResults;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var ProjectList = new List<Project>();

app.MapGet("/", () => {
    return "Hello World!";
});

app.MapPost("/api/projects", (Project p) => {
    ProjectList.Add(p);
    return TypedResults.Created("/api/projects/{id}", p);
});

app.MapGet("/api/projects/{id}", Results<Ok<Project>, NotFound>(long id) => {
    Project? ToFind = ProjectList.SingleOrDefault(p => p.id == id);
    return ToFind is null ? TypedResults.NotFound() : TypedResults.Ok(ToFind);
});

app.MapGet("/api/projects", () => {
    return TypedResults.Ok(ProjectList);
});

app.MapDelete("/api/projects/{id}", (long id)=>{
    ProjectList.RemoveAll(p => p.id == id);
    return TypedResults.NoContent();
});

app.MapPatch("/api/projects/{id}", Results<Ok<Project>, NotFound>(Project proj) => {
    var index = ProjectList.FindIndex(p => p.id == proj.id);
    if(index == -1)
        return TypedResults.NotFound();
    ProjectList[index] = proj;
    return TypedResults.Ok(proj);
});

app.Run();

record Project(long id, string name, string desc, DateOnly? dateDone);
