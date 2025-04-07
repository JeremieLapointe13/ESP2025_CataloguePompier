using ESP2025.Application.Entities;
using ESP2025.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using ESP2025.Infrastructure;

public class TodoRepository : ITodoRepository
{
    private readonly AppDbContext _context;

    public TodoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Todo>> GetAll()
    {
        return await _context.Todos.ToListAsync();
    }

    public async Task<Todo> Add(Todo todo)
    {
        EntityEntry<Todo> newTodo = await _context.Todos.AddAsync(todo);
        await _context.SaveChangesAsync();
        return newTodo.Entity;
    }

    public async Task ToggleCompleteStatus(Guid id)
    {
        Todo todo = await FindById(id);
        todo.IsCompleted = !todo.IsCompleted;
        _context.Todos.Update(todo);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(Guid id)
    {
        Todo todo = await FindById(id);
        _context.Todos.Remove(todo);
        await _context.SaveChangesAsync();
    }

    public async Task<Todo> FindById(Guid id)
    {
        return await _context.Todos
            .Where(x => x.Id == id)
            .SingleAsync();
    }
}
