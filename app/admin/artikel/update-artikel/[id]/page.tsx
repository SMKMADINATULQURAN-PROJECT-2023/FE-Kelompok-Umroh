"use client";
import { CustomHeader } from "@/components";
import { NextPage } from "next";
import useArtikelModule from "../../service/artikel.service";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { UpdateArtikelPayload } from "../../interface/artikel.interface";
import { Avatar, Button } from "@chakra-ui/react";
import CustomTextArea from "@/components/CustomRichText";
import Image from "next/image";
import CustomInput from "@/components/CustomInput";
import { FaSquarePlus, FaTrash } from "react-icons/fa6";
import { useState } from "react";

interface Props {
  params: any;
}

const UpdateArtikel: NextPage<Props> = ({
  params,
}: {
  params: { id: number };
}) => {
  const route = useRouter();
  const { useGetDetailArtikel, useUpdateArtikel } = useArtikelModule();
  const {
    data: dataArtikel,
    isError: isErrorArtikel,
    isFetching: isFetchingArtikel,
    isLoading: isLoadingArtikel,
    refetch: refetchArtikel,
  } = useGetDetailArtikel(params.id);
  const { isLoading: isLoadingUpdate, mutate } = useUpdateArtikel();
  const [quill, setQuill] = useState("");

  const isLoading = isFetchingArtikel || isLoadingArtikel || isLoadingUpdate;

  const updateArtikelSchema = yup.object().shape({
    title: yup
      .string()
      .default(dataArtikel?.data.title ?? "")
      .required("Wajib isi"),
    description: yup
      .string()
      .nullable()
      .default(dataArtikel?.data.description ?? "")
      .required("Wajib isi"),
    source: yup
      .string()
      .default(dataArtikel?.data.source ?? "")
      .required("Wajib isi"),
    file_update: yup
      .mixed()
      .nullable()
      .default(dataArtikel?.data.thumbnail ?? undefined)
      .required("Wajib isi"),
  });

  const onSubmit = async (values: UpdateArtikelPayload) => {
    console.log(values);
    mutate(
      {
        id: params.id,
        payload: values,
      },
      {
        onSuccess: () => {
          resetForm();
          setValues(updateArtikelSchema.getDefault());
          return route.replace("/admin/artikel");
        },
      },
    );
  };

  const formik = useFormik<UpdateArtikelPayload>({
    initialValues: updateArtikelSchema.getDefault(),
    validationSchema: updateArtikelSchema,
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

      <section className="w-full rounded-[10px]">
        <FormikProvider value={formik}>
          <Form
            className="flex h-full flex-col space-y-28 lg:space-y-10"
            onSubmit={handleSubmit}
          >
            <div className="grid h-full w-full grid-cols-1 items-center gap-10">
              <div className="flex h-full w-full flex-col justify-between">
                <div className="flex h-full w-full items-center gap-5 rounded-none bg-primary p-5 lg:rounded-[10px]">
                  <div className="flex items-center">
                    {values.file_update ? (
                      <div className="overflow-hidden rounded-[10px] border border-white">
                        <Image
                          width={200}
                          height={200}
                          style={{ objectFit: "cover" }}
                          src={
                            typeof values.file_update === "string"
                              ? values.file_update
                              : URL.createObjectURL(values.file_update)
                          }
                          alt=""
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
                      onBlur={handleBlur}
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 10 * 1024 * 1024) {
                            alert("File size exceeds 10 MB.");
                            return;
                          }
                          setFieldValue("file_update", file);
                        }
                      }}
                    />
                    {values.file_update && (
                      <span className="text-white">
                        {(values.file_update.size / (1024 * 1024)).toFixed(2)}{" "}
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
              <div className="ww-full lg:-[20%]">
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
              <div className="ww-full lg:-[20%]">
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
                  Update Artikel
                </Button>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </section>
    </div>
  );
};

export default UpdateArtikel;
