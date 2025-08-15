import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Button, Card, Carousel, Input, message } from 'antd';
import { SearchOutlined, BookOutlined, TruckOutlined, SafetyCertificateOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import BookCard from '../../components/BookCard';
import { Book } from '../../types/Book';
import bookApi from '../../api/Book/bookApi';

const { Title, Paragraph } = Typography;
const { Search } = Input;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [newBooks, setNewBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await bookApi.getBooks();
      setFeaturedBooks(data.slice(0, 8)); // Get first 8 as featured
      setNewBooks(data.slice(-6)); // Get last 6 as new books
    } catch (error) {
      message.error("Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    if (value.trim()) {
      navigate(`/books?search=${encodeURIComponent(value)}`);
    }
  };

  const handleAddToCart = (book: Book) => {
    message.success(`Đã thêm "${book.title}" vào giỏ hàng`);
  };

  const carouselImages = [
    {
      title: "Khám phá thế giới sách",
      subtitle: "Hàng ngàn đầu sách chất lượng đang chờ bạn",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      action: () => navigate('/books')
    },
    {
      title: "Ưu đãi đặc biệt",
      subtitle: "Giảm giá lên đến 50% cho các đầu sách best-seller",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      action: () => navigate('/books')
    },
    {
      title: "Giao hàng miễn phí",
      subtitle: "Miễn phí giao hàng cho đơn hàng từ 200.000đ",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      action: () => navigate('/books')
    }
  ];

  const features = [
    {
      icon: <BookOutlined className="text-3xl text-blue-600" />,
      title: "Sách chất lượng",
      description: "Hàng ngàn đầu sách từ các nhà xuất bản uy tín"
    },
    {
      icon: <TruckOutlined className="text-3xl text-green-600" />,
      title: "Giao hàng nhanh",
      description: "Giao hàng nhanh chóng trong 24-48h"
    },
    {
      icon: <SafetyCertificateOutlined className="text-3xl text-orange-600" />,
      title: "Bảo hành chất lượng",
      description: "Cam kết sách chính hãng, hoàn tiền nếu không hài lòng"
    },
    {
      icon: <CustomerServiceOutlined className="text-3xl text-purple-600" />,
      title: "Hỗ trợ 24/7",
      description: "Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative">
        <Carousel autoplay effect="fade" className="h-96">
          {carouselImages.map((slide, index) => (
            <div key={index}>
              <div 
                className="h-96 flex items-center justify-center text-white"
                style={{ background: slide.background }}
              >
                <div className="text-center max-w-4xl mx-auto px-6">
                  <Title level={1} className="text-white mb-4 text-4xl md:text-5xl">
                    {slide.title}
                  </Title>
                  <Paragraph className="text-white text-lg md:text-xl mb-8 opacity-90">
                    {slide.subtitle}
                  </Paragraph>
                  <Button 
                    type="primary" 
                    size="large" 
                    className="bg-white text-gray-800 border-none hover:bg-gray-100"
                    onClick={slide.action}
                  >
                    Khám phá ngay
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        {/* Search Bar Overlay */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2">
          <div className="max-w-2xl mx-auto px-6">
            <Card className="shadow-lg">
              <Search
                placeholder="Tìm kiếm sách, tác giả..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={handleSearch}
                className="w-full"
              />
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <Title level={2} className="text-center mb-12">
            Tại sao chọn chúng tôi?
          </Title>
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col key={index} xs={24} sm={12} lg={6}>
                <Card className="text-center h-full hover:shadow-lg transition-shadow">
                  <div className="mb-4">{feature.icon}</div>
                  <Title level={4} className="mb-3">{feature.title}</Title>
                  <Paragraph className="text-gray-600">
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <Title level={2} className="mb-0">Sách nổi bật</Title>
            <Button type="primary" onClick={() => navigate('/books')}>
              Xem tất cả
            </Button>
          </div>
          
          <Row gutter={[16, 16]}>
            {featuredBooks.map((book) => (
              <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
                <BookCard book={book} onAddToCart={handleAddToCart} />
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* New Books Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <Title level={2} className="mb-0">Sách mới nhất</Title>
            <Button type="primary" onClick={() => navigate('/books')}>
              Xem tất cả
            </Button>
          </div>
          
          <Row gutter={[16, 16]}>
            {newBooks.map((book) => (
              <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
                <BookCard book={book} onAddToCart={handleAddToCart} />
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <Title level={2} className="text-white mb-4">
            Đăng ký nhận tin tức
          </Title>
          <Paragraph className="text-blue-100 text-lg mb-8">
            Nhận thông tin về sách mới, ưu đãi đặc biệt và các sự kiện thú vị
          </Paragraph>
          <div className="max-w-md mx-auto">
            <Search
              placeholder="Nhập email của bạn"
              enterButton="Đăng ký"
              size="large"
              onSearch={(value) => {
                if (value) {
                  message.success('Đăng ký thành công!');
                }
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;