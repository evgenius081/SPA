using Microsoft.EntityFrameworkCore;
using SPA.Interfaces;
using SPA.Models;

namespace SPA.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly Context.ContactsContext _Context;

    public CategoryRepository(Context.ContactsContext context)
    {
        _Context = context;
    }
    
    public async Task<IEnumerable<CategoryModel>> GetAllAsync()
    {
        return await _Context.Categories.ToListAsync();
    }
}