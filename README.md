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