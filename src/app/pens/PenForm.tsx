import { Form, Input, InputNumber } from "antd";  

interface Props {
  form: any;
}

export default function PenForm({ form }: Props) {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please input the title!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="brand"
        label="Brand"
        rules={[{ required: true, message: "Please input the author!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="publishYear"
        label="Publish Year"
        rules={[{ required: true, message: "Please input the year!" }]}
      >
        <InputNumber />
      </Form.Item>
    </Form>
  );
}
