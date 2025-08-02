# online-bookstore
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/                      ← Gọi API đến backend
│   │   └── axiosInstance.ts      ← Cấu hình axios base URL + interceptor
│   │   └── bookApi.ts
│   │   └── authApi.ts
│   │   └── orderApi.ts
│
│   ├── assets/                   ← Ảnh, icon, logo
│
│   ├── components/               ← Component tái sử dụng được (UI)
│   │   └── Header.tsx
│   │   └── Footer.tsx
│   │   └── BookCard.tsx
│   │   └── Pagination.tsx
│   │   └── Modal.tsx
│
│   ├── hooks/                    ← Custom React hooks
│   │   └── useAuth.ts
│   │   └── useDebounce.ts
│
│   ├── layouts/                  ← Các layout tổng quát
│   │   └── MainLayout.tsx        ← Cho người dùng
│   │   └── AdminLayout.tsx       ← Cho admin
│
│   ├── pages/                    ← Các trang chính
│   │   ├── Home/
│   │   │   └── HomePage.tsx
│   │   ├── Category/
│   │   │   └── CategoryPage.tsx
│   │   ├── BookDetail/
│   │   │   └── BookDetailPage.tsx
│   │   ├── Cart/
│   │   │   └── CartPage.tsx
│   │   ├── Checkout/
│   │   │   └── CheckoutPage.tsx
│   │   ├── Account/
│   │   │   └── AccountPage.tsx
│   │   ├── Contact/
│   │   │   └── ContactPage.tsx
│   │   ├── Admin/
│   │   │   └── Dashboard.tsx
│   │   │   └── ManageBooks.tsx
│   │   │   └── ManageOrders.tsx
│   │   │   └── ManageUsers.tsx
│   │   └── NotFound.tsx
│
│   ├── routes/                   ← Cấu hình routes + bảo vệ route
│   │   └── index.tsx
│   │   └── ProtectedRoute.tsx
│   │   └── AdminRoute.tsx
│
│   ├── store/                    ← Global state (Redux hoặc Context)
│   │   └── index.ts
│   │   └── cartSlice.ts
│   │   └── authSlice.ts
│
│   ├── types/                    ← Kiểu dữ liệu chung cho toàn app
│   │   └── book.ts
│   │   └── user.ts
│   │   └── order.ts
│
│   ├── utils/                    ← Hàm tiện ích
│   │   └── formatCurrency.ts
│   │   └── validateForm.ts
│
│   ├── App.tsx                   ← App component chính
│   ├── main.tsx                  ← File khởi tạo app (entry)
│   └── index.css                 ← Import Tailwind + global style
#

#backend
# Online Bookstore Project Summary

## Project Overview
An online bookstore API built with .NET 9, implementing a clean architecture pattern with distinct layers for Domain, Application, Infrastructure, and API.

## Architecture Layers
1. **Domain Layer** (OnlineBookstore.Domain)
   - Contains entities, interfaces, and DTOs
   - Core business logic and rules
   
2. **Application Layer** (OnlineBookstore.Application)
   - Implementation of business logic
   - Services: AuthService, BookService, JwtService
   
3. **Infrastructure Layer** (OnlineBookstore.Infrastructure)
   - Data access and external services
   - Repositories: BookRepository, UserRepository
   - Database context and configurations
   
4. **API Layer** (OnlineBookstore.Api)
   - REST API endpoints
   - Controllers for Books and Authentication
   - Swagger documentation
   - CORS configuration

## Database Model

### Core Entities
1. **Book**
   - Basic properties: Id, Title, Author, Price, Description, Stock
   - Relationships:
     * Many-to-Many with Categories
     * One-to-Many with BookImages
     * One-to-Many with OrderDetails
     * One-to-Many with Reviews

2. **User**
   - Properties: Id, Email, PasswordHash, FirstName, LastName, etc.
   - Relationships:
     * One-to-Many with Orders
     * One-to-Many with Reviews
   - Includes role-based authorization

3. **Order**
   - Properties: Id, UserId, OrderDate, TotalAmount, Status, ShippingAddress
   - Relationships:
     * Belongs to User
     * One-to-Many with OrderDetails

4. **Category**
   - Properties: Id, Name, Description
   - Many-to-Many relationship with Books through BookCategory

### Supporting Entities
- BookImage: Stores book cover images
- Review: User reviews for books
- OrderDetail: Links orders with books and quantities
- BookCategory: Junction table for Book-Category relationship

## Application Workflow

### Authentication Flow
1. User registration/login through AuthController
2. JWT token generation for authentication
3. Role-based access control

### Book Management Flow
1. CRUD operations for books
2. Category management
3. Image handling for books
4. Stock management

### Order Processing Flow
1. Order creation
2. Order status management
3. Order details tracking

## Technical Features
- PostgreSQL database
- JWT authentication
- RESTful API design
- Swagger documentation
- CORS enabled for frontend integration
- Docker support
- Asynchronous operations
- Repository pattern implementation

## API Endpoints
- `/api/auth` - Authentication endpoints
- `/api/books` - Book management
- Additional endpoints for orders, categories, and user management

## Development Setup
- Development server: http://localhost:8080
- Frontend allowed origin: http://localhost:3000
- Swagger UI available in development mode

## Security Features
- Password hashing
- JWT token authentication
- Role-based authorization
- CORS policy configuration