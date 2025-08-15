import React from 'react';
import { Card, Button, Tag, Rate } from 'antd';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';

const { Meta } = Card;

interface BookCardProps {
  book: Book;
  onAddToCart?: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToCart }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/books/${book.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart?.(book);
  };

  // Get the first image or use a default placeholder
  const bookImage = book.images && book.images.length > 0 
    ? book.images[0].imageUrl 
    : '/placeholder-book.jpg';

  // Calculate average rating
  const averageRating = book.reviews && book.reviews.length > 0
    ? book.reviews.reduce((sum, review) => sum + review.rating, 0) / book.reviews.length
    : 0;

  return (
    <Card
      hoverable
      className="h-full shadow-sm hover:shadow-lg transition-shadow duration-300"
      cover={
        <div className="relative h-48 overflow-hidden">
          <img
            alt={book.title}
            src={bookImage}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/300x400/f0f0f0/666666?text=No+Image';
            }}
          />
          {book.stock === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Tag color="red" className="text-sm">Hết hàng</Tag>
            </div>
          )}
        </div>
      }
      actions={[
        <Button
          key="view"
          type="text"
          icon={<EyeOutlined />}
          onClick={handleViewDetails}
        >
          Xem chi tiết
        </Button>,
        <Button
          key="cart"
          type="text"
          icon={<ShoppingCartOutlined />}
          onClick={handleAddToCart}
          disabled={book.stock === 0}
        >
          Thêm vào giỏ
        </Button>,
      ]}
    >
      <Meta
        title={
          <div className="space-y-1">
            <h3 className="text-lg font-semibold line-clamp-2 hover:text-blue-600 cursor-pointer"
                onClick={handleViewDetails}>
              {book.title}
            </h3>
            <p className="text-gray-600 text-sm">by {book.author}</p>
          </div>
        }
        description={
          <div className="space-y-2">
            {book.description && (
              <p className="text-gray-500 text-sm line-clamp-2">
                {book.description}
              </p>
            )}
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Rate disabled value={averageRating} size="small" />
                <span className="text-xs text-gray-500">
                  ({book.reviews?.length || 0})
                </span>
              </div>
              <span className="text-xs text-gray-500">
                Còn {book.stock} cuốn
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-red-600">
                  {book.price.toLocaleString('vi-VN')} đ
                </span>
              </div>
              
              {book.bookCategories && book.bookCategories.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {book.bookCategories.slice(0, 2).map((bc, index) => (
                    <Tag key={index} size="small" color="blue">
                      {bc.category?.name}
                    </Tag>
                  ))}
                  {book.bookCategories.length > 2 && (
                    <Tag size="small">+{book.bookCategories.length - 2}</Tag>
                  )}
                </div>
              )}
            </div>
          </div>
        }
      />
    </Card>
  );
};

export default BookCard;