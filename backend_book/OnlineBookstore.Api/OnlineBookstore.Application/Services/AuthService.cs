using Microsoft.Extensions.Configuration;
using OnlineBookstore.Domain.DTOs;
using OnlineBookstore.Domain.Entities;
using OnlineBookstore.Domain.Interfaces;
using System.Security.Claims;
using Google.Apis.Auth;

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
                return new AuthResponse { Success = false, Message = "Email ?ã t?n t?i" };
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
                Message = "??ng ký thành công",
                Token = token,
                User = MapToUserDto(user)
            };
        }

        public async Task<AuthResponse> LoginAsync(LoginRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return new AuthResponse { Success = false, Message = "Email ho?c m?t kh?u không ?úng" };
            }

            if (user.Status != AccountStatus.Active)
            {
                return new AuthResponse { Success = false, Message = "Tài kho?n không ho?t ??ng" };
            }

            user.UpdatedAt = DateTime.UtcNow;
            user.LastLoginAt = DateTime.UtcNow;
            await _userRepository.UpdateAsync(user);

            var token = _jwtService.GenerateToken(user);

            return new AuthResponse
            {
                Success = true,
                Message = "??ng nh?p thành công",
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
                    return new AuthResponse { Success = false, Message = "Tài kho?n ?ã b? khóa" };
                }

                user.UpdatedAt = DateTime.UtcNow;
                user.LastLoginAt = DateTime.UtcNow;
                await _userRepository.UpdateAsync(user);

                var token = _jwtService.GenerateToken(user);
                return new AuthResponse
                {
                    Success = true,
                    Message = "??ng nh?p Google thành công",
                    Token = token,
                    User = MapToUserDto(user)
                };
            }
            catch (InvalidJwtException)
            {
                return new AuthResponse { Success = false, Message = "Google token không h?p l?" };
            }
            catch (Exception ex)
            {
                return new AuthResponse { Success = false, Message = $"Có l?i x?y ra: {ex.Message}" };
            }
        }

        public async Task<AuthResponse> UpdateProfileAsync(long userId, UpdateProfileRequest request)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return new AuthResponse { Success = false, Message = "Không tìm th?y ng??i dùng" };

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Phone = request.Phone;
            user.Address = request.Address;
            user.UpdatedAt = DateTime.UtcNow;

            await _userRepository.UpdateAsync(user);

            return new AuthResponse
            {
                Success = true,
                Message = "C?p nh?t thành công",
                User = MapToUserDto(user)
            };
        }

        public async Task<AuthResponse> ChangePasswordAsync(long userId, ChangePasswordRequest request)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                return new AuthResponse { Success = false, Message = "Không tìm th?y ng??i dùng" };

            if (!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.PasswordHash))
                return new AuthResponse { Success = false, Message = "M?t kh?u hi?n t?i không ?úng" };

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            user.UpdatedAt = DateTime.UtcNow;
            await _userRepository.UpdateAsync(user);

            return new AuthResponse { Success = true, Message = "??i m?t kh?u thành công" };
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
                FullName = $"{user.FirstName} {user.LastName}",
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
