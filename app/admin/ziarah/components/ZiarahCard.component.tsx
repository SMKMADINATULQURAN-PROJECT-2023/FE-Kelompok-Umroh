import { NextPage } from "next";
import { Ziarah } from "../interface/ziarah.interface";
import Image from "next/image";
import HtmlRenderer from "@/hook/useMarkdownConvert";
import "dayjs/locale/id";
import dayjs from "dayjs";
import { FaMapMarkedAlt } from "react-icons/fa";
import { Avatar, Button } from "@chakra-ui/react";
import { FaRegPenToSquare, FaTrash } from "react-icons/fa6";
import RouteButton from "@/components/RouteButton";
import {
  StatusBarApproved,
  StatusBarProcessed,
  StatusBarRejected,
  StatusBarUknown,
} from "@/components/StatusBar";
import { useProfileService } from "@/app/auth/service/auth.service";

interface Props {
  data: Ziarah;
  isLoading: boolean;
  onClickDelete: any;
}

const ZiarahCard: NextPage<Props> = ({ data, isLoading, onClickDelete }) => {
  const { data: dataProfile } = useProfileService();
  const role = dataProfile?.data.role_id.role_name;
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
    <div className="flex w-full flex-col overflow-hidden rounded-[10px] bg-white shadow-md lg:flex-row">
      <div className="h-full w-full bg-cover lg:w-[30%]">
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
      <div className="flex h-full w-full flex-col justify-between p-5 lg:w-[75%]">
        <div className="mb-[20px] flex w-full flex-col items-start">
          <div className="mb-3 flex w-full items-center justify-between">
            <h1 className="truncate text-[20px] font-semibold text-primary">
              {data.name}
            </h1>
            <div className="ml-7 flex items-center space-x-2">
              <p className="text-[11px] text-primary">Status: </p>
              {statusText}
            </div>
          </div>
          <p className="line-clamp-2 text-[13px] text-primary">
            <HtmlRenderer htmlString={data.description} className="primary" />
          </p>
          <span className="mt-[10px] text-[12px] text-gray-400">
            Dibuat pada{" "}
            {dayjs(data.created_at).locale("id").format("D MMMM YYYY")} •
            Diupdate pada{" "}
            {dayjs(data.updated_at).locale("id").format("D MMMM YYYY")}
          </span>
        </div>
        <div className="flex w-full items-end justify-between">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              <div className="rounded-[5px] bg-primary p-2">
                <FaMapMarkedAlt color="white" size={15} />
              </div>
              <p className="truncate text-[13px] font-semibold text-primary">
                {data.location}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Avatar
                name={data.created_by.username}
                src={data.created_by.avatar}
                size={"sm"}
              />
              <p className="truncate text-[13px] text-primary">
                {data.created_by.username}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {role === "Admin" ? (
              <>
                <div>
                  <Button
                    width={"full"}
                    type="button"
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    h="35px"
                    backgroundColor={"red.500"}
                    _hover={{ bgColor: "red.600" }}
                    fontSize={12}
                    onClick={onClickDelete}
                  >
                    <FaTrash color="white" />
                  </Button>
                </div>
                <div>
                  <RouteButton
                    to={`ziarah/update-ziarah/${data.id}`}
                    title={<FaRegPenToSquare color="white" />}
                    h="35px"
                    width={"full"}
                    bg={"yellow.500"}
                    justifyContent="flex-start"
                    _hover={{ bg: "yellow.600" }}
                    fontSize={12}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                  />
                </div>
              </>
            ) : undefined}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZiarahCard;
