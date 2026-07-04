import { Row, Col, Card, Statistic, Table, Tag } from 'antd';
import { 
  ShoppingOutlined, 
  UserOutlined, 
  FolderOutlined, 
  ArrowUpOutlined 
} from '@ant-design/icons';

export const DashboardPage = () => {
  const latestActivities = [
    {
      key: '1',
      user: 'Nguyễn Văn A',
      action: 'Đăng ký tài khoản mới',
      time: '10 phút trước',
      status: 'success'
    },
    {
      key: '2',
      user: 'Trần Thị B',
      action: 'Thêm sản phẩm "iPhone 15 Pro Max"',
      time: '25 phút trước',
      status: 'processing'
    },
    {
      key: '3',
      user: 'Lê Hoàng C',
      action: 'Cập nhật giá "Bàn phím cơ"',
      time: '1 giờ trước',
      status: 'warning'
    }
  ];

  const columns = [
    {
      title: 'Người thực hiện',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Hoạt động',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'blue';
        if (status === 'success') color = 'green';
        if (status === 'warning') color = 'gold';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      }
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
          Bảng điều khiển
        </h2>
        <span style={{ color: '#64748b', fontSize: '14px' }}>
          Chào mừng bạn đến với trang quản trị cửa hàng Ohara Store.
        </span>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm border border-slate-100">
            <Statistic
              title="Tổng số sản phẩm"
              value={12}
              precision={0}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm border border-slate-100">
            <Statistic
              title="Tổng số danh mục"
              value={4}
              precision={0}
              valueStyle={{ color: '#4f46e5' }}
              prefix={<FolderOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm border border-slate-100">
            <Statistic
              title="Khách hàng đăng ký"
              value={120}
              precision={0}
              valueStyle={{ color: '#cf1322' }}
              prefix={<UserOutlined />}
              suffix={<ArrowUpOutlined style={{ fontSize: '14px' }} />}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Hoạt động quản trị gần đây" bordered={false} className="shadow-sm border border-slate-100">
        <Table dataSource={latestActivities} columns={columns} pagination={false} />
      </Card>
    </div>
  );
};

export default DashboardPage;
