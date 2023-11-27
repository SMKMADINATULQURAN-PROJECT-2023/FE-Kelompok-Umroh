import CustomDrawer from "@/components/CustomDrawer";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { ArtikelFilter } from "../interface/artikel.interface";
import CustomInput from "@/components/CustomInput";

interface Props {
  isLoading: boolean;
  setStatus: any;
  setKeyword: any;
  setCreated_by: any;
  refetch: any;
}

const ArtikelFilterSection: React.FC<Props> = ({
  isLoading,
  setCreated_by,
  setStatus,
  setKeyword,
  refetch,
}) => {
  const artikelFilterSchema = yup.object().shape({
    status: yup.string().default("").optional(),
    created_by: yup.string().default("").optional(),
    keyword: yup.string().default("").optional(),
  });

  const onSubmit = async (values: ArtikelFilter) => {
    setCreated_by(values.created_by);
    setKeyword(values.keyword);
    setStatus(values.status);
    return refetch();
  };
  const onReset = async (values: ArtikelFilter) => {
    setCreated_by("");
    setKeyword("");
    setStatus("");
    return refetch();
  };

  const formik = useFormik<ArtikelFilter>({
    initialValues: artikelFilterSchema.getDefault(),
    validationSchema: artikelFilterSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
    onReset: onReset,
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
    <div className="flex w-full items-center justify-end">
      <CustomDrawer
        formik={formik}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        refetch={refetch}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        values={values}
      >
        <div className="flex w-full flex-col space-y-7">
          <CustomInput
            id="keyword"
            title="Kata kunci"
            type="text"
            values={values.keyword}
            handleChange={handleChange}
            handleBlur={handleBlur}
            isInvalid={!!errors?.keyword}
            errorMessage={errors?.keyword}
          />
        </div>
      </CustomDrawer>
    </div>
  );
};

export default ArtikelFilterSection;
