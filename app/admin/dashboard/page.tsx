import { CustomHeader } from '@/component';
import { NextPage } from 'next';
import kabah from '../../../assets/images/kaabah.jpeg';
import Image from 'next/image';
import {
  FaHouseChimney,
  FaUser,
  FaSliders,
  FaPlaneDeparture,
  FaMapLocationDot,
  FaFilePen,
  FaHandsHolding,
} from 'react-icons/fa6';

interface Props {}

const Dashboard: NextPage<Props> = ({}) => {
  const totalItem = [
    {
      item: 'Total User',
      total: '122',
      icon: <FaHouseChimney color="#262a56" size={22} />,
    },
    { item: 'Total Slider', total: '3', icon: <FaSliders color="#262a56" size={22} /> },
    {
      item: 'Total Doa',
      total: '50',
      icon: <FaHandsHolding color="#262a56" size={22} />,
    },
    { item: 'Total Artikel', total: '25', icon: <FaFilePen color="#262a56" size={22} /> },
  ];
  return (
    <div className="w-full h-full">
      <CustomHeader />

      <section className="w-full bg-primary rounded-[10px] relative h-64 overflow-hidden mb-[20px]">
        <Image
          src={kabah}
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-transparent"></div>
        <div className="absolute p-5 h-full w-full inset-0 flex flex-col justify-between text-white">
          <div className="flex flex-col items-start">
            <p className="text-abu font-semibold">Selamat Datang,</p>
            <p className="text-white font-bold text-[30px]">Username</p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-abu">Senang bertemu denganmu kembali!</p>
            <p className="text-abu">semoga harimu indah 😊.</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-x-5">
        {totalItem.map((_, i) => {
          return (
            <div
              key={i}
              className="flex items-center p-5 justify-between bg-primary rounded-[10px] w-full h-[100px]"
            >
              <div className="flex flex-col items-start">
                <p className="text-abu font-semibold">{_.item}</p>
                <p className="text-white text-[25px] font-bold">{_.total}</p>
              </div>
              <div className="bg-white rounded-[10px] p-3">{_.icon}</div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Dashboard;
