"use client";
import { CustomHeader } from "@/component";
import type { NextPage } from "next";
import useZiarahModule from "./service/ziarah.service";
import Skeleton from "react-loading-skeleton";
import "dayjs/locale/id";
import ZiarahCard from "./components/ZiarahCard.component";
import SecondTopNav from "@/component/SecondTopNav";
import 'react-loading-skeleton/dist/skeleton.css'

const Ziarah: NextPage = () => {
  const { useGetZiarah, useDeleteZiarah } = useZiarahModule();
  const {
    data: dataZiarah,
    isError: isErrorZiarah,
    isFetching: isFetchingZiarah,
    isLoading: isLoadingZiarah,
    refetch: refetchZiarah,
  } = useGetZiarah();
  const { isLoading: isLoadingDelete, mutate } = useDeleteZiarah();

  const onDelete = async (id: any) => {
    console.log(id);
    mutate(id, {
      onSuccess: () => {
        return refetchZiarah();
      },
    });
  };
  return (
    <div className="h-full w-full">
      <CustomHeader />

      <SecondTopNav
        navigateTo="ziarah/tambah-ziarah"
        title="Ziarah"
        totalData={dataZiarah?.pagination.total ?? 0}
        isLoading={isLoadingDelete || isLoadingZiarah}
      />

      <section className="grid w-full grid-cols-2 grid-rows-3 gap-4">
        {isErrorZiarah ? (
          <p>Terjadi kesalahan</p>
        ) : isFetchingZiarah || isLoadingZiarah ? (
          Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="w-full rounded-[15px]">
            <Skeleton height={200} baseColor="#9FA1B5" highlightColor="#1c1e3b"/>
          </div>
          ))
        ) : dataZiarah?.pagination.total === 0 ? (
          <p>Tidak ada data</p>
        ) : (
          dataZiarah?.data.map((item, i) => {
            return (
              <ZiarahCard
                data={item}
                isLoading={isLoadingDelete || isLoadingZiarah}
                key={item.id}
                onClickDelete={() => onDelete(item.id)}
              />
            );
          })
        )}
      </section>
    </div>
  );
};

export default Ziarah;
