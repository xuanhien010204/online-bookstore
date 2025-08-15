import React from 'react';
import { Layout, Menu, Button, Dropdown, Avatar } from 'antd';
import { UserOutlined, ShoppingCartOutlined, BookOutlined, HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const { Header, Content, Footer } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Hồ sơ',
      onClick: () => navigate('/profile')
    },
    {
      key: 'orders',
      icon: <ShoppingCartOutlined />,
      label: 'Đơn hàng',
      onClick: () => navigate('/orders')
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      onClick: handleLogout
    },
  ];

  const mainMenuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Trang chủ',
      onClick: () => navigate('/')
    },
    {
      key: 'books',
      icon: <BookOutlined />,
      label: 'Sách',
      onClick: () => navigate('/books')
    },
    {
      key: 'categories',
      icon: <BookOutlined />,
      label: 'Thể loại',
      onClick: () => navigate('/categories')
    }
  ];

  return (
    <Layout className="min-h-screen">
      <Header className="bg-white shadow-md px-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-xl font-bold text-blue-600 mr-8">
            📚 BookStore
          </div>
          <Menu
            mode="horizontal"
            items={mainMenuItems}
            className="border-none flex-1"
            style={{ backgroundColor: 'transparent' }}
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            type="text"
            icon={<ShoppingCartOutlined />}
            onClick={() => navigate('/cart')}
            className="flex items-center"
          >
            Giỏ hàng
          </Button>
          
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <Button type="text" className="flex items-center">
              <Avatar size="small" icon={<UserOutlined />} />
              <span className="ml-2">Tài khoản</span>
            </Button>
          </Dropdown>
        </div>
      </Header>

      <Content className="flex-1">
        <Outlet />
      </Content>

      <Footer className="bg-gray-100 text-center py-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4">
            <div>
              <h3 className="font-semibold mb-2">Về chúng tôi</h3>
              <p className="text-gray-600 text-sm">
                Cửa hàng sách trực tuyến với hàng ngàn đầu sách đa dạng
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Liên hệ</h3>
              <p className="text-gray-600 text-sm">
                Email: contact@bookstore.com<br />
                Phone: (84) 123-456-789
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Theo dõi chúng tôi</h3>
              <p className="text-gray-600 text-sm">
                Facebook | Instagram | Twitter
              </p>
            </div>
          </div>
          <div className="border-t pt-4 text-gray-500 text-sm">
            © 2024 Online Bookstore. All rights reserved.
          </div>
        </div>
      </Footer>
    </Layout>
  );
};

export default MainLayout;