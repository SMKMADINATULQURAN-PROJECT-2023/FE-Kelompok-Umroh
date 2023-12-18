import { FaHandsHolding, FaUser } from "react-icons/fa6";
import { RiShieldUserFill } from "react-icons/ri";
import { BiSolidCategory } from "react-icons/bi";
import { MdArticle, MdPermDeviceInformation } from "react-icons/md";
import useUserModule from "../../user/service/user.service";
import useArtikelModule from "../../artikel/service/artikel.service";
import useZiarahModule from "../../ziarah/service/ziarah.service";
import useDoaModule from "../../doa/service/doa.service";
import usePanduanModule from "../../panduan/service/panduan.service";
import { FaMapMarkedAlt } from "react-icons/fa";

const totalDataDashboardModule = () => {
  const { useGetUserAdmin, useGetUserMobile } = useUserModule();
  const { useGetArtikel } = useArtikelModule();
  const { useGetZiarah } = useZiarahModule();
  const { useGetDoa, useGetKategoriDoa } = useDoaModule();
  const { useGetPanduan } = usePanduanModule();

  const {
    data: userAdminData,
    isFetching: userAdminIsFetching,
    isLoading: userAdminIsLoading,
  } = useGetUserAdmin();
  const {
    data: userMobileData,
    isFetching: userMobileIsFetching,
    isLoading: userMobileIsLoading,
  } = useGetUserMobile();
  const {
    data: artikelData,
    isFetching: artikelIsFetching,
    isLoading: artikelIsLoading,
  } = useGetArtikel();
  const {
    data: ziarahData,
    isFetching: ziarahIsFetching,
    isLoading: ziarahIsLoading,
  } = useGetZiarah();
  const {
    data: doaData,
    isFetching: doaIsFetching,
    isLoading: doaIsLoading,
  } = useGetDoa();
  const {
    data: kategoriDoaData,
    isFetching: kategoriDoaIsFetching,
    isLoading: kategoriDoaIsLoading,
  } = useGetKategoriDoa();
  const {
    data: panduanData,
    isFetching: panduanIsFetching,
    isLoading: panduanIsLoading,
  } = useGetPanduan();

  const isLoading =
    userAdminIsFetching ||
    userMobileIsFetching ||
    artikelIsFetching ||
    ziarahIsFetching ||
    doaIsFetching ||
    kategoriDoaIsFetching ||
    panduanIsFetching ||
    userAdminIsLoading ||
    userMobileIsLoading ||
    artikelIsLoading ||
    ziarahIsLoading ||
    doaIsLoading ||
    kategoriDoaIsLoading ||
    panduanIsLoading;

  const totalItem = [
    {
      item: "Total Do'a",
      total: doaData?.pagination.total,
      icon: <FaHandsHolding className="text-lg text-primary" />,
    },
    {
      item: "Total Artikel",
      total: artikelData?.pagination.total,
      icon: <MdArticle className="text-lg text-primary" />,
    },
    {
      item: "Total Ziarah",
      total: ziarahData?.pagination.total,
      icon: <FaMapMarkedAlt className="text-lg text-primary" />,
    },
    {
      item: "Total Panduan",
      total: panduanData?.pagination.total,
      icon: <MdPermDeviceInformation className="text-lg text-primary" />,
    },
    {
      item: "Total Kategori Do'a",
      total: kategoriDoaData?.pagination.total,
      icon: <BiSolidCategory className="text-lg text-primary" />,
    },
    {
      item: "Total User Mobile",
      total: userMobileData?.pagination.total,
      icon: <FaUser className="text-lg text-primary" />,
    },
    {
      item: "Total User Admin",
      total: userAdminData?.pagination.total,
      icon: <RiShieldUserFill className="text-lg text-primary" />,
    },
  ];
  return { totalItem, isLoading };
};

export default totalDataDashboardModule;
