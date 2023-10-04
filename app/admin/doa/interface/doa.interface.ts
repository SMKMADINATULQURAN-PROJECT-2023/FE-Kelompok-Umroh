import { BaseResponsePagination } from "@/service/axios";

interface Doa {
  id: number;
  name: string;
  arab: string;
  latin: string;
  arti: string;
  slug: string;
  created_at: string;
  updated_at: string;
  kategori_id:
    | {
        kategori_name: string;
      }
    | number
    | string;
}

interface KategoriDoa {
  id: number;
  kategori_name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  doa_id: Doa[];
}

export interface DoaListResponse {
  data: Doa[];
}
export interface DoaListPaginationResponse extends BaseResponsePagination {
  data: Doa[];
}
export interface KategoriDoaPaginationResponse extends BaseResponsePagination {
  data: KategoriDoa[];
}

// export interface BookListFilter extends Partial<Book> {
//   from_year?: string;
//   to_year?: string;
//   page : number
//   pageSize : number
// }

export interface TambahDoaPayload
  extends Pick<Doa, "name" | "arab" | "latin" | "arti" | "kategori_id"> {}

export interface TambahKategoriDoaPayload
  extends Pick<KategoriDoa, "kategori_name"> {}
