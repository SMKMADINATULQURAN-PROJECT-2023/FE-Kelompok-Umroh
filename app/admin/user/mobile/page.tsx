import { CustomHeader } from "@/components";
import { NextPage } from "next";
import TableUserMobile from "../sections/tableUserMobile.section";

interface Props {}

const UserMobile: NextPage<Props> = ({}) => {
  return (
    <div className="">
      <TableUserMobile />
    </div>
  );
};

export default UserMobile;
