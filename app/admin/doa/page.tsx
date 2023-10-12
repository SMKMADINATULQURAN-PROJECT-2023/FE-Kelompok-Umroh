"use client";
import { CustomHeader } from "@/component";
import CustomTable from "@/component/CustomTable";
import RouteButton from "@/component/RouteButton";
import { StatusBarApproved } from "@/component/StatusBar";
import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import React, { useMemo } from "react";
import { FaRegPenToSquare, FaSquarePlus, FaTrash } from "react-icons/fa6";
import useDoaModule from "./service/doa.service";
import dayjs from "dayjs";
import "dayjs/locale/id";

const Doa: NextPage = () => {
  const { useGetDoa, useGetKategoriDoa, useDeleteDoa, useDeleteKategoriDoa } =
    useDoaModule();
  const {
    data: dataDoa,
    isError: isErrorDoa,
    isFetching: isFetchingDoa,
    isLoading: isLoadingDoa,
    refetch: refetchDoa,
  } = useGetDoa();
  const {
    data: dataKategori,
    isError: isErrorKategori,
    isFetching: isFetchingKategori,
    isLoading: isLoadingKategori,
    refetch: refetchKategori,
  } = useGetKategoriDoa();
  const { isLoading: isLoadingDeleteDoa, mutate: mutateDeleteDoa } =
    useDeleteDoa();
  const { isLoading: isLoadingDeleteKategori, mutate: mutateDeleteKategori } =
    useDeleteKategoriDoa();

  const onDeleteDoa = async (id: any) => {
    console.log(id);
    mutateDeleteDoa(id, {
      onSuccess: () => {
        return refetchDoa();
      },
    });
  };
  const onDeleteKategori = async (id: any) => {
    console.log(id);
    mutateDeleteDoa(id, {
      onSuccess: () => {
        return refetchDoa();
      },
    });
  };

  const narrowColumn = (value: string) => (
    <div className="narrow-column line-clamp-2">{value}</div>
  );

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "Nama Do'a",
      accessor: "name",
    },
    {
      Header: "Kategori Do'a",
      accessor: "kategori_id.kategori_name",
    },
    {
      Header: "Dibuat Oleh",
      accessor: "created_by.username",
    },
    {
      Header: "Status",
      accessor: "status",
    },
    {
      Header: "Arab",
      accessor: "arab",
      Cell: ({ value }: { value: string }) => narrowColumn(value),
    },
    {
      Header: "Latin",
      accessor: "latin",
      Cell: ({ value }: { value: string }) => narrowColumn(value),
    },
    {
      Header: "Arti",
      accessor: "arti",
      Cell: ({ value }: { value: string }) => narrowColumn(value),
    },
    {
      Header: "Dibuat Pada",
      accessor: "created_at",
      Cell: ({ value }: { value: string }) => {
        const formattedDate = dayjs(value).locale("id").format("D MMMM YYYY");
        return <span>{formattedDate}</span>;
      },
    },
    {
      Header: "Diupdate Pada",
      accessor: "updated_at",
      Cell: ({ value }: { value: string }) => {
        const formattedDate = dayjs(value).locale("id").format("D MMMM YYYY");
        return <span>{formattedDate}</span>;
      },
    },
  ];

  const data = useMemo(() => dataDoa?.data || [], [dataDoa]);

  return (
    <div className="h-full w-full">
      <CustomHeader />

      <section className="mb-[20px] flex w-full items-center justify-between rounded-[10px] bg-primary p-5">
        <div className="flex flex-col items-start">
          <p className="mb-2 text-[20px] font-semibold text-white">
            Do'a{" "}
            <span className="rounded-[22px] bg-[#ffffff65] px-2 py-1 text-[13px] font-normal text-white">
              {dataDoa?.pagination.total} Do'a
            </span>
          </p>
          <p className="text-white">List do'a. Lakukan perubahan</p>
        </div>
        <div>
          <RouteButton
            to={"doa/tambah-doa"}
            title="Tambah Doa"
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
          isDisableInTable={isLoadingDoa || isLoadingDeleteDoa}
          isLoadingInTable={isLoadingDoa || isLoadingDeleteDoa}
          actionColumnInTable
          updateRoute={"doa/update-doa/"}
          onDeleteInTable={(id: number) => onDeleteDoa(id)}
        />
      </section>
    </div>
  );
};

export default Doa;
