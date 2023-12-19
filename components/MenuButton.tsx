import { FC, ReactNode } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";

interface Props {
  children: ReactNode;
}

const CustomMenuButton: FC<Props> = ({ children }) => {
  return (
    <div>
      <Menu isLazy>
        <MenuButton
          size={"sm"}
          as={IconButton}
          color={"primary"}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="solid"
          backgroundColor={"rgba(30, 82, 54, 0.2)"}
          _hover={{
            backgroundColor: "primary",
            color: "white",
          }}
        />
        <MenuList>{children}</MenuList>
      </Menu>
    </div>
  );
};

export default CustomMenuButton;
