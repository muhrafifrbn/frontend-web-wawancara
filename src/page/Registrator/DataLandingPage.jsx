import React, { useState, useEffect, useContext } from 'react';
import Dashboard from '../../template/Dashboard';
import Tabel from '../../template/Tabel';
import useTitle from '../../utils/useTitle';
import {get, deleteData} from '../../utils/api';
import Notification from '../../components/Notification/Notif';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {FaFilePen, FaTrash, FaEye } from 'react-icons/fa6';
import EditRegistrationModal from './registrator/EditRegistration';
import DeleteConfirmation from '../../components/Notification/DeleteConfirmation';
import EditRegistrationModalAdmin from './registrator/EditRegistrationAdmin';
import  RegistrationDetailModal from'./registrator/DetailRegistration';

const DataLandingPage = () => {
  useTitle('Update Data Daftar Ulang - Dashboard');

  const location = useLocation();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState(location.state?.successMsg);
  const [errorMsg, setErrorMsg] = useState(location.state?.errorMsg);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {state} = useContext(AuthContext);
  const userRole = state?.role;

  const isAdmin = userRole === 'admin'; 
  const isRegistrator = userRole === 'registrator';


const handleOpenModal = (id) => {
  setSelectedId(id);
  setShowModal(true);
};

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMsg('');
      setErrorMsg('');
    }, 2000);
    return () => clearTimeout(timer);
  }, [successMsg, errorMsg]);

  const fetchData = async () => {
    try {
      const response = await get('registration');
      setData(response);
      setIsLoading(false);
    } catch (error) {
      setErrorMsg('Gagal mengambil data');
      setIsLoading(false);
    }
  }

  const handleOpenEditModal = (id) => {
    setSelectedId(id);
    setShowEditModal(true);
  }

  const handleDelete = DeleteConfirmation({
    onDelete: (id) => deleteData(`/registration/delete/${id}`),
    itemName: 'data registrasi',
    onSuccess: (id) => {
      setData(data.filter(item => item.id !== id));
    },
    onError: (error) => {
      console.error("Error deleting student:", error);
    }
  });


  const headTable = [
    { judul: "Jurusan" },
    { judul: "Jumlah Registrasi" },
    { judul: "Daya Tampung" },
    { judul: "Update" },
    { judul: "Aksi" }
  ];

  useEffect(() => {
    fetchData();
    const refreshInterval = import.meta.env.VITE_REFRESH_INTERVAL || 10000;

    const refreshData = setInterval(() => {
      fetchData();
    }
    , refreshInterval);

    return () => clearInterval(refreshData);
  },[]);

  const renderParentRow = (item, index) => (
    <tr className="bg-white border-b" key={index}>
      <th scope='row' className='px-6 py-4 font-medium text-gray-900'>{item.competence_name}</th>
      <td className='px-6 py-4 text-gray-900'>{item.current_registered}</td>
      <td className='px-6 py-4 text-gray-900'>{item.max_capacity}</td>
      <td className='px-6 py-4 text-gray-900'>{new Date(item.last_updated).toLocaleString('id-ID')}</td>
      <td className='px-6 py-4 flex items-center justify-between gap-x-2'>
          <button onClick={() => handleOpenModal(item.id)} className="text-red-700 hover:text-red-500 cursor-pointer">
              <FaEye size={18} />
          </button>
         <button onClick={() => handleOpenEditModal(item.id)} className="text-red-700 hover:text-red-500 cursor-pointer">
              <FaFilePen size={18} />
          </button>

          {isAdmin && (
            <button onClick={() => handleDelete(item.id)} className="text-red-700 hover:text-red-500 cursor-pointer">
              <FaTrash size={18} />
            </button>
          )}
      </td>
    </tr>
  );

  const renderEditModal = () => {

    console.log("Rendering edit modal for admin:", isAdmin);

    if (!showEditModal) return null;
    
    if (isAdmin) {
      return (
        <EditRegistrationModalAdmin
          id={selectedId}
          onClose={() => setShowEditModal(false)}
          onUpdate={fetchData}
        />
      );
    } else {
      return (
        <EditRegistrationModal
          id={selectedId}
          onClose={() => setShowEditModal(false)}
          onUpdate={fetchData}
        />
      );
    }
  };

  return (
    <Dashboard>
      <div className="flex flex-col justify-between w-full min-h-[700px] xl:min-h-[calc(100vh-130px)]">
        {successMsg && (
          <Notification type="success" message={successMsg} onClose={() => setSuccessMsg('')} />
        )}

        {errorMsg && (
          <Notification type="error" message={errorMsg} onClose={() => setErrorMsg('')} />
        )}

        <Tabel 
          title="Data Registrasi Terbaru "
          headers={headTable} 
          data={data}
          itemsPerPage={10}
          renderRow={renderParentRow}
          to={isAdmin ? "/tambahRegistrasi" : undefined}
        >
          {isLoading && (
            <tr>
              <td colSpan={headTable.length} className="text-center py-4">
                Loading...
              </td>
            </tr>
          )}
        </Tabel>

        {showModal && <RegistrationDetailModal id={selectedId} onClose={() => setShowModal(false)} />}
        {renderEditModal()}
      </div>
    </Dashboard>
  );
}

export default DataLandingPage;
