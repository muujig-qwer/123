"use client";
import { useEffect, useState } from "react";
import { Button, Modal, Form } from "antd";
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
      <Button type="primary" onClick={handleAdd} className="mb-4">
        Бүртгэх
      </Button>
      <BookTable
        books={books}
        loading={loading}
        pagination={pagination}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onChange={handleTableChange}
      />
      <Modal
        title={editingBook ? "Edit" : "Add"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleOk}
      >
        <BookForm form={form} />
      </Modal>
    </div>
  );
}
