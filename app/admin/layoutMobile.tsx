import React from "react";
import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaBars, FaPenToSquare } from "react-icons/fa6";
import { useProfileService } from "../auth/service/auth.service";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { signOut } from "next-auth/react";
import { IconType } from "react-icons/lib";

interface DashMenu {
  nav: string;
  isDisabled: boolean;
  to: string;
  icon: JSX.Element | IconType;
}

interface Props {
  data: Array<DashMenu>;
  currentNav: string | undefined;
}

const LayoutMobile: React.FC<Props> = ({ data, currentNav }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: dataProfile, isLoading, isFetching } = useProfileService();
  const loading = isLoading || isFetching;

  return (
    <div className="block lg:hidden">
      <>
        <Drawer placement={"top"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader mb={10}>
              <div className="flex w-full items-center justify-between space-x-3 py-3">
                <div className="flex w-full items-center justify-start space-x-3">
                  <div className={`${loading ? "w-[30%]" : ""}`}>
                    {loading ? (
                      <div className="w-full">
                        <Skeleton
                          height={45}
                          baseColor="#9FA1B5"
                          highlightColor="#ffffff"
                        />
                      </div>
                    ) : (
                      <Avatar
                        name={dataProfile?.data.username}
                        src={dataProfile?.data.avatar}
                      />
                    )}
                  </div>
                  {loading ? (
                    <div className="w-full rounded-[15px]">
                      <Skeleton
                        height={20}
                        count={2}
                        baseColor="#9FA1B5"
                        highlightColor="#ffffff"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <p className="text-[15px] font-semibold text-primary">
                        {dataProfile?.data.username}
                      </p>
                      <p className="text-[15px] font-normal text-primary">
                        {dataProfile?.data.role_id.role_name}
                      </p>
                    </div>
                  )}
                </div>

                <Link href={"/admin/profile"} onClick={onClose}>
                  <IconButton
                    p={3}
                    aria-label="Filter menu"
                    onClick={onOpen}
                    variant="solid"
                    bg={"#262A56"}
                    icon={<FaPenToSquare color="white" />}
                  />
                </Link>
              </div>
            </DrawerHeader>

            <DrawerBody p={5}>
              <div className="w-full">
                <div className="mb-10 grid w-full grid-cols-2 gap-5">
                  {data.map((_, i) => {
                    const isSelected = currentNav === _.nav;
                    return (
                      <Link
                        href={`/admin/${_.nav.toLowerCase()}`}
                        key={i}
                        onClick={onClose}
                      >
                        <Button
                          fontSize={15}
                          key={i}
                          width={"full"}
                          type="button"
                          height="50px"
                          transition="all 200ms ease-in-out"
                          isDisabled={_.isDisabled}
                          textTransform="capitalize"
                          border={"1px solid #262a56"}
                          color={isSelected ? "white" : "#262a56"}
                          variant={isSelected ? "solid" : "outline"}
                          backgroundColor={
                            isSelected ? "#262a56" : "transparent"
                          }
                          _hover={{
                            backgroundColor: "#262a56",
                            transition: "all 200ms ease-in-out",
                            color: "white",
                          }}
                        >
                          {_.nav}
                        </Button>
                      </Link>
                    );
                  })}
                </div>
                <div className="w-full grid-cols-1">
                  <Button
                    fontSize={15}
                    width={"full"}
                    type="button"
                    height="50px"
                    transition="all 200ms ease-in-out"
                    textTransform="uppercase"
                    border={"1px solid red"}
                    color={"red"}
                    variant={"outline"}
                    backgroundColor={"transparent"}
                    _hover={{
                      backgroundColor: "red",
                      transition: "all 200ms ease-in-out",
                      color: "white",
                    }}
                    _active={{
                      backgroundColor: "red",
                      transition: "all 200ms ease-in-out",
                      color: "white",
                    }}
                    onClick={() => signOut()}
                  >
                    keluar
                  </Button>
                </div>
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>

      <section
        onClick={onOpen}
        className={`${
          isOpen ? "translate-x-40 rotate-180" : "translate-x-0 rotate-0"
        } fixed right-8 top-8 z-[900] block cursor-pointer rounded-full border border-primary bg-white p-3 text-white shadow-lg duration-[1.2s] lg:hidden`}
      >
        <FaBars color="#262a56" />
      </section>
    </div>
  );
};

export default LayoutMobile;
