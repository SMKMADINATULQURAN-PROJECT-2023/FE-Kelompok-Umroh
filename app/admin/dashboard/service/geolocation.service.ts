import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

interface GeolocationData {
  display_name: string;
  address: {
    country: string;
    county: string;
    municipality: string;
    village: string;
    region: string;
    state: string;
  };
}

const getGeolocation = async (): Promise<GeolocationData> => {
  return new Promise<GeolocationData>((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

          axios
            .get(apiUrl)
            .then((response) => {
              const data: GeolocationData = response.data;
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        },
        (error) => {
          reject(error);
        },
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

const useGeolocation = (options?: UseQueryOptions<GeolocationData>) => {
  return useQuery<GeolocationData>({
    queryKey: ["geolocation"],
    queryFn: () => getGeolocation(),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 30,
    ...options,
  });
};

export default useGeolocation;
