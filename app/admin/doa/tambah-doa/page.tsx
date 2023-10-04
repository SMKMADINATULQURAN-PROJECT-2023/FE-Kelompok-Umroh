"use client";
import { CustomHeader } from "@/component";
import type { NextPage } from "next";
import * as yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import CustomInput from "@/component/CustomInput";
import {
  Avatar,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import CustomSelect from "@/component/CustomSelect";
import { FaSquarePlus, FaTrash } from "react-icons/fa6";
import {
  TambahDoaPayload,
  TambahKategoriDoaPayload,
} from "../interface/doa.interface";
import useDoaModule from "../service/doa.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {}

const TambahDoa: NextPage<Props> = ({}) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { useGetKategoriDoa, useTambahDoa, useTambahKategoriDoa } =
    useDoaModule();

  const {
    data: dataKategori,
    isError: isErrorKageori,
    isFetching: isFetchingKategori,
    isLoading: isLoadingKategori,
    refetch: refetchKategori,
  } = useGetKategoriDoa();
  const { isLoading: isLoadingTambahDoa, mutate: mutateTambahDoa } =
    useTambahDoa();
  const { isLoading: isLoadingTambahKategori, mutate: mutateTambahKategori } =
    useTambahKategoriDoa();

  const createDoaSchema = yup.object().shape({
    name: yup.string().default("").required("Wajib isi"),
    arab: yup.string().default("").required("Wajib isi"),
    latin: yup.string().default("").required("Wajib isi"),
    arti: yup.string().default("").required("Wajib isi"),
    kategori_id: yup.mixed().default(0).required("Wajib isi"),
  });
  const createKategoriDoaSchema = yup.object().shape({
    kategori_name: yup.string().default("").required("Wajib isi"),
  });

  const onSubmit = async (values: TambahDoaPayload) => {
    console.log(values);
    mutateTambahDoa(values, {
      onSuccess: () => {
        resetForm();
        setValues(createDoaSchema.getDefault());
        return router.replace("/admin/doa");
      },
    });
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

  const formik = useFormik<TambahDoaPayload>({
    initialValues: createDoaSchema.getDefault(),
    validationSchema: createDoaSchema,
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
          isOpen={isOpen}
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent>
            <FormikProvider value={formikKategori}>
              <Form onSubmit={handleSubmitKategori}>
                <ModalHeader>Tambah Kategori Do'a</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <CustomInput
                    id="kategori_name"
                    title="Nama Kategori Do'a"
                    type="text"
                    values={valuesKategori.kategori_name}
                    handleChange={handleChangeKategori}
                    handleBlur={handleBlurKategori}
                    isInvalid={!!errorsKategori?.kategori_name}
                    errorMessage={errorsKategori?.kategori_name}
                    backgroundColor="#ffffff"
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
                        isLoading={isLoadingTambahKategori}
                        isDisabled={isLoadingTambahKategori}
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
                        isLoading={isLoadingTambahKategori}
                        isDisabled={isLoadingTambahKategori}
                        h="45px"
                        backgroundColor={"blue.500"}
                        color={"#ffffff"}
                        leftIcon={<FaSquarePlus color="#ffffff" />}
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

      <section className="w-full rounded-[10px] bg-primary p-5">
        <FormikProvider value={formik}>
          <Form
            className="flex h-full flex-col space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="flex h-full w-full flex-col items-center justify-between gap-y-3">
              <div className="grid w-full grid-cols-2 gap-x-10 gap-y-3">
                <CustomInput
                  id="name"
                  title="Nama Do'a"
                  type="text"
                  values={values.name}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.name}
                  errorMessage={errors?.name}
                  backgroundColor="#ffffff"
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
                  backgroundColor="#ffffff"
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
                  backgroundColor="#ffffff"
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
                  backgroundColor="#ffffff"
                />
              </div>
              <div className="flex h-full w-[100%] flex-col justify-between space-y-3">
                <CustomSelect
                  id="kategori_id"
                  title="Kategori Do'a"
                  size={"lg"}
                  values={values.kategori_id.toString()}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  isInvalid={!!errors?.kategori_id}
                  errorMessage={errors?.kategori_id}
                  backgroundColor="#ffffff"
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
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="w-[20%]">
                <Button
                  width={"full"}
                  fontWeight="normal"
                  type="reset"
                  colorScheme={"red"}
                  variant={"outline"}
                  isLoading={isLoadingTambahDoa}
                  isDisabled={isLoadingTambahDoa}
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
                  fontWeight="normal"
                  type="submit"
                  isLoading={isLoadingTambahDoa}
                  isDisabled={isLoadingTambahDoa}
                  h="45px"
                  backgroundColor={"blue.500"}
                  color={"#ffffff"}
                  leftIcon={<FaSquarePlus color="#ffffff" />}
                  _hover={{ bgColor: "blue.600" }}
                >
                  Buat Akun
                </Button>
              </div>
            </div>
          </Form>
        </FormikProvider>
      </section>
    </div>
  );
};

export default TambahDoa;
