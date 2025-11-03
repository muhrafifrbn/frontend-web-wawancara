import React, { useEffect, useState, useContext } from 'react'
import Dashboard from '../template/Dashboard'
import Tabel from '../template/Tabel'
import { FaEye, FaFilePdf,FaTrash, FaFilePen } from "react-icons/fa6";
import { get, deleteData } from "../utils/api";
import { useLocation, useNavigate } from 'react-router-dom';
import DetailMedical from './ForumMedical/DetailMedical';
import Notification from '../components/Notification/Notif';
import  EditMedicalModal from './ForumMedical/EditMedical';
import useTitle from '../utils/useTitle';
import { AuthContext } from '../Context/AuthContext';
import DeleteConfirmation from '../components/Notification/DeleteConfirmation'; 
import { sortLatedData } from '../utils/sortLatedData';

const Medical = () => {
  useTitle('Data Medis - Dashboard');

  const location = useLocation();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState(location.state?.successMsg);
  const [errorMsg, setErrorMsg] = useState(location.state?.errorMsg);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const { state } = useContext(AuthContext);
  const userRole = state?.role;
  
  const isAdmin = userRole === 'admin';

  const handleOpenModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  const handleOpenEditModal = (id) => {
    setSelectedId(id);
    setShowEditModal(true);
  };


  const handleDelete = DeleteConfirmation({
    onDelete: (id) => deleteData(`/medical/delete/${id}`),
    itemName: 'data medis',
    onSuccess: (id) => {
      setData(data.filter(item => item.id !== id));
    },
    onError: (error) => {
      console.error("Error deleting medical data:", error);
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMsg('');
      setErrorMsg('');
    }, 2000);
    return () => clearTimeout(timer);
  }, [successMsg, errorMsg]);

  const headTable = [
    { judul: "Nama" },
    { judul: "Nomor Katu Peserta" },
    { judul: "Berat Badan" },
    { judul: "Tinggi Badan" },
    { judul: "Golongan Darah" },
    { judul: "Hasil" },
    { judul: "Tanggal Ditambahkan" },
    { judul: "Action" },
  ];

  const fetchData = async () => {
    try {
      const response = await get('/medical');
      const sortedData = sortLatedData(response)
      setData(sortedData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error("Error fetching data:", err);
    }
  };

  
  useEffect(() => {
    const refreshInterval = import.meta.env.VITE_REFRESH_INTERVAL || 10000;
    fetchData();

    const refreshData = setInterval(() => {
      fetchData();
    }, refreshInterval);

    return () => clearInterval(refreshData);
  }, []);

  // Custom render function for table rows
  const renderMedicalRow = (item, index) => (
    <tr className="bg-white border-b" key={item.id || index}>
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        {item.student_name}
      </th>
      <td className="px-6 py-4 text-gray-900">{item.participant_card_number}</td>
      <td className="px-6 py-4 text-gray-900">{item.weight}</td>
      <td className="px-6 py-4 text-gray-900">{item.height}</td>
      <td className="px-6 py-4 text-gray-900">{item.blood_type}</td>
      <td className="px-6 py-4 text-gray-900">{item.medical_notes}</td>
      <td className="px-6 py-4 text-gray-900">
        {new Date(item.created_at).toLocaleDateString('id-ID')}
      </td>
      <td className='flex justify-center items-center py-6'>
        <div className='flex items-center justify-between gap-x-5'>
          <button onClick={() => handleOpenModal(item.id)} className="text-red-700 hover:text-red-500 cursor-pointer">
            <FaEye size={18} />
          </button>
          <button
            onClick={() => navigate(`/hasilMedical/${item.id}`, { state: { childName: item.child_name } })}
            className="text-red-700 hover:text-red-500 cursor-pointer"
          >
            <FaFilePdf size={18} />
          </button>
          {isAdmin && (
            <>
              <button
                onClick={() => handleOpenEditModal(item.id)}
                className="text-red-700 hover:text-red-500 cursor-pointer"
              >
                <FaFilePen size={18} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-700 hover:text-red-500 cursor-pointer"
              >
                <FaTrash size={18} />
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <Dashboard title={'Medis'}>
      <div className="flex flex-col justify-between w-full min-h-[700px] xl:min-h-[calc(100vh-130px)]">
        {successMsg && (
          <Notification type="success" message={successMsg} onClose={() => setSuccessMsg('')} />
        )}

        {errorMsg && (
          <Notification type="error" message={errorMsg} onClose={() => setErrorMsg('')} />
        )}

        <Tabel
          title="Medis"
          headers={headTable}
          to="/form-medical"
          data={isLoading ? [] : data}
          itemsPerPage={itemsPerPage}
          renderRow={renderMedicalRow}
        >
          {isLoading && (
            <tr>
              <td colSpan={headTable.length} className="text-center py-4">
                Loading...
              </td>
            </tr>
          )}
        </Tabel>

        {showModal && <DetailMedical id={selectedId} onClose={() => setShowModal(false)} />}
        {showEditModal && <EditMedicalModal id={selectedId} onClose={() => setShowEditModal(false)} onUpdate={fetchData}/>} 
      </div>
    </Dashboard>
  );
};

export default Medical;
