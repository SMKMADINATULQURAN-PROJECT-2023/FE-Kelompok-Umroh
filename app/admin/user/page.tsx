import { CustomHeader } from "@/component";
import CustomButton from "@/component/CustomButton";
import { AddIcon } from "@chakra-ui/icons";
import { Icon } from "@chakra-ui/react";

import type { NextPage } from "next";
import { FaSquarePlus } from "react-icons/fa6";

const User: NextPage = () => {
  return (
    <div className="w-full h-full">
      <CustomHeader />

      <section className="w-full rounded-[10px] bg-primary p-5 flex items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-white text-[20px] font-semibold mb-2">
            Users{" "}
            <span className="text-white font-normal text-[13px] bg-[#ffffff65] rounded-[22px] py-1 px-2">
              60 users
            </span>
          </p>
          <p className="text-white">List user aktif dan lakukan perubahan</p>
        </div>
        <div>
          <CustomButton
            title="Tambah User"
            variant={"ghost"}
            width={"100%"}
            bg={"blue.500"}
            color={"white"}
            justifyContent="flex-start"
            _hover={{ bg: "blue.600" }}
            leftIcon={<FaSquarePlus color="#ffffff" />}
          />
        </div>
      </section>
    </div>
  );
};

export default User;
