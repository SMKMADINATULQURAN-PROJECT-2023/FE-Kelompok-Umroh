import React from "react";
import totalDataDashboardModule from "../service/totalData.service";
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Parallax } from "swiper/modules";
import "react-loading-skeleton/dist/skeleton.css";
import "swiper/css";

interface Props {}

const SummaryData: React.FC<Props> = ({}) => {
  const { isLoading, totalItem } = totalDataDashboardModule();

  const firstRowItems = totalItem.slice(0, 4);
  const secondRowItems = totalItem.slice(4);

  return (
    <section className="mb-[50px] space-y-5 px-5 lg:mb-[20px] lg:px-0">
      <div className="hidden grid-cols-4 gap-5 lg:grid">
        {firstRowItems.map((_, i) => (
          <div
            key={i}
            className="flex w-full items-center justify-between rounded-[10px] bg-white p-5 shadow-md"
          >
            <div className="flex flex-col items-start">
              <p className="text-abu">{_.item}</p>
              {isLoading ? (
                <div
                  className={`${isLoading ? "w-14" : "w-full"} rounded-[15px]`}
                >
                  <Skeleton
                    height={25}
                    baseColor="#9FA1B5"
                    highlightColor="#ffffff"
                  />
                </div>
              ) : (
                <p className="text-[20px] font-bold text-primary">{_.total}</p>
              )}
            </div>
            <div className="rounded-[5px] bg-primary p-3">{_.icon}</div>
          </div>
        ))}
      </div>
      <div className="block lg:hidden">
        <Swiper
          spaceBetween={20}
          slidesPerView={2}
          modules={[Autoplay, FreeMode]}
          autoplay={{
            pauseOnMouseEnter: false,
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          freeMode={true}
        >
          {firstRowItems.map((_, i) => (
            <SwiperSlide key={i}>
              <div className="flex w-full items-center justify-between rounded-[10px] bg-white p-5 shadow-md">
                <div className="flex flex-col items-start">
                  <p className="text-[13px] text-abu lg:text-[16px]">
                    {_.item}
                  </p>
                  {isLoading ? (
                    <div
                      className={`${
                        isLoading ? "w-14" : "w-full"
                      } rounded-[15px]`}
                    >
                      <Skeleton
                        height={25}
                        baseColor="#9FA1B5"
                        highlightColor="#ffffff"
                      />
                    </div>
                  ) : (
                    <p className="text-[17px] font-bold text-primary lg:text-[20px]">
                      {_.total}
                    </p>
                  )}
                </div>
                {/* <div className="rounded-[5px] bg-white p-3">{_.icon}</div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="hidden grid-cols-3 gap-5 lg:grid">
        {secondRowItems.map((_, i) => (
          <div
            key={i}
            className="flex w-full items-center justify-between rounded-[10px] bg-white p-5 shadow-md"
          >
            <div className="flex flex-col items-start">
              <p className="text-abu">{_.item}</p>
              {isLoading ? (
                <div
                  className={`${isLoading ? "w-14" : "w-full"} rounded-[15px]`}
                >
                  <Skeleton
                    height={25}
                    baseColor="#9FA1B5"
                    highlightColor="#ffffff"
                  />
                </div>
              ) : (
                <p className="text-[20px] font-bold text-primary">{_.total}</p>
              )}
            </div>
            <div className="rounded-[5px] bg-primary p-3">{_.icon}</div>
          </div>
        ))}
      </div>
      <div className="block lg:hidden">
        <Swiper
          spaceBetween={20}
          slidesPerView={2}
          modules={[Autoplay, FreeMode]}
          autoplay={{
            pauseOnMouseEnter: false,
            delay: 3200,
            disableOnInteraction: false,
          }}
          loop={true}
          freeMode={true}
        >
          {secondRowItems.map((_, i) => (
            <SwiperSlide key={i}>
              <div className="flex h-3 w-full items-start rounded-[10px] bg-white p-5 shadow-md">
                <div className="flex h-full flex-col items-start justify-between">
                  <p className="text-[13px] text-abu lg:text-[16px]">
                    {_.item}
                  </p>
                  {isLoading ? (
                    <div
                      className={`${
                        isLoading ? "w-14" : "w-full"
                      } rounded-[15px]`}
                    >
                      <Skeleton
                        height={25}
                        baseColor="#9FA1B5"
                        highlightColor="#ffffff"
                      />
                    </div>
                  ) : (
                    <p className="text-[17px] font-bold text-primary lg:text-[20px]">
                      {_.total}
                    </p>
                  )}
                </div>
                {/* <div className="rounded-[5px] bg-white p-3">{_.icon}</div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SummaryData;
