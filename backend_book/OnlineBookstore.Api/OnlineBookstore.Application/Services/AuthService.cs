using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using OnlineBookstore.Domain.DTOs;
using OnlineBookstore.Domain.Entities;
using OnlineBookstore.Domain.Interfaces;

namespace OnlineBookstore.Application.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IJwtService _jwtService;
        private readonly IConfiguration _configuration;

        public AuthService(IUserRepository userRepository, IJwtService jwtService, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _jwtService = jwtService;
            _configuration = configuration;
        }

        public async Task<AuthResponse> RegisterAsync(RegisterRequest request)
        {
            if (await _userRepository.EmailExistsAsync(request.Email))
            {
                return new AuthResponse { Success = false, Message = "Email already exists" };
            }

            var user = new User
            {
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                FirstName = request.FirstName,
                LastName = request.LastName,
                Phone = request.Phone,
                Address = request.Address,
                Role = Role.User,
                Status = AccountStatus.Active,
                CreatedAt = DateTime.UtcNow
            };

            await _userRepository.AddAsync(user);

            var token = _jwtService.GenerateToken(user);

            return new AuthResponse
            {
                Success = true,
                Message = "Registration successful",
                Token = token,
                User = MapToUserDto(user)
            };
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return new AuthResponse { Success = false, Message = "Invalid email or password" };
            }

            if (user.Status != AccountStatus.Active)
            {
                return new AuthResponse { Success = false, Message = "Account is not active" };
            }

            user.UpdatedAt = DateTime.UtcNow;
            user.LastLoginAt = DateTime.UtcNow;
            await _userRepository.UpdateAsync(user);

            var token = _jwtService.GenerateToken(user);

            return new AuthResponse
            {
                Success = true,
                Message = "Login successful",
                Token = token,
                User = MapToUserDto(user)
            };
        }

        public async Task<AuthResponse> GoogleLoginAsync(GoogleLoginRequest request)
        {
            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(
                    request.IdToken,
                    new GoogleJsonWebSignature.ValidationSettings()
                    {
                        Audience = new[] { _configuration["Google:ClientId"] }
                    });

                var user = await _userRepository.GetByEmailAsync(payload.Email!);
                if (user == null)
                {
                    user = new User
                    {
                        Email = payload.Email!,
                        FirstName = payload.GivenName ?? string.Empty,
                        LastName = payload.FamilyName ?? string.Empty,
                        AvatarUrl = payload.Picture,
                        Status = AccountStatus.Active,
                        Role = Role.User,
                        CreatedAt = DateTime.UtcNow
                    };
                    await _userRepository.AddAsync(user);
                }
                else if (user.Status != AccountStatus.Active)
                {
                    return new AuthResponse { Success = false, Message = "Account is locked" };
                }

                user.UpdatedAt = DateTime.UtcNow;
                user.LastLoginAt = DateTime.UtcNow;
                await _userRepository.UpdateAsync(user);

                var token = _jwtService.GenerateToken(user);
                return new AuthResponse
                {
                    Success = true,
                    Message = "Google login successful",
                    Token = token,
                    User = MapToUserDto(user)
                };
            }
            catch (InvalidJwtException)
            {
                return new AuthResponse { Success = false, Message = "Invalid Google token" };
            }
            catch (Exception ex)
            {
                return new AuthResponse { Success = false, Message = $"An error occurred: {ex.Message}" };
            }
        }

        public async Task<AuthResponse> UpdateProfileAsync(long userId, UpdateProfileRequest request)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return new AuthResponse { Success = false, Message = "User not found" };

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Phone = request.Phone;
            user.Address = request.Address;
            user.UpdatedAt = DateTime.UtcNow;

            await _userRepository.UpdateAsync(user);

            return new AuthResponse
            {
                Success = true,
                Message = "Update successful",
                User = MapToUserDto(user)
            };
        }

        public async Task<AuthResponse> ChangePasswordAsync(long userId, ChangePasswordRequest request)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return new AuthResponse { Success = false, Message = "User not found" };

            if (!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.PasswordHash))
                return new AuthResponse { Success = false, Message = "Current password is incorrect" };

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            user.UpdatedAt = DateTime.UtcNow;
            await _userRepository.UpdateAsync(user);

            return new AuthResponse { Success = true, Message = "Password changed successfully" };
        }

        public async Task<UserDto?> GetUserProfileAsync(long userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            return user != null ? MapToUserDto(user) : null;
        }

        private static UserDto MapToUserDto(User user)
        {
            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                FullName = user.FullName(),
                Phone = user.Phone,
                Address = user.Address,
                AvatarUrl = user.AvatarUrl,
                Role = user.Role,
                Status = user.Status,
                LastLoginAt = user.UpdatedAt
            };
        }
    }
}