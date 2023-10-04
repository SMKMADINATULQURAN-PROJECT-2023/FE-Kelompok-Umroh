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
  const { useGetDoa } = useDoaModule();
  const {
    data: dataDoa,
    isError: isErrorDoa,
    isFetching: isFetchingDoa,
    isLoading: isLoadingDoa,
  } = useGetDoa();
  console.log("doa", dataDoa);

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
      accessor: "created_by",
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
          actionColumn
          actionData={
            <div className="flex w-full flex-col space-y-2">
              <RouteButton
                to={"doa/edit-doa"}
                title={<FaRegPenToSquare color="#ffffff" />}
                h="35px"
                width={"full"}
                bg={"yellow.500"}
                color={"white"}
                _hover={{ bg: "yellow.600" }}
                fontSize={12}
              />
              <Button
                width={"full"}
                type="button"
                isLoading={isLoadingDoa}
                isDisabled={isLoadingDoa}
                h="35px"
                backgroundColor={"red.500"}
                color={"#ffffff"}
                _hover={{ bgColor: "red.600" }}
                fontSize={12}
              >
                <FaTrash color="#ffffff" />
              </Button>
            </div>
          }
        />
      </section>
    </div>
  );
};

export default Doa;
