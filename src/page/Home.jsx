/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Dashboard from '../template/Dashboard';
import { get } from '../utils/api';
import DashboardCard from '../components/cardDashboard/CardDashboard';
import Footer from '../components/Footer';
import useTitle from '../utils/useTitle';

// Registrasi komponen Chart.js yang diperlukan
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Home = () => {
  useTitle('Home - PPDB Letris 2');
  const [counts, setCounts] = useState({ medical: 0, students: 0, parents: 0 });
  const [chartData, setChartData] = useState(null);

  // Fetch data untuk count
  const fetchCounts = async () => {
    try {
      const data = await get('/dashboard/count');
      setCounts(data);
    } catch (error) {
      console.error('Error fetching count data:', error);
    }
  };

  // Fetch data untuk chart
  const fetchChartData = async () => {
    try {
      const data = await get('/dashboard/count-data-week-permonth');
      setChartData(data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  // Gunakan useEffect untuk melakukan polling data setiap 5 detik
  useEffect(() => {
    fetchCounts();
    fetchChartData();
    const refreshInterval = import.meta.env.VITE_REFRESH_INTERVAL || 10000;

    const interval = setInterval(() => {
      fetchCounts();
      fetchChartData();
    }, refreshInterval); 

    // Bersihkan interval saat komponen di-unmount
    return () => clearInterval(interval);
  }, []);

  // Konversi data API ke format yang sesuai dengan Chart.js
  const prepareChartData = () => {
    if (!chartData) return null;

    const labels = chartData.map(item => `Minggu ke-${item.week}, ${item.month}/${item.year}`);
    const medicalData = chartData.map(item => item.medical || 0);
    const studentData = chartData.map(item => item.students || 0);
    const parentData = chartData.map(item => item.parents || 0);

    return {
      labels,
      datasets: [
        {
          label: 'Medical',
          data: medicalData,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Students',
          data: studentData,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: 'Parents',
          data: parentData,
          backgroundColor: 'rgba(255, 206, 86, 0.5)',
        },
      ],
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Dashboard title={'Home'}>
        <div className='flex flex-col mx-auto max-w-7xl xl:flex-row lg:w-full flex-1'>
          <div className='w-full h-full xl:w-full xl:px-5'>
            <div className='w-full mt-2'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                <DashboardCard to='/form-orang-tua-1' title='Total Data Orang Tua' count={counts.parents} description='Input Data Orang Tua' />
                <DashboardCard to='/form-siswa-1' title='Total Data Calon Peserta Didik' count={counts.students} description='Input Data Calon Peserta Didik' />
                <DashboardCard to='/form-medical' title='Total Data Medical Check Up' count={counts.medical} description='Input Data Medical Check Up' />
              </div>

              {/* Tampilkan Chart */}
              <div className="mt-8 p-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-medium mb-4 text-red-800">Statistik Per Minggu</h2>
                {chartData ? <Bar data={prepareChartData()} /> : <p>Loading chart...</p>}
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="mt-8 mx-0 lg:mx-16">
          <Footer />
        </div>

      </Dashboard>
    </div>
  );
};

export default Home;
