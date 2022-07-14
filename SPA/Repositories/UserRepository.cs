using Microsoft.EntityFrameworkCore;
using SPA.Interfaces;
using SPA.Models;
using SPA.Services;

namespace SPA.Repositories;

public class UserRepository : IUserRepository
{
    private readonly Context.ContactsContext _Context;

    public UserRepository(Context.ContactsContext context)
    {
        _Context = context;
    }
    
    public async Task<int> CreateUserAsync(UserModel user)
    {
        await _Context.AddAsync(user);
        return user.ID;
    }

    public async Task<IEnumerable<UserModel>> GetAllUsersAsync()
    {
        return await _Context.Users.ToListAsync();
    }

    public async Task<UserModel> GetUserByIDAsync(int userID)
    {
        return await _Context.Users.FirstOrDefaultAsync(u => u.ID == userID);
    }

    public async Task UpdateUserAsync(UserModel updatedUser)
    {
        _Context.Entry(updatedUser).State = EntityState.Modified;
        await Save();
    }

    public async Task DeleteUserAsync(int userID)
    {
        var userToDelete = await _Context.Users.FirstOrDefaultAsync(u => u.ID == userID);
        _Context.Users.Remove(userToDelete);
    }

    public async Task Save()
    {
        await _Context.SaveChangesAsync();
    }
}