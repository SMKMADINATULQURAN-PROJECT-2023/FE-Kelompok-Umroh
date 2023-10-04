"use client";
import { CustomHeader } from "@/component";
import CustomButton from "@/component/CustomButton";
import fakeData from "./MOCK_DATA.json";

import type { NextPage } from "next";
import React, { useMemo } from "react";
import { FaRegPenToSquare, FaSquarePlus, FaTrash } from "react-icons/fa6";
import CustomTable from "@/component/CustomTable";
import RouteButton from "@/component/RouteButton";
import { Avatar, Button } from "@chakra-ui/react";
import useUserModule from "./service/user.service";
const User: NextPage = () => {
  const { useGetUserAdmin } = useUserModule();
  const {
    data: dataUser,
    isFetching: isFetchingUser,
    isLoading: isLoadingUser,
  } = useGetUserAdmin();

  console.log("user", dataUser);
  const columns = [
    {
      Header: "ID",
      accessor: 'id',
    },
    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Avatar",
      accessor: "avatar",
      Cell: ({ value }: { value: string }) => {
        return <Avatar src={value} name={value}/>;
      },
    },
    {
      Header: "Role",
      accessor: "role_id.role_name",
    },
  ];

  const data = useMemo(() => dataUser?.data || [], [dataUser]);
  return (
    <div className="h-full w-full">
      <CustomHeader />

      <section className="mb-[20px] flex w-full items-center justify-between rounded-[10px] bg-primary p-5">
        <div className="flex flex-col items-start">
          <p className="mb-2 text-[20px] font-semibold text-white">
            Pengguna{" "}
            <span className="rounded-[22px] bg-[#ffffff65] px-2 py-1 text-[13px] font-normal text-white">
              {dataUser?.pagination.total} Pengguna
            </span>
          </p>
          <p className="text-white">List pengguna aktif. Lakukan perubahan</p>
        </div>
        <div>
          <RouteButton
            to={"user/tambah-user"}
            title="Tambah User"
            width={"100%"}
            bg={"blue.500"}
            color={"white"}
            justifyContent="flex-start"
            _hover={{ bg: "blue.600" }}
            leftIcon={<FaSquarePlus color="#ffffff" />}
          />
        </div>
      </section>

      <section className="h-[600px] overflow-hidden rounded-[10px] border-2 border-primary">
        <CustomTable
          columns={columns}
          data={data}
          actionColumn
          actionData={
            <div className="flex w-full flex-col space-y-2">
              <RouteButton
                to={"ziarah/edit-ziarah"}
                title={<FaRegPenToSquare color="#ffffff" />}
                h="35px"
                width={"full"}
                bg={"yellow.500"}
                color={"white"}
                _hover={{ bg: "yellow.600" }}
                fontSize={12}
              />
              <Button
                width={"full"}
                type="button"
                isLoading={isLoadingUser}
                isDisabled={isLoadingUser}
                h="35px"
                backgroundColor={"red.500"}
                color={"#ffffff"}
                _hover={{ bgColor: "red.600" }}
                fontSize={12}
              >
                <FaTrash color="#ffffff" />
              </Button>
            </div>
          }
        />
      </section>
    </div>
  );
};

export default User;
