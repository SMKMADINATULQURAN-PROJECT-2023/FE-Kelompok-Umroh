"use client";

import SecondTopNav from "@/components/SecondTopNav";
import React, { useEffect, useMemo, useState } from "react";
import useUserModule from "../service/user.service";
import CustomTable from "@/components/CustomTable";
import { adminColumns } from "../userColumn";
import UserAdminFilter from "./userAdminFilter.section";

interface Props {}

const TableUserAdmin: React.FC<Props> = ({}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState("");
  const [created_by, setCreated_by] = useState("");
  const [keyword, setKeyword] = useState("");

  const { useGetUserAdmin } = useUserModule();

  const {
    data: dataAdmin,
    isFetching: isFetchingAdmin,
    isLoading: isLoadingAdmin,
    isError: isErrorAdmin,
    refetch: refetchAdmin,
  } = useGetUserAdmin(page, pageSize, status, created_by, keyword);

  const isLoading = isLoadingAdmin || isFetchingAdmin;

  const data = useMemo(() => {
    return {
      admin: dataAdmin?.data || [],
    };
  }, [dataAdmin]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      refetchAdmin();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [page, pageSize]);

  return (
    <div>
      <SecondTopNav
        navigateTo="user/tambah-user"
        title="User"
        totalData={dataAdmin?.pagination.total ?? 0}
        isLoading={isLoading}
      />

      <section className="mb-[20px] w-full px-5 lg:px-0">
        <UserAdminFilter
          isLoading={isLoading}
          setCreated_by={setCreated_by}
          setStatus={setStatus}
          setKeyword={setKeyword}
          refetch={refetchAdmin}
        />
        <CustomTable
          columns={adminColumns}
          data={data.admin}
          isDisableInTable={isLoading}
          isLoadingInTable={isLoading}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
        />
      </section>
    </div>
  );
};

export default TableUserAdmin;
