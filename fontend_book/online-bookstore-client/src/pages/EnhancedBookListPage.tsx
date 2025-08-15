import React, { useEffect, useState } from "react";
import { 
  Table, 
  Popconfirm, 
  message, 
  Typography, 
  Row, 
  Col, 
  Button, 
  Input,
  Select,
  Card,
  Switch,
  Space
} from "antd";
import { ColumnsType } from "antd/es/table";
import { 
  AppstoreOutlined, 
  UnorderedListOutlined, 
  SearchOutlined,
  PlusOutlined
} from '@ant-design/icons';
import bookApi from "../api/Book/bookApi";
import { Book } from "../types/Book";
import BookCard from "../components/BookCard";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

type ViewMode = 'grid' | 'table';

function BookListPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState<string>('title');

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    filterAndSortBooks();
  }, [books, searchText, sortBy]);

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const data = await bookApi.getBooks();
      setBooks(data);
    } catch (error) {
      message.error("Failed to fetch books.");
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortBooks = () => {
    let filtered = books.filter(book => 
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase())
    );

    // Sort books
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'stock':
          return b.stock - a.stock;
        default:
          return 0;
      }
    });

    setFilteredBooks(filtered);
  };

  const handleDelete = async (id: number) => {
    try {
      await bookApi.deleteBook(id);
      setBooks(prev => prev.filter(book => book.id !== id));
      message.success("Book deleted successfully");
    } catch (error) {
      message.error("Failed to delete book");
    }
  };

  const handleAddToCart = (book: Book) => {
    // Add to cart logic here
    message.success(`Đã thêm "${book.title}" vào giỏ hàng`);
  };

  const columns: ColumnsType<Book> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string, record: Book) => (
        <a 
          href={`#/books/${record.id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          {title}
        </a>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => (
        <span className="font-semibold text-red-600">
          {price.toLocaleString('vi-VN')} đ
        </span>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (stock: number) => (
        <span className={stock > 0 ? 'text-green-600' : 'text-red-600'}>
          {stock}
        </span>
      ),
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            size="small"
            onClick={() => window.location.href = `#/books/${record.id}`}
          >
            View
          </Button>
          <Popconfirm
            title="Are you sure to delete this book?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <Title level={2} className="mb-0">Danh sách sách</Title>
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm sách mới
          </Button>
        </div>

        {/* Filters and Controls */}
        <Card className="mb-4">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Search
                placeholder="Tìm kiếm sách, tác giả..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Col>
            
            <Col xs={24} sm={12} md={6}>
              <Select
                placeholder="Sắp xếp theo"
                size="large"
                value={sortBy}
                onChange={setSortBy}
                className="w-full"
              >
                <Option value="title">Tên sách</Option>
                <Option value="author">Tác giả</Option>
                <Option value="price-asc">Giá tăng dần</Option>
                <Option value="price-desc">Giá giảm dần</Option>
                <Option value="stock">Tồn kho</Option>
              </Select>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <div className="flex items-center justify-center gap-2">
                <UnorderedListOutlined className={viewMode === 'table' ? 'text-blue-600' : 'text-gray-400'} />
                <Switch
                  checked={viewMode === 'grid'}
                  onChange={(checked) => setViewMode(checked ? 'grid' : 'table')}
                  size="default"
                />
                <AppstoreOutlined className={viewMode === 'grid' ? 'text-blue-600' : 'text-gray-400'} />
              </div>
            </Col>

            <Col xs={24} sm={12} md={4}>
              <div className="text-center">
                <span className="text-gray-600">
                  {filteredBooks.length} / {books.length} sách
                </span>
              </div>
            </Col>
          </Row>
        </Card>
      </div>

      {/* Content */}
      {viewMode === 'grid' ? (
        /* Grid View */
        <Row gutter={[16, 16]}>
          {filteredBooks.map((book) => (
            <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
              <BookCard book={book} onAddToCart={handleAddToCart} />
            </Col>
          ))}
        </Row>
      ) : (
        /* Table View */
        <Card>
          <Table
            dataSource={filteredBooks}
            columns={columns}
            rowKey="id"
            loading={loading}
            bordered
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} books`,
            }}
          />
        </Card>
      )}

      {filteredBooks.length === 0 && !loading && (
        <Card className="text-center py-12">
          <div className="text-gray-500">
            <p className="text-lg mb-2">Không tìm thấy sách nào</p>
            <p>Hãy thử thay đổi từ khóa tìm kiếm</p>
          </div>
        </Card>
      )}
    </div>
  );
}

export default BookListPage;