import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import BookList from './components/BookList';
import BookForm from './components/BookForm';

const App = () => {
  const [books, setBooks] = useState([]); //State lưu trữ List sách
  const [selectedBook, setSelectedBook] = useState(null); //State lưu trữ sách đang được select để update
  const [searchTerm, setSearchTerm] = useState(''); //State lưu thông tin tìm kiếm
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5; // Số lượng sách trên mỗi trang

  useEffect(() => {
    // Load dữ liệu sách từ API khi component được mount
    fetchBooks();
  }, [currentPage]);

  //Get all sách từ api
  const fetchBooks = async () => {
    try {
      const response = await fetch('https://localhost:7121/api/Book'); 
      const data = await response.json();
      //Lưu data lấy được từ API vào state books
      setBooks(data);
      //Tính tổng số trang
      setTotalPages(Math.ceil(data.length / pageSize));
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  //Hàm lưu sách thêm hoặc update
  const handleSave = async (book) => {
    if (book.id) {
      // Cập nhật sách
      try {
        await fetch(`https://localhost:7121/api/Book/${book.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(book),
        });
        //Hiển thị lại thông tin list sách
        fetchBooks();
      } catch (error) {
        console.error('Error update book:', error);
      }
    } else {
      // Thêm sách mới
      try {
        await fetch('https://localhost:7121/api/Book', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(book),
        });
        //Hiển thị lại thông tin list sách
        fetchBooks();
      } catch (error) {
        console.error('Lỗi khi thêm sách:', error);
      }
    }
    //Reset lại form input
    setSelectedBook(null);
  };

  //Hàm xóa sách
  const handleDelete = async (id) => {
    try {
      await fetch(`https://localhost:7121/api/Book/${id}`, {
        method: 'DELETE',
      });
        //Hiển thị lại thông tin list sách
      fetchBooks();
    } catch (error) {
      console.error('Error delete book:', error);
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
  };

  const clearSelection = () => {
    setSelectedBook(null);
  };

  //Tìm kiếm sách theo tên sách
  const filteredBooks = books.filter((book) => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  //Handle Phân trang
  const paginatedBooks = filteredBooks.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected); //Update current page
  };

  return (
    <div>
      <header className="bg-dark text-white text-center py-4">
        <h1>Quản lý sách</h1>
      </header>
      <main className="container mt-4">
      <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Nhập tên cuốn sách cần tìm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <BookForm onSave={handleSave} selectedBook={selectedBook} clearSelection={clearSelection} />
        <BookList books={paginatedBooks} onDelete={handleDelete} onEdit={handleEdit} />

         {/* Phân trang */}
         <ReactPaginate
          previousLabel={'Trang trước'}
          nextLabel={'Trang sau'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center mt-4'}
          activeClassName={'active'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          disabledClassName={'disabled'}
        />
      </main>
    </div>
  );
};

export default App;
