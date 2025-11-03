/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import Dashboard from '../../template/Dashboard';
import Footer from '../../components/Footer';
import { getGreetingTime } from '../../utils/greetingTime';
import moment from 'moment/moment';
import useTitle from '../../utils/useTitle';
import CardLandingPage from '../../components/cardDashboard/CardLandingPage';

import { FaArrowRightFromBracket, FaCode, FaPalette, FaFileInvoice, FaChartLine, FaMoneyBillTransfer, FaNetworkWired } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { get } from '../../utils/api';

function RegistratorDashboard() {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);
  const userName = state?.full_name;

  useTitle('Dashboard Registrator');

  // State untuk menyimpan data dari API
  const [dataJurusan, setDataJurusan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Mapping ikon berdasarkan nama jurusan
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

  // Fungsi untuk mengambil data dari API
  const fetchData = async () => {
    try {
      const response = await get("/registration/");
      const formattedData = response.map(item => ({
        title: item.competence_name,
        count: item.current_registered >= item.max_capacity ? item.max_capacity : item.current_registered, // ✅ Jika penuh, tampilkan max_capacity
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
  

  // useEffect untuk fetch data pertama kali dan auto-refresh
  useEffect(() => {
    fetchData(); // Ambil data saat pertama kali komponen dimuat

    const refreshInterval = import.meta.env.VITE_REFRESH_INTERVAL || 10000; // Default 10 detik
    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval); // Hapus interval saat komponen di-unmount
  }, []);

  return (
    <Dashboard title="Dashboard Registrator">
      <div className="min-h-screen flex flex-col">
        {/* Konten utama */}
        <div className="flex-grow mx-2 md:mx-6">
          <div className="container pb-8">
            <h1 className="font-regular text-[18px] md:text-[30px]">
              Selamat {getGreetingTime(moment())}, {userName}
            </h1>
          </div>

          {/* Card update data */}
          <div className="h-[70px] max-w-full bg-red-600 mb-12 rounded-xl hover:bg-red-700 hover:cursor-pointer"
            onClick={() => navigate('/daftar-ulang')}
          >
            <div className="flex justify-start h-full mx-4">
              <div className="flex gap-3 items-center">
                <FaArrowRightFromBracket className='text-white'/>
                <h1 className="text-white text-md md:text-xl">Update Data Registrasi Terbaru</h1>
              </div>
            </div>
          </div>

          {/* Grid untuk menampilkan data jurusan */}
          <div className="container pb-5">
            <div className="mx-auto">
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
        </div>
        <Footer />
      </div>
    </Dashboard>
  );
}

export default RegistratorDashboard;
