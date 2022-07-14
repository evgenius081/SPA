using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SPA.Interfaces;
using SPA.Repositories;
using SPA.Services;

namespace SPA;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        // adding my database context
        services.AddDbContext<Context.ContactsContext>(options =>
              options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

        services.AddLogging();

        // adding my repositories
        services.AddTransient<IUserRepository, UserRepository>();
        services.AddTransient<ICategoryRepository, CategoryRepository>();
        services.AddTransient<ISubcategoryRepository, SubcategoryRepository>();

        // adding my services
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ICategoryService, CategoryService>();
        services.AddScoped<ISubcategoryService, SubcategoryService>();
        services.AddSingleton<IPasswordHasher, PasswordHasher>();

        // adding session
        services.AddSession(options =>
        {
            options.Cookie.Name = ".AdventureWorks.Session";
            options.Cookie.IsEssential = true;
        });

        services.AddCors();

        // adding JWT token
        var JWTAuthSettingsSection = Configuration.GetSection("JWTAuthSettings");
        services.Configure<JWTAuthSettings>(JWTAuthSettingsSection);

        // adding JWT token as authentication
        var JWTAuthSettings = JWTAuthSettingsSection.Get<JWTAuthSettings>();
        var key = Encoding.ASCII.GetBytes(JWTAuthSettings.Secret);
        services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(x =>
        {
            x.RequireHttpsMetadata = false;
            x.SaveToken = true;
            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });

        services.AddControllersWithViews();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseStaticFiles();

        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseSession();

        app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

        app.UseAuthentication();

        app.UseAuthorization();

        app.UseEndpoints(endpoints => {
            endpoints.MapControllerRoute(
name: "default",
pattern: "{controller}/{action?}/{id?}");
        });
    }
}
