import { Avatar } from "@chakra-ui/react";
import dayjs from "dayjs";

const formatDate = (date: any) =>
  date ? dayjs(date).locale("id").format("D MMMM YYYY") : "-";

const renderCell = (props: any) =>
  props?.getValue() !== undefined && props?.getValue() !== null
    ? props?.getValue()
    : "-";

const avatarColumn = {
  id: "avatar",
  header: () => <span>Avatar</span>,
  accessorFn: (row: { avatar: any }) => row.avatar,
  cell: (props: any) => (
    <Avatar src={renderCell(props)} name={renderCell(props)} />
  ),
};

const commonColumns = [
  {
    id: "id",
    accessorFn: (row: { id: any }) => row.id,
    header: () => <span>ID</span>,
    cell: renderCell,
  },
  avatarColumn,
  {
    id: "username",
    accessorFn: (row: { username: any }) => row.username,
    header: () => <span>Username</span>,
    cell: renderCell,
  },
  {
    id: "email",
    accessorFn: (row: { email: any }) => row.email,
    header: () => <span>Email</span>,
    cell: renderCell,
  },
];

export const adminColumns = [
  ...commonColumns,
  {
    id: "role_id",
    accessorFn: (row: { role_id: any }) => row.role_id.role_name,
    header: () => <span>Role</span>,
    cell: renderCell,
  },
];

export const mobileColumns = [
  ...commonColumns,
  {
    id: "email_verified",
    accessorFn: (row: { email_verified: any }) => row.email_verified,
    header: () => <span>Email Verified</span>,
    cell: renderCell,
  },
  {
    id: "alamat",
    accessorFn: (row: { alamat: any }) => row.alamat,
    header: () => <span>Alamat</span>,
    cell: renderCell,
  },
  {
    id: "telephone",
    accessorFn: (row: { telephone: any }) => row.telephone,
    header: () => <span>Telephone</span>,
    cell: renderCell,
  },
  {
    id: "tanggal_lahir",
    accessorFn: (row: { tanggal_lahir: any }) => row.tanggal_lahir,
    cell: (props: any) => (
      <span>
        {props?.getValue() !== undefined && props?.getValue() !== null
          ? formatDate(props?.getValue())
          : "-"}
      </span>
    ),
    header: () => <span>Tanggal Lahir</span>,
  },
  {
    id: "jenis_kelamin",
    accessorFn: (row: { jenis_kelamin: any }) => row.jenis_kelamin,
    header: () => <span>Jenis Kelamin</span>,
    cell: renderCell,
  },
  {
    id: "created_at",
    accessorFn: (row: { created_at: any }) => row.created_at,
    cell: (props: any) => <span>{formatDate(renderCell(props))}</span>,
    header: () => <span>Dibuat Pada</span>,
  },
  {
    id: "updated_at",
    accessorFn: (row: { updated_at: any }) => row.updated_at,
    cell: (props: any) => <span>{formatDate(renderCell(props))}</span>,
    header: () => <span>Diupdate Pada</span>,
  },
];
