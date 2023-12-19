import { CustomHeader } from "@/components";
import { NextPage } from "next";
import TableKategoriDoa from "../sections/tableKategoriDoa.section";

interface Props {}

const KategoriDoa: NextPage<Props> = ({}) => {
  return (
    <div className="h-full w-full">
      <CustomHeader />
      <TableKategoriDoa />
    </div>
  );
};

export default KategoriDoa;
