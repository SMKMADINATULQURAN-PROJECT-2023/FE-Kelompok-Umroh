"use client";
import CustomTable from "@/components/CustomTable";
import SecondTopNav from "@/components/SecondTopNav";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import usePanduanModule from "../service/panduan.service";
import { panduanColumn } from "../panduanColumn";
import PanduanFilterSection from "./panduanFilter.section";

interface Props {}

const PanduanSection: React.FC<Props> = ({}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState("");
  const [created_by, setCreated_by] = useState("");
  const [kategori, setKategori] = useState("");
  const [gender, setGender] = useState("");

  const { useGetPanduan, useDeletePanduan } = usePanduanModule();

  const {
    data: dataPanduan,
    isError,
    isFetching,
    isLoading: isLoadingPanduan,
    refetch,
  } = useGetPanduan(page, pageSize, status, created_by, kategori, gender);
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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetch();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [page, pageSize]);

  return (
    <div>
      <SecondTopNav
        navigateTo="panduan/tambah-panduan"
        title="Panduan"
        totalData={dataPanduan?.pagination.total ?? 0}
        isLoading={isLoading}
      />

      <section className="mb-[20px] w-full px-5 lg:px-0">
        <PanduanFilterSection
          isLoading={isLoading}
          setCreated_by={setCreated_by}
          setKategori={setKategori}
          setStatus={setStatus}
          setGender={setGender}
          refetch={refetch}
        />
        <CustomTable
          columns={panduanColumn}
          data={data.panduan}
          isDisableInTable={isLoading}
          isLoadingInTable={isLoading}
          actionColumnInTable
          updateRoute={"panduan/update-panduan/"}
          onDeleteInTable={(id: number) => onDelete(id)}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </section>
    </div>
  );
};

export default PanduanSection;
