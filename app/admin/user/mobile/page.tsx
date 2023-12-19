import { CustomHeader } from "@/components";
import { NextPage } from "next";
import TableUserMobile from "../sections/tableUserMobile.section";

interface Props {}

const UserMobile: NextPage<Props> = ({}) => {
  return (
    <div className="h-full w-full">
      <CustomHeader />
      <TableUserMobile />
    </div>
  );
};

export default UserMobile;
