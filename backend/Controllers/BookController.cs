using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookContext _context;

        // Constructor
        // Constructor nhận một đối tượng BookContext thông qua dependency injection và gán nó vào biến _context
        public BookController(BookContext context)
        {
            _context = context;
        }

        // GET: api/Books Get All
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _context.Books.ToListAsync();
        }

        // GET: api/Books/{id} Get by Id
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return book;
        }

        // POST: api/Books Create Thêm mới một sách vào DB và lưu thay đổi
        [HttpPost]
        public async Task<ActionResult<Book>> PostBook(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBook), new { id = book.Id }, book);
        }

        // PUT: api/Books/{id} Update phương thức PUT để cập nhật sách theo ID.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            //Kiểm tra xem ID trong URL có khớp với ID của đối tượng Book được truyền vào hay không.
            if (id != book.Id)
            {
                return BadRequest();
            }

            //thiết lập trạng thái của đối tượng book thành Modified, cho biết rằng đối tượng này
            //đã được sửa đổi và cần phải cập nhật các thay đổi này trong
            //cơ sở dữ liệu khi bạn gọi phương thức SaveChanges() của DbContext.
            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            // Kiểm tra xem cuốn sách có tồn tại trước khi lưu không
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Books/{id} Delete Xóa sách khỏi DB
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Kiểm tra sự tồn tại của sách
        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
    }
}
