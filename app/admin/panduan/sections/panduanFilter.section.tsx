import React, { useCallback, useEffect } from "react";
import * as yup from "yup";
import { PanduanFilter } from "../interface/panduan.interface";
import { useFormik } from "formik";
import CustomSelect from "@/components/CustomSelect";
import FilterDrawer from "@/components/FilterDrawer";
import CustomInput from "@/components/CustomInput";

const panduanFilterSchema = yup.object().shape({
  keyword: yup.string().default("").optional(),
  status: yup.string().default("").optional(),
  created_by: yup.string().default("").optional(),
  gender: yup.string().default("").optional(),
  kategori_panduan: yup.string().default("").optional(),
});

const kategoriOption = [
  {
    value: "Umrah",
    label: "Umrah",
  },
  {
    value: "Haji",
    label: "Haji",
  },
];

const genderOption = [
  {
    value: "Laki-Laki",
    label: "Laki - Laki",
  },
  {
    value: "Perempuan",
    label: "Perempuan",
  },
];

interface Props {
  isLoading: boolean;
  setStatus: any;
  setKeyword: any;
  setKategori: any;
  setCreated_by: any;
  setGender: any;
  refetch: any;
}

const PanduanFilterSection: React.FC<Props> = ({
  isLoading,
  setCreated_by,
  setKategori,
  setStatus,
  setKeyword,
  setGender,
  refetch,
}) => {
  const onSubmit = useCallback(
    async (values: PanduanFilter) => {
      setCreated_by(values.created_by);
      setGender(values.gender);
      setKeyword(values.keyword);
      setKategori(values.kategori_panduan);
      setStatus(values.status);
      return refetch();
    },
    [setCreated_by, setKeyword, setStatus, setGender, setKategori, refetch],
  );

  const onReset = useCallback(async () => {
    setCreated_by("");
    setKeyword("");
    setGender("");
    setKategori("");
    setStatus("");
    return refetch();
  }, [setCreated_by, setKeyword, setStatus, setGender, setKategori, refetch]);

  const formik = useFormik<PanduanFilter>({
    initialValues: panduanFilterSchema.getDefault(),
    validationSchema: panduanFilterSchema,
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
          title="Kata kunci"
          type="text"
          noLabel
          isInputLeftAddon
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
      >
        <div className="flex w-full flex-col space-y-7">
          <CustomSelect
            id="gender"
            title="Panduan Untuk"
            size={"lg"}
            values={values.gender.toString()}
            handleChange={handleChange}
            handleBlur={handleBlur}
            isInvalid={!!errors?.gender}
            errorMessage={errors?.gender}
          >
            {genderOption.map((_, i) => {
              return (
                <option value={_.value} key={i}>
                  {_.label}
                </option>
              );
            })}
          </CustomSelect>
          <CustomSelect
            id="kategori_panduan"
            title="Kategori Panduan"
            size={"lg"}
            values={values.kategori_panduan.toString()}
            handleChange={handleChange}
            handleBlur={handleBlur}
            isInvalid={!!errors?.kategori_panduan}
            errorMessage={errors?.kategori_panduan}
          >
            {kategoriOption.map((_, i) => {
              return (
                <option value={_.value} key={i}>
                  {_.label}
                </option>
              );
            })}
          </CustomSelect>
        </div>
      </FilterDrawer>
    </div>
  );
};

export default PanduanFilterSection;
