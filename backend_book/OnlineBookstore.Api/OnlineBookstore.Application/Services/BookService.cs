using OnlineBookstore.Domain.DTOs;
using OnlineBookstore.Domain.Entities;
using OnlineBookstore.Domain.Interfaces;

namespace OnlineBookstore.Application.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;

        public BookService(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<IEnumerable<BookDto>> GetAllBooksAsync()
        {
            var books = await _bookRepository.GetAllAsync();
            return books.Select(b => MapToDto(b));
        }

        public async Task<BookDto?> GetBookByIdAsync(long id)
        {
            var book = await _bookRepository.GetByIdAsync(id);
            return book != null ? MapToDto(book) : null;
        }

        public async Task<BookDto> CreateBookAsync(CreateBookDto createBookDto)
        {
            var book = new Book
            {
                Title = createBookDto.Title,
                Author = createBookDto.Author,
                Price = createBookDto.Price,
                Description = createBookDto.Description,
                Stock = createBookDto.Stock
            };

            var createdBook = await _bookRepository.CreateAsync(book);
            return MapToDto(createdBook);
        }

        public async Task<BookDto?> UpdateBookAsync(long id, UpdateBookDto updateBookDto)
        {
            var book = new Book
            {
                Title = updateBookDto.Title,
                Author = updateBookDto.Author,
                Price = updateBookDto.Price,
                Description = updateBookDto.Description,
                Stock = updateBookDto.Stock
            };

            var updatedBook = await _bookRepository.UpdateAsync(id, book);
            return updatedBook != null ? MapToDto(updatedBook) : null;
        }

        public async Task<bool> DeleteBookAsync(long id)
        {
            return await _bookRepository.DeleteAsync(id);
        }

        private static BookDto MapToDto(Book book)
        {
            return new BookDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author,
                Price = book.Price,
                Description = book.Description,
                Stock = book.Stock
            };
        }
    }
}