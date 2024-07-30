using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public static class BookSeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new BookContext(
                serviceProvider.GetRequiredService<DbContextOptions<BookContext>>()))
            {
                //Kiểm tra nếu có dữ liệu trong bảng Book
                if (context.Books.Any())
                {
                    return; //DB đã được seed
                }

                context.Books.AddRange(
                    new Book
                    {
                        Title = "Đắc nhân tâm",
                        Author = "Dale Carnegie",
                        Genre = "Sách tự lực",
                        Year = 1936
                    }
                    ,
                    new Book
                    {
                        Title = "Vị tu sĩ bán chiếc Ferrari",
                        Author = "Robin Sharma",
                        Genre = "Sách tự lực",
                        Year = 1998
                    },
                    new Book
                    {
                        Title = "Nhà giả kim",
                        Author = "Paulo Coelho",
                        Genre = "Tiểu thuyết",
                        Year = 1988
                    },
                    new Book
                    {
                        Title = "Chiến tranh và hòa bình",
                        Author = "Lev Nikolayevich Tolstoy",
                        Genre = "Tiểu thuyết",
                        Year = 1867
                    },
                    new Book
                    {
                        Title = "Những người khốn khổ",
                        Author = "Victor Hugo",
                        Genre = "Tiểu thuyết",
                        Year = 1862
                    },
                    new Book
                    {
                        Title = "Những tấm lòng cao cả",
                        Author = "Edmondo De Amicis",
                        Genre = "Tiểu thuyết",
                        Year = 1886
                    },
                    new Book
                    {
                        Title = "Thép đã tôi thế đấy",
                        Author = "Nikolai Alekseyevich Ostrovsky",
                        Genre = "Tiểu thuyết",
                        Year = 1934
                    }
                    );
                context.SaveChanges();
            }
        }
    }
}
