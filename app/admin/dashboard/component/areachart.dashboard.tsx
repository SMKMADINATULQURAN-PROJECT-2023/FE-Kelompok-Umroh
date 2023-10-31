// 'use client';
// import ReactApexChart from 'react-apexcharts';
// import React, { useEffect, useState } from 'react';

// interface AreaChartProps {
//   options: any;
//   series: any[];
// }

// const AreaChart: React.FC<AreaChartProps> = ({ options, series }) => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setTimeout(() => {
//       setIsClient(true);
//     }, 1000);
//   }, []);

//   return (
//     <div>
//       {!isClient ? (
//         // Render a loading message or spinner while waiting
//         <div className="flex w-full h-full items-center justify-center">
//           Loading...
//         </div>
//       ) : (
//         <ReactApexChart
//           options={options}
//           series={series}
//           type="area"
//           height={300}
//         />
//       )}
//     </div>
//   );
// };

// export default AreaChart;
