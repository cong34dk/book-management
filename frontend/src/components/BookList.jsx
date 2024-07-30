const BookList = ({ books, onDelete, onEdit }) => {
    const handleDeleteClick = (id) => {
        // Hiển thị cảnh báo xác nhận
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa cuốn sách này không?");
        if (confirmDelete) {
          onDelete(id);
        }
      };

  return (
    <div className="container mt-4">
      <h2>Danh sách</h2>
      {books.length === 0 ? (
        <p>Database không có dữ liệu nào</p>
      ) : (
        <table className="table table-striped">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Thể loại</th>
            <th>Năm</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>{book.year}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => onEdit(book)}>Sửa</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(book.id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default BookList;
