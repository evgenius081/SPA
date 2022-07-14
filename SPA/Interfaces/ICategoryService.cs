using SPA.Models;

namespace SPA.Interfaces;

public interface ICategoryService
{
    Task<IEnumerable<CategoryModel>> GetAllAsync();
}