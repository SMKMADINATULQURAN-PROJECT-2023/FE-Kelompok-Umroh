import type { NextPage } from "next";
import TableDoa from "./sections/tableDoa.section";

interface Props {}

const Doa: NextPage<Props> = () => {
  return (
    <div className="">
      <TableDoa />
    </div>
  );
};

export default Doa;
