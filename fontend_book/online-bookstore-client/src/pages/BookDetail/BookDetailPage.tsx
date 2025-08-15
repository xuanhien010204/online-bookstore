import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Row, 
  Col, 
  Button, 
  Typography, 
  Tag, 
  Rate, 
  InputNumber, 
  Divider, 
  Card, 
  Avatar,
  message,
  Spin,
  Breadcrumb
} from 'antd';
import { 
  ShoppingCartOutlined, 
  HeartOutlined, 
  ShareAltOutlined,
  ArrowLeftOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Book } from '../../types/Book';
import bookApi from '../../api/Book/bookApi';

const { Title, Paragraph, Text } = Typography;

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      fetchBookDetail(parseInt(id));
    }
  }, [id]);

  const fetchBookDetail = async (bookId: number) => {
    setLoading(true);
    try {
      const data = await bookApi.getBookById(bookId);
      setBook(data);
    } catch (error) {
      message.error('Không thể tải thông tin sách');
      navigate('/books');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!book) return;
    
    if (quantity > book.stock) {
      message.error('Số lượng không đủ trong kho');
      return;
    }

    // Add to cart logic here
    message.success(`Đã thêm ${quantity} cuốn "${book.title}" vào giỏ hàng`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <Spin size="large" />
      </div>
    );
  }

  if (!book) {
    return <div>Không tìm thấy sách</div>;
  }

  const averageRating = book.reviews && book.reviews.length > 0
    ? book.reviews.reduce((sum, review) => sum + review.rating, 0) / book.reviews.length
    : 0;

  const mainImage = book.images && book.images.length > 0 
    ? book.images[selectedImageIndex]?.imageUrl || book.images[0].imageUrl
    : 'https://via.placeholder.com/400x600/f0f0f0/666666?text=No+Image';

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <Breadcrumb.Item>
          <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate('/books')}>
            Danh sách sách
          </Button>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{book.title}</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[32, 32]}>
        {/* Book Images */}
        <Col xs={24} md={10}>
          <div className="space-y-4">
            <Card className="text-center" bodyStyle={{ padding: '12px' }}>
              <img
                src={mainImage}
                alt={book.title}
                className="w-full max-w-md mx-auto h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x600/f0f0f0/666666?text=No+Image';
                }}
              />
            </Card>
            
            {book.images && book.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {book.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.imageUrl}
                    alt={`${book.title} ${index + 1}`}
                    className={`w-16 h-20 object-cover rounded cursor-pointer border-2 ${
                      selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/64x80/f0f0f0/666666?text=No+Image';
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </Col>

        {/* Book Information */}
        <Col xs={24} md={14}>
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <Title level={1} className="mb-2">{book.title}</Title>
              <Text className="text-lg text-gray-600 mb-4 block">by {book.author}</Text>
              
              <div className="flex items-center gap-4 mb-4">
                <Rate disabled value={averageRating} />
                <Text>({book.reviews?.length || 0} đánh giá)</Text>
                <Divider type="vertical" />
                <Text type="secondary">Đã bán: 120</Text>
              </div>

              {/* Categories */}
              {book.bookCategories && book.bookCategories.length > 0 && (
                <div className="mb-4">
                  <Text strong>Thể loại: </Text>
                  {book.bookCategories.map((bc, index) => (
                    <Tag key={index} color="blue" className="mr-2">
                      {bc.category?.name}
                    </Tag>
                  ))}
                </div>
              )}
            </div>

            {/* Price and Stock */}
            <Card className="bg-gray-50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Text className="text-3xl font-bold text-red-600">
                    {book.price.toLocaleString('vi-VN')} đ
                  </Text>
                  <Text type="secondary">
                    Còn lại: {book.stock} cuốn
                  </Text>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <Text strong>Số lượng:</Text>
                  <InputNumber
                    min={1}
                    max={book.stock}
                    value={quantity}
                    onChange={(value) => setQuantity(value || 1)}
                    className="w-20"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={handleAddToCart}
                    disabled={book.stock === 0}
                    className="flex-1"
                  >
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleBuyNow}
                    disabled={book.stock === 0}
                    className="flex-1"
                  >
                    Mua ngay
                  </Button>
                  <Button
                    size="large"
                    icon={<HeartOutlined />}
                    className="px-4"
                  />
                  <Button
                    size="large"
                    icon={<ShareAltOutlined />}
                    className="px-4"
                  />
                </div>

                {book.stock === 0 && (
                  <Text type="danger" className="block text-center">
                    Sản phẩm hiện đã hết hàng
                  </Text>
                )}
              </div>
            </Card>

            {/* Description */}
            {book.description && (
              <Card title="Mô tả sản phẩm">
                <Paragraph>
                  {book.description}
                </Paragraph>
              </Card>
            )}
          </div>
        </Col>
      </Row>

      {/* Reviews Section */}
      {book.reviews && book.reviews.length > 0 && (
        <Card title={`Đánh giá (${book.reviews.length})`} className="mt-8">
          <div className="space-y-4">
            {book.reviews.slice(0, 5).map((review, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start gap-3">
                  <Avatar icon={<UserOutlined />} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Text strong>{review.user?.firstName} {review.user?.lastName}</Text>
                      <Rate disabled value={review.rating} size="small" />
                    </div>
                    <Text type="secondary" className="text-sm block mb-2">
                      {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                    </Text>
                    <Paragraph className="mb-0">
                      {review.comment}
                    </Paragraph>
                  </div>
                </div>
              </div>
            ))}
            
            {book.reviews.length > 5 && (
              <div className="text-center">
                <Button type="link">Xem thêm đánh giá</Button>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default BookDetailPage;