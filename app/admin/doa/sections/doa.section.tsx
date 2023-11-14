"use client";

import React, { useCallback, useMemo } from "react";
import CustomSecondheader from "@/components/SecondTopNav";
import CustomTableTabs from "@/components/CustomTabs";
import CustomTable from "@/components/CustomTable";
import { doaColumns, kategoriColumn } from "../doaColumn";
import useDoaModule from "../service/doa.service";

interface Props {}

const DoaSection: React.FC<Props> = ({}) => {
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

  const onDeleteDoa = useCallback(
    async (id: any) => {
      mutateDeleteDoa(id, {
        onSuccess: () => {
          return refetchDoa();
        },
      });
    },
    [mutateDeleteDoa, refetchDoa],
  );
  const onDeleteKategori = useCallback(
    async (id: any) => {
      mutateDeleteKategori(id, {
        onSuccess: () => {
          return refetchKategori();
        },
      });
    },
    [mutateDeleteKategori, refetchKategori],
  );

  const data = useMemo(() => {
    return {
      doa: dataDoa?.data || [],
      kategoriDoa: dataKategori?.data || [],
    };
  }, [dataDoa, dataKategori]);

  const loadingDoa = isLoadingDoa || isFetchingDoa || isLoadingDeleteDoa;
  const loadingKategori =
    isLoadingKategori || isFetchingKategori || isLoadingDeleteKategori;

  const titleTabs = ["Do'a", "Kategori Do'a"];
  const contentTabs = [
    <section className="w-full overflow-hidden rounded-[10px]">
      <CustomTable
        columns={doaColumns}
        data={data.doa}
        isDisableInTable={loadingDoa}
        isLoadingInTable={loadingDoa}
        actionColumnInTable
        updateRoute={"doa/update-doa/"}
        onDeleteInTable={(id: number) => onDeleteDoa(id)}
      />
    </section>,
    <section className="w-full overflow-hidden rounded-[10px]">
      <CustomTable
        columns={kategoriColumn}
        data={data.kategoriDoa}
        isDisableInTable={loadingKategori}
        isLoadingInTable={loadingKategori}
        actionColumnInTable
        updateRoute={"doa/update-kategori-doa/"}
        onDeleteInTable={(id: number) => onDeleteKategori(id)}
      />
    </section>,
  ];

  return (
    <div>
      <CustomSecondheader
        navigateTo="doa/tambah-doa"
        title="Do'a"
        totalData={dataDoa?.pagination.total ?? 0}
        isLoading={loadingDoa || loadingKategori}
      />

      <section className="mb-[20px] w-full">
        <CustomTableTabs titles={titleTabs} contents={contentTabs} />
      </section>
    </div>
  );
};

export default DoaSection;
