"use client";
import { CustomHeader } from "@/component";
import CustomTable from "@/component/CustomTable";
import type { NextPage } from "next";
import React, { useMemo } from "react";
import useDoaModule from "./service/doa.service";
import { doaColumns, kategoriColumn } from "./doaColumn";
import CustomSecondheader from "@/component/SecondTopNav";
import CustomTableTabs from "@/component/CustomTabs";

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

  const onDeleteDoa = async (id: number) => {
    console.log(id);
    mutateDeleteDoa(id, {
      onSuccess: () => {
        return refetchDoa();
      },
    });
  };
  const onDeleteKategori = async (id: number) => {
    console.log(id);
    mutateDeleteKategori(id, {
      onSuccess: () => {
        return refetchKategori();
      },
    });
  };

  const doaColumnData = useMemo(() => dataDoa?.data || [], [dataDoa]);
  const kategoriColumnData = useMemo(
    () => dataKategori?.data || [],
    [dataKategori],
  );

  const titleTabs = ["Do'a", "Kategori Do'a"];
  const contentTabs = [
    <section className="w-full overflow-hidden rounded-[10px]">
      <CustomTable
        columns={doaColumns}
        data={doaColumnData}
        isDisableInTable={isLoadingDoa || isLoadingKategori || isFetchingDoa}
        isLoadingInTable={isLoadingDoa || isLoadingKategori || isFetchingDoa}
        actionColumnInTable
        updateRoute={"doa/update-doa/"}
        onDeleteInTable={(id: number) => onDeleteDoa(id)}
      />
    </section>,
    <section className="w-full overflow-hidden rounded-[10px]">
      <CustomTable
        columns={kategoriColumn}
        data={kategoriColumnData}
        isDisableInTable={
          isLoadingKategori || isLoadingDeleteKategori || isFetchingKategori
        }
        isLoadingInTable={
          isLoadingKategori || isLoadingDeleteKategori || isFetchingKategori
        }
        actionColumnInTable
        updateRoute={"doa/update-doa/"}
        onDeleteInTable={(id: number) => onDeleteKategori(id)}
      />
    </section>,
  ];

  return (
    <div className="h-full w-full">
      <CustomHeader />

      <CustomSecondheader
        navigateTo="doa/tambah-doa"
        title="Do'a"
        totalData={dataDoa?.pagination.total ?? 0}
        isLoading={isLoadingDoa || isLoadingKategori}
      />

      <section className="mb-[20px] w-full">
        <CustomTableTabs titles={titleTabs} contents={contentTabs} />
      </section>
    </div>
  );
};

export default Doa;
