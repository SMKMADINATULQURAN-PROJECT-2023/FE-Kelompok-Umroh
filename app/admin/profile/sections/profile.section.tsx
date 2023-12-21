import React, { useCallback, useMemo } from "react";
import { Form, FormikProvider, useFormik } from "formik";
import CustomInput from "@/components/CustomInput";
import { EditProfilePayload } from "@/app/auth/interface";
import { Avatar, Button } from "@chakra-ui/react";
import * as yup from "yup";
import { FaRegPenToSquare, FaRotateLeft } from "react-icons/fa6";
import {
  useProfileService,
  useUpdateProfile,
} from "@/app/auth/service/auth.service";

interface Props {}

const ProfileSection: React.FC<Props> = ({}) => {
  const {
    data,
    isFetching,
    isLoading: isLoadingProfile,
    refetch,
  } = useProfileService();
  const { isLoading: isLoadingUpdate, mutate } = useUpdateProfile();
  const isLoading = useMemo(
    () => isFetching || isLoadingProfile || isLoadingUpdate,
    [isFetching, isLoadingProfile, isLoadingUpdate],
  );

  const updateUserSchema = yup.object().shape({
    username: yup
      .string()
      .nullable()
      .default(data?.data.username ?? ""),
    email: yup
      .string()
      .default(data?.data.email ?? "")
      .email("Gunakan Format Email"),
    file_edit_profile: yup
      .mixed()
      .nullable()
      .default(data?.data.avatar ?? null),
  });

  const onSubmit = useCallback(
    async (values: EditProfilePayload) => {
      mutate(values, {
        onSuccess: () => {
          resetForm();
          setValues(updateUserSchema.getDefault());
          refetch();
        },
      });
    },
    [mutate, updateUserSchema],
  );

  const formik = useFormik<EditProfilePayload>({
    initialValues: updateUserSchema.getDefault(),
    validationSchema: updateUserSchema,
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
          <div className="flex h-full w-full flex-col space-y-10 lg:space-y-5">
            <div className="flex w-full items-center space-x-5 overflow-x-hidden rounded-none bg-primary bg-opacity-20 border border-primary p-5 lg:rounded-[10px]">
              <div className="flex items-center">
                {values.file_edit_profile ? (
                  <div className="overflow-hidden">
                    <Avatar
                      src={
                        typeof values.file_edit_profile === "string"
                          ? values.file_edit_profile
                          : URL.createObjectURL(values.file_edit_profile)
                      }
                      name={values.username}
                      size="xl"
                    />
                  </div>
                ) : (
                  <div className="">
                    <Avatar size="xl" name="-" src="" />
                  </div>
                )}
              </div>
              <div className="flex flex-col items-start">
                <input
                  className="w-fit cursor-pointer text-primary"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      if (file.size > 10 * 1024 * 1024) {
                        alert("File size exceeds 10 MB.");
                        return;
                      }

                      setFieldValue("file_edit_profile", file);
                    }
                  }}
                />
                {values.file_edit_profile && (
                  <span className="text-primary">
                    {(values.file_edit_profile.size / (1024 * 1024)).toFixed(2)}{" "}
                    MB
                  </span>
                )}
              </div>
            </div>

            <div className="grid w-full grid-cols-1 gap-x-5 gap-y-5 px-5 lg:gap-y-5 lg:px-0 lg:py-7">
              <CustomInput
                id="username"
                title="Username"
                type="text"
                values={values.username}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isInvalid={!!errors?.username}
                errorMessage={errors?.username}
              />
              <CustomInput
                id="email"
                title="Email"
                type="email"
                values={values.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
                isInvalid={!!errors?.email}
                errorMessage={errors?.email}
              />
              <div className="mt-5 flex w-full items-center justify-between space-x-5 lg:mt-10 lg:space-x-0">
                <div className="w-full lg:w-[30%]">
                  <Button
                    width={"full"}
                    fontWeight="normal"
                    type="reset"
                    bg={"rgba(229,62,62,0.2)"}
                    isLoading={isLoading}
                    isDisabled={isLoading}
                    h="45px"
                    color={"red.500"}
                    leftIcon={<FaRotateLeft color="##E53E3E" />}
                    onClick={handleReset}
                    _hover={{
                      color: "white",
                      bg: "red.500",
                    }}
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
          </div>
        </Form>
      </FormikProvider>
    </div>
  );
};

export default ProfileSection;
