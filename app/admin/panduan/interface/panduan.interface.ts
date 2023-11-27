import { BaseResponsePagination } from "@/service/axios";

interface User {
  id: number;
  username: string;
  email: string;
  avatar: any;
}

interface Panduan {
  id: number;
  link: string;
  title: string;
  description: string;
  gender: string;
  thumbnail: string;
  kategori_panduan: string;
  created_at: string;
  updated_at: string;
  file_create: any;
  file_update: any;
  created_by: User;
  updated_by: User;
}

export interface PanduanFilter {
  kategori_panduan: string;
  gender: string;
  status: string;
  created_by: string;
}

export interface PanduanResponse {
  data: Panduan;
}

export interface PanduanPaginationResponse extends BaseResponsePagination {
  data: Panduan[];
}

type CommonPanduanPayload = Pick<
  Panduan,
  "link" | "title" | "description" | "gender" | "kategori_panduan"
>;

export interface TambahPanduanPayload extends CommonPanduanPayload {
  file_create: any;
}
export interface UpdatePanduanPayload extends CommonPanduanPayload {
  file_update: any;
}
