import React, { useState, useEffect, useContext } from 'react'
import Dashboard from '../template/Dashboard';
import Tabel from '../template/Tabel';
import { FaEye, FaTrash, FaFilePen } from "react-icons/fa6";
import { get, deleteData } from '../utils/api'; 
import { useLocation, useNavigate } from 'react-router-dom'; 
import Notification from '../components/Notification/Notif';
import useTitle from '../utils/useTitle';
import { sortLatedData } from '../utils/sortLatedData';
import { AuthContext } from '../Context/AuthContext';
import DeleteConfirmation from '../components/Notification/DeleteConfirmation';
import DetailUser from './User/DetailUser';
import EditUser from './User/EditUser';


const InformasiPendaftaran = () => {
    useTitle('Informasi Pendaftaran');
    const location = useLocation();
    const navigate = useNavigate();
    const [successMsg, setSuccessMsg] = useState(location.state?.successMsg);
    const [errorMsg, setErrorMsg] = useState(location.state?.errorMsg);
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    
    const { state } = useContext(AuthContext);
    const userRole = state?.role;

    const isAdmin = userRole === 'admin';

    useEffect(() => {
        const timer = setTimeout(() => {
        setSuccessMsg('');
        setErrorMsg('');
        }, 2000);
        return () => clearTimeout(timer);
    }, [successMsg, errorMsg]);

    const handleOpenModal = (id) => {
        setSelectedId(id);
        setShowModal(true);
    };

    const handleOpenEditModal = (id) => {
        setSelectedId(id);
        setShowEditModal(true);
    };

    const handleDelete = DeleteConfirmation({
        onDelete: (id) => deleteData(`/user/delete/${id}`),
        itemName: 'data user',
        onSuccess: (id) => {
            setData(data.filter(item => item.user_id !== id));
            setSuccessMsg('Data user berhasil dihapus');
        },
        onError: (error) => {
            console.error("Error deleting user:", error);
            setErrorMsg('Gagal menghapus data user');
        }
    });

    const headTable = [
        {judul: "Nama Gelombang"},
        {judul: "Tanggal Mulai"},
        {judul: "Tanggal Selesai"},
        {judul: "Tahun Ajaran"},
        {judul: "Kuota Pendaftar"},
        {judul: "Status Gelombang"},
        {judul: "Deskripsi"},
        {judul: "Aksi"}
        
    ];

    const fetchData = async () => {
        try {
            const response = await get('/user');
            const sortedData = sortLatedData(response);
            setData(sortedData);
            setIsLoading(false);
        } catch (err) {
            setErrorMsg('Gagal Mengambil Data');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const refreshInterval = import.meta.env.VITE_REFRESH_INTERVAL || 10000;

        const refreshData = setInterval(() => {
            fetchData();
        }, refreshInterval);  

        return () => clearInterval(refreshData);
    }, []);

    const renderInformasiPendaftaranRow = (item, index) => (
        <tr className="bg-white border-b" key={item.id || index}>
          
          <td className="px-6 py-4 text-gray-900">{item.nama_gelombang}</td>
          <td className="px-6 py-4 text-gray-900">{item.tanggal_mulai}</td>
          <td className="px-6 py-4 text-gray-900">{item.tanggal_selesai}</td>
          <td className="px-6 py-4 text-gray-900">{item.tahun_ajaran}</td>
          <td className="px-6 py-4 text-gray-900">{item.kouta}</td>
          <td className="px-6 py-4 text-gray-900">{item.status_gelombang}</td>
          <td className="px-6 py-4 text-gray-900">{item.deskripsi}</td>
          {/* <td className="px-6 py-4 text-gray-900"></td> */}
          <td className='flex justify-center items-center py-6'>
            <div className='flex items-center justify-between gap-x-5'>
              <button onClick={() => handleOpenModal(item.id)} className="text-red-700 hover:text-red-500 cursor-pointer">
                <FaEye size={18} />
              </button>
              <button
                onClick={() => navigate(`/hasilSiswa/${item.id}`, { state: { childName: item.student_name } })}
                className="text-red-700 hover:text-red-500 cursor-pointer"
              >
                {/* <FaFile size={18} /> */}
              </button>
              {isAdmin && (  
                <>
                  <button onClick={() => handleOpenEditModal(item.id) }className="text-red-700 hover:text-red-500 cursor-pointer">
                    <FaFilePen size={18} />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-700 hover:text-red-500 cursor-pointer">
                    <FaTrash size={18} />
                  </button>
                </>
              )}
            </div>
          </td>
        </tr>
      );

    return (
<Dashboard title="User">
  <h1 className="text-2xl font-bold text-gray-900">Informasi Pendaftaran</h1>

  <div className="flex flex-col justify-between w-full min-h-[700px] xl:min-h-[calc(100vh-130px)]">
    {successMsg && (
      <Notification
        type="success"
        message={successMsg}
        onClose={() => setSuccessMsg('')}
      />
    )}

    {errorMsg && (
      <Notification
        type="error"
        message={errorMsg}
        onClose={() => setErrorMsg('')}
      />
    )}

    <Tabel
      title="Data User"
      headers={headTable}
      to="/add-user"
      data={
        isLoading
          ? []
          : [
              {
                id: 1,
                nama_gelombang: 'Gelombang 1',
                tanggal_mulai: '2024-06-01',
                tanggal_selesai: '2024-06-15',
                tahun_ajaran: '2024/2025',
                kouta: 100,
                status_gelombang: 'Aktif',
                deskripsi: 'Pendaftaran siswa baru',
                created_at: '2024-05-20T10:00:00Z',
              },
              {
                id: 2,
                nama_gelombang: 'Gelombang 2',
                tanggal_mulai: '2024-07-01',
                tanggal_selesai: '2024-07-15',
                tahun_ajaran: '2024/2025',
                kouta: 80,
                status_gelombang: 'Aktif',
                deskripsi: 'Pendaftaran siswa baru gelombang kedua',
                created_at: '2024-06-25T10:00:00Z',
              },
              {
                id: 3,
                nama_gelombang: 'Gelombang 3',
                tanggal_mulai: '2024-08-01',
                tanggal_selesai: '2024-08-15',
                tahun_ajaran: '2024/2025',
                kouta: 60,
                status_gelombang: 'Tidak Aktif',
                deskripsi: 'Pendaftaran siswa baru gelombang ketiga',
                created_at: '2024-07-30T10:00:00Z',
              },
            ]
      }
      itemsPerPage={5}
      renderRow={renderInformasiPendaftaranRow}
    >
      {isLoading && (
        <tr>
          <td colSpan={headTable.length} className="text-center py-4">
            Loading...
          </td>
        </tr>
      )}
    </Tabel>

    {showModal && (
      <DetailSiswa id={selectedId} onClose={() => setShowModal(false)} />
    )}

    {showEditModal && (
      <EditSiswa
        id={selectedId}
        onClose={() => setShowEditModal(false)}
        onUpdate={fetchData}
      />
    )}
  </div>
</Dashboard>
  );
};

export default InformasiPendaftaran;