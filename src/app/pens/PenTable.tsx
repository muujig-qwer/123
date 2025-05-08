import { Table, Button, Space } from "antd";
import { PenType, PagModel } from "../../../types/pen";

interface Props {
  pens: PenType[];
  loading: boolean;
  pagination: PagModel;
  onEdit: (pen: PenType) => void;
  onDelete: (id: string) => void;
  onChange: (pageInfo: any) => void;
}

export default function PenTable({
  pens,
  loading,
  pagination,
  onEdit,
  onDelete,
  onChange,
}: Props) {
  return (
    <Table
      dataSource={pens}
      columns={[
        {
          title: "Topic",
          render: (item: any) => <p>{item?.title ? item.title : "xoxo" }</p>,
        },
        { title: "brand", dataIndex: "brand" },
        { title: "Year", dataIndex: "publishYear" },
        {
          title: "Action",
          render: (record: PenType) => (
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