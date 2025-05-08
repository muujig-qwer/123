import { Form, Input, InputNumber } from "antd";

export default function BookForm({ form }: { form: any }) {
  return (
    <Form form={form} layout="vertical">
      <Form.Item name="title" label="Topic" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="author" label="Author" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="publishYear" label="Year" rules={[{ required: true }]}>
        <InputNumber className="w-full" />
      </Form.Item>
    </Form>
  );
}
