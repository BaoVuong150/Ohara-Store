import { Table, Button, Space, Card, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const CategoryManagementPage = () => {
  // Mock data cho danh mục sản phẩm
  const mockCategories = [
    { id: '1', name: 'Điện thoại', slug: 'dien-thoai', isActive: true },
    { id: '2', name: 'Laptop', slug: 'laptop', isActive: true },
    { id: '3', name: 'Phụ kiện', slug: 'phu-kien', isActive: false },
  ];

  const columns = [
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },
    {
      title: 'Đường dẫn (Slug)',
      dataIndex: 'slug',
      key: 'slug',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'success' : 'error'}>
          {isActive ? 'Hoạt động' : 'Tạm dừng'}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined />} style={{ color: '#1677ff' }}>
            Sửa
          </Button>
          <Button type="text" danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#0f172a', margin: 0 }}>
          Quản lý Danh mục
        </h2>
        <Button type="primary" icon={<PlusOutlined />} className="bg-primary hover:bg-primary-hover">
          Thêm danh mục
        </Button>
      </div>

      <Card bordered={false} className="shadow-sm">
        <Table dataSource={mockCategories} columns={columns} rowKey="id" pagination={false} />
      </Card>
    </div>
  );
};

export default CategoryManagementPage;
