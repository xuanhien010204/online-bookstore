using Microsoft.EntityFrameworkCore;
using OnlineBookstore.Application.Services;
using OnlineBookstore.Domain.Interfaces;
using OnlineBookstore.Infrastructure.Data;
using OnlineBookstore.Infrastructure.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IBookRepository, BookRepository>();
builder.Services.AddScoped<IBookService, BookService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IJwtService, JwtService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Tắt compression cho Swagger để tránh lỗi Content-Length mismatch
    app.UseWhen(context => context.Request.Path.StartsWithSegments("/swagger"), appBuilder =>
    {
        appBuilder.Use((ctx, next) =>
        {
            ctx.Response.Headers.Remove("Content-Encoding");
            return next();
        });
    });
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run("http://0.0.0.0:8080");
