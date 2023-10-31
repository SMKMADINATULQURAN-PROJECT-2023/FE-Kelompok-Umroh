import { NextPage } from "next";
import { Ziarah } from "../interface/ziarah.interface";
import Image from "next/image";
import HtmlRenderer from "@/hook/useMarkdownConvert";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import RouteButton from "@/component/RouteButton";
import {
  StatusBarApproved,
  StatusBarProcessed,
  StatusBarRejected,
  StatusBarUknown,
} from "@/component/StatusBar";

interface Props {
  data: Ziarah;
  isLoading: boolean;
  onClickDelete: any;
}

const ZiarahCard: NextPage<Props> = ({ data, isLoading, onClickDelete }) => {
  let statusText;

  switch (data.status) {
    case "Pending":
      statusText = <StatusBarProcessed />;
      break;
    case "Reject":
      statusText = <StatusBarRejected />;
      break;
    case "Accept":
      statusText = <StatusBarApproved />;
      break;
    default:
      statusText = <StatusBarUknown />;
      break;
  }
  return (
    <div className="flex w-full overflow-hidden rounded-[10px] border border-primary bg-primary">
      <div className="h-full w-[30%] bg-cover">
        <Image
          width="0"
          height="0"
          sizes="100vw"
          className="h-full w-full bg-cover"
          quality={100}
          loading="eager"
          style={{ objectFit: "cover", overflow: "hidden" }}
          alt={data.name}
          src={data.thumbnail}
        />
      </div>
      <div className="flex h-full w-[75%] flex-col justify-between p-5">
        <div className="mb-[20px] flex w-full flex-col items-start">
          <div className="mb-3 flex w-full items-center justify-between">
            <h1 className="truncate text-[20px] font-semibold text-white">
              {data.name}
            </h1>
            <div className="flex items-center space-x-2">
              <p className="text-[11px] text-white">Status: </p>
              {statusText}
            </div>
          </div>
          <p className="line-clamp-2 text-[13px] text-white">
            <HtmlRenderer htmlString={data.description} className="putih" />
          </p>
          <span className="mt-[10px] text-[12px] text-gray-400">
            Dibuat pada{" "}
            {dayjs(data.created_at).locale("id").format("D MMMM YYYY")} •
            Diupdate pada{" "}
            {dayjs(data.updated_at).locale("id").format("D MMMM YYYY")}
          </span>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="rounded-[5px] bg-white p-2">
              <FaMapMarkedAlt color="#262a56" size={19} />
            </div>
            <p className="truncate text-[13px] font-semibold text-white">
              {data.location}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div>
              <Button
                width={"full"}
                type="button"
                isLoading={isLoading}
                isDisabled={isLoading}
                h="35px"
                backgroundColor={"red.500"}
                color={"#ffffff"}
                _hover={{ bgColor: "red.600" }}
                fontSize={12}
                onClick={onClickDelete}
              >
                <FaTrash color="#ffffff" />
              </Button>
            </div>
            <div>
              <RouteButton
                to={`ziarah/update-ziarah/${data.id}`}
                title={<FaRegPenToSquare color="#ffffff" />}
                h="35px"
                width={"full"}
                bg={"yellow.500"}
                color={"white"}
                justifyContent="flex-start"
                _hover={{ bg: "yellow.600" }}
                fontSize={12}
                isLoading={isLoading}
                isDisabled={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZiarahCard;
