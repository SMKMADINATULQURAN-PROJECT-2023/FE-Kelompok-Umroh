import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import CustomDrawer from "./CustomDrawer";

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
                selectedClassName="bg-primary hover:bg-primary text-white lg:w-[18%] w-[45%]"
                className={
                  "w-[40%] cursor-pointer rounded-[5px] border border-primary py-2 text-center text-primary hover:bg-primary hover:text-white lg:w-[15%]"
                }
              >
                {title}
              </Tab>
            ))}
          </TabList>
          {/* <CustomDrawer /> */}
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
