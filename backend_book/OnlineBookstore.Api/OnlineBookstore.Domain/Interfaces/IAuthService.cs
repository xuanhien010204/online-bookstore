using OnlineBookstore.Domain.DTOs;

namespace OnlineBookstore.Domain.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse> RegisterAsync(RegisterRequest request);
        Task<AuthResponse> LoginAsync(LoginRequest request);
        Task<AuthResponse> GoogleLoginAsync(GoogleLoginRequest request);
        Task<AuthResponse> UpdateProfileAsync(long userId, UpdateProfileRequest request);
        Task<AuthResponse> ChangePasswordAsync(long userId, ChangePasswordRequest request);
        Task<UserDto?> GetUserProfileAsync(long userId);
    }
}
