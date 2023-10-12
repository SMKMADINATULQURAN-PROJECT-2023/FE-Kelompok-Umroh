import { BaseResponsePagination } from "@/service/axios";

interface Ziarah {
  id: number;
  name: string;
  description: string;
  thumbnail: any;
  slug: string;
  file_create: any;
  file_update: any;
  location: string;
  latitude: string | undefined;
  longitude: string | undefined;
  created_at: string;
  updated_at: string;
  created_by: {
    id: number;
    username: string;
    email: string;
    avatar: any;
  };
}

export interface ZiarahResponse {
  data: Ziarah;
}

export interface ZiarahPaginationResponse extends BaseResponsePagination {
  data: Ziarah[];
}

// export interface BookListFilter extends Partial<Book> {
//   from_year?: string;
//   to_year?: string;
//   page : number ,
//   pageSize : number
// }

export interface TambahZiarahPayload
  extends Pick<
    Ziarah,
    | "name"
    | "description"
    | "file_create"
    | "location"
    | "latitude"
    | "longitude"
  > {}

export interface UpdateZiarahPayload
  extends Pick<
    Ziarah,
    | "name"
    | "description"
    | "file_update"
    | "location"
    | "latitude"
    | "longitude"
  > {}
