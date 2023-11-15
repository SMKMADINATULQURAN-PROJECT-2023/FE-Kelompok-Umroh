import { BaseResponsePagination } from "@/service/axios";

interface User {
  id: number;
  username: string;
  email: string;
  avatar: any;
}

export interface Artikel {
  id: number;
  title: string;
  description: string;
  file_create: any;
  file_update: any;
  slug: string;
  thumbnail: any;
  status: string;
  source: string;
  created_at: string;
  updated_at: string;
  created_by: User;
  updated_by: User;
}

export interface ArtikelResponse {
  data: Artikel;
}

export interface ArtikelPaginationResponse extends BaseResponsePagination {
  data: Artikel[];
}

// export interface BookListFilter extends Partial<Book> {
//   from_year?: string;
//   to_year?: string;
//   page : number ,
//   pageSize : number
// }

export interface TambahArtikelPayload
  extends Pick<Artikel, "title" | "description" | "file_create" | "source"> {}

export interface UpdateArtikelPayload
  extends Pick<Artikel, "title" | "description" | "file_update" | "source"> {}
