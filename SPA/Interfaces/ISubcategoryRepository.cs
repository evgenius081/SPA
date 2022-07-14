using SPA.Models;

namespace SPA.Interfaces;

public interface ISubcategoryRepository
{
    Task<IEnumerable<SubcategoryModel>> GetAllAsync();
}
