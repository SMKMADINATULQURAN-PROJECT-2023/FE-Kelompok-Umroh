import {
  StatusBarApproved,
  StatusBarProcessed,
  StatusBarRejected,
  StatusBarUknown,
} from "@/components/StatusBar";
import HtmlRenderer from "@/hook/useMarkdownConvert";
import dayjs from "dayjs";
import Image from "next/image";
import YouTube, { YouTubeProps } from "react-youtube";

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

const NarrowColumn = ({
  children,
  className,
}: {
  children: any;
  className: string;
}) => <div className={`${className} narrow-column line-clamp-2`}>{children}</div>;

const formatDate = (date: any) =>
  date ? dayjs(date).locale("id").format("D MMMM YYYY") : "-";

const renderCell = (value: any, formatter: any = (val: any) => val) => (
  <span>{formatter(value)}</span>
);

const VideoPlayer = (src: any) => {
  if (!src || !src.src) {
    console.error("src is undefined or null");
    return null; // or return a default component
  }

  const urlObj = new URL(src?.src);
  const params = urlObj.searchParams;
  const videoId = params.get("v");

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "150",
    width: "300",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className="overflow-hidden rounded-[5px] border border-primary">
      <YouTube videoId={videoId ?? ""} opts={opts} onReady={onPlayerReady} />
    </div>
  );
};

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

export const panduanColumn = createCommonColumns([
  {
    id: "url",
    header: () => <span>Url Video</span>,
    cell: (props: any) =>
      renderCell(props.getValue(), () => (
        <VideoPlayer src={props.getValue()} />
      )),

    accessorFn: (row: { link: any }) => row.link,
  },
  {
    id: "thumbnail",
    header: () => <span>Thumbnail</span>,
    accessorFn: (row: { thumbnail: any }) => row.thumbnail,
    cell: (props: any) => (
      <div className="h-[100px] w-40 overflow-hidden rounded-[5px] border border-primary">
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
    id: "title",
    accessorFn: (row: { title: any }) => row.title,
    header: () => <span>Judul Panduan</span>,
  },
  {
    id: "description",
    accessorFn: (row: { description: any }) => row.description,
    cell: (props: any) => (
      <NarrowColumn className="">
        <HtmlRenderer htmlString={props.getValue()} className="text-primary" />
      </NarrowColumn>
    ),
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
]);
