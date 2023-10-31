"use client";
import type { NextPage } from "next";
import { CustomHeader } from "@/component";
import useArtikelModule from "./service/artikel.service";
import Skeleton from "react-loading-skeleton";
import SecondTopNav from "@/component/SecondTopNav";
import ArtikelCard from "./components/ArtikelCard.component";
import 'react-loading-skeleton/dist/skeleton.css'

const Artikel: NextPage = () => {
  const { useGetArtikel, useDeleteArtikel } = useArtikelModule();
  const { isLoading: isLoadingDelete, mutate } = useDeleteArtikel();
  const {
    data: dataArtikel,
    isFetching: isFetchingArtikel,
    isLoading: isLoadingArtikel,
    isError: isErrorArtikel,
    refetch: refetchArtikel,
  } = useGetArtikel();

  const onDelete = async (id: any) => {
    console.log(id);
    mutate(id, {
      onSuccess: () => {
        return refetchArtikel();
      },
    });
  };

  return (
    <div className="h-full w-full">
      <CustomHeader />

      <SecondTopNav
        navigateTo="artikel/tambah-artikel"
        title="Artikel"
        totalData={dataArtikel?.pagination.total ?? 0}
        isLoading={isLoadingArtikel || isLoadingDelete}
      />

      <section className="grid w-full grid-cols-2 grid-rows-3 gap-4">
        {isErrorArtikel ? (
          <p>Terjadi kesalahan</p>
        ) : isFetchingArtikel || isLoadingArtikel ? (
          Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="w-full rounded-[15px]">
              <Skeleton height={200} baseColor="#9FA1B5" highlightColor="#1c1e3b"/>
            </div>
          ))
        ) : dataArtikel?.pagination.total === 0 ? (
          <p>Tidak ada data</p>
        ) : (
          dataArtikel?.data.map((item, i) => (
            <ArtikelCard
              data={item}
              isLoading={isLoadingDelete || isLoadingArtikel}
              key={item.id}
              onClickDelete={() => onDelete(item.id)}
            />
          ))
        )}
      </section>
    </div>
  );
};

export default Artikel;
