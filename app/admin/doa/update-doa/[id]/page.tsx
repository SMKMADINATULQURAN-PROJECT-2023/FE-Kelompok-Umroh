"use client";
import { CustomHeader } from "@/components";
import CustomInput from "@/components/CustomInput";
import {
  Avatar,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Form, FormikProvider, useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { FaSquarePlus, FaTrash } from "react-icons/fa6";
import useDoaModule from "../../service/doa.service";
import * as yup from "yup";
import { useEffect } from "react";
import CustomSelect from "@/components/CustomSelect";
import {
  TambahKategoriDoaPayload,
  UpdateDoaPayload,
} from "../../interface/doa.interface";

interface Props {
  params: any;
}

const UpdateDoa: NextPage<Props> = ({ params }: { params: { id: number } }) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    useGetKategoriDoa,
    useTambahKategoriDoa,
    useUpdateDoa,
    useGetDetailDoa,
  } = useDoaModule();

  const {
    data: dataKategori,
    isError: isErrorKageori,
    isFetching: isFetchingKategori,
    isLoading: isLoadingKategori,
    refetch: refetchKategori,
  } = useGetKategoriDoa();
  const {
    data: dataDetailDoa,
    isError: isErroDetailDoa,
    isFetching: isFetchingDetailDoa,
    isLoading: isLoadingDetailDoa,
    refetch: refetchDetailDoa,
  } = useGetDetailDoa(params.id);
  const { isLoading: isLoadingUpdateDoa, mutate: mutateUpdateDoa } =
    useUpdateDoa();
  const { isLoading: isLoadingTambahKategori, mutate: mutateTambahKategori } =
    useTambahKategoriDoa();

  const isLoading =
    isLoadingDetailDoa ||
    isLoadingKategori ||
    isLoadingTambahKategori ||
    isLoadingUpdateDoa ||
    isFetchingDetailDoa ||
    isFetchingKategori;

  const updateDoaSchema = yup.object().shape({
    name: yup
      .string()
      .default(dataDetailDoa?.data.name ?? "")
      .required("Wajib isi"),
    arab: yup
      .string()
      .default(dataDetailDoa?.data.arab ?? "")
      .required("Wajib isi"),
    latin: yup
      .string()
      .default(dataDetailDoa?.data.latin ?? "")
      .required("Wajib isi"),
    arti: yup
      .string()
      .default(dataDetailDoa?.data.arti ?? "")
      .required("Wajib isi"),
    kategori_id: yup
      .mixed()
      .default((dataDetailDoa?.data.kategori_id as { id: number })?.id ?? 0)
      .required("Wajib isi"),
  });
  const createKategoriDoaSchema = yup.object().shape({
    kategori_name: yup.string().default("").required("Wajib isi"),
    file_create: yup
      .mixed()
      .nullable()
      .default(undefined)
      .required("Wajib isi"),
  });

  const onSubmit = async (values: UpdateDoaPayload) => {
    mutateUpdateDoa(
      {
        id: params.id,
        payload: values,
      },
      {
        onSuccess: () => {
          resetForm();
          setValues(updateDoaSchema.getDefault());
          return router.replace("/admin/doa");
        },
      },
    );
  };
  const onSubmitKategori = async (values: TambahKategoriDoaPayload) => {
    console.log(values);
    mutateTambahKategori(values, {
      onSuccess: () => {
        resetFormKategori();
        setValuesKategori(createKategoriDoaSchema.getDefault());
        setFieldValue("kategori_id", 0);
        onClose();
        return refetchKategori();
      },
    });
  };

  const formik = useFormik<UpdateDoaPayload>({
    initialValues: updateDoaSchema.getDefault(),
    validationSchema: updateDoaSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
  });
  const formikKategori = useFormik<TambahKategoriDoaPayload>({
    initialValues: createKategoriDoaSchema.getDefault(),
    validationSchema: createKategoriDoaSchema,
    enableReinitialize: true,
    onSubmit: onSubmitKategori,
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

  const {
    handleChange: handleChangeKategori,
    handleSubmit: handleSubmitKategori,
    setFieldValue: setFieldValueKategori,
    handleBlur: handleBlurKategori,
    values: valuesKategori,
    errors: errorsKategori,
    resetForm: resetFormKategori,
    setValues: setValuesKategori,
  } = formikKategori;

  useEffect(() => {
    if (values.kategori_id === "tambah_doa") {
      return onOpen();
    }
  }, [values.kategori_id]);
  return (
    <div className="h-full w-full ">
      <CustomHeader />

      <>
        <Modal
          isCentered
          onClose={() => {
            setFieldValue("kategori_id", 0);
            onClose();
          }}
          size={"xl"}
          isOpen={isOpen}
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent background={"white"}>
            <FormikProvider value={formikKategori}>
              <Form onSubmit={handleSubmitKategori}>
                <ModalHeader color={"#262A56"}>
                  Tambah Kategori Do'a
                </ModalHeader>
                <ModalCloseButton color={"#262A56"} />
                <ModalBody>
                  <div className="mb-5 flex h-full w-full flex-col justify-between overflow-x-hidden">
                    <div className="flex h-full w-full items-center gap-5 rounded-[10px] bg-primary p-5">
                      <div className="flex items-center">
                        {valuesKategori.file_create ? (
                          <div className="overflow-hidden rounded-[10px]">
                            <Avatar
                              size="xl"
                              name=""
                              src={URL.createObjectURL(
                                valuesKategori.file_create,
                              )}
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
                          id="file_create"
                          onBlur={handleBlurKategori}
                          accept="image/*"
                          onChange={(e) => {
                            handleChangeKategori(e);
                            const file = e.target.files?.[0];
                            if (file) {
                              if (file.size > 10 * 1024 * 1024) {
                                alert("File size exceeds 10 MB.");
                                return;
                              }
                              setFieldValueKategori("file_create", file);
                            }
                          }}
                        />
                        {valuesKategori.file_create && (
                          <span className="text-white">
                            {(
                              valuesKategori.file_create.size /
                              (1024 * 1024)
                            ).toFixed(2)}{" "}
                            MB
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <CustomInput
                    id="kategori_name"
                    title="Nama Kategori Do'a"
                    type="text"
                    values={valuesKategori.kategori_name}
                    handleChange={handleChangeKategori}
                    handleBlur={handleBlurKategori}
                    isInvalid={!!errorsKategori?.kategori_name}
                    errorMessage={errorsKategori?.kategori_name}
                  />
                </ModalBody>
                <ModalFooter>
                  <div className="flex w-full items-center justify-between">
                    <div className="">
                      <Button
                        width={"full"}
                        fontWeight="normal"
                        type="reset"
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
                    <div className="">
                      <Button
                        width={"full"}
                        fontWeight="normal"
                        type="submit"
                        color={"white"}
                        isLoading={isLoading}
                        isDisabled={isLoading}
                        h="45px"
                        backgroundColor={"blue.500"}
                        leftIcon={<FaSquarePlus color="white" />}
                        _hover={{ bgColor: "blue.600" }}
                      >
                        Tambah Kategori
                      </Button>
                    </div>
                  </div>
                </ModalFooter>
              </Form>
            </FormikProvider>
          </ModalContent>
        </Modal>
      </>

      <section className="mt-10 w-full lg:mt-0">
        <FormikProvider value={formik}>
          <Form
            className="flex h-full flex-col space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="grid w-full grid-cols-1 gap-10 px-5 lg:px-0">
              <CustomInput
                id="name"
                title="Nama Do'a"
                type="text"
                values={values.name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isInvalid={!!errors?.name}
                errorMessage={errors?.name}
              />
              <CustomInput
                id="arab"
                title="Do'a (Arab)"
                type="text"
                values={values.arab}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isInvalid={!!errors?.arab}
                errorMessage={errors?.arab}
              />
              <CustomInput
                id="latin"
                title="Do'a (Latin)"
                type="text"
                values={values.latin}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isInvalid={!!errors?.latin}
                errorMessage={errors?.latin}
              />
              <CustomInput
                id="arti"
                title="Do'a (Arti)"
                type="text"
                values={values.arti}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isInvalid={!!errors?.arti}
                errorMessage={errors?.arti}
              />
              <CustomSelect
                id="kategori_id"
                title="Kategori Do'a"
                size={"lg"}
                values={values.kategori_id.toString()}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isInvalid={!!errors?.kategori_id}
                errorMessage={errors?.kategori_id}
              >
                {dataKategori?.data.map((_, i) => {
                  return (
                    <option value={_.id} key={i}>
                      {_.kategori_name}
                    </option>
                  );
                })}
                <option value="tambah_doa">+ Tambah Kategori Do'a</option>
              </CustomSelect>
            </div>

            <div className="flex w-full items-center justify-between space-x-5 px-5 lg:px-0">
              <div className="w-full lg:w-[20%]">
                <Button
                  width={"full"}
                  fontWeight="normal"
                  type="reset"
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
                  fontWeight="normal"
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading}
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

export default UpdateDoa;
