import dayjs from "dayjs";

const narrowColumn = (value: string) => (
  <div className="narrow-column line-clamp-2">{value}</div>
);

const formatDate = (date: any) =>
  date ? dayjs(date).locale("id").format("D MMMM YYYY") : "-";

const renderCell = (value: any, formatter: any = (val: any) => val) => (
  <span>{formatter(value)}</span>
);

export const panduanColumn = [
  {
    id: "id",
    accessorFn: (row: { id: any }) => row.id,
    header: () => <span>ID</span>,
  },
  {
    id: "url",
    header: () => <span>Url Video</span>,
    accessorFn: (row: { url: any }) => row.url,
  },
  {
    id: "title",
    accessorFn: (row: { title: any }) => row.title,
    header: () => <span>Judul Panduan</span>,
  },
  {
    id: "description",
    accessorFn: (row: { description: any }) => row.description,
    cell: (props: any) => renderCell(props.getValue(), narrowColumn),
    header: () => <span>Deskripsi</span>,
  },
  {
    id: "gender",
    accessorFn: (row: { gender: any }) => row.gender,
    header: () => <span>Panduan Untuk</span>,
  },
  {
    id: "kategori_panduan",
    accessorFn: (row: { kategori_panduan: any }) => row.kategori_panduan,
    header: () => <span>Kategori Panduan</span>,
  },
  {
    id: "created_by",
    accessorFn: (row: { created_by: any }) => row.created_by.username,
    header: () => <span>Dibuat Oleh</span>,
  },
  {
    id: "updated_by",
    accessorFn: (row: { updated_by: any }) => row.updated_by.username,
    header: () => <span>Diupdate Oleh</span>,
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
