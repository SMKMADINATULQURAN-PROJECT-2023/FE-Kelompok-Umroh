// import {
//   BaseResponsePagination,
// } from "@/lib/axiosClient";

import { BaseResponsePagination } from "@/service/axios";

interface UserAdmin {
  id: number;
  username: string;
  email: string;
  password: string;
  role_id: {
    id: number;
    role_name: string;
  } | number;
  avatar: any;
  file_create: any;
  created_at: string;
  updated_at: string;
}

export interface AdminListResponse {
  data: UserAdmin[];
}

export interface AdminListPaginationResponse extends BaseResponsePagination {
  data: UserAdmin[];
}
// export interface BookListFilter extends Partial<Book> {
//   from_year?: string;
//   to_year?: string;
//   page : number ,
//   pageSize : number
// }

export interface TambahUserPayload
  extends Pick<
    UserAdmin,
    "username" | "email" | "password" | "role_id" | "file_create"
  > {}
