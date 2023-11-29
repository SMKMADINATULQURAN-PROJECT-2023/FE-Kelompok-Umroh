import React, { useCallback } from "react";
import FilterDrawer from "@/components/FilterDrawer";
import { useFormik } from "formik";
import * as yup from "yup";
import { ZiarahFilter } from "../interface/ziarah.interface";
import CustomInput from "@/components/CustomInput";

const ziarahFilterSchema = yup.object().shape({
  status: yup.string().default("").optional(),
  created_by: yup.string().default("").optional(),
  keyword: yup.string().default("").optional(),
});

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
  const onSubmit = useCallback(
    async (values: ZiarahFilter) => {
      setCreated_by(values.created_by);
      setKeyword(values.keyword);
      setStatus(values.status);
      return refetch();
    },
    [setCreated_by, setKeyword, setStatus, refetch],
  );

  const onReset = useCallback(async () => {
    setCreated_by("");
    setKeyword("");
    setStatus("");
    return refetch();
  }, [setCreated_by, setKeyword, setStatus, refetch]);

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
      <FilterDrawer
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
      </FilterDrawer>
    </div>
  );
};

export default ZiarahFilterSection;
