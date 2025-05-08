export interface PenType {
    _id?: string;
    brand: string;
    author: string;
    publishYear: number;
  }
  
  export interface PagModel {
    current: number;
    pageSize: number;
    total: number;
  }
  