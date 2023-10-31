import {
  StatusBarApproved,
  StatusBarProcessed,
  StatusBarRejected,
  StatusBarUknown,
} from "@/component/StatusBar";
import dayjs from "dayjs";
import Image from "next/image";

const NarrowColumn = (value: string) => (
  <div className="narrow-column line-clamp-2">{value}</div>
);

const getStatusComponent = (value: string) => {
  switch (value) {
    case "Pending":
      return <StatusBarProcessed />;
    case "Reject":
      return <StatusBarRejected />;
    case "Accept":
      return <StatusBarApproved />;
    default:
      return <StatusBarUknown />;
  }
};

const formatDate = (date: any) =>
  date ? dayjs(date).locale("id").format("D MMMM YYYY") : "-";

const renderCell = (value: any, formatter: any = (val: any) => val) => (
  <span>{formatter(value)}</span>
);

const createCommonColumns = (additionalColumns: any[]) => {
  const commonColumns = [
    {
      id: "id",
      accessorFn: (row: { id: any }) => row.id,
      header: () => <span>ID</span>,
    },
    ...additionalColumns,
    {
      id: "status",
      accessorFn: (row: { status: any }) => row.status,
      cell: (props: any) => renderCell(getStatusComponent(props.getValue())),
      header: () => <span>Status</span>,
    },
    {
      id: "created_by",
      accessorFn: (row: { created_by: any }) => row.created_by.username,
      header: () => <span>Dibuat Oleh</span>,
    },
    {
      id: "created_at",
      accessorFn: (row: { created_at: any }) => row.created_at,
      cell: (props: any) => renderCell(props.getValue(), formatDate),
      header: () => <span>Dibuat Pada</span>,
    },
    {
      id: "updated_at",
      accessorFn: (row: { updated_at: any }) => row.updated_at,
      cell: (props: any) => renderCell(props.getValue(), formatDate),
      header: () => <span>Diupdate Pada</span>,
    },
  ];

  return commonColumns;
};

export const kategoriColumn = createCommonColumns([
  {
    id: "thumbnail",
    header: () => <span>Thumbnail</span>,
    accessorFn: (row: { thumbnail: any }) => row.thumbnail,
    cell: (props: any) => (
      <div className="w-40 rounded-[5px] border border-primary">
        <Image
          className="h-full w-full bg-cover"
          src={props.getValue()}
          alt={props.getValue()}
          sizes="100vw"
          quality={100}
          width={0}
          height={0}
          style={{
            objectFit: "cover",
            overflow: "hidden",
          }}
        />
      </div>
    ),
  },
  {
    id: "kategori_name",
    accessorFn: (row: { kategori_name: any }) => row.kategori_name,
    header: () => <span>Kategori Do'a</span>,
  },
]);

export const doaColumns = createCommonColumns([
  {
    id: "name",
    accessorFn: (row: { name: any }) => row.name,
    header: () => <span>Nama Do'a</span>,
  },
  {
    id: "kategori_id",
    accessorFn: (row: { kategori_id: any }) => row.kategori_id.kategori_name,
    header: () => <span>Kategori Do'a</span>,
  },
  {
    id: "arab",
    accessorFn: (row: { arab: any }) => row.arab,
    cell: (props: any) => renderCell(props.getValue(), NarrowColumn),
    header: () => <span>Arab</span>,
  },
  {
    id: "latin",
    accessorFn: (row: { latin: any }) => row.latin,
    cell: (props: any) => renderCell(props.getValue(), NarrowColumn),
    header: () => <span>Latin</span>,
  },
  {
    id: "arti",
    accessorFn: (row: { arti: any }) => row.arti,
    cell: (props: any) => renderCell(props.getValue(), NarrowColumn),
    header: () => <span>Arti</span>,
  },
]);
