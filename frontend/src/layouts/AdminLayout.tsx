import { useState } from 'react';
import { Layout, Menu, Button, Space, Avatar, Dropdown, Badge, Breadcrumb } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  FolderOutlined,
  ShoppingOutlined,
  FileTextOutlined,
  UserOutlined,
  LogoutOutlined,
  ShopOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../features/auth/store/useAuthStore';
import { useLogout } from '../features/auth/hooks/useLogout';

const { Header, Sider, Content } = Layout;

export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const { handleLogout } = useLogout();

  // Lấy menu key hiện tại đang hoạt động dựa trên đường dẫn url
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path.startsWith('/admin/categories')) return 'categories';
    if (path.startsWith('/admin/products')) return 'products';
    if (path.startsWith('/admin/orders')) return 'orders';
    if (path.startsWith('/admin/users')) return 'users';
    return 'dashboard';
  };

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Tổng quan',
      onClick: () => navigate('/admin'),
    },
    {
      key: 'categories',
      icon: <FolderOutlined />,
      label: 'Quản lý Danh mục',
      onClick: () => navigate('/admin/categories'),
    },
    {
      key: 'products',
      icon: <ShoppingOutlined />,
      label: 'Quản lý Sản phẩm',
      onClick: () => navigate('/admin/products'),
    },
    {
      key: 'orders',
      icon: <FileTextOutlined />,
      label: 'Quản lý Đơn hàng',
      onClick: () => navigate('/admin/orders'),
    },
    {
      key: 'users',
      icon: <UserOutlined />,
      label: 'Quản lý Người dùng',
      onClick: () => navigate('/admin/users'),
    },
  ];

  const profileMenuItems = {
    items: [
      {
        key: 'shop',
        icon: <ShopOutlined />,
        label: 'Về trang chủ shop',
        onClick: () => navigate('/'),
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: 'Đăng xuất',
        danger: true,
        onClick: handleLogout,
      },
    ],
  };

  // Tự động sinh thanh Breadcrumbs
  const getBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter((x) => x);
    return (
      <Breadcrumb style={{ margin: '0' }}>
        <Breadcrumb.Item>
          <Link to="/admin">CMS Admin</Link>
        </Breadcrumb.Item>
        {paths.slice(1).map((path, idx) => {
          const url = `/admin/${paths.slice(1, idx + 2).join('/')}`;
          const label =
            path === 'categories'
              ? 'Quản lý Danh mục'
              : path === 'products'
              ? 'Quản lý Sản phẩm'
              : path === 'orders'
              ? 'Quản lý Đơn hàng'
              : path === 'users'
              ? 'Quản lý Người dùng'
              : path.charAt(0).toUpperCase() + path.slice(1);
          return (
            <Breadcrumb.Item key={url}>
              <Link to={url}>{label}</Link>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Thanh Sidebar bên trái */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="dark"
        className="fixed top-0 left-0 bottom-0 z-[101] shadow-lg border-r border-slate-800"
        width={240}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        {/* Logo tiêu đề */}
        <div className="h-[72px] flex items-center justify-center border-b border-slate-800 px-4">
          <span className="text-[18px] font-extrabold text-white tracking-[0.5px] whitespace-nowrap">
            {collapsed ? 'OH' : 'OHARA ADMIN'}
          </span>
        </div>

        {/* Danh sách Menu */}
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          className="mt-4"
        />
      </Sider>

      {/* Vùng Layout bên phải */}
      <Layout style={{ marginLeft: collapsed ? 80 : 240, transition: 'margin-left 0.2s' }}>
        {/* Thanh Header công cụ phía trên */}
        <Header
          className="sticky top-0 z-[100] w-full flex items-center justify-between bg-white/75 backdrop-blur-md border-b border-slate-900/8 px-6 h-[72px]"
          style={{ padding: '0 24px' }}
        >
          {/* Nút thu phóng Sidebar & Breadcrumbs */}
          <Space size="middle">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 40, height: 40 }}
            />
            {getBreadcrumbs()}
          </Space>

          {/* Công cụ bên phải (Thông báo & Avatar) */}
          <Space size="large">
            {/* Badge thông báo */}
            <Badge count={3} size="small" color="red">
              <Button
                type="text"
                icon={<BellOutlined style={{ fontSize: '20px', color: '#0f172a' }} />}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              />
            </Badge>

            {/* Menu cá nhân */}
            <Dropdown menu={profileMenuItems} placement="bottomRight" trigger={['click']}>
              <Space className="cursor-pointer hover:opacity-80 transition-opacity" size="small">
                <Avatar icon={<UserOutlined />} src={user?.avatarUrl} style={{ backgroundColor: '#4f46e5' }} />
                <div className="flex flex-col text-left leading-tight hidden md:flex">
                  <span className="text-[14px] font-semibold text-slate-900">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="text-[12px] text-slate-400">Quản trị viên</span>
                </div>
              </Space>
            </Dropdown>
          </Space>
        </Header>

        {/* Nội dung trang CMS con */}
        <Content style={{ padding: '24px', minHeight: 280, background: '#f8fafc' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
