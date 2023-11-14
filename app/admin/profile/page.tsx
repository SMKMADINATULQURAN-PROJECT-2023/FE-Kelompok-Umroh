"use client";
import { EditProfilePayload } from "@/app/auth/interface";
import { useProfileService } from "@/app/auth/service/auth.service";
import { CustomHeader } from "@/components";
import CustomInput from "@/components/CustomInput";
import { Avatar, Button } from "@chakra-ui/react";
import dayjs from "dayjs";
import { Form, FormikProvider, useFormik } from "formik";
import { NextPage } from "next";
import { signOut } from "next-auth/react";
import { FaRegPenToSquare, FaRotateLeft } from "react-icons/fa6";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import * as yup from "yup";

interface Props {}

const Profile: NextPage<Props> = ({}) => {
  const { data } = useProfileService();
  const currentYear = dayjs().year();

  const updateUserSchema = yup.object().shape({
    username: yup
      .string()
      .nullable()
      .default(data?.data.username ?? ""),
    email: yup
      .string()
      .default(data?.data.email ?? "")
      .email("Gunakan Format Email"),
    file_create: yup
      .mixed()
      .nullable()
      .default(data?.data.avatar ?? null),
  });

  const onSubmit = async (values: EditProfilePayload) => {
    console.log(values);
    // mutate(values, {
    //   onSuccess: () => {
    //     resetForm();
    //     setValues(updateUserSchema.getDefault());
    //   },
    // });
  };

  const formik = useFormik<EditProfilePayload>({
    initialValues: updateUserSchema.getDefault(),
    validationSchema: updateUserSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
  } = formik;

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
    <div className="flex h-full w-full flex-col justify-between">
      <section className="w-full">
        <CustomHeader />

        <section className="mb-10 w-full">
          <Tabs className={"grid w-full grid-cols-4 gap-x-10"}>
            <div className="w-full">
              <TabList className={"flex flex-col space-y-5"}>
                {tabMenu.map((_, i) => {
                  return (
                    <Tab
                      onClick={
                        i === tabMenu.length - 1 ? () => signOut() : undefined
                      }
                      selectedClassName={
                        i === tabMenu.length - 1
                          ? "py-4 bg-red-500 tab-text"
                          : "py-4 bg-primary tab-text"
                      }
                      className={`${
                        i === tabMenu.length - 1
                          ? "border-red-500 py-3 text-red-500"
                          : "border-primary py-3"
                      } custom-tab flex cursor-pointer flex-col items-start rounded-[10px] border  px-3 py-2`}
                    >
                      <h1
                        className={`${
                          i === tabMenu.length - 1
                            ? "text-red-500"
                            : "text-primary"
                        } text-[20px]`}
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
                <FormikProvider value={formik}>
                  <Form onSubmit={handleSubmit}>
                    <div className="flex h-full w-full flex-col space-y-5">
                      <div className="flex w-full items-center space-x-5 rounded-[10px] bg-primary p-5">
                        <div className="flex items-center">
                          {values.file_create ? (
                            <div className="overflow-hidden rounded-[10px] border border-white">
                              <Avatar
                                src={
                                  typeof values.file_create === "string"
                                    ? values.file_create
                                    : URL.createObjectURL(values.file_create)
                                }
                                name={values.username}
                                size="xl"
                              />
                            </div>
                          ) : (
                            <div className="rounded-[10px] border border-white p-5">
                              <Avatar size="xl" name="-" src="" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col items-start">
                          <input
                            className="w-fit cursor-pointer text-white"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                if (file.size > 10 * 1024 * 1024) {
                                  alert("File size exceeds 10 MB.");
                                  return;
                                }

                                setFieldValue("file_create", file);
                              }
                            }}
                          />
                          {values.file_create && (
                            <span className="text-white">
                              {(
                                values.file_create.size /
                                (1024 * 1024)
                              ).toFixed(2)}{" "}
                              MB
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid w-full grid-cols-2 gap-x-5 gap-y-3 rounded-[10px] border border-primary p-5">
                        <CustomInput
                          id="username"
                          title="Username"
                          type="text"
                          values={values.username}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          isInvalid={!!errors?.username}
                          errorMessage={errors?.username}
                        />
                        <CustomInput
                          id="email"
                          title="Email"
                          type="email"
                          values={values.email}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          isInvalid={!!errors?.email}
                          errorMessage={errors?.email}
                        />
                        <div className="col-span-2 mt-10 flex w-full items-center justify-between">
                          <Button
                            width={"30%"}
                            fontWeight="normal"
                            type="reset"
                            colorScheme={"red"}
                            variant={"outline"}
                            // isLoading={isLoading}
                            // isDisabled={isLoading}
                            h="45px"
                            color={"red.500"}
                            leftIcon={<FaRotateLeft color="##E53E3E" />}
                            onClick={() => formik.resetForm()}
                          >
                            Kembali Semula
                          </Button>
                          <Button
                            width={"30%"}
                            fontWeight="normal"
                            type="submit"
                            // isLoading={isLoading}
                            // isDisabled={isLoading}
                            h="45px"
                            backgroundColor={"blue.500"}
                            color={"#ffffff"}
                            leftIcon={<FaRegPenToSquare color="#ffffff" />}
                            _hover={{ bgColor: "blue.600" }}
                          >
                            Simpan
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Form>
                </FormikProvider>
              </TabPanel>

              <TabPanel>
                <h2>Any content 2</h2>
              </TabPanel>
            </div>
          </Tabs>
        </section>
      </section>

      <section className="w-full">
        <p className="text-[12px]">ⓒ AL - HILAL {currentYear}</p>
      </section>
    </div>
  );
};

export default Profile;
