import { BaseResponsePagination } from "@/service/axios";

interface User {
  id: number;
  username: string;
  email: string;
  avatar: any;
}

interface Panduan {
  id: number;
  url: string;
  title: string;
  description: string;
  gender: string;
  kategori_panduan: string;
  created_at: string;
  updated_at: string;
  file_create: any;
  file_update: any;
  created_by: User;
  updated_by: User;
}

export interface PanduanResponse {
  data: Panduan;
}

export interface PanduanPaginationResponse extends BaseResponsePagination {
  data: Panduan[];
}

type CommonPanduanPayload = Pick<Panduan, "url" | "title" | "description" | "gender" | "kategori_panduan">;

export interface TambahPanduanPayload extends CommonPanduanPayload {
  file_create: any;
}
export interface UpdatePanduanPayload extends CommonPanduanPayload {
  file_update: any;
}
