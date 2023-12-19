import { CustomHeader } from "@/components";
import type { NextPage } from "next";
import TableDoa from "./sections/tableDoa.section";

interface Props {}

const Doa: NextPage<Props> = () => {
  return (
    <div className="h-full w-full">
      <CustomHeader />
      <TableDoa />
    </div>
  );
};

export default Doa;
