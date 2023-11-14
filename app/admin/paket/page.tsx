"use client";
import { CustomHeader } from "@/components";
import CustomTable from "@/components/CustomTable";
import RouteButton from "@/components/RouteButton";
import { StatusBarApproved, StatusBarProcessed } from "@/components/StatusBar";
import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
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
    status: "diterima",
  },
  {
    id: 2,
    arab: "arab",
    latin: "latin",
    indonesia: "indonesia",
    nama_doa: "nama doa",
    kategori_doa: "kategori doa",
    created_by: "orang",
    status: "diproses",
  },
  {
    id: 3,
    arab: "arab",
    latin: "latin",
    indonesia: "indonesia",
    nama_doa: "nama doa",
    kategori_doa: "kategori doa",
    created_by: "orang",
    status: "diterima",
  },
];

const Paket: NextPage = () => {
  const columns = [
    {
      id: "id", // Assign a unique id
      header: () => <span>ID</span>,
      accessorFn: (row: { id: any }) => row.id,
    },
    {
      id: "nama_doa", // Assign a unique id
      header: () => <span>Nama Do'a</span>,
      accessorFn: (row: { nama_doa: any }) => row.nama_doa,
    },
    {
      id: "kategori_doa", // Assign a unique id
      header: () => <span>Kategori Do'a</span>,
      accessorFn: (row: { kategori_doa: any }) => row.kategori_doa,
    },
    {
      id: "created_by", // Assign a unique id
      header: () => <span>Dibuat Oleh</span>,
      accessorFn: (row: { created_by: any }) => row.created_by,
    },
    {
      id: "status",
      header: () => <span>Status</span>,
      accessorFn: (row: { status: any }) => row.status,
      // cell: ({ value }: { value: string }) => {
      //   console.log('value status', value)
      //   // return value == "diproses" ? (
      //   //   <StatusBarApproved />
      //   // ) : (
      //   //   <StatusBarProcessed />
      //   // );
      //   return <span>{value}</span>
      // },
      cell: (props: any) => {
        return props.getValue() == "diterima" ? (
          <StatusBarApproved />
        ) : (
          <StatusBarProcessed />
        );
      },
    },

    {
      Header: "Arab",
      accessorKey: "arab",
    },
    {
      Header: "Latin",
      accessorKey: "latin",
    },
    {
      Header: "Arti",
      accessorKey: "indonesia",
    },
  ];

  const data = React.useMemo(() => fakeData, []);
  return (
    <div className="h-full w-full">
      <CustomHeader />

      <section className="mb-[20px] flex w-full items-center justify-between rounded-[10px] bg-primary p-5">
        <div className="flex flex-col items-start">
          <p className="mb-2 text-[20px] font-semibold text-white">
            Paket{" "}
            <span className="rounded-[22px] bg-[#ffffff65] px-2 py-1 text-[13px] font-normal text-white">
              17 Paket
            </span>
          </p>
          <p className="text-white">List paket. Lakukan perubahan</p>
        </div>
        <div>
          <RouteButton
            to={"paket/tambah-paket"}
            title="Tambah Paket"
            width={"100%"}
            bg={"blue.500"}
            color={"white"}
            justifyContent="flex-start"
            _hover={{ bg: "blue.600" }}
            leftIcon={<FaSquarePlus color="#ffffff" />}
          />
        </div>
      </section>

      <section className="h-[600px] overflow-hidden rounded-[10px]">
        <CustomTable
          columns={columns}
          data={data}
          actionColumn
          actionData={
            <div className="flex w-full flex-col space-y-2">
              <RouteButton
                to={"paket/edit-paket"}
                title="Edit Paket"
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
                Hapus Paket
              </Button>
            </div>
          }
        />
      </section>
    </div>
  );
};

export default Paket;
