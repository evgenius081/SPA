using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SPA.Interfaces;
using SPA.Models;

namespace SPA.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly JWTAuthSettings _JWTAuthSettings;

    public UserService(IUserRepository userRepository, IOptions<JWTAuthSettings> JWTAuthSettings)
    {
        _userRepository = userRepository;
        _JWTAuthSettings = JWTAuthSettings.Value;
    }
    
    public async Task<IEnumerable<UserModel>> GetAllUsersAsync()
    {
        return await _userRepository.GetAllUsersAsync();
    }
    
    public async Task<UserModel> GetUserByIDAsync(int userID)
    {
        return await _userRepository.GetUserByIDAsync(userID);
    }

    public async Task UpdateUserAsync(UserModel updatedUser)
    {
        await _userRepository.UpdateUserAsync(updatedUser);
        await _userRepository.Save();
    }

    public async Task DeleteUserAsync(int userID)
    {
        await _userRepository.DeleteUserAsync(userID);
        await _userRepository.Save();
    }
    
    public async Task<int> CreateUserAsync(UserModel user)
    {
        var hasher = new PasswordHasher();
        user.Password = hasher.HashPassword(user.Password);
        var userID = await _userRepository.CreateUserAsync(user);
        await _userRepository.Save();
        return userID;
    }
    
    public async Task<string> Authenticate(string email, string password)
    {
        var hasher = new PasswordHasher();
        var users = await _userRepository.GetAllUsersAsync();
        var user = users.FirstOrDefault(u => u.Email == email && hasher.VerifyPassword(u.Password, password));

        if (user == null)
        {
            return "null";
        }
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_JWTAuthSettings.Secret);
        var claims = new List<Claim>();
        // adding user email and name to token
        claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Name));
        claims.Add(new Claim(ClaimTypes.Email, user.Email));
        // setting token expiration time on 1 hour
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
}