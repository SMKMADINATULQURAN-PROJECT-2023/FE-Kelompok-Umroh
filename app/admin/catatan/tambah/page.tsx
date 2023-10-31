"use client";
import React, { useEffect, useState } from "react";
import { Form, Formik, FormikProvider, useFormik } from "formik";
import * as yup from "yup";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";

const catatanSchema = yup.object().shape({
  kategori: yup.number().default(null).required("Wajib dipilih"),
  keterangan: yup.string().default("").required("Wajib diisi"),
  tanggal: yup.date().default(null).required("Wajib diisi"),
  siswa: yup.object().shape({
    id: yup.number().default(null).required("wajib dipilih"),
  }),
  poin: yup
    .number()
    .default(null)
    .min(1, "Minimal poin 1")
    .max(250, "Maksimal point 250")
    .required("Wajib diisi"),
});

const defaultCatatanArray = {
  catatan: [
    {
      kategori: null,
      keterangan: "",
      tanggal: null,
      siswa: { id: null },
      poin: null,
    },
  ],
};

const catatanArraySchema = yup
  .object()
  .shape({
    catatan: yup.array().of(catatanSchema),
  })
  .default(defaultCatatanArray);
type CatatanValues = yup.Asserts<typeof catatanArraySchema>;

export default function TambahCatatan() {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...catatanArraySchema.getDefault(),
    },
    onSubmit: () => {
      console.log("ok");
    },
    validationSchema: catatanSchema,
  });
  let { values, errors, handleChange, handleBlur, handleSubmit } = formik;
  return (
    <>
      {JSON.stringify(values)}
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          {values?.catatan?.map((value, index) => (
            <React.Fragment key={index}>
              <InputGroup className="mt-5">
                {/* <InputLeftElement
                  pointerEvents="none"
                  children={<CalendarIcon className="text-gray-300 w-5" />}
                /> */}
                <ReactDatePicker
                  customInput={
                    <Input sx={{ pl: "40px", pr: "16px" }} variant="outline" />
                  }
                  className="w-full"
                  placeholderText="DD-MM-YYYY"
                  dateFormat="dd-MM-yyyy"
                  selected={value.tanggal}
                  onChange={(val) => {
                    console.log("va", val);
                  }}
                />
              </InputGroup>
            </React.Fragment>
          ))}
        </Form>
      </FormikProvider>
    </>
  );
}
