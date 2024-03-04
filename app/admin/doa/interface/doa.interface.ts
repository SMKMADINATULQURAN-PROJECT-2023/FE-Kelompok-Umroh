import { BaseResponsePagination } from "@/service/axios";

interface Kategori {
  id: number;
  kategori_name: string;
}

export interface Doa {
  id: number;
  name: string;
  arab: string;
  latin: string;
  arti: string;
  slug: string;
  created_at: string;
  updated_at: string;
  created_by: {
    id: number;
    username: string;
    email: string;
    avatar: any;
  };
  updated_by: {
    id: number;
    username: string;
    email: string;
    avatar: any;
  };
  kategori_id: Kategori | number | string;
}

interface KategoriDoa {
  id: number;
  kategori_name: string;
  slug: string;
  thumbnail: any;
  file_create: any;
  file_update: any;
  doa_id: Doa[];
  created_at: string;
  updated_at: string;
}

export interface DoaResponse {
  data: Doa;
}

export interface DoaFilter {
  status: string;
  created_by: string;
  keyword: string;
}

export interface KategoriFilter {
  status: string;
  created_by: string;
  keyword: string;
}

export interface KategoriDoaResponse {
  data: KategoriDoa;
}
export interface DoaListPaginationResponse extends BaseResponsePagination {
  data: Doa[];
}
export interface KategoriDoaPaginationResponse extends BaseResponsePagination {
  data: KategoriDoa[];
}

export interface TambahDoaPayload
  extends Pick<Doa, "name" | "arab" | "latin" | "arti" | "kategori_id"> {}

export interface UpdateDoaPayload
  extends Pick<Doa, "name" | "arab" | "latin" | "arti" | "kategori_id"> {}

export interface TambahKategoriDoaPayload
  extends Pick<KategoriDoa, "kategori_name" | "file_create"> {}

export interface UpdateKategoriDoaPayload
  extends Pick<KategoriDoa, "kategori_name" | "file_update"> {}
