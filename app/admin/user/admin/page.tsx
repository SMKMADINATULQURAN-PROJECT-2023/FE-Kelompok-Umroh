import { NextPage } from "next";
import TableUserAdmin from "../sections/tableUserAdmin.section";

interface Props {}

const UserAdmin: NextPage<Props> = ({}) => {
  return (
    <div className="">
      <TableUserAdmin />
    </div>
  );
};

export default UserAdmin;
