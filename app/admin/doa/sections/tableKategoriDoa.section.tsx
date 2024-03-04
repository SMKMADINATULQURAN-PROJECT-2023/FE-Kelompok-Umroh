"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import CustomTable from "@/components/CustomTable";
import { kategoriColumn } from "../doaColumn";
import useDoaModule from "../service/doa.service";
import SecondTopNav from "@/components/SecondTopNav";
import DoaFilter from "./doaFilter.section";
import KategoriDoaFilter from "./kategoriDoaFilter.section";

interface Props {}

const TableKategoriDoa: React.FC<Props> = ({}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState("");
  const [created_by, setCreated_by] = useState("");
  const [keyword, setKeyword] = useState("");

  const { useGetKategoriDoa, useDeleteKategoriDoa } = useDoaModule();
  const {
    data: dataKategori,
    isError: isErrorKategori,
    isFetching: isFetchingKategori,
    isLoading: isLoadingKategori,
    refetch: refetchKategori,
  } = useGetKategoriDoa(page, pageSize, status, created_by, keyword);
  const { isLoading: isLoadingDeleteKategori, mutate: mutateDeleteKategori } =
    useDeleteKategoriDoa();

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
      kategoriDoa: dataKategori?.data || [],
    };
  }, [dataKategori]);

  const isLoading =
    isLoadingKategori || isFetchingKategori || isLoadingDeleteKategori;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetchKategori();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [page, pageSize]);

  return (
    <div>
      <SecondTopNav
        navigateTo="tambah-doa"
        title="Kategori Do'a"
        totalData={dataKategori?.pagination.total ?? 0}
        isLoading={isLoading}
      />

      <section className="mb-[20px] w-full px-5 lg:px-0">
        <KategoriDoaFilter
          isLoading={isLoading}
          setCreated_by={setCreated_by}
          setStatus={setStatus}
          setKeyword={setKeyword}
          refetch={refetchKategori}
        />
        <CustomTable
          columns={kategoriColumn}
          data={data.kategoriDoa}
          isDisableInTable={isLoading}
          isLoadingInTable={isLoading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          actionColumnInTable
          updateRoute={"kategori/update-kategori-doa/"}
          onDeleteInTable={(id: number) => onDeleteKategori(id)}
          totalData={dataKategori?.pagination.total}
        />
      </section>
    </div>
  );
};

export default TableKategoriDoa;
