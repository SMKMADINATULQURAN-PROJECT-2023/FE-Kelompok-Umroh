import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from "@chakra-ui/react";

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
  return (
    <div className="w-full">
      <Tabs>
        <div className="mb-[20px] flex w-full items-center justify-between">
          <TabList className={"flex w-full items-center space-x-3"}>
            {titles.map((title, index) => (
              <Tab
                key={index}
                selectedClassName="bg-primary hover:bg-primary text-white w-[18%]"
                className={
                  "w-[15%] cursor-pointer rounded-[5px] border border-primary py-2 text-center text-primary hover:bg-primary hover:text-white"
                }
              >
                {title}
              </Tab>
            ))}
          </TabList>

          <div>
            <FormControl isInvalid={searchIsInvalid}>
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
            </FormControl>
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