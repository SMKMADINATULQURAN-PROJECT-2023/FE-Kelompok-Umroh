"use client";
import { CustomHeader } from "@/component";
import SecondTopNav from "@/component/SecondTopNav";
import { NextPage } from "next";
import React, { useMemo, useState } from "react";
import usePanduanModule from "./service/panduan.service";

interface Props {}

const Panduan: NextPage<Props> = ({}) => {
  const {
    useGetPanduan,
    useGetDetailPanduan,
    useTambahPanduan,
    useUpdatePanduan,
    useDeletePanduan,
  } = usePanduanModule();

  const [kategori, setKategori] = useState('')

  const {
    data,
    isError,
    isFetching,
    isLoading: isLoadingPanduan,
    refetch,
  } = useGetPanduan(kategori);
  const { isLoading: isLoadingDelete, mutate } = useDeletePanduan();

  const onDelete = async (id: number) => {
    console.log(id);
    mutate(id, {
      onSuccess: () => {
        return refetch();
      },
    });
  };

  const panduanColumnData = useMemo(() => data?.data || [], [data]);

  return (
    <div className="h-full w-full">
      <CustomHeader />

      <SecondTopNav
        navigateTo="panduan/tambah-panduan"
        title="Panduan"
        totalData={data?.pagination.total ?? 0}
        isLoading={isLoadingDelete || isLoadingPanduan}
      />

      <section className="h-[65%] overflow-hidden rounded-[10px] border border-primary"></section>
    </div>
  );
};

export default Panduan;
