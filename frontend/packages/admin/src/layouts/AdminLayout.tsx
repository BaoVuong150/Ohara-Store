import { Layout, Menu, Space, Avatar, Button, Dropdown } from 'antd';
import { 
  DashboardOutlined, 
  FolderOutlined, 
  ShoppingOutlined, 
  UserOutlined, 
  LogoutOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from 'shared';

const { Header, Sider, Content } = Layout;

export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    // Gọi API logout hoặc reset local state
    logout();
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'storefront',
      icon: <ShoppingOutlined />,
      label: 'Quay lại Cửa hàng',
      onClick: () => window.location.href = 'http://localhost:5173',
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
  ];

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: 'Bảng điều khiển',
      onClick: () => navigate('/admin'),
    },
    {
      key: '/admin/categories',
      icon: <FolderOutlined />,
      label: 'Quản lý Danh mục',
      onClick: () => navigate('/admin/categories'),
    },
    {
      key: '/admin/products',
      icon: <ShoppingOutlined />,
      label: 'Quản lý Sản phẩm',
      onClick: () => navigate('/admin/products'),
    },
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: 'Quản lý Tài khoản',
      onClick: () => navigate('/admin/users'),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light" className="border-r border-slate-200">
        <div className="h-[72px] flex items-center justify-center border-b border-slate-200 gap-2 px-4">
          <span className="text-[20px] font-black bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent uppercase tracking-[0.5px]">
            OHARA
          </span>
          {!collapsed && (
            <span className="text-[9px] font-bold bg-slate-900 text-white px-1.5 py-0.5 rounded-[4px]">
              CMS
            </span>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ borderRight: 0, paddingTop: '16px' }}
        />
      </Sider>
      
      <Layout>
        <Header className="bg-white border-b border-slate-200 p-0 flex items-center justify-between h-[72px] px-6">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: '16px', width: 64, height: 64 }}
          />

          <Space size="large">
            <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
              <Space className="cursor-pointer hover:opacity-80 transition-opacity" size="middle">
                <Avatar 
                  icon={<UserOutlined />} 
                  src={user?.avatarUrl} 
                  style={{ backgroundColor: '#4f46e5' }} 
                />
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2' }}>
                  <span style={{ color: '#0f172a', fontWeight: 600 }}>
                    {user ? `${user.firstName} ${user.lastName}` : 'Quản trị viên'}
                  </span>
                  <span style={{ color: '#64748b', fontSize: '11px', fontWeight: 500 }}>
                    Admin Portal
                  </span>
                </div>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: 280, background: '#fff', borderRadius: 8 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
