using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions<BookContext> options) : base(options)
        {

        }
        public DbSet<Book> Books { get; set; }
    }
}
