"use client";

import CustomTableTabs from "@/components/CustomTabs";
import SecondTopNav from "@/components/SecondTopNav";
import React, { useMemo } from "react";
import useUserModule from "../service/user.service";
import CustomTable from "@/components/CustomTable";
import { adminColumns, mobileColumns } from "../userColumn";

interface Props {}

const UserSection: React.FC<Props> = ({}) => {
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

  const data = useMemo(() => {
    return {
      admin: dataUser?.data || [],
      mobile: dataUserMobile?.data || [],
    };
  }, [dataUser, dataUserMobile]);

  const isLoadingAdmin = isLoadingUser || isFetchingUser;
  const isLoadingMobile = isLoadingUserMobile || isFetchingUserMobile;

  const titleTabs = ["User Admin", "user Mobile"];
  const contentTabs = [
    <section className="w-full overflow-hidden rounded-[10px]">
      <CustomTable
        columns={adminColumns}
        data={data.admin}
        isLoadingInTable={isLoadingAdmin}
      />
    </section>,
    <section className="w-full overflow-hidden rounded-[10px]">
      <CustomTable
        columns={mobileColumns}
        data={data.mobile}
        isLoadingInTable={isLoadingMobile}
      />
    </section>,
  ];

  return (
    <div>
      <SecondTopNav
        navigateTo="user/tambah-user"
        title="User"
        totalData={dataUser?.pagination.total ?? 0}
        isLoading={isLoadingAdmin || isLoadingMobile}
        isSecondTitle
        secondTitle="User Mobile"
        totalSecondData={dataUserMobile?.pagination.total ?? 0}
      />

      <section className="mb-[20px] w-full">
        <CustomTableTabs titles={titleTabs} contents={contentTabs} />
      </section>
    </div>
  );
};

export default UserSection;
