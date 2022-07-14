using SPA.Models;

namespace SPA.Interfaces;

public interface ICategoryRepository
{
    Task<IEnumerable<CategoryModel>> GetAllAsync();
}
