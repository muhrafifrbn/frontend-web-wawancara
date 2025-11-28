import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../template/Dashboard";
import Tabel from "../template/Tabel";
import { FaEye, FaTrash, FaFilePen } from "react-icons/fa6";
import { get, deleteData } from "../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import Notification from "../components/Notification/Notif";
import useTitle from "../utils/useTitle";
import { sortLatedData } from "../utils/sortLatedData";
import { AuthContext } from "../Context/AuthContext";
import DeleteConfirmation from "../components/Notification/DeleteConfirmation";

// Dummy components for modal (not provided in original file)
const DetailInformasiTes = ({ id, onClose }) => null;
const EditInformasiTes = ({ id, onClose, onUpdate }) => null;

const InformasiTes = () => {
  useTitle("Informasi Tes");
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

  const isAdmin = userRole === "admin";

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMsg("");
      setErrorMsg("");
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
    onDelete: (id) => deleteData(`/information/test/delete/${id}`),
    itemName: "data informasi tes",
    onSuccess: (id) => {
      setData(data.filter((item) => item.id !== id));
      setSuccessMsg("Data tes berhasil dihapus");
    },
    onError: (error) => {
      console.error("Error deleting test:", error);
      setErrorMsg("Gagal menghapus data tes");
    },
  });

  const headTable = [
    { judul: "Nama Tes" },
    { judul: "Deskripsi Tes" },
    { judul: "Aksi" },
  ];

  // Dummy data based on headTable
  const dummyData = [
    { id: 1, nama_tes: "Tes Potensi Akademik", deskripsi_tes: "Mengukur kemampuan akademik calon mahasiswa" },
    { id: 2, nama_tes: "Tes Bahasa Inggris", deskripsi_tes: "Menilai kemampuan bahasa Inggris dasar" },
    { id: 3, nama_tes: "Tes Wawancara", deskripsi_tes: "Wawancara untuk menilai motivasi dan komunikasi" },
    { id: 4, nama_tes: "Tes Kepribadian", deskripsi_tes: "Menilai karakter dan kepribadian calon mahasiswa" },
    { id: 5, nama_tes: "Tes Kemampuan Dasar", deskripsi_tes: "Mengukur kemampuan dasar dalam berbagai bidang" },
  ];

  const fetchData = async () => {
    try {
      // Simulate API call with dummy data
      setTimeout(() => {
        setData(dummyData);
        setIsLoading(false);
      }, 500);
    } catch (err) {
      setErrorMsg("Gagal Mengambil Data");
      setIsLoading(false);
      console.error("Error fetching data:", err);
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

  const renderInformasiTesRow = (item, index) => (
    <tr className="bg-white border-b" key={item.id || index}>
      <td className="px-6 py-4 text-gray-900">{item.nama_tes}</td>
      <td className="px-6 py-4 text-gray-900">{item.deskripsi_tes}</td>
      <td className="flex items-center justify-center py-6">
        <div className="flex items-center justify-between gap-x-5">
          <button
            onClick={() => handleOpenModal(item.id)}
            className="text-red-700 cursor-pointer hover:text-red-500"
          >
            <FaEye size={18} />
          </button>
          {isAdmin && (
            <>
              <button
                onClick={() => handleOpenEditModal(item.id)}
                className="text-red-700 cursor-pointer hover:text-red-500"
              >
                <FaFilePen size={18} />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-700 cursor-pointer hover:text-red-500"
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
    <Dashboard title="Informasi Tes">
      <h1 className="text-2xl font-bold text-gray-900">
        Informasi Tes
      </h1>

      <div className="flex flex-col justify-between w-full min-h-[700px] xl:min-h-[calc(100vh-130px)]">
        {successMsg && (
          <Notification
            type="success"
            message={successMsg}
            onClose={() => setSuccessMsg("")}
          />
        )}

        {errorMsg && (
          <Notification
            type="error"
            message={errorMsg}
            onClose={() => setErrorMsg("")}
          />
        )}

        <Tabel
          title="Informasi Tes"
          headers={headTable}
          to="/add-informasi-tes"
          data={isLoading ? [] : data}
          itemsPerPage={5}
          renderRow={renderInformasiTesRow}
        >
          {isLoading && (
            <tr>
              <td colSpan={headTable.length + 1} className="py-4 text-center">
                Loading...
              </td>
            </tr>
          )}
        </Tabel>

        {showModal && (
          <DetailInformasiTes
            id={selectedId}
            onClose={() => setShowModal(false)}
          />
        )}

        {showEditModal && (
          <EditInformasiTes
            id={selectedId}
            onClose={() => setShowEditModal(false)}
            onUpdate={fetchData}
          />
        )}
      </div>
    </Dashboard>
  );
};

export default InformasiTes;
