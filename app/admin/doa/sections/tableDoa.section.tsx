"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import CustomTable from "@/components/CustomTable";
import { doaColumns } from "../doaColumn";
import useDoaModule from "../service/doa.service";
import SecondTopNav from "@/components/SecondTopNav";
import DoaFilter from "./doaFilter.section";

interface Props {}

const TableDoa: React.FC<Props> = ({}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState("");
  const [created_by, setCreated_by] = useState("");
  const [keyword, setKeyword] = useState("");

  const { useGetDoa, useDeleteDoa } = useDoaModule();
  const {
    data: dataDoa,
    isError: isErrorDoa,
    isFetching: isFetchingDoa,
    isLoading: isLoadingDoa,
    refetch: refetchDoa,
  } = useGetDoa(page, pageSize, status, created_by, keyword);
  const { isLoading: isLoadingDeleteDoa, mutate: mutateDeleteDoa } =
    useDeleteDoa();

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

  const isLoading = isLoadingDoa || isFetchingDoa || isLoadingDeleteDoa;

  const data = useMemo(() => {
    return {
      doa: dataDoa?.data || [],
    };
  }, [dataDoa]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetchDoa();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [page, pageSize]);

  return (
    <div>
      <SecondTopNav
        navigateTo="doa/tambah-doa"
        title="Doa"
        totalData={dataDoa?.pagination.total ?? 0}
        isLoading={isLoading}
      />

      <section className="mb-[20px] w-full px-5 lg:px-0">
        <DoaFilter
          isLoading={isLoading}
          setCreated_by={setCreated_by}
          setStatus={setStatus}
          setKeyword={setKeyword}
          refetch={refetchDoa}
        />
        <CustomTable
          columns={doaColumns}
          data={data.doa}
          isDisableInTable={isLoading}
          isLoadingInTable={isLoading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          actionColumnInTable
          updateRoute={"doa/update-doa/"}
          onDeleteInTable={(id: number) => onDeleteDoa(id)}
        />
      </section>
    </div>
  );
};

export default TableDoa;
