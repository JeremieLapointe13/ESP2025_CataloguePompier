using CleanTodo.Application.Entities;
using CleanTodo.Domain.Entities;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
    public DbSet<Todo> Todos { get; set; }

    public DbSet<User> User { get; set; }

    public DbSet<Grade> Grade { get; set; }   

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
    }
}
