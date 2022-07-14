using Microsoft.EntityFrameworkCore;
using SPA.Interfaces;
using SPA.Models;

namespace SPA.Repositories;

public class SubcategoryRepository : ISubcategoryRepository
{
    private readonly Context.ContactsContext _Context;

    public SubcategoryRepository(Context.ContactsContext context)
    {
        _Context = context;
    }
    
    public async Task<IEnumerable<SubcategoryModel>> GetAllAsync()
    {
        return await _Context.Subcategories.ToListAsync();
    }
}