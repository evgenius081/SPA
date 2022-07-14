using SPA.Models;

namespace SPA.Interfaces;

public interface IUserService
{
    Task<int> CreateUserAsync(UserModel user);
    Task<UserModel> GetUserByIDAsync(int userID);
    Task<IEnumerable<UserModel>> GetAllUsersAsync();
    Task UpdateUserAsync(UserModel updatedUser);
    Task DeleteUserAsync(int userID);
    Task<string> Authenticate(string userEmail, string password);
}