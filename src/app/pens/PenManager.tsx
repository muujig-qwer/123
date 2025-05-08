"use client";
import { useEffect, useState } from "react";
import { Button, message, Modal, Form } from "antd";
import PenForm from "./PenForm";
import { PenType, PagModel } from "../../../types/pen";
import {
  getPens,
  createPen,
  updatePen,
  deletePen,
} from "../../../services/penService";
import PenTable from "./PenTable";

export default function PenManager() {
  const [pens, setPens] = useState<PenType[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<PagModel>({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingPen, setEditingPen] = useState<PenType | null>(null);

  const fetchPens = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const res = await getPens(page, pageSize);
      setPens(res.data.data);
      setPagination({ ...pagination, total: res.data.count, current: page });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPens(pagination.current, pagination.pageSize);
  }, []);

  const handleTableChange = (pageInfo: any) => {
    fetchPens(pageInfo.current, pageInfo.pageSize);
  };

  const handleDelete = async (id: string) => {
    await deletePen(id);
    fetchPens(pagination.current, pagination.pageSize);
  };

  const handleAdd = () => {
    setEditingPen(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (val: PenType) => {
    setEditingPen(val);
    form.setFieldsValue(val);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (editingPen) {
      await updatePen(editingPen._id!, values);
      message.info("amjilttai hadgalagdla");
    } else {
      await createPen(values);
    }
    setIsModalOpen(false);
    fetchPens(pagination.current, pagination.pageSize);
  };

  return (
    <div className="p-5 bg-white h-full ">
      <div className="flex gap-2">
        <Button
          type="primary"
          onClick={handleAdd}
          className="flex mb-4 bg-blue-600 hover:bg-blue-700"
        >
          ➕ Бүртгэх
        </Button>
        <Button onClick={() => fetchPens(1, 5)}>Дахин ачааллах</Button>
      </div>
      <PenTable
        pens={pens}
        loading={loading}
        pagination={pagination}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onChange={handleTableChange}
      />
      <Modal
        title={editingPen ? "Edit" : "Add"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleOk}
      >
        <PenForm form={form} />
      </Modal>
    </div>
  );
}
