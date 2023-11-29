import React, { useCallback } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import CustomInput from "@/components/CustomInput";
import FilterDrawer from "@/components/FilterDrawer";
import type { KategoriFilter } from "../interface/doa.interface";

const kategoriDoaFilterSchema = yup.object().shape({
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

const KategoriDoaFilter: React.FC<Props> = ({
  isLoading,
  setCreated_by,
  setStatus,
  setKeyword,
  refetch,
}) => {
  const onSubmit = useCallback(
    async (values: KategoriFilter) => {
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

  const formik = useFormik<KategoriFilter>({
    initialValues: kategoriDoaFilterSchema.getDefault(),
    validationSchema: kategoriDoaFilterSchema,
    enableReinitialize: true,
    onSubmit: onSubmit,
    onReset: onReset,
  });

  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

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

export default KategoriDoaFilter;
