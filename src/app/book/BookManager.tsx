"use client";
import { useEffect, useState } from "react";
import { Button, Modal, Input, InputNumber, ConfigProvider, Form } from "antd";
import BookForm from "./BookForm";
import BookTable from "./BookTable";
import { BookType, PagModel } from "../../../types/book";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../../../services/bookService";

export default function BookManager() {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PagModel>({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingBook, setEditingBook] = useState<BookType | null>(null);

  const fetchBooks = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const res = await getBooks(page, pageSize);
      setBooks(res.data.data);
      setPagination({ ...pagination, total: res.data.count, current: page });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pageInfo: any) => {
    fetchBooks(pageInfo.current, pageInfo.pageSize);
  };

  const handleDelete = async (id: string) => {
    await deleteBook(id);
    fetchBooks(pagination.current, pagination.pageSize);
  };

  const handleAdd = () => {
    setEditingBook(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (val: BookType) => {
    setEditingBook(val);
    form.setFieldsValue(val);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (editingBook) {
      await updateBook(editingBook._id!, values);
    } else {
      await createBook(values);
    }
    setIsModalOpen(false);
    fetchBooks(pagination.current, pagination.pageSize);
  };

  return (
    <div className="p-5">
      <div className="flex gap-2">
        <Button
          type="primary"
          onClick={handleAdd}
          className="flex mb-4 bg-blue-600 hover:bg-blue-700"
        >
          ➕ Бүртгэх
        </Button>
        <Button onClick={() => fetchBooks(1, 5)}>Дахин ачааллах</Button>
      </div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#3b82f6", // Tailwind blue-500
            borderRadius: 12,
          },
        }}
      >
        <BookTable
          books={books}
          loading={loading}
          pagination={pagination}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onChange={handleTableChange}
        />
      </ConfigProvider>

      <Modal
        title={editingBook ? "📘 Засварлах" : "📗 Шинэ ном нэмэх"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleOk}
        okText={editingBook ? "Хадгалах" : "Нэмэх"}
        cancelText="Цуцлах"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Гарчиг" rules={[{ required: true }]}>
            <Input placeholder="Номын гарчиг" />
          </Form.Item>
          <Form.Item name="author" label="Зохиогч" rules={[{ required: true }]}>
            <Input placeholder="Зохиогчийн нэр" />
          </Form.Item>
          <Form.Item name="publishYear" label="Он" rules={[{ required: true }]}>
            <InputNumber className="w-full" placeholder="2024" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
