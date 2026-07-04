import { Card, Row, Col, Statistic } from 'antd';
import { ShoppingOutlined, FolderOutlined, UserOutlined, LineChartOutlined } from '@ant-design/icons';

const AdminDashboard = () => {
  return (
    <div>
      <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#0f172a', marginBottom: '24px' }}>
        Trang Tổng Quan Quản Trị
      </h2>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Tổng doanh thu"
              value={128500000}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<LineChartOutlined />}
              suffix="đ"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Danh mục sản phẩm"
              value={12}
              valueStyle={{ color: '#4f46e5' }}
              prefix={<FolderOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Tổng sản phẩm"
              value={156}
              valueStyle={{ color: '#10b981' }}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm">
            <Statistic
              title="Khách hàng đăng ký"
              value={1024}
              valueStyle={{ color: '#f59e0b' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
