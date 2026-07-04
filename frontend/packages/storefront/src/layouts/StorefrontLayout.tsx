import { Layout, Input, Badge, Button, Space, Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { ShoppingCartOutlined, SearchOutlined, LoginOutlined, LogoutOutlined, UserOutlined, DashboardOutlined } from '@ant-design/icons';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from 'shared';
import { useLogout } from '../features/auth/hooks/useLogout';

const { Header, Content, Footer } = Layout;

export const StorefrontLayout = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { handleLogout } = useLogout();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      handleLogout();
    } else {
      navigate('/login');
    }
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Thông tin tài khoản',
    },
    // Hiện tại cho phép tất cả các tài khoản truy cập Admin để test, sau này sẽ phân quyền
    {
      key: 'admin',
      icon: <DashboardOutlined />,
      label: 'Quản trị Admin CMS',
      onClick: () => navigate('/admin'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
      danger: true,
      onClick: handleAuthAction,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', background: 'transparent' }}>
      <Header
        className="sticky top-0 z-[100] w-full flex items-center justify-between bg-white/70 backdrop-blur-md border-b border-slate-200 px-6 h-[72px]"
      >
        {/* Logo */}
        <div className="flex items-center cursor-pointer gap-2" onClick={() => navigate('/')}>
          <span className="text-[24px] font-black bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] bg-clip-text text-transparent tracking-[1px] uppercase">
            OHARA
          </span>
          <span className="text-[10px] font-bold bg-slate-900 text-white px-2 py-0.5 rounded-[4px] tracking-[0.5px]">
            STORE
          </span>
        </div>

        {/* Thanh tìm kiếm */}
        <div className="flex-1 max-w-[480px] mx-6">
          <Input
            prefix={<SearchOutlined style={{ color: 'rgba(15, 23, 42, 0.45)' }} />}
            placeholder="Tìm kiếm sản phẩm..."
            variant="filled"
            className="bg-slate-100 hover:bg-slate-200/70 focus:bg-white border-0 text-slate-950 rounded-[20px] h-[40px] transition-all"
          />
        </div>

        {/* User Action Controls */}
        <Space size="large">
          <Badge count={0} size="small" offset={[2, 0]} color="#4f46e5" showZero={false}>
            <Button
              type="text"
              icon={<ShoppingCartOutlined style={{ fontSize: '22px', color: '#0f172a' }} />}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            />
          </Badge>

          {isAuthenticated ? (
            <Dropdown menu={{ items: userMenuItems }} trigger={['click']} placement="bottomRight">
              <Space className="cursor-pointer hover:opacity-80 transition-opacity" size="small">
                <Avatar 
                  icon={<UserOutlined />} 
                  src={user?.avatarUrl} 
                  style={{ backgroundColor: '#4f46e5' }} 
                />
                <span
                  style={{
                    color: '#0f172a',
                    fontWeight: 600,
                    maxWidth: '120px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {user?.firstName || 'Tài khoản'}
                </span>
              </Space>
            </Dropdown>
          ) : (
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={handleAuthAction}
              style={{
                background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                border: 'none',
                borderRadius: '20px',
                height: '40px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)',
              }}
            >
              Đăng nhập
            </Button>
          )}
        </Space>
      </Header>

      <Content style={{ padding: '0 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '32px 0' }}>
          <Outlet />
        </div>
      </Content>

      <Footer
        style={{
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.4)',
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid rgba(15, 23, 42, 0.08)',
          color: 'var(--text-secondary)',
          padding: '24px 0',
          fontSize: '14px',
        }}
      >
        © {new Date().getFullYear()} <strong>OHARA Store</strong>. Cửa hàng thương mại điện tử đa kênh hiện đại.
      </Footer>
    </Layout>
  );
};

