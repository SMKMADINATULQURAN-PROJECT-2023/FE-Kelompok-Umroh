"use client";
import { CustomHeader } from "@/component";
import { NextPage } from "next";
import useZiarahModule from "../../service/ziarah.service";
import { useState } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import {
  UpdateZiarahPayload,
} from "../../interface/ziarah.interface";
import { useRouter } from "next/navigation";
import { FaSquarePlus, FaTrash } from "react-icons/fa6";
import { Avatar, Button } from "@chakra-ui/react";
import CustomTextArea from "@/component/CustomTextarea";
import Image from "next/image";
import CustomInput from "@/component/CustomInput";

interface Props {
  params: any;
}

const UpdateZiarah: NextPage<Props> = ({
  params,
}: {
  params: { id: number };
}) => {
  const route = useRouter();
  const { useUpdateZiarah, useGetDetailZiarah } = useZiarahModule();
  const {
    data: dataZiarah,
    isError,
    isFetching,
    isLoading: isLoadingZiarah,
    refetch,
  } = useGetDetailZiarah(params.id);
  const { isLoading: isLoadingMutate, mutate } = useUpdateZiarah();
  const [quill, setQuill] = useState("");

  console.log("data", dataZiarah);
  console.log("params", params);

  const updateZiarahSchema = yup.object().shape({
    name: yup
      .string()
      .default(dataZiarah?.data.name ?? "")
      .required("Wajib isi"),
    location: yup
      .string()
      .default(dataZiarah?.data.location ?? "")
      .required("Wajib isi"),
    description: yup
      .string()
      .nullable()
      .default(dataZiarah?.data.description ?? "")
      .required("Wajib isi"),
    file_update: yup
      .mixed()
      .nullable()
      .default(dataZiarah?.data.thumbnail ?? undefined)
      .required("Wajib isi"),
    latitude: yup
      .string()
      .nullable()
      .default(dataZiarah?.data.latitude ?? ""),
    longitude: yup
      .string()
      .nullable()
      .default(dataZiarah?.data.longitude ?? ""),
  });

  const onSubmit = async (payload: UpdateZiarahPayload) => {
    console.log(payload);
    mutate(
      { id: params.id, payload: payload },
      {
        onSuccess: () => {
          resetForm();
          setValues(updateZiarahSchema.getDefault());
          return route.replace("/admin/ziarah");
        },
      },
    );
  };

  const formik = useFormik<UpdateZiarahPayload>({
    initialValues: updateZiarahSchema.getDefault(),
    validationSchema: updateZiarahSchema,
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

      <section className="w-full rounded-[10px] bg-primary p-5">
        <FormikProvider value={formik}>
          <Form
            className="flex h-full flex-col space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="grid h-full w-full grid-cols-2 items-center gap-x-10 gap-y-3">
              <div className="flex w-full flex-col items-start space-y-3">
                <CustomInput
                  id="name"
                  title="Tempat Ziarah"
                  type="text"
                  values={values.name}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.name}
                  errorMessage={errors?.name}
                  backgroundColor="#ffffff"
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
                          src={
                            typeof values.file_update === "string"
                              ? values.file_update
                              : URL.createObjectURL(values.file_update)
                          }
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

              <div className="col-span-2 w-[100%]" onBlur={handleBlur}>
                <CustomTextArea
                  className="h-[300px] overflow-hidden rounded-[10px] border-none bg-white"
                  id="description"
                  title="Deskripsi Ziarah"
                  values={values.description}
                  handleChange={(value: any) => {
                    handleChange(value);
                    setQuill(value);
                    setFieldValue("description", value); // Update the description field in Formik
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
                  isLoading={isLoadingMutate || isLoadingZiarah}
                  isDisabled={isLoadingMutate || isLoadingZiarah}
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
                  isLoading={isLoadingMutate || isLoadingZiarah}
                  isDisabled={isLoadingMutate || isLoadingZiarah}
                  h="45px"
                  backgroundColor={"blue.500"}
                  color={"#ffffff"}
                  leftIcon={<FaSquarePlus color="#ffffff" />}
                  _hover={{ bgColor: "blue.600" }}
                >
                  Update Ziarah
                </Button>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </section>
    </div>
  );
};

export default UpdateZiarah;
