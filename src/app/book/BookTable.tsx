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
      dataSource={books}
      columns={[
        {
          title: "Topic",
          render: (item: any) => <p>{item.title || "xoxo"}</p>,
        },
        { title: "Author", dataIndex: "author" },
        { title: "Year", dataIndex: "publishYear" },
        {
          title: "Action",
          render: (record: BookType) => (
            <Space>
              <Button onClick={() => onEdit(record)}>Засварлах</Button>
              <Button danger onClick={() => onDelete(record._id!)}>Устгах</Button>
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
