"use client";

import SecondTopNav from "@/components/SecondTopNav";
import usePagination from "@/hook/usePagination";
import Skeleton from "react-loading-skeleton";
import ZiarahCard from "../components/ZiarahCard.component";
import PaginationMenu from "@/components/PaginationMenu";
import useZiarahModule from "../service/ziarah.service";
import React, { useEffect, useMemo, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {}

const ZiarahSection: React.FC<Props> = ({}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { useGetZiarah, useDeleteZiarah } = useZiarahModule();
  const { isLoading: isLoadingDelete, mutate } = useDeleteZiarah();
  const {
    data: dataZiarah,
    isError: isErrorZiarah,
    isFetching: isFetchingZiarah,
    isLoading: isLoadingZiarah,
    refetch: refetchZiarah,
  } = useGetZiarah(page, pageSize);
  
  const onDelete = async (id: any) => {
    mutate(id, {
      onSuccess: () => {
        return refetchZiarah();
      },
    });
  };

  const paginationData = useMemo(() => {
    return {
      page: dataZiarah?.pagination?.page ?? 1,
      pageSize: dataZiarah?.pagination?.pageSize ?? 10,
      paginationTotal: dataZiarah?.pagination?.total ?? 0,
    };
  }, [dataZiarah]);

  const { totalPages, isCanPrevious, isCanNext } =
    usePagination(paginationData);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetchZiarah();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [page, pageSize]);
  return (
    <div>
      <SecondTopNav
        navigateTo="ziarah/tambah-ziarah"
        title="Ziarah"
        totalData={dataZiarah?.pagination.total ?? 0}
        isLoading={isLoadingDelete || isLoadingZiarah}
      />

      <section className="mb-5 grid w-full grid-cols-1 lg:grid-cols-2 grid-rows-3 gap-4 px-5 lg:px-0">
        {isErrorZiarah ? (
          <p>Terjadi kesalahan</p>
        ) : isFetchingZiarah || isLoadingZiarah ? (
          Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="w-full rounded-[15px]">
              <Skeleton
                height={200}
                baseColor="#9FA1B5"
                highlightColor="#1c1e3b"
              />
            </div>
          ))
        ) : dataZiarah?.pagination.total === 0 ? (
          <p>Tidak ada data</p>
        ) : (
          dataZiarah?.data.map((item, i) => {
            return (
              <ZiarahCard
                data={item}
                isLoading={isLoadingDelete || isLoadingZiarah}
                key={item.id}
                onClickDelete={() => onDelete(item.id)}
              />
            );
          })
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

export default ZiarahSection;
