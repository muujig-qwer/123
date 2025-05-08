import axios from "axios";
import { PenType } from "../types/pen";

const API = "http://localhost:3000/pens";

export const getPens = (page: number, limit: number) =>
  axios.get(API, { params: { page, limit } });

export const createPen = (pen: PenType) => axios.post(API, pen);

export const updatePen = (id: string, pen: PenType) =>
  axios.put(`${API}/${id}`, pen);

export const deletePen = (id: string) => axios.delete(`${API}/${id}`);
