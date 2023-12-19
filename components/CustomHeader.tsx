"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaArrowLeft, FaGear } from "react-icons/fa6";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { signOut } from "next-auth/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useProfileService } from "@/app/auth/service/auth.service";

const CustomHeader = ({}) => {
  const pathname = usePathname();
  const route = useRouter();
  const { data, isLoading, isFetching } = useProfileService();
  const loading = isLoading || isFetching;

  const path: string[] = pathname ? pathname.split("/") : [];
  const popoverBody = [
    {
      button: (
        <Link href={"/admin/profile"}>
          <Button
            borderRadius={"none"}
            py={"25px"}
            variant={"ghost"}
            width={"100%"}
            justifyContent="flex-start"
            color={"primary"}
            _hover={{
              bg: "rgba(30,82,54,0.2)",
              boxShadow: "inset 3px 0px 0px 0px rgba(30,82,54,1)",
            }}
          >
            Profil
          </Button>
        </Link>
      ),
    },
    {
      button: (
        <Link href={"/admin/notifikasi"}>
          <Button
            borderRadius={"none"}
            py={"25px"}
            variant={"ghost"}
            width={"100%"}
            justifyContent="flex-start"
            color={"primary"}
            _hover={{
              bg: "rgba(30,82,54,0.2)",
              boxShadow: "inset 3px 0px 0px 0px rgba(30,82,54,1)",
            }}
          >
            Notifikasi
          </Button>
        </Link>
      ),
    },

    {
      button: (
        <Button
          variant={"ghost"}
          width={"100%"}
          borderRadius={"none"}
          py={"25px"}
          color={"red"}
          justifyContent="flex-start"
          onClick={() => signOut()}
          _hover={{
            bg: "rgba(229,62,62,0.2)",
            boxShadow: "inset 3px 0px 0px 0px rgba(229,62,62,1)",
          }}
        >
          Keluar
        </Button>
      ),
    },
  ];
  return (
    <div className="mb-[20px] hidden w-full items-start justify-between lg:flex">
      <div className="flex w-[75%] h-full flex-col gap-y-2">
        <div className="w-fit rounded-md bg-white px-5 py-1 shadow-md">
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            {path?.slice(2).map((_, i) => {
              return (
                <BreadcrumbItem key={i} color={"primary"} isCurrentPage>
                  <BreadcrumbLink
                    href={""}
                    className="text-primary"
                    color={"primary"}
                  >
                    {_}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            })}
          </Breadcrumb>
        </div>
        <div
          className="cursor-pointer w-fit rounded bg-white p-2 shadow-md hover:bg-primary"
          onClick={() => route.back()}
        >
          <FaArrowLeft className="text-primary hover:text-white" />
        </div>
      </div>

      <div className="flex w-[25%] items-center justify-between space-x-3 rounded-lg bg-white px-5 py-3 shadow-md">
        <div className="flex w-full items-center justify-start space-x-3">
          <div className={`${loading ? "w-[30%]" : ""}`}>
            {loading ? (
              <div className="w-full">
                <Skeleton
                  height={45}
                  baseColor="#9FA1B5"
                  highlightColor="#ffffff"
                />
              </div>
            ) : (
              <Avatar name={data?.data.username} src={data?.data.avatar} />
            )}
          </div>
          {loading ? (
            <div className="w-full rounded-[15px]">
              <Skeleton
                height={20}
                count={2}
                baseColor="#9FA1B5"
                highlightColor="#ffffff"
              />
            </div>
          ) : (
            <div className="flex flex-col">
              <p className="truncate font-semibold text-primary">
                {data?.data.username}
              </p>
              <p className="text-primary">{data?.data.role_id.role_name}</p>
            </div>
          )}
        </div>

        <Popover placement="left-start" closeOnBlur={true}>
          <PopoverTrigger>
            <div className="cursor-pointer rounded-[5px] bg-primary bg-opacity-20 p-3 hover:bg-opacity-100">
              <FaGear className="text-primary hover:text-white" />
            </div>
          </PopoverTrigger>
          <PopoverContent overflow={"hidden"}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader color={"primary"}>Pengaturan</PopoverHeader>
            <PopoverBody width={"100%"} p={0}>
              <div className="flex w-full flex-col items-start">
                {popoverBody.map((_, i) => {
                  return (
                    <div className="w-full" key={i}>
                      {_.button}
                    </div>
                  );
                })}
              </div>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CustomHeader;
