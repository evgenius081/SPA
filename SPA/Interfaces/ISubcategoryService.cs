using SPA.Models;

namespace SPA.Interfaces;

public interface ISubcategoryService
{
    Task<IEnumerable<SubcategoryModel>> GetAllAsync();
}