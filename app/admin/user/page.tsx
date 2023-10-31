"use client";
import { CustomHeader } from "@/component";
import type { NextPage } from "next";
import React, { useMemo } from "react";
import CustomTable from "@/component/CustomTable";
import useUserModule from "./service/user.service";
import CustomTableTabs from "@/component/CustomTabs";
import SecondTopNav from "@/component/SecondTopNav";
import { adminColumns, mobileColumns } from "./userColumn";
const User: NextPage = () => {
  const { useGetUserAdmin, useGetUserMobile } = useUserModule();
  const {
    data: dataUser,
    isFetching: isFetchingUser,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    refetch: refetchUser,
  } = useGetUserAdmin();
  const {
    data: dataUserMobile,
    isFetching: isFetchingUserMobile,
    isLoading: isLoadingUserMobile,
    isError: isErrorUserMobile,
    refetch: refetchUserMobile,
  } = useGetUserMobile();

  const dataAdmin = useMemo(() => dataUser?.data || [], [dataUser]);
  const dataMobile = useMemo(
    () => dataUserMobile?.data || [],
    [dataUserMobile],
  );

  const titleTabs = ["User Admin", "user Mobile"];
  const contentTabs = [
    <section className="w-full overflow-hidden rounded-[10px]">
      <CustomTable
        columns={adminColumns}
        data={dataAdmin}
        isLoadingInTable={
          isLoadingUser ||
          isLoadingUserMobile ||
          isFetchingUser ||
          isFetchingUserMobile
        }
      />
    </section>,
    <section className="w-full overflow-hidden rounded-[10px]">
      <CustomTable
        columns={mobileColumns}
        data={dataMobile}
        isLoadingInTable={
          isLoadingUser ||
          isLoadingUserMobile ||
          isFetchingUser ||
          isFetchingUserMobile
        }
      />
    </section>,
  ];

  return (
    <div className="h-full w-full">
      <CustomHeader />

      <SecondTopNav
        navigateTo="user/tambah-user"
        title="User"
        totalData={dataUser?.pagination.total ?? 0}
        isLoading={isLoadingUser || isLoadingUserMobile}
      />

      <section className="mb-[20px] w-full">
        <CustomTableTabs
          titles={titleTabs}
          contents={contentTabs}
        />
      </section>
    </div>
  );
};

export default User;
