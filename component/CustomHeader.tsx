'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react';
import { FaGear } from "react-icons/fa6";

const CustomHeader = ({}) => {
  const pathname = usePathname();
  const router = useRouter();

  const path: string[] = pathname ? pathname.split('/') : [];
  const lastPath = path[path.length - 1];

  console.log(path);

  return (
    <div className="w-full flex items-center justify-between mb-[20px]">
      <div className="flex flex-col">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href={'admin'}>{'admin'}</BreadcrumbLink>
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
        <div className="bg-white rounded-[10px] p-3 cursor-pointer">
          <FaGear color='#262a56'/>
        </div>
      </div>
    </div>
  );
};

export default CustomHeader;
