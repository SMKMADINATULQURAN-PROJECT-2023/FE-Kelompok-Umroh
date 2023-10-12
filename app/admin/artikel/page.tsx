"use client";
import type { NextPage } from "next";
import { CustomHeader } from "@/component";
import RouteButton from "@/component/RouteButton";
import { Avatar, Button } from "@chakra-ui/react";
import Image from "next/image";
import { FaRegPenToSquare, FaSquarePlus, FaTrash } from "react-icons/fa6";
import {
  StatusBarApproved,
  StatusBarProcessed,
  StatusBarRejected,
} from "@/component/StatusBar";
import useArtikelModule from "./service/artikel.service";
import Skeleton from "react-loading-skeleton";
import HtmlRenderer from "@/hook/useMarkdownConvert";
import dayjs from "dayjs";
import "dayjs/locale/id";

const Artikel: NextPage = () => {
  const { useGetArtikel, useDeleteArtikel } = useArtikelModule();
  const { isLoading: isLoadingDelete, mutate } = useDeleteArtikel();
  const {
    data: dataArtikel,
    isFetching: isFetchingArtikel,
    isLoading: isLoadingArtikel,
    isError: isErrorArtikel,
    refetch: refetchArtikel,
  } = useGetArtikel();

  console.log("artikel", dataArtikel);
  const loadingTitle = (
    <h1 className="mb-2 text-[20px] font-semibold text-white">
      <Skeleton width={150} />
    </h1>
  );

  const onDelete = async (id: any) => {
    console.log(id);
    mutate(id, {
      onSuccess: () => {
        return refetchArtikel();
      },
    });
  };

  return (
    <div className="h-full w-full">
      <CustomHeader />

      <section className="mb-[20px] flex w-full items-center justify-between rounded-[10px] bg-primary p-5">
        <div className="flex flex-col items-start">
          {isLoadingArtikel ? (
            loadingTitle
          ) : (
            <p className="mb-2 text-[20px] font-semibold text-white">
              Artikel{" "}
              <span className="rounded-[22px] bg-[#ffffff65] px-2 py-1 text-[13px] font-normal text-white">
                {dataArtikel?.pagination.total} Artikel
              </span>
            </p>
          )}
          <p className="text-white">List artikel. Lakukan perubahan</p>
        </div>
        <div>
          <RouteButton
            to={"artikel/tambah-artikel"}
            title="Tambah Artikel"
            width={"100%"}
            bg={"blue.500"}
            color={"white"}
            justifyContent="flex-start"
            _hover={{ bg: "blue.600" }}
            leftIcon={<FaSquarePlus color="#ffffff" />}
          />
        </div>
      </section>

      <section className="grid w-full grid-cols-2 grid-rows-3 gap-4">
        {isErrorArtikel ? (
          <p>Terjadi kesalahan</p>
        ) : isFetchingArtikel || isLoadingArtikel ? (
          Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="flex w-full overflow-hidden rounded-[10px]">
              <Skeleton height={200} count={1} />
            </div>
          ))
        ) : dataArtikel?.pagination.total === 0 ? (
          <p>Tidak ada data</p>
        ) : (
          dataArtikel?.data.map((item, i) => (
            <div
              key={i}
              className="flex w-full overflow-hidden rounded-[10px] border border-primary bg-primary"
            >
              <div className="h-full w-[30%] bg-cover">
                <Image
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="h-full w-full bg-cover"
                  quality={100}
                  loading="eager"
                  style={{ objectFit: "cover", overflow: "hidden" }}
                  alt={item.title}
                  src={item.thumbnail}
                />
              </div>
              <div className="flex h-full w-[70%] flex-col justify-between p-5">
                <div className="mb-[20px] flex w-full flex-col items-start">
                  <div className="mb-3 flex w-full items-center justify-between">
                    <h1 className="truncate text-[20px] font-semibold text-white">
                      {item.title}
                    </h1>
                    <div className="flex items-center space-x-2">
                      <p className="ml-3 text-[11px] text-white">Status: </p>
                      <StatusBarApproved />
                    </div>
                  </div>
                  <p className="line-clamp-2 text-[13px] text-white">
                    <HtmlRenderer
                      htmlString={item.description}
                      className="putih"
                    />
                  </p>
                  <span className="mt-[10px] text-[12px] text-gray-400">
                    {dayjs(item.created_at).locale("id").format("D MMMM YYYY")}{" "}
                    •{" "}
                    {dayjs(item.updated_at).locale("id").format("D MMMM YYYY")}
                  </span>
                </div>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar
                      name={item.created_by.username}
                      src={item.created_by.avatar}
                      size={"sm"}
                    />
                    <p className="truncate text-[13px] text-white">
                      {item.created_by.username}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div>
                      <Button
                        width={"full"}
                        type="button"
                        isLoading={isLoadingArtikel || isLoadingDelete}
                        isDisabled={isLoadingArtikel || isLoadingDelete}
                        h="35px"
                        backgroundColor={"red.500"}
                        color={"#ffffff"}
                        _hover={{ bgColor: "red.600" }}
                        fontSize={12}
                        onClick={() => onDelete(item.id)}
                      >
                        <FaTrash color="#ffffff" />
                      </Button>
                    </div>
                    <div>
                      <RouteButton
                        to={`artikel/update-artikel/${item.id}`}
                        title={<FaRegPenToSquare color="#ffffff" />}
                        isLoading={isLoadingArtikel || isLoadingDelete}
                        isDisabled={isLoadingArtikel || isLoadingDelete}
                        h="35px"
                        width={"full"}
                        bg={"yellow.500"}
                        color={"white"}
                        justifyContent="flex-start"
                        _hover={{ bg: "yellow.600" }}
                        fontSize={12}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Artikel;
