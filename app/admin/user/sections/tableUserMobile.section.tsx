"use client";

import SecondTopNav from "@/components/SecondTopNav";
import React, { useEffect, useMemo, useState } from "react";
import useUserModule from "../service/user.service";
import CustomTable from "@/components/CustomTable";
import { mobileColumns } from "../userColumn";
import UserMobileFilter from "./userMobileFilter.section";

interface Props {}

const TableUserMobile: React.FC<Props> = ({}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState("");
  const [created_by, setCreated_by] = useState("");
  const [keyword, setKeyword] = useState("");

  const { useGetUserMobile } = useUserModule();

  const {
    data: dataMobile,
    isFetching: isFetchingMobile,
    isLoading: isLoadingMobile,
    isError: isErrorMobile,
    refetch: refetchMobile,
  } = useGetUserMobile(page, pageSize, status, created_by, keyword);

  const isLoading = isFetchingMobile || isLoadingMobile;

  const data = useMemo(() => {
    return {
      mobile: dataMobile?.data || [],
    };
  }, [dataMobile]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetchMobile();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [page, pageSize]);

  return (
    <div>
      <SecondTopNav
        navigateTo="/admin/user/tambah-user"
        title="User"
        totalData={dataMobile?.pagination.total ?? 0}
        isLoading={isLoading}
      />

      <section className="mb-[20px] w-full px-5 lg:px-0">
        <UserMobileFilter
          isLoading={isLoading}
          setCreated_by={setCreated_by}
          setStatus={setStatus}
          setKeyword={setKeyword}
          refetch={refetchMobile}
        />
        <CustomTable
          columns={mobileColumns}
          data={data.mobile}
          isDisableInTable={isLoading}
          isLoadingInTable={isLoading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
          totalData={dataMobile?.pagination.total}
        />
      </section>
    </div>
  );
};

export default TableUserMobile;
