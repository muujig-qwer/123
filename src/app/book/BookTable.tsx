import { Table, Button, Space } from "antd";
import { BookType, PagModel } from "../../../types/book";

interface Props {
  books: BookType[];
  loading: boolean;
  pagination: PagModel;
  onEdit: (book: BookType) => void;
  onDelete: (id: string) => void;
  onChange: (pageInfo: any) => void;
}

export default function BookTable({
  books,
  loading,
  pagination,
  onEdit,
  onDelete,
  onChange,
}: Props) {
  return (
    <Table
      bordered
      className="rounded-lg shadow-md"
      dataSource={books}
      columns={[
        {
          title: "📚 Гарчиг",
          dataIndex: "title",
          render: (text: string) => <strong>{text || "xoxo"}</strong>,
        },
        { title: "✍️ Зохиогч", dataIndex: "author" },
        { title: "📅 Он", dataIndex: "publishYear" },
        {
          title: "⚙️ Үйлдэл",
          render: (record: BookType) => (
            <Space>
              <Button type="link" onClick={() => onEdit(record)}>
                Засварлах
              </Button>
              <Button danger type="link" onClick={() => onDelete(record._id!)}>
                Устгах
              </Button>
            </Space>
          ),
        },
      ]}
      rowKey="_id"
      loading={loading}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
      }}
      onChange={onChange}
    />
  );
}
