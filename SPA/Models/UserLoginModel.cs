using System.ComponentModel.DataAnnotations;

namespace SPA.Models;

public class UserLoginModel
{
    [Key]
    public string Email { set; get; }
    public string Password { set; get; }
}