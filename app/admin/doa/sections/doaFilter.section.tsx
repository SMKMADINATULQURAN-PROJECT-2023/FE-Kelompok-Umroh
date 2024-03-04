import React, { useCallback, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomInput from "@/components/CustomInput";
import FilterDrawer from "@/components/FilterDrawer";
import type { DoaFilter } from "../interface/doa.interface";

const doaFilterSchema = yup.object().shape({
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

const DoaFilter: React.FC<Props> = ({
  isLoading,
  setCreated_by,
  setStatus,
  setKeyword,
  refetch,
}) => {
  const onSubmit = useCallback(
    async (values: DoaFilter) => {
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

  const formik = useFormik<DoaFilter>({
    initialValues: doaFilterSchema.getDefault(),
    validationSchema: doaFilterSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
    onReset: onReset,
  });

  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setKeyword(values.keyword);
    }, 700);

    return () => clearTimeout(delayDebounceFn);
  }, [values.keyword]);

  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <div className="w-1/2">
        <CustomInput
          id="keyword"
          noLabel
          isInputLeftAddon
          title="nama do'a, dibuat oleh"
          type="text"
          values={values.keyword}
          handleChange={handleChange}
          handleBlur={handleBlur}
          isInvalid={!!errors?.keyword}
          errorMessage={errors?.keyword}
        />
      </div>
      <FilterDrawer
        formik={formik}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        refetch={refetch}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        values={values}
      ></FilterDrawer>
    </div>
  );
};

export default DoaFilter;
