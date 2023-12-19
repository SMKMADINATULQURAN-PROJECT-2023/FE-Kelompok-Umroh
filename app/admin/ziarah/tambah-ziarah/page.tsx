"use client";
import { CustomHeader } from "@/components";
import CustomInput from "@/components/CustomInput";
import { Avatar, Button } from "@chakra-ui/react";
import { Form, FormikProvider, useFormik } from "formik";
import { NextPage } from "next";
import * as yup from "yup";
import Image from "next/image";
import { FaSquarePlus, FaTrash } from "react-icons/fa6";
import CustomTextArea from "@/components/CustomRichText";
import { useState } from "react";
import { TambahZiarahPayload } from "../interface/ziarah.interface";
import useZiarahModule from "../service/ziarah.service";
import { useRouter } from "next/navigation";

interface Props {}

const TambahZiarah: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { useTambahZiarah } = useZiarahModule();
  const { isLoading, mutate } = useTambahZiarah();
  const [quill, setQuill] = useState("");

  const createZiarahSchema = yup.object().shape({
    name: yup.string().default("").required("Wajib isi"),
    location: yup.string().default("").required("Wajib isi"),
    description: yup.string().nullable().default("").required("Wajib isi"),
    file_create: yup
      .mixed()
      .nullable()
      .default(undefined)
      .required("Wajib isi"),
    latitude: yup.number().default(0).required(),
    longitude: yup.number().default(0).required(),
    // latitude: yup.string().nullable().default("21.422510"),
    // longitude: yup.string().nullable().default("39.826168"),
  });

  const onSubmit = async (values: TambahZiarahPayload) => {
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        resetForm();
        setValues(createZiarahSchema.getDefault());
        return router.replace("/admin/ziarah");
      },
    });
  };

  const formik = useFormik<TambahZiarahPayload>({
    initialValues: createZiarahSchema.getDefault(),
    validationSchema: createZiarahSchema,
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
  return (
    <div className="h-full w-full">
      <CustomHeader />

      <section className="w-full">
        <FormikProvider value={formik}>
          <Form
            className="flex h-full flex-col space-y-28 lg:space-y-10"
            onSubmit={handleSubmit}
          >
            <div className="grid h-full w-full grid-cols-2 items-center gap-10">
              <div className="col-span-2 flex h-full w-full flex-col justify-between overflow-x-hidden">
                <div className="flex h-full w-full items-center gap-5 rounded-none bg-primary p-5 lg:rounded-[10px]">
                  <div className="flex items-center">
                    {values.file_create ? (
                      <div className="overflow-hidden rounded-[10px] border border-white">
                        <Image
                          width={200}
                          height={200}
                          style={{ objectFit: "cover" }}
                          src={URL.createObjectURL(values.file_create)}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="rounded-[10px] border border-white p-5">
                        <Avatar size="xl" name="-" src="" bg={"transparent"} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-start">
                    <input
                      className="w-fit cursor-pointer text-white"
                      type="file"
                      onBlur={handleBlur}
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
                        {(values.file_create.size / (1024 * 1024)).toFixed(2)}{" "}
                        MB
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-span-2 grid grid-cols-1 gap-10 px-5 lg:grid-cols-2 lg:px-0">
                <CustomInput
                  id="name"
                  title="Tempat Ziarah"
                  type="text"
                  values={values.name}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.name}
                  errorMessage={errors?.name}
                />
                <CustomInput
                  id="location"
                  title="Lokasi"
                  type="text"
                  values={values.location}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.location}
                  errorMessage={errors?.location}
                />
                <CustomInput
                  id="latitude"
                  title="Latitude"
                  type="number"
                  values={values.latitude}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.latitude}
                  errorMessage={errors?.latitude}
                />
                <CustomInput
                  id="longitude"
                  title="Longitude"
                  type="number"
                  values={values.longitude}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.longitude}
                  errorMessage={errors?.longitude}
                />

                <div
                  className="col-span-1 mb-12 w-full lg:col-span-2"
                  onBlur={handleBlur}
                >
                  <CustomTextArea
                    className="h-[600px]"
                    id="description"
                    title="Deskripsi Ziarah"
                    values={values.description}
                    handleChange={(value: any) => {
                      handleChange(value);
                      setQuill(value);
                      setFieldValue("description", value);
                    }}
                    handleBlur={handleBlur}
                    isInvalid={!!errors?.description}
                    errorMessage={errors?.description}
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full items-center justify-between space-x-5 px-5 lg:px-0">
              <div className="w-full lg:w-[20%]">
                <Button
                  width={"full"}
                  type="reset"
                  fontWeight="normal"
                  colorScheme={"red"}
                  variant={"outline"}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  h="45px"
                  color={"red.500"}
                  leftIcon={<FaTrash color="##E53E3E" />}
                  onClick={() => formik.resetForm()}
                >
                  Reset Form
                </Button>
              </div>
              <div className="w-full lg:w-[20%]">
                <Button
                  width={"full"}
                  type="submit"
                  fontWeight="normal"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  h="45px"
                  backgroundColor={"blue.500"}
                  color={"#ffffff"}
                  leftIcon={<FaSquarePlus color="#ffffff" />}
                  _hover={{ bgColor: "blue.600" }}
                >
                  Tambah Ziarah
                </Button>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </section>
    </div>
  );
};

export default TambahZiarah;
