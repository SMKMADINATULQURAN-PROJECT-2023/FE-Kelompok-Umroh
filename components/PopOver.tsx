import { FC, ReactNode } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
} from "@chakra-ui/react";
import { FaGear } from "react-icons/fa6";

interface Props {
  children: ReactNode;
}

const PopOver: FC<Props> = ({ children }) => {
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Button bg="primary" size={"sm"} _hover={{ bg: "secondary" }}>
            <FaGear color="white" className="text-[12px]" />
          </Button>
        </PopoverTrigger>

        <PopoverContent border={"primary"}>
          <PopoverArrow borderTop={"primary"} borderLeft={"primary"}/>
          <PopoverHeader>Action</PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody>{children}</PopoverBody>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopOver;
