import { useState, useEffect } from 'react';

const BookForm = ({ onSave, selectedBook, clearSelection }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');


  //Cập nhật các trường nhập liệu khi selectedBook thay đổi.
  useEffect(() => {
    if (selectedBook) {
      setTitle(selectedBook.title);
      setAuthor(selectedBook.author);
      setGenre(selectedBook.genre);
      setYear(selectedBook.year);
    } else {
      setTitle('');
      setAuthor('');
      setGenre('');
      setYear('');
    }
  }, [selectedBook]);

  //Hàm xử lý sự kiện khi form được gửi.
  const handleSubmit = (e) => {
    e.preventDefault();

    // sử dụng Optional Chaining trong ES11 để an toàn truy cập thuộc tính id của đối tượng selectedBook,
    // ngay cả khi selectedBook có thể là null hoặc undefined
    const book = { id: selectedBook?.id, title, author, genre, year };
    onSave(book);
  };

  return (
    <div className="container mt-4">
      <h2>{selectedBook ? 'Chỉnh sửa sách' : 'Thêm sách mới'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tên sách</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Tác giả</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Thể loại</label>
          <input
            type="text"
            className="form-control"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Năm</label>
          <input
            type="number"
            className="form-control"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-success me-2">
          {selectedBook ? 'Cập nhật' : 'Thêm'}
        </button>
        
        {/* Toán tử && kiểm tra điều kiện trước dấu && Nếu là true thì biểu thức phía sau được render ngược lại thì không*/}
        {selectedBook && (
          <button type="button" className="btn btn-secondary" onClick={clearSelection}>
            Hủy
          </button>
        )}
      </form>
    </div>
  );
};

export default BookForm;
