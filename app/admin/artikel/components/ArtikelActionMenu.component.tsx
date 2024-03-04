import { FC } from "react";
import { Artikel } from "../interface/artikel.interface";
import CustomMenuButton from "@/components/MenuButton";
import { Button, MenuDivider, MenuGroup, MenuItem } from "@chakra-ui/react";
import RouteButton from "@/components/RouteButton";
import {
  FaClipboardList,
  FaRegPenToSquare,
  FaTrash,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { GetProfileResponse } from "@/app/auth/interface";

interface Props {
  role: string | undefined;
  data: Artikel;
  dataProfile: GetProfileResponse | undefined;
  isLoading: boolean;
  onClickDelete: () => void;
}

const ArtikelActionMenu: FC<Props> = ({
  role,
  data,
  isLoading,
  onClickDelete,
  dataProfile,
}) => {
  return (
    <div className="flex items-center">
      {role === "Admin" ? (
        <CustomMenuButton>
          {dataProfile?.data.username === data.created_by.username ? (
            <MenuGroup title="Aksi">
              <MenuItem
                color={"yellow.500"}
                icon={<FaRegPenToSquare className="" />}
                as="a"
                href={`artikel/update-artikel/${data.id}`}
                _hover={{
                  bg: "rgba(214,158,46,0.2)",
                  boxShadow: "inset 3px 0px 0px 0px rgba(214,158,46,1)",
                }}
              >
                <RouteButton
                  title={
                    <p className="text-base font-normal capitalize text-yellow-500">
                      edit
                    </p>
                  }
                  h="35px"
                  bg={"transparent"}
                  fontSize={12}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                />
              </MenuItem>
              <MenuItem
                color={"red.500"}
                icon={<FaTrash className="" />}
                onClick={onClickDelete}
                _hover={{
                  bg: "rgba(229,62,62,0.2)",
                  boxShadow: "inset 3px 0px 0px 0px rgba(229,62,62,1)",
                }}
              >
                <Button
                  type="button"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  h="35px"
                  backgroundColor={"transparent"}
                  fontSize={12}
                >
                  <p className="text-base font-normal capitalize text-red-500">
                    hapus
                  </p>
                </Button>
              </MenuItem>
              <MenuItem
                color={"primary"}
                icon={<FaClipboardList className="" />}
                _hover={{
                  bg: "rgba(30,82,54,0.2)",
                  boxShadow: "inset 3px 0px 0px 0px rgba(30,82,54,1)",
                }}
              >
                <Button
                  type="button"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  h="35px"
                  backgroundColor={"transparent"}
                  fontSize={12}
                >
                  <p className="text-base font-normal capitalize text-primary">
                    ubah status
                  </p>
                </Button>
              </MenuItem>
            </MenuGroup>
          ) : undefined}
          <MenuDivider />
          <MenuGroup title="Lainnya">
            <MenuItem
              color={"red.500"}
              icon={<FaTriangleExclamation className="" />}
              _hover={{
                bg: "rgba(229,62,62,0.2)",
                boxShadow: "inset 3px 0px 0px 0px rgba(229,62,62,1)",
              }}
            >
              <Button
                type="button"
                isLoading={isLoading}
                isDisabled={isLoading}
                h="35px"
                backgroundColor={"transparent"}
                fontSize={12}
              >
                <p className="text-base font-normal capitalize text-red-500">
                  laporkan
                </p>
              </Button>
            </MenuItem>
          </MenuGroup>
        </CustomMenuButton>
      ) : dataProfile?.data.username === data.created_by.username ? (
        <CustomMenuButton>
          <MenuGroup title="Action">
            <MenuItem
              color={"red.500"}
              icon={<FaTrash className="" />}
              onClick={onClickDelete}
            >
              <Button
                type="button"
                isLoading={isLoading}
                isDisabled={isLoading}
                h="35px"
                backgroundColor={"transparent"}
                fontSize={12}
              >
                <p className="text-base font-normal capitalize text-red-500">
                  hapus
                </p>
              </Button>
            </MenuItem>
            <MenuItem
              color={"yellow.500"}
              icon={<FaRegPenToSquare className="" />}
              as="a"
              href={`artikel/update-artikel/${data.id}`}
            >
              <RouteButton
                title={
                  <p className="text-base font-normal capitalize text-yellow-500">
                    edit
                  </p>
                }
                h="35px"
                bg={"transparent"}
                fontSize={12}
                isLoading={isLoading}
                isDisabled={isLoading}
              />
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="Other">
            <MenuItem
              color={"red.500"}
              icon={<FaTriangleExclamation className="" />}
            >
              <Button
                type="button"
                isLoading={isLoading}
                isDisabled={isLoading}
                h="35px"
                backgroundColor={"transparent"}
                fontSize={12}
              >
                <p className="text-base font-normal capitalize text-red-500">
                  laporkan
                </p>
              </Button>
            </MenuItem>
          </MenuGroup>
        </CustomMenuButton>
      ) : undefined}
    </div>
  );
};

export default ArtikelActionMenu;
