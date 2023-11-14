"use client";
import { NextPage } from "next";
import usePanduanModule from "../../service/panduan.service";
import * as yup from "yup";
import { UpdatePanduanPayload } from "../../interface/panduan.interface";
import { Form, FormikProvider, useFormik } from "formik";
import { useState } from "react";
import { CustomHeader } from "@/components";
import Image from "next/image";
import { Avatar, Button } from "@chakra-ui/react";
import CustomInput from "@/components/CustomInput";
import CustomSelect from "@/components/CustomSelect";
import CustomTextArea from "@/components/CustomTextarea";
import { FaSquarePlus, FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";

interface Props {
  params: any;
}

const UpdatePanduan: NextPage<Props> = ({
  params,
}: {
  params: { id: number };
}) => {
  const router = useRouter();
  const { useGetDetailPanduan, useUpdatePanduan } = usePanduanModule();
  const {
    data,
    isError,
    isFetching,
    isLoading: isLoadingPanduan,
    refetch,
  } = useGetDetailPanduan(params.id);
  const { isLoading: isLoadingUpdate, mutate } = useUpdatePanduan();
  const isLoading = isFetching || isLoadingPanduan || isLoadingUpdate;

  const [quill, setQuill] = useState("");
  const genderOption = [
    {
      value: "Laki-Laki",
      label: "Laki - Laki",
    },
    {
      value: "Perempuan",
      label: "Perempuan",
    },
  ];
  const kategoriOption = [
    {
      value: "Umrah",
      label: "Umrah",
    },
    {
      value: "Haji",
      label: "Haji",
    },
  ];

  const updatePanduanSchema = yup.object().shape({
    title: yup
      .string()
      .default(data?.data.title ?? "")
      .required("Wajib isi"),
    description: yup
      .string()
      .nullable()
      .default(data?.data.description ?? "")
      .required("Wajib isi"),
    link: yup
      .string()
      .default(data?.data.link ?? "")
      .required("Wajib isi"),
    gender: yup
      .string()
      .default(data?.data.gender ?? "")
      .required("Wajib isi"),
    kategori_panduan: yup
      .string()
      .default(data?.data.kategori_panduan ?? "")
      .required("Wajib isi"),
    file_update: yup
      .mixed()
      .nullable()
      .default(data?.data.thumbnail ?? undefined)
      .required("Wajib isi"),
  });

  const onSubmit = async (values: UpdatePanduanPayload) => {
    console.log(values);
    mutate(
      { id: params.id, payload: values },
      {
        onSuccess: () => {
          resetForm();
          setValues(updatePanduanSchema.getDefault());
          return router.replace("/admin/panduan");
        },
      },
    );
  };

  const formik = useFormik<UpdatePanduanPayload>({
    initialValues: updatePanduanSchema.getDefault(),
    validationSchema: updatePanduanSchema,
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

      <section className="w-full rounded-[10px] p-5">
        <FormikProvider value={formik}>
          <Form
            className="flex h-full flex-col space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="grid h-full w-full grid-cols-2 items-center gap-x-10 gap-y-10">
              <div className="col-span-2 flex h-full w-full flex-col justify-between">
                <div className="flex h-full w-full items-center gap-5 rounded-[10px] bg-primary p-5">
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

              <div className="flex w-full flex-col items-start space-y-7">
                <CustomInput
                  id="title"
                  title="Judul Panduan"
                  type="text"
                  values={values.title}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.title}
                  errorMessage={errors?.title}
                />
                <CustomInput
                  id="link"
                  title="Link Video"
                  type="url"
                  values={values.link}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.link}
                  errorMessage={errors?.link}
                />
              </div>

              <div className="flex w-full flex-col items-start space-y-7">
                <CustomSelect
                  id="gender"
                  title="Panduan Untuk"
                  size={"lg"}
                  values={values.gender.toString()}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.gender}
                  errorMessage={errors?.gender}
                >
                  {genderOption.map((_, i) => {
                    return (
                      <option value={_.value} key={i}>
                        {_.label}
                      </option>
                    );
                  })}
                </CustomSelect>

                <CustomSelect
                  id="kategori_panduan"
                  title="Kategori Panduan"
                  size={"lg"}
                  values={values.kategori_panduan.toString()}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.kategori_panduan}
                  errorMessage={errors?.kategori_panduan}
                >
                  {kategoriOption.map((_, i) => {
                    return (
                      <option value={_.value} key={i}>
                        {_.label}
                      </option>
                    );
                  })}
                </CustomSelect>
              </div>

              <div className="col-span-2 mb-12 w-full" onBlur={handleBlur}>
                <CustomTextArea
                  className="h-[600px]"
                  id="description"
                  title="Deskripsi Panduan"
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
                  Update Panduan
                </Button>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </section>
    </div>
  );
};

export default UpdatePanduan;
