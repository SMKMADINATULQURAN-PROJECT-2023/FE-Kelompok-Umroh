import { CustomHeader } from "@/components";
import { NextPage } from "next";
import TableUserAdmin from "../sections/tableUserAdmin.section";

interface Props {}

const UserAdmin: NextPage<Props> = ({}) => {
  return (
    <div className="h-full w-full">
      <CustomHeader />
      <TableUserAdmin />
    </div>
  );
};

export default UserAdmin;
