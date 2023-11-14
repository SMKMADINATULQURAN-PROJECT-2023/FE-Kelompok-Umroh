"use client";
import CustomTable from "@/components/CustomTable";
import SecondTopNav from "@/components/SecondTopNav";
import React, { useCallback, useMemo, useState } from "react";
import usePanduanModule from "../service/panduan.service";
import { panduanColumn } from "../panduanColumn";

interface Props {}

const PanduanSection: React.FC<Props> = ({}) => {
  const {
    useGetPanduan,
    useGetDetailPanduan,
    useTambahPanduan,
    useUpdatePanduan,
    useDeletePanduan,
  } = usePanduanModule();

  const [kategori, setKategori] = useState("");

  const {
    data: dataPanduan,
    isError,
    isFetching,
    isLoading: isLoadingPanduan,
    refetch,
  } = useGetPanduan(kategori);
  const { isLoading: isLoadingDelete, mutate } = useDeletePanduan();

  const onDelete = useCallback(
    async (id: any) => {
      mutate(id, {
        onSuccess: () => {
          return refetch();
        },
      });
    },
    [mutate, refetch],
  );

  const isLoading = isLoadingDelete || isLoadingPanduan || isFetching;
  const data = useMemo(() => {
    return {
      panduan: dataPanduan?.data || [],
    };
  }, [dataPanduan]);

  return (
    <div>
      <SecondTopNav
        navigateTo="panduan/tambah-panduan"
        title="Panduan"
        totalData={dataPanduan?.pagination.total ?? 0}
        isLoading={isLoading}
      />

      <section className="mb-[20px] w-full">
        <CustomTable
          columns={panduanColumn}
          data={data.panduan}
          isDisableInTable={isLoading}
          isLoadingInTable={isLoading}
          actionColumnInTable
          updateRoute={"panduan/update-panduan/"}
          onDeleteInTable={(id: number) => onDelete(id)}
        />
      </section>
    </div>
  );
};

export default PanduanSection;
