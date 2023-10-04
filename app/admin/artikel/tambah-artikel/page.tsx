"use client";
import { CustomHeader } from "@/component";
import CustomInput from "@/component/CustomInput";
import CustomTextArea from "@/component/CustomTextarea";
import { Avatar, Button } from "@chakra-ui/react";
import { Form, FormikProvider, useFormik } from "formik";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { FaSquarePlus, FaTrash } from "react-icons/fa6";
import * as yup from "yup";
import { TambahArtikelPayload } from "../interface/artikel.interface";
import useArtikelModule from "../service/artikel.service";
import { useRouter } from "next/navigation";

interface Props {}

const TambahArtikel: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { useTambahArtikel } = useArtikelModule();
  const { isLoading, mutate } = useTambahArtikel();
  const [quill, setQuill] = useState("");

  const createUserSchema = yup.object().shape({
    title: yup.string().default("").required("Wajib isi"),
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
        setValues(createUserSchema.getDefault());
        return router.replace("/admin/artikel");
      },
    });
  };

  const formik = useFormik<TambahArtikelPayload>({
    initialValues: createUserSchema.getDefault(),
    validationSchema: createUserSchema,
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

      <section className="w-full rounded-[10px] bg-primary p-5">
        <FormikProvider value={formik}>
          <Form
            className="flex h-full flex-col space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="grid h-full w-full grid-cols-1 items-center gap-x-10 gap-y-3">
              <div className="flex w-full flex-col items-start space-y-3">
                <CustomInput
                  id="title"
                  title="Judul Artikel"
                  type="text"
                  values={values.title}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.title}
                  errorMessage={errors?.title}
                  backgroundColor="#ffffff"
                />
              </div>

              <div className="flex h-full w-full flex-col justify-between">
                <div className="flex h-full w-full items-center gap-5 rounded-[10px] bg-white p-5">
                  <div className="flex items-center">
                    {values.file_create ? (
                      <div className="overflow-hidden rounded-[10px] border border-primary">
                        <Image
                          width={200}
                          height={200}
                          style={{ objectFit: "cover" }}
                          src={URL.createObjectURL(values.file_create)}
                          alt=""
                        />
                      </div>
                    ) : (
                      <div className="rounded-[10px] border border-primary p-5">
                        <Avatar size="xl" name="" src="" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-start">
                    <input
                      className="w-fit cursor-pointer text-primary"
                      type="file"
                      onBlur={handleBlur}
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]; // Use optional chaining to handle null
                        if (file) {
                          // Check file size
                          if (file.size > 10 * 1024 * 1024) {
                            alert("File size exceeds 10 MB.");
                            return;
                          }
                          setFieldValue("file_create", file);
                        }
                      }}
                    />
                    {values.file_create && (
                      <span className="text-primary">
                        {(values.file_create.size / (1024 * 1024)).toFixed(2)}{" "}
                        MB
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-[100%]" onBlur={handleBlur}>
                <CustomTextArea
                  className="overflow-hidden rounded-[10px] border-none bg-white"
                  id="description"
                  title="Deskripsi Artikel"
                  values={quill}
                  handleChange={(value: any) => {
                    handleChange(value);
                    setQuill(value);
                    setFieldValue("description", value);
                  }}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.description}
                  errorMessage={errors?.description}
                  backgroundColor="#ffffff"
                />
              </div>
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="w-[20%]">
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
              <div className="w-[20%]">
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
