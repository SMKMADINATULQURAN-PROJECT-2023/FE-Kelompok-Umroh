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
import { FaGear } from "react-icons/fa6";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

const CustomHeader = ({}) => {
  const pathname = usePathname();
  const router = useRouter();

  const path: string[] = pathname ? pathname.split("/") : [];
  const lastPath = path[path.length - 1];
  const popoverBody = [
    {
      button: (
        <Button variant={"ghost"} width={"100%"} justifyContent="flex-start">
          Edit Profile
        </Button>
      ),
    },
    {
      button: (
        <Button variant={"ghost"} width={"100%"} bg={'red.500'} color={'white'} justifyContent="flex-start" _hover={{bg: 'red.600'}}>
          Logout
        </Button>
      ),
    },
  ];
  return (
    <div className="w-full flex items-center justify-between mb-[20px]">
      <div className="flex flex-col">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={"admin"}>{"admin"}</BreadcrumbLink>
          </BreadcrumbItem>
          {path?.slice(2).map((_, i) => {
            return (
              <BreadcrumbItem key={i}>
                <BreadcrumbLink href={_}>{_}</BreadcrumbLink>
              </BreadcrumbItem>
            );
          })}
        </Breadcrumb>
        <h1 className="font-semibold text-[20px]">{lastPath}</h1>
      </div>

      <div className="rounded-[10px] py-3 bg-primary  w-[25%] px-5 flex justify-between items-center space-x-3">
        <div className="flex justify-start items-center space-x-3">
          <div>
            <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
          </div>
          <div className="flex flex-col">
            <p className="text-white">Username</p>
            <p className="text-white">Role</p>
          </div>
        </div>

        <Popover placement="left-start" closeOnBlur={true}>
          <PopoverTrigger>
            <Button>
              {" "}
              <FaGear color="#262a56" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>User Setting</PopoverHeader>
            <PopoverBody>
              <div className="flex flex-col items-start w-full space-y-3">
                {popoverBody.map((_, i) => {
                  return <>{_.button}</>;
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
