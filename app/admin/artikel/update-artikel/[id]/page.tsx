"use client";
import { CustomHeader } from "@/component";
import { NextPage } from "next";
import useArtikelModule from "../../service/artikel.service";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { UpdateArtikelPayload } from "../../interface/artikel.interface";
import { Avatar, Button } from "@chakra-ui/react";
import CustomTextArea from "@/component/CustomTextarea";
import Image from "next/image";
import CustomInput from "@/component/CustomInput";
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
    file_update: yup
      .mixed()
      .nullable()
      .default(dataArtikel?.data.thumbnail ?? undefined)
      .required("Wajib isi"),
  });

  const onSubmit = async (payload: UpdateArtikelPayload) => {
    console.log(payload);
    mutate(
      {
        id: params.id, // Pass slug property
        payload: payload, // Pass payload property
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

  console.log("data", dataArtikel);
  console.log("id", params);
  return (
    <div className="h-full w-full">
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
                    {values.file_update ? (
                      <div className="overflow-hidden rounded-[10px] border border-primary">
                        <Image
                          width={200}
                          height={200}
                          style={{ objectFit: "cover" }}
                          src={typeof values.file_update === 'string' ? values.file_update : URL.createObjectURL(values.file_update)}
                          // src={values.file_update || URL.createObjectURL(values.file_update)}
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
                          setFieldValue("file_update", file);
                        }
                      }}
                    />
                    {values.file_update && (
                      <span className="text-primary">
                        {(values.file_update.size / (1024 * 1024)).toFixed(2)}{" "}
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
                  values={values.description}
                  // values={quill}
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
                  isLoading={isLoadingUpdate || isLoadingUpdate}
                  isDisabled={isLoadingUpdate || isLoadingUpdate}
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
                  isLoading={isLoadingUpdate || isLoadingUpdate}
                  isDisabled={isLoadingUpdate || isLoadingUpdate}
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
