using OnlineBookstore.Domain.DTOs;

namespace OnlineBookstore.Domain.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<BookDto>> GetAllBooksAsync();
        Task<BookDto?> GetBookByIdAsync(long id);
        Task<BookDto> CreateBookAsync(CreateBookDto createBookDto);
        Task<BookDto?> UpdateBookAsync(long id, UpdateBookDto updateBookDto);
        Task<bool> DeleteBookAsync(long id);
    }
}