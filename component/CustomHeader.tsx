"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
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
import Cookies from "js-cookie";
import { useProfileService } from "@/app/auth/service/auth.service";
import { signOut } from "next-auth/react";

const CustomHeader = ({}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useProfileService();

  const path: string[] = pathname ? pathname.split("/") : [];
  const lastPath = path[path.length - 1];
  const popoverBody = [
    {
      button: (
        <Link href={"/admin/profile"}>
          <Button variant={"ghost"} width={"100%"} justifyContent="flex-start">
            Profil
          </Button>
        </Link>
      ),
    },
    {
      button: (
        <Link href={"/admin/notifikasi"}>
          <Button variant={"ghost"} width={"100%"} justifyContent="flex-start">
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
          bg={"red.500"}
          color={"white"}
          justifyContent="flex-start"
          _hover={{ bg: "red.600" }}
          onClick={() => signOut()}
        >
          Keluar
        </Button>
      ),
    },
  ];
  return (
    <div className="mb-[20px] flex w-full items-center justify-between">
      <div className="flex w-[75%] flex-col">
        <div className="w-fit rounded-[5px] bg-primary px-5 py-1">
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            {path?.slice(2).map((_, i) => {
              return (
                <BreadcrumbItem key={i} color={"#ffffff"} isCurrentPage>
                  <BreadcrumbLink
                    href={""}
                    className="text-primary"
                    color={"#ffffff"}
                  >
                    {_}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            })}
          </Breadcrumb>
        </div>
        <div className="flex h-fit w-full items-center space-x-3">
          <div
            className={`${
              path.length > 3 ? "" : "w-[7px]"
            } h-[30px]  rounded-[5px] bg-primary`}
          >
            {path.length > 3 ? (
              <div
                onClick={() => router.back()}
                className="flex h-full w-full cursor-pointer items-center justify-center px-4"
              >
                <FaArrowLeft color="white"/>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <h1 className="items-center text-[25px] font-semibold capitalize text-primary truncate">
            {lastPath?.replace(/-/g, " ")}
          </h1>
        </div>
      </div>

      <div className="flex w-[25%] items-center  justify-between space-x-3 rounded-[10px] bg-primary px-5 py-3">
        <div className="flex items-center justify-start space-x-3">
          <div>
            <Avatar name={data?.data.username} src={data?.data.avatar} />
          </div>
          <div className="flex flex-col">
            <p className="text-white">{data?.data.username}</p>
            <p className="text-white">{data?.data.role_id.role_name}</p>
          </div>
        </div>

        <Popover placement="left-start" closeOnBlur={true}>
          <PopoverTrigger>
            <Button bg="#ffffff">
              {" "}
              <FaGear color="#262a56" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Pengaturan</PopoverHeader>
            <PopoverBody width={"100%"}>
              <div className="flex w-full flex-col items-start space-y-3">
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
