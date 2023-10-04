"use client";
import { CustomHeader } from "@/component";
import CustomInput from "@/component/CustomInput";
import { Avatar, Button } from "@chakra-ui/react";
import { Form, FormikProvider, useFormik } from "formik";
import { NextPage } from "next";
import * as yup from "yup";
import Image from "next/image";
import { FaSquarePlus, FaTrash } from "react-icons/fa6";
import CustomTextArea from "@/component/CustomTextarea";
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


  const createUserSchema = yup.object().shape({
    name: yup.string().default("").required("Wajib isi"),
    location: yup.string().default("").required("Wajib isi"),
    description: yup.string().nullable().default("").required("Wajib isi"),
    file_create: yup
      .mixed()
      .nullable()
      .default(undefined)
      .required("Wajib isi"),
    latitude: yup.string().nullable().default("21.422510"),
    longitude: yup.string().nullable().default("39.826168"),
  });

  const onSubmit = async (values: TambahZiarahPayload) => {
    console.log(values);
    mutate(values, {
      onSuccess: () => {
        resetForm();
        setValues(createUserSchema.getDefault());
        return router.replace("/admin/ziarah");
      },
    });
  };

  const formik = useFormik<TambahZiarahPayload>({
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

              <div className="col-span-2 w-[100%]" onBlur={handleBlur}>
                <CustomTextArea
                  className="h-[300px] overflow-hidden rounded-[10px] border-none bg-white"
                  id="description"
                  title="Deskripsi Ziarah"
                  values={quill}
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
