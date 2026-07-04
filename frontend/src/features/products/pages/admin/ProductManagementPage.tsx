import { Table, Button, Space, Card, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ProductManagementPage = () => {
  // Mock data cho sản phẩm
  const mockProducts = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      category: 'Điện thoại',
      price: '28,990,000 đ',
      stock: 45,
      isActive: true,
    },
    {
      id: '2',
      name: 'MacBook Air M2 13"',
      category: 'Laptop',
      price: '26,490,000 đ',
      stock: 12,
      isActive: true,
    },
    {
      id: '3',
      name: 'Củ sạc nhanh Anker 20W',
      category: 'Phụ kiện',
      price: '250,000 đ',
      stock: 0,
      isActive: false,
    },
  ];

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="font-semibold">{text}</span>,
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Giá bán lẻ',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock: number) => {
        if (stock === 0) return <Tag color="error">Hết hàng</Tag>;
        if (stock < 15) return <Tag color="warning">Sắp hết ({stock})</Tag>;
        return <Tag color="success">Còn hàng ({stock})</Tag>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'success' : 'error'}>
          {isActive ? 'Đang bán' : 'Tạm dừng'}
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
          Quản lý Sản phẩm
        </h2>
        <Button type="primary" icon={<PlusOutlined />} className="bg-primary hover:bg-primary-hover">
          Thêm sản phẩm
        </Button>
      </div>

      <Card bordered={false} className="shadow-sm">
        <Table dataSource={mockProducts} columns={columns} rowKey="id" pagination={false} />
      </Card>
    </div>
  );
};

export default ProductManagementPage;
