import CustomDrawer from "@/components/CustomDrawer";
import CustomInput from "@/components/CustomInput";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { ZiarahFilter } from "../interface/ziarah.interface";

interface Props {
  isLoading: boolean;
  setStatus: any;
  setKeyword: any;
  setCreated_by: any;
  refetch: any;
}

const ZiarahFilterSection: React.FC<Props> = ({
  isLoading,
  setCreated_by,
  setStatus,
  setKeyword,
  refetch,
}) => {
  const ziarahFilterSchema = yup.object().shape({
    status: yup.string().default("").optional(),
    created_by: yup.string().default("").optional(),
    keyword: yup.string().default("").optional(),
  });

  const onSubmit = async (values: ZiarahFilter) => {
    setCreated_by(values.created_by);
    setKeyword(values.keyword);
    setStatus(values.status);
    return refetch();
  };
  const onReset = async (values: ZiarahFilter) => {
    setCreated_by("");
    setKeyword("");
    setStatus("");
    return refetch();
  };

  const formik = useFormik<ZiarahFilter>({
    initialValues: ziarahFilterSchema.getDefault(),
    validationSchema: ziarahFilterSchema,
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

export default ZiarahFilterSection;
