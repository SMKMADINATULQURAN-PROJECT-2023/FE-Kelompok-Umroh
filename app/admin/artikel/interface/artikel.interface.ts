import { BaseResponsePagination } from "@/service/axios";

interface Artikel {
  id: number;
  title: string;
  description: string;
  file_create: any;
  file_update: any;
  slug: string;
  thumbnail: any;
  created_at: string;
  updated_at: string;
  created_by: {
    id: number;
    username: string;
    email: string;
    avatar: any;
  };
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
  extends Pick<Artikel, "title" | "description" | "file_create"> {}

export interface UpdateArtikelPayload
  extends Pick<Artikel, "title" | "description" | "file_update"> {}
