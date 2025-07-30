using OnlineBookstore.Domain.Entities;

namespace OnlineBookstore.Domain.Interfaces
{
    public interface IBookRepository
    {
        Task<IEnumerable<Book>> GetAllAsync();
        Task<Book?> GetByIdAsync(long id);
        Task<Book> CreateAsync(Book book);
        Task<Book?> UpdateAsync(long id, Book book);
        Task<bool> DeleteAsync(long id);
    }
}