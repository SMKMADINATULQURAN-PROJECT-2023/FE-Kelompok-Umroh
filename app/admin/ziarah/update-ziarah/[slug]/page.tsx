"use client";
import { CustomHeader } from "@/component";
import { NextPage } from "next";
import useZiarahModule from "../../service/ziarah.service";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { TambahZiarahPayload } from "../../interface/ziarah.interface";
import { useRouter as useRouterNav } from "next/navigation";

interface Props {}

const UpdateZiarah: NextPage<Props> = ({}) => {
  const routerNav = useRouterNav();
  const slug = window.location.pathname.split("/").pop();
  const { useUpdateZiarah, useGetDetailZiarah } = useZiarahModule();
  const {
    data: dataZiarah,
    isError,
    isFetching,
    isLoading: isLoadingZiarah,
    refetch,
  } = useGetDetailZiarah(slug);
  const { isLoading: isLoadingMutate, mutate } = useUpdateZiarah();
  const [quill, setQuill] = useState("");

  console.log("data", dataZiarah);
  console.log("slug", slug);

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

  const onSubmit = async (payload: TambahZiarahPayload) => {
    console.log(payload);
    mutate(
      { slug, payload },
      {
        onSuccess: () => {
          resetForm();
          setValues(createUserSchema.getDefault());
          return routerNav.replace("/admin/ziarah");
        },
      },
    );
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
    <div className="h-full w-full">
      <CustomHeader />
    </div>
  );
};

export default UpdateZiarah;
