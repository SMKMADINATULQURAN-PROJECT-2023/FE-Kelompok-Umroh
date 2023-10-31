import { BaseResponsePagination } from "@/service/axios";

interface Role {
  id: number;
  role_name: string;
}

interface CommonUserProperties {
  id: number;
  avatar: any;
  username: string;
  email: string;
  password: string;
  file_create: any;
  created_at: string;
  updated_at: string;
}

interface UserAdmin extends CommonUserProperties {
  role_id: Role | number;
}

interface UserMobile extends CommonUserProperties {
  email_verified: boolean;
  alamat: string;
  telephone: string;
  tanggal_lahir: string | any;
  jenis_kelamin: string;
}

export interface AdminResponse {
  data: UserAdmin;
}
export interface UserResponse {
  data: UserMobile;
}

export interface AdminListPaginationResponse extends BaseResponsePagination {
  data: UserAdmin[];
}
export interface UserListPaginationResponse extends BaseResponsePagination {
  data: UserMobile[];
}

export interface TambahUserPayload {
  username: string;
  email: string;
  password: string;
  role_id: Role | number;
  file_create: any;
}
