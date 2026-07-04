import { Form, Input, Button, Card, App } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from 'shared';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const LoginPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { message } = App.useApp();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // Gọi API đăng nhập trực tiếp sử dụng axios
      const response = await axios.post(
        `${API_URL}/api/auth/login`,
        { email: values.email, password: values.password },
        { withCredentials: true }
      );

      const { accessToken, user } = response.data;
      
      // Lưu vào store dùng chung
      setToken(accessToken);
      setUser(user);

      message.success('Đăng nhập quản trị thành công!');
      navigate('/admin');
    } catch (error: any) {
      const errMsg = error.response?.data?.message || 'Email hoặc mật khẩu không chính xác.';
      message.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f1f5f9'
    }}>
      <Card style={{ width: 400, borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#4f46e5', margin: '0 0 8px 0' }}>
            OHARA CMS
          </h2>
          <span style={{ color: '#64748b', fontSize: '13px' }}>
            Đăng nhập hệ thống quản trị nội dung
          </span>
        </div>

        <Form
          form={form}
          name="admin_login"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />} 
              placeholder="admin@ohara.com" 
              height={40}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.25)' }} />}
              placeholder="••••••••"
              height={40}
            />
          </Form.Item>

          <Form.Item style={{ marginTop: 24 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              block 
              style={{
                height: 40,
                background: 'linear-gradient(to right, #4f46e5, #7c3aed)',
                border: 'none',
                fontWeight: 600,
                borderRadius: 8
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
