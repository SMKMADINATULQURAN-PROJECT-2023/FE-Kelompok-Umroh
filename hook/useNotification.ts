import { useToast } from "@chakra-ui/react";

export default function useNotification() {
  const toast = useToast({ position: "top-right" });

  function toastSuccess(message: string) {
    toast({
      title: "Berhasil",
      position: "top-right",
      description: message,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  }
  function toastInfo(message: string) {
    toast({
      title: "Info",
      position: "top-right",
      description: message,
      status: "info",
      duration: 4000,
      isClosable: true,
    });
  }
  function toastError(message: string = "Ada Kesalahan") {
    toast({
      title: "Error",
      description: message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
  function toastWarning(message: string) {
    toast({
      title: "Peringatan",
      description: message,
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  }

  return { toastSuccess, toastError, toastWarning, toastInfo };
}
