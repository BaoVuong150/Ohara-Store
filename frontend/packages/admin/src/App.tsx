import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, theme, App as AntdApp } from 'antd';
import { useAuthInit } from './hooks/useAuthInit';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AdminLayout } from './layouts/AdminLayout';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';

// Khởi tạo QueryClient cho React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const MainApp = () => {
  const { isInitialized } = useAuthInit();

  if (!isInitialized) {
    return (
      <div
        style={{
          minHeight: '100vh',
          width: '100vw',
          backgroundColor: '#f8fafc',
        }}
      />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Auth Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* 🔒 Protected Admin CMS Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          {/* Sắp tới sẽ thêm các trang Quản lý Danh mục (Categories) và Sản phẩm (Products) vào đây */}
          <Route path="categories" element={<div>Trang Quản lý Danh mục đang phát triển</div>} />
          <Route path="products" element={<div>Trang Quản lý Sản phẩm đang phát triển</div>} />
          <Route path="users" element={<div>Trang Quản lý Người dùng đang phát triển</div>} />
        </Route>

        {/* Điều hướng mặc định */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,
          token: {
            colorPrimary: '#4f46e5',
            borderRadius: 8,
          },
        }}
      >
        <AntdApp>
          <MainApp />
        </AntdApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
}

export default App;
