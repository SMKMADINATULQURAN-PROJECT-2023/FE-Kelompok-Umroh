import { BaseResponsePagination } from "@/service/axios";

export interface Catatan {
  id: number;
  tanggal: string;
  kategori: number;
  keterangan: string;
  poin: number;
  kelas: string;
  created_by: {
    id: number;
    nama: string;
  };
  updated_by: {
    id: number;
    nama: string;
  };
  siswa: {
    id: number;
    nama_siswa: string;
  };
}

export interface GetlistResponse extends BaseResponsePagination {
  data: Catatan[];
}
