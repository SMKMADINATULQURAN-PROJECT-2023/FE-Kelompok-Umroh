"use client";
import { CustomHeader } from "@/components";
import dayjs from "dayjs";
import { NextPage } from "next";
import { signOut } from "next-auth/react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProfileSection from "./sections/profile.section";
import ResetPasswordSection from "./sections/resetPassword.section";

interface Props {}

const Profile: NextPage<Props> = ({}) => {
  const currentYear = dayjs().year();

  const tabMenu = [
    {
      title: "Pengaturan Profil",
      description: "Detail tentang informasi pribadi kamu",
    },
    {
      title: "Keamanan & Password",
      description: "Detail tentang keamanan akun",
    },
    { title: "Sign Out", description: "" },
  ];

  return (
    <div className="flex h-screen w-full flex-col justify-between lg:h-full">
      <section className="w-full">
        <CustomHeader />

        <section className="mb-10 w-full">
          <Tabs
            className={
              "flex w-full flex-col space-y-10 lg:grid lg:flex-none lg:grid-cols-4 lg:gap-x-10 lg:space-y-0"
            }
          >
            <div className="noScrollbar overflow-x-scroll p-5 lg:w-full lg:p-0">
              <TabList
                className={
                  "flex w-[160%] flex-row space-x-5 lg:w-full lg:flex-col lg:space-x-0 lg:space-y-5"
                }
              >
                {tabMenu.map((_, i) => {
                  return (
                    <Tab
                      onClick={
                        i === tabMenu.length - 1 ? () => signOut() : undefined
                      }
                      selectedClassName={
                        i === tabMenu.length - 1
                          ? "lg:py-4 px-4 lg:px-4 bg-red-500 tab-text lg:w-full w-[120%]"
                          : "lg:py-4 px-4 lg:px-4 bg-primary tab-text lg:w-full w-[120%]"
                      }
                      className={`${
                        i === tabMenu.length - 1
                          ? "w-[50%] border-red-500 px-5 py-3 text-red-500 lg:w-full"
                          : "w-full border-primary py-3"
                      } custom-tab flex cursor-pointer flex-col items-start rounded-[10px] border px-4 py-2`}
                    >
                      <h1
                        className={`${
                          i === tabMenu.length - 1
                            ? "text-red-500"
                            : "text-primary"
                        } w-full text-[20px]`}
                      >
                        {_.title}
                      </h1>
                      <p className="text-[12px] text-abu">{_.description}</p>
                    </Tab>
                  );
                })}
              </TabList>
            </div>

            <div className="col-span-3 w-full">
              <TabPanel>
                <ProfileSection />
              </TabPanel>

              <TabPanel>
                <ResetPasswordSection />
              </TabPanel>
            </div>
          </Tabs>
        </section>
      </section>

      <section className="mb-8 w-full lg:mb-0">
        <p className="text-center text-[12px] lg:text-left">
          ⓒ AL - HILAL {currentYear}
        </p>
      </section>
    </div>
  );
};

export default Profile;
