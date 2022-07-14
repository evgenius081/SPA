using System.ComponentModel.DataAnnotations;

namespace SPA.Models;

public class CategoryModel
{
    [Key]
    public int ID { get; set; }
    public string Name { get; set; }
}