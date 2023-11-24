"use client";
import { NextPage } from "next";
import useDoaModule from "../../service/doa.service";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { UpdateKategoriDoaPayload } from "../../interface/doa.interface";
import { Form, FormikProvider, useFormik } from "formik";
import { CustomHeader } from "@/components";
import CustomInput from "@/components/CustomInput";
import { Avatar, Button } from "@chakra-ui/react";
import { FaSquarePlus, FaTrash } from "react-icons/fa6";
import Image from "next/image";

interface Props {
  params: any;
}

const UpdateKategoriDoa: NextPage<Props> = ({
  params,
}: {
  params: { id: number };
}) => {
  const router = useRouter();
  const { useGetDetailKategoriDoa, useUpdateKategoriDoa } = useDoaModule();

  const {
    data,
    isError,
    isFetching,
    isLoading: isLoadingKategori,
    refetch,
  } = useGetDetailKategoriDoa(params.id);
  const { isLoading: isLoadingUpdate, mutate } = useUpdateKategoriDoa();

  const updateKategoriDoaSchema = yup.object().shape({
    kategori_name: yup
      .string()
      .default(data?.data.kategori_name ?? "")
      .required("Wajib isi"),
    file_update: yup
      .mixed()
      .nullable()
      .default(data?.data.thumbnail ?? undefined)
      .required("Wajib isi"),
  });

  const onSubmit = async (values: UpdateKategoriDoaPayload) => {
    mutate(
      {
        id: params.id,
        payload: values,
      },
      {
        onSuccess: () => {
          resetForm();
          setValues(updateKategoriDoaSchema.getDefault());
          return router.replace("/admin/doa");
        },
      },
    );
  };

  const formik = useFormik<UpdateKategoriDoaPayload>({
    initialValues: updateKategoriDoaSchema.getDefault(),
    validationSchema: updateKategoriDoaSchema,
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
            className="flex h-full flex-col space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="grid w-full grid-cols-1 gap-x-10 gap-y-10">
              <div className="mb-5 flex h-full w-full flex-col justify-between">
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
                        <Avatar size="xl" name="-" src=""/>
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
                        handleChange(e);
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

              <div className="px-5 lg:px-0">
                <CustomInput
                  id="kategori_name"
                  title="Nama Kategori Do'a"
                  type="text"
                  values={values.kategori_name}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.kategori_name}
                  errorMessage={errors?.kategori_name}
                />
              </div>
            </div>

            <div className="flex w-full items-center justify-between space-x-5 px-5 lg:px-0">
              <div className="w-full lg:w-[20%]">
                <Button
                  width={"full"}
                  fontWeight="normal"
                  type="reset"
                  colorScheme={"red"}
                  variant={"outline"}
                  isLoading={isLoadingKategori || isLoadingUpdate}
                  isDisabled={isLoadingKategori || isLoadingUpdate}
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
                  fontWeight="normal"
                  type="submit"
                  isLoading={isLoadingKategori || isLoadingUpdate}
                  isDisabled={isLoadingKategori || isLoadingUpdate}
                  h="45px"
                  backgroundColor={"blue.500"}
                  color={"#ffffff"}
                  leftIcon={<FaSquarePlus color="#ffffff" />}
                  _hover={{ bgColor: "blue.600" }}
                >
                  Update Do'a
                </Button>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </section>
    </div>
  );
};

export default UpdateKategoriDoa;
