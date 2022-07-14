using SPA.Interfaces;
using SPA.Models;

namespace SPA.Services;

public class SubcategoryService : ISubcategoryService
{
    private readonly ISubcategoryRepository _subcategoryRepository;

    public SubcategoryService(ISubcategoryRepository subcategoryRepository)
    {
        _subcategoryRepository = subcategoryRepository;
    }
    
    public async Task<IEnumerable<SubcategoryModel>> GetAllAsync()
    {
        return await _subcategoryRepository.GetAllAsync();
    }
}