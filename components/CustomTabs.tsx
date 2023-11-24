import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  Input,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { FaFilter } from "react-icons/fa6";

interface TabProps {
  titles: (string | number | any)[];
  contents: any[];
  searchValues?: any;
  searchHandleChange?: any;
  searchHandleBlur?: any;
  searchIsInvalid?: any;
  searchErrorMessage?: any;
  searchTitle?: any;
  searchId?: any;
}

const CustomTableTabs: React.FC<TabProps> = ({
  contents,
  titles,
  searchValues,
  searchHandleChange,
  searchHandleBlur,
  searchIsInvalid,
  searchErrorMessage,
  searchTitle,
  searchId,
  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div className="w-full">
      <Tabs>
        <div className="mb-[20px] flex w-full items-center justify-between">
          <TabList className={"flex w-full items-center space-x-3"}>
            {titles.map((title, index) => (
              <Tab
                key={index}
                selectedClassName="bg-primary hover:bg-primary text-white lg:w-[18%] w-[45%]"
                className={
                  "w-[40%] cursor-pointer rounded-[5px] border border-primary py-2 text-center text-primary hover:bg-primary hover:text-white lg:w-[15%]"
                }
              >
                {title}
              </Tab>
            ))}
          </TabList>

          <div>
            <IconButton
              aria-label="Filter menu"
              ref={btnRef}
              onClick={onOpen}
              variant="outline"
              border={"1px solid #262a56"}
              bg={isOpen ? "#262a56" : "transparent"}
              icon={<FaFilter color={isOpen ? "white" : "#262a56"} />}
            />
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Filter</DrawerHeader>

                <DrawerBody>
                  <Input placeholder="Type here..." />
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Batal
                  </Button>
                  <Button colorScheme="blue">Terapkan</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            {/* <FormControl isInvalid={searchIsInvalid}>
              <InputGroup>
                <Input
                  width={"300px"}
                  as="input"
                  type={"search"}
                  id={searchId}
                  value={searchValues}
                  onChange={searchHandleChange}
                  onBlur={searchHandleBlur}
                  color={"#000000"}
                  backgroundColor={"white"}
                  border={'1px solid #262A56'}
                  _hover={{ backgroundColor: "#ffffff", width: '350px' }}
                  variant="outline"
                  placeholder={`Cari Sesuatu...`}
                  {...props}
                />
              </InputGroup>

              <FormErrorMessage size={"xs"} color={"red"} fontWeight="">
                {searchErrorMessage}
              </FormErrorMessage>
            </FormControl> */}
          </div>
        </div>

        <div className="w-full">
          {contents.map((content, index) => (
            <TabPanel key={index}>{content}</TabPanel>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export default CustomTableTabs;
