'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import {
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaArrowLeft, FaGear } from 'react-icons/fa6';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Cookies from 'js-cookie';
import { useProfileService } from '@/app/auth/service';
import { signOut } from 'next-auth/react';

const CustomHeader = ({}) => {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useProfileService();

  const path: string[] = pathname ? pathname.split('/') : [];
  const lastPath = path[path.length - 1];
  const popoverBody = [
    {
      button: (
        <Button variant={'ghost'} width={'100%'} justifyContent="flex-start">
          Profil
        </Button>
      ),
    },
    {
      button: (
        <Button variant={'ghost'} width={'100%'} justifyContent="flex-start">
          Ubah Password
        </Button>
      ),
    },
    {
      button: (
        <Button
          variant={'ghost'}
          width={'100%'}
          bg={'red.500'}
          color={'white'}
          justifyContent="flex-start"
          _hover={{ bg: 'red.600' }}
          onClick={() => signOut()}
        >
          Keluar
        </Button>
      ),
    },
  ];
  return (
    <div className="w-full flex items-center justify-between mb-[20px]">
      <div className="flex flex-col w-[75%]">
        <div className="bg-primary w-fit py-1 px-5 rounded-[5px]">
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
          >
            {path?.slice(2).map((_, i) => {
              return (
                <BreadcrumbItem key={i} color={'#ffffff'} isCurrentPage>
                  <BreadcrumbLink
                    href={''}
                    className="text-primary"
                    color={'#ffffff'}
                  >
                    {_}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              );
            })}
          </Breadcrumb>
        </div>
        <div className="flex items-center space-x-3 h-fit w-full">
          <div
            className={`${
              path.length > 3 ? '' : 'w-[7px]'
            } h-[30px]  bg-primary rounded-[5px]`}
          >
            {path.length > 3 ? (
              <div
                onClick={() => router.back()}
                className="flex px-4 cursor-pointer items-center justify-center h-full w-full"
              >
                <FaArrowLeft />
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <h1 className="font-semibold text-[25px] items-center capitalize">
            {lastPath?.replace(/-/g, ' ')}
          </h1>
        </div>
      </div>

      <div className="rounded-[10px] py-3 bg-primary  w-[25%] px-5 flex justify-between items-center space-x-3">
        <div className="flex justify-start items-center space-x-3">
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
              {' '}
              <FaGear color="#262a56" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Pengaturan</PopoverHeader>
            <PopoverBody width={'100%'}>
              <div className="flex flex-col items-start w-full space-y-3">
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
