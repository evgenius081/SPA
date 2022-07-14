using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SPA.Models;

public class SubcategoryModel
{
    public string Name { get; set; }
    public int CategoryID { get; set; }
}