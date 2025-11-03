import React, { useState, useEffect } from 'react';
import { FaGlobe, FaCode, FaPalette, FaFileInvoice, FaChartLine, FaMoneyBillTransfer, FaNetworkWired } from 'react-icons/fa6';
import Dashboard from '../../template/Dashboard';
import { get } from '../../utils/api';
import CardLandingPage from '../../components/cardDashboard/CardLandingPage';

const iconMapping = {
  "Rekayasa Perangkat Lunak & Gim": FaCode,
  "Desain Komunikasi Visual Reguler": FaPalette,
  "Desain Komunikasi Visual Bilingual": FaPalette,
  "Manajemen Perkantoran & Layanan Bisnis Reguler": FaFileInvoice,
  "Manajemen Perkantoran & Layanan Bisnis Bilingual": FaFileInvoice,
  "Pemasaran & Bisnis Retail": FaChartLine,
  "Akuntansi dan Keuangan Lembaga": FaMoneyBillTransfer,
  "Teknik Komputer & Jaringan": FaNetworkWired
};

// const DashboardCard = ({ title, count, description, Icon, max, isBilingual }) => {
//   const isClosed = description.toLowerCase() === 'closed';
//   const percentage = (count / max) * 100;
//   const isNearFull = percentage >= 90;
  
//   return (
//     <div className={`relative overflow-hidden rounded-xl border p-6 ${isClosed ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'} shadow-sm transition-all hover:shadow-md`}>
//       <div className="flex items-start justify-between relative z-10">
//         <div className="space-y-2">
//           <div className="flex items-center gap-2">
//             <div className={`inline-flex items-center rounded-lg ${isClosed ? 'bg-red-100' : 'bg-blue-100'} p-2`}>
//               <Icon className={`h-6 w-6 ${isClosed ? 'text-red-600' : 'text-blue-600'}`} />
//             </div>
//             {isBilingual && (
//               <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium">
//                 <FaGlobe className="h-4 w-4" />
//                 Bilingual
//               </span>
//             )}
//           </div>
//           <h3 className="font-medium text-gray-900 text-lg whitespace-pre-line">{title}</h3>
//         </div>
//         <div className={`text-2xl font-bold flex flex-col items-end justify-center relative z-10 ${isClosed ? 'text-red-900' : isNearFull ? 'text-amber-900' : 'text-gray-900'}`}>
//           <div className="flex items-baseline gap-1">
//             <span className="text-5xl font-bold">{count}</span>
//             <span className="text-2xl text-gray-500 font-normal">/</span>
//             <span className="text-2xl text-gray-500 font-normal">{max}</span>
//           </div>
//           <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
//             <div className={`h-2 rounded-full transition-all ${isClosed ? 'bg-red-500' : isNearFull ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${percentage}%` }} />
//           </div>
//           <span className="text-sm font-normal text-gray-500 mt-1">{Math.round(percentage)}% Terisi</span>
//         </div>
//       </div>
//       <div className="mt-4 relative z-10">
//         <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${isClosed ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>{description}</div>
//       </div>
//     </div>
//   );
// };

function LandingPage() {
  const [dataJurusan, setDataJurusan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      const response = await get("/registration/");
      const formattedData = response.map(item => ({
        title: item.competence_name,
        count: item.current_registered >= item.max_capacity ? item.max_capacity : item.current_registered,
        description: item.current_registered >= item.max_capacity ? 'Closed' : 'Kuota tersedia',
        icon: iconMapping[item.competence_name] || FaNetworkWired,
        max: item.max_capacity,
        isBilingual: item.competence_name.includes("Bilingual")
      }));
      setDataJurusan(formattedData);
    } catch (err) {
      setError("Gagal mengambil data jurusan");
      console.error("❌ Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const refreshInterval = import.meta.env.VITE_REFRESH_INTERVAL || 10000;
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <Dashboard>
      
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-7xl">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dataJurusan.map((jurusan, index) => (
                <CardLandingPage
                  key={index}
                  title={jurusan.title}
                  count={jurusan.count}
                  description={jurusan.description}
                  Icon={jurusan.icon}
                  max={jurusan.max}
                  isBilingual={jurusan.isBilingual}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
}

export default LandingPage;
