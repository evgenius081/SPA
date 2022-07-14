using Microsoft.EntityFrameworkCore;
using SPA.Models;

namespace SPA.Context;

public class ContactsContext : DbContext
{
    public ContactsContext(DbContextOptions<ContactsContext> options)
        : base(options) { }

    public DbSet<UserModel> Users { get; set; }
    public DbSet<CategoryModel> Categories { get; set; }

    public DbSet<SubcategoryModel> Subcategories { get; set; }

    // because subcategories have composite primary key
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SubcategoryModel>()
            .HasKey(c => new { c.Name, c.CategoryID });
    }
}