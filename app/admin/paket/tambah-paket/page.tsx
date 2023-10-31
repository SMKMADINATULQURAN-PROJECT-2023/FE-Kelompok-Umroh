import { CustomHeader } from "@/component";
import { NextPage } from "next";

interface Props {}

const TambahPaket: NextPage<Props> = ({}) => {
  return (
    <div className="h-full w-full ">
      <CustomHeader />
    </div>
  );
};

export default TambahPaket;
