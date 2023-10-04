import { CustomHeader } from "@/component";
import CustomTable from "@/component/CustomTable";
import RouteButton from "@/component/RouteButton";
import { StatusBarApproved } from "@/component/StatusBar";
import { Button } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";
import { FaRegPenToSquare, FaSquarePlus, FaTrash } from "react-icons/fa6";

const fakeData = [
  {
    id: 1,
    arab: "arab",
    latin: "latin",
    indonesia: "indonesia",
    nama_doa: "nama doa",
    kategori_doa: "kategori doa",
    created_by: "orang",
    status: <StatusBarApproved />,
  },
  {
    id: 2,
    arab: "arab",
    latin: "latin",
    indonesia: "indonesia",
    nama_doa: "nama doa",
    kategori_doa: "kategori doa",
    created_by: "orang",
    status: <StatusBarApproved />,
  },
  {
    id: 3,
    arab: "arab",
    latin: "latin",
    indonesia: "indonesia",
    nama_doa: "nama doa",
    kategori_doa: "kategori doa",
    created_by: "orang",
    status: <StatusBarApproved />,
  },
];

interface Props {}

const Panduan: NextPage<Props> = ({}) => {
  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Nama Do'a",
      accessor: "nama_doa",
    },
    {
      Header: "Kategori Do'a",
      accessor: "kategori_doa",
    },
    {
      Header: "Dibuat Oleh",
      accessor: "created_by",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Arab",
      accessor: "arab",
    },
    {
      Header: "Latin",
      accessor: "latin",
    },
    {
      Header: "Arti",
      accessor: "indonesia",
    },
  ];
  const data = React.useMemo(() => fakeData, []);
  return (
    <div className="h-full w-full">
      <CustomHeader />

      <section className="mb-[20px] flex w-full items-center justify-between rounded-[10px] bg-primary p-5">
        <div className="flex flex-col items-start">
          <p className="mb-2 text-[20px] font-semibold text-white">
            Panduan{" "}
            <span className="rounded-[22px] bg-[#ffffff65] px-2 py-1 text-[13px] font-normal text-white">
              30 Panduan
            </span>
          </p>
          <p className="text-white">List panduan. Lakukan perubahan</p>
        </div>
        <div>
          <RouteButton
            to={"panduan/tambah-panduan"}
            title="Tambah Panduan"
            width={"100%"}
            bg={"blue.500"}
            color={"white"}
            justifyContent="flex-start"
            _hover={{ bg: "blue.600" }}
            leftIcon={<FaSquarePlus color="#ffffff" />}
          />
        </div>
      </section>

      <section className="h-[600px] overflow-hidden rounded-[10px] border-2 border-primary">
        <CustomTable
      columns={columns}
      data={data}
      actionColumn
      actionData={
        <div className="flex w-full flex-col space-y-2">
          <RouteButton
            to={"doa/edit-doa"}
            title="Edit Do'a"
            h="35px"
            width={"full"}
            bg={"yellow.500"}
            color={"white"}
            _hover={{ bg: "yellow.600" }}
            leftIcon={<FaRegPenToSquare color="#ffffff" />}
            fontSize={12}
          />
          <Button
            width={"full"}
            type="button"
            // isLoading={isLoading}
            // isDisabled={isLoading}
            h="35px"
            backgroundColor={"red.500"}
            color={"#ffffff"}
            _hover={{ bgColor: "red.600" }}
            fontSize={12}
            leftIcon={<FaTrash color="#ffffff" />}
          >
            Hapus Ziarah
          </Button>
        </div>
      }
    />
      </section>
    </div>
  );
};

export default Panduan;
