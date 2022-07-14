using System.ComponentModel.DataAnnotations;

namespace SPA.Models;

public class UserModel
{
    [Key]
    public int ID {set; get; }
    public string Name { set; get; }
    public string? Surname { set; get; }
    public string Email { set; get; }
    public string Password { set; get; }
    public string Category { set; get; }
    public string? Subcategory { set; get; }
    public string? PhoneNumber { set; get; }
    public string? Birth { set; get; }
}