"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";
import useArtikelModule from "../service/artikel.service";
import { useState } from "react";
import { TambahArtikelPayload } from "../interface/artikel.interface";
import { Form, FormikProvider, useFormik } from "formik";
import { CustomHeader } from "@/components";
import CustomInput from "@/components/CustomInput";
import Image from "next/image";
import { Avatar, Button } from "@chakra-ui/react";
import CustomTextArea from "@/components/CustomTextarea";
import { FaSquarePlus, FaTrash } from "react-icons/fa6";
import * as yup from "yup";

interface Props {}

const TambahArtikel: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { useTambahArtikel } = useArtikelModule();
  const { isLoading, mutate } = useTambahArtikel();
  const [quill, setQuill] = useState("");

  const createArtikelSchema = yup.object().shape({
    title: yup.string().default("").required("Wajib isi"),
    source: yup.string().default("").required("Wajib isi"),
    description: yup.string().default("").required("Wajib isi"),
    file_create: yup
      .mixed()
      .nullable()
      .default(undefined)
      .required("Wajib isi"),
  });

  const onSubmit = async (values: TambahArtikelPayload) => {
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        resetForm();
        setValues(createArtikelSchema.getDefault());
        return router.replace("/admin/artikel");
      },
    });
  };

  const formik = useFormik<TambahArtikelPayload>({
    initialValues: createArtikelSchema.getDefault(),
    validationSchema: createArtikelSchema,
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
    <div className="h-full w-full ">
      <CustomHeader />

      <section className="w-full rounded-[10px]">
        <FormikProvider value={formik}>
          <Form
            className="flex h-full flex-col space-y-28 lg:space-y-10"
            onSubmit={handleSubmit}
          >
            <div className="grid h-full w-full grid-cols-1 items-center gap-10">
              <div className="flex h-full w-full flex-col justify-between overflow-x-hidden">
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

              <div className="grid grid-cols-1 gap-10 px-5 lg:px-0">
                <CustomInput
                  id="title"
                  title="Judul Artikel"
                  type="text"
                  values={values.title}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.title}
                  errorMessage={errors?.title}
                />
                <CustomInput
                  id="source"
                  title="Dikutip Dari"
                  type="text"
                  values={values.source}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.source}
                  errorMessage={errors?.source}
                />
                <div className="mb-12 w-full" onBlur={handleBlur}>
                  <CustomTextArea
                    className="h-[600px]"
                    id="description"
                    title="Deskripsi Artikel"
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
                  Tambah Artikel
                </Button>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </section>
    </div>
  );
};

export default TambahArtikel;
