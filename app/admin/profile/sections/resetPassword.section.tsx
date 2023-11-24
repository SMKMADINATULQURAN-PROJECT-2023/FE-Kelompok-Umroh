import { resetPassword } from "@/app/auth/interface";
import {
  useProfileService,
  useResetPassword,
} from "@/app/auth/service/auth.service";
import CustomInput from "@/components/CustomInput";
import { Button } from "@chakra-ui/react";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useCallback, useMemo } from "react";
import { FaRegPenToSquare, FaRotateLeft } from "react-icons/fa6";
import * as yup from "yup";

interface Props {}

const ResetPasswordSection: React.FC<Props> = ({}) => {
  const {
    data,
    isFetching,
    isLoading: isLoadingProfile,
    refetch,
  } = useProfileService();
  const { isLoading: isLoadingUpdate, mutate } = useResetPassword();
  const isLoading = useMemo(
    () => isFetching || isLoadingProfile || isLoadingUpdate,
    [isFetching, isLoadingProfile, isLoadingUpdate],
  );

  const resetPasswordSchema = yup.object().shape({
    refresh_token: yup
      .string()
      .required("refresh_token is required")
      .default(data?.data.refresh_token ?? ""),
    new_password: yup
      .string()
      .required("New password is required")
      .min(8, "Password must be at least 8 characters")
      .max(50, "Password can't be longer than 50 characters")
      .default(""),
    confirm_password: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("new_password")], "Passwords must match")
      .default(""),
  });

  const onSubmit = useCallback(
    async (values: resetPassword) => {
      console.log(values);
      mutate(values, {
        onSuccess: () => {
          resetForm();
          setValues(resetPasswordSchema.getDefault());
        },
      });
    },
    [mutate, resetPasswordSchema],
  );

  const formik = useFormik<resetPassword>({
    initialValues: resetPasswordSchema.getDefault(),
    validationSchema: resetPasswordSchema,
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

  const handleReset = useCallback(() => formik.resetForm(), [formik]);
  return (
    <div>
      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit}>
          <div className="grid w-full grid-cols-1 gap-x-5 gap-y-5 rounded-[10px] border-primary px-5 lg:grid-cols-2 lg:gap-y-3 lg:border lg:p-7">
            <CustomInput
              id="new_password"
              title="Password Baru"
              type="password"
              values={values.new_password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isInvalid={!!errors?.new_password}
              errorMessage={errors?.new_password}
            />
            <CustomInput
              id="confirm_password"
              title="Konfirmasi Passowrd"
              type="password"
              values={values.confirm_password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isInvalid={!!errors?.confirm_password}
              errorMessage={errors?.confirm_password}
            />
            <div className="col-span-1 mt-5 flex w-full items-center justify-between space-x-5 lg:col-span-2 lg:mt-10 lg:space-x-0">
              <div className="w-full lg:w-[30%]">
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
                  leftIcon={<FaRotateLeft color="##E53E3E" />}
                  onClick={handleReset}
                >
                  Kembali Semula
                </Button>
              </div>
              <div className="w-full lg:w-[30%]">
                <Button
                  width={"full"}
                  fontWeight="normal"
                  type="submit"
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  h="45px"
                  backgroundColor={"blue.500"}
                  color={"#ffffff"}
                  leftIcon={<FaRegPenToSquare color="#ffffff" />}
                  _hover={{ bgColor: "blue.600" }}
                >
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default ResetPasswordSection;
