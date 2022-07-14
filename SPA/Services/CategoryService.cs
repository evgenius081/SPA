using SPA.Interfaces;
using SPA.Models;

namespace SPA.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }
    
    public async Task<IEnumerable<CategoryModel>> GetAllAsync()
    {
        return await _categoryRepository.GetAllAsync();
    }
}