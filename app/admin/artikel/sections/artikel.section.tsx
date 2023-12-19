"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import useArtikelModule from "../service/artikel.service";
import SecondTopNav from "@/components/SecondTopNav";
import ArtikelCard from "../components/ArtikelCard.component";
import PaginationMenu from "@/components/PaginationMenu";
import usePagination from "@/hook/usePagination";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ArtikelFilterSection from "./artikelFilter.section";

interface Props {}

const ArtikelSection: React.FC<Props> = ({}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState("");
  const [created_by, setCreated_by] = useState("");
  const [keyword, setKeyword] = useState("");

  const { useGetArtikel, useDeleteArtikel } = useArtikelModule();
  const { isLoading: isLoadingDelete, mutate } = useDeleteArtikel();
  const {
    data: dataArtikel,
    isFetching: isFetchingArtikel,
    isLoading: isLoadingArtikel,
    isError: isErrorArtikel,
    refetch: refetchArtikel,
  } = useGetArtikel(page, pageSize, status, created_by, keyword);

  const isLoading = isLoadingArtikel || isLoadingDelete || isFetchingArtikel;

  const onDelete = useCallback(
    async (id: any) => {
      console.log(id);
      mutate(id, {
        onSuccess: () => {
          return refetchArtikel();
        },
      });
    },
    [mutate, refetchArtikel],
  );

  const paginationData = useMemo(() => {
    return {
      page: dataArtikel?.pagination?.page ?? 1,
      pageSize: dataArtikel?.pagination?.pageSize ?? 10,
      paginationTotal: dataArtikel?.pagination?.total ?? 0,
    };
  }, [dataArtikel]);

  const { totalPages, isCanPrevious, isCanNext } =
    usePagination(paginationData);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetchArtikel();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [page, pageSize]);
  return (
    <div>
      <SecondTopNav
        navigateTo="artikel/tambah-artikel"
        title="Artikel"
        totalData={dataArtikel?.pagination.total ?? 0}
        isLoading={isLoadingArtikel || isLoadingDelete}
      />

      <section className="px-5 lg:px-0">
        <ArtikelFilterSection
          isLoading={isLoading}
          refetch={refetchArtikel}
          setCreated_by={setCreated_by}
          setKeyword={setKeyword}
          setStatus={setStatus}
        />
      </section>

      <section className="mb-5 grid w-full grid-cols-1 grid-rows-3 gap-4 px-5 lg:grid-cols-2 lg:px-0">
        {isErrorArtikel ? (
          <p>Terjadi kesalahan</p>
        ) : isFetchingArtikel || isLoadingArtikel ? (
          Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="w-full rounded-[15px]">
              <Skeleton
                height={200}
                baseColor="#9FA1B5"
                highlightColor="#003F37"
              />
            </div>
          ))
        ) : dataArtikel?.data === null ? (
          <p>Tidak ada data</p>
        ) : (
          dataArtikel?.data.map((item, i) => (
            <ArtikelCard
              data={item}
              isLoading={isLoading}
              key={item.id}
              onClickDelete={() => onDelete(item.id)}
            />
          ))
        )}
      </section>

      <section>
        <PaginationMenu
          firstPageButtonIsDisabled={isCanPrevious}
          previousPageButtonIsDisabled={isCanPrevious}
          nextPageButtonIsDisabled={isCanNext}
          lastPageButtonIsDisabled={isCanNext}
          previousPageButtonOnClick={() => setPage(page - 1)}
          nextPageButtonOnClick={() => setPage(page + 1)}
          firstPageButtonOnClick={() => setPage(1)}
          lastPageButtonOnClick={() => setPage(totalPages)}
          inputPageOnChange={(e) => setPage(Number(e.target.value))}
          inputValue={page}
          pageFrom={page}
          pageTo={totalPages}
          currentPageSize={pageSize}
          pageSizeOnClick={(size: number) => setPageSize(size)}
        />
      </section>
    </div>
  );
};

export default ArtikelSection;
