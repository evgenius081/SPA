using System.Dynamic;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using SPA.Interfaces;
using SPA.Models;

namespace SPA.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ICategoryService _categoryService;
    private readonly ISubcategoryService _subcategoryService;

    private readonly ILogger<UserController> _logger;

    public class CategoriesReturn
    {
        public IEnumerable<CategoryModel> categories { set; get; }
        public IEnumerable<SubcategoryModel> subcategories { set; get; }

        public CategoriesReturn(IEnumerable<CategoryModel> categories, IEnumerable<SubcategoryModel> subcategories)
        {
            this.categories = categories;
            this.subcategories = subcategories;
        }
    }

    public UserController(IUserService userService, 
            ISubcategoryService subcategoryService, 
             ICategoryService categoryService,ILogger<UserController> logger)
    {
        _logger = logger;
        _userService = userService;
        _categoryService = categoryService;
        _subcategoryService = subcategoryService;
    }

    [HttpGet]
    public async Task<IEnumerable<UserModel>> Get()
    {
        var users = await _userService.GetAllUsersAsync();
        return users.ToArray();
    }

    [Route("login")]
    [HttpPost]
    public async Task<ActionResult> Login([FromBody] UserLoginModel curUser)
    {
        var resp = await _userService.Authenticate(curUser.Email, curUser.Password);
        if (resp == "null") return BadRequest("Wrong email or password");
        HttpContext.Session.SetString("token", resp);
        return Ok(resp);
    }

    [Route("edit")]
    [HttpPost]
    public async Task<UserModel> Edit([FromBody] int userID)
    {
        return await _userService.GetUserByIDAsync(userID);
    }

    [Route("update")]
    [HttpPost]
    public async Task<ActionResult> Update([FromBody] UserModel user)
    {
        if (user == null) return NotFound();
        await _userService.UpdateUserAsync(user);
        return Ok(user);
    }

    [Route("delete")]
    [HttpPost]
    public async Task<ActionResult> Delete([FromBody] int userID)
    {
        if(await _userService.GetUserByIDAsync(userID) == null)
        {
            return NotFound();
        }
        await _userService.DeleteUserAsync(userID);
        return Ok();
    }
    
    [Route("create")]
    [HttpPost]
    public async Task<ActionResult> Create([FromBody] UserModel user)
    {
        await _userService.CreateUserAsync(user);
        return Ok();
    }
    
    [Route("categories")]
    [HttpGet]
    public async Task<ActionResult> Categories()
    {
        var categories = await _categoryService.GetAllAsync();
        var subcategories = await _subcategoryService.GetAllAsync();
        var mymodel = new CategoriesReturn(categories, subcategories);
        return Ok(mymodel);
    }
}