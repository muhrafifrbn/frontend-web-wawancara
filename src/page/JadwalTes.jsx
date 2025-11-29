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
// import DetailJadwalTes from "./JadwalTes/DetailJadwalTes";
// import EditJadwalTes from "./JadwalTes/EditJadwalTes";

const JadwalTes = () => {
  useTitle("Jadwal Tes");
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
    onDelete: (id) => deleteData(`/schedule/test/delete/${id}`),
    itemName: "data jadwal tes",
    onSuccess: (id) => {
      setData(data.filter((item) => item.id !== id));
      setSuccessMsg("Data jadwal tes berhasil dihapus");
    },
    onError: (error) => {
      console.error("Error deleting schedule:", error);
      setErrorMsg("Gagal menghapus data jadwal tes");
    },
  });

  const headTable = [
    { judul: "Nama Gelombang" },
    { judul: "Tanggal Tes" },
    { judul: "Jam Mulai" },
    { judul: "Jam Selesai" },
    { judul: "Informasi Ruangan" },
    { judul: "Aksi" },
  ];

  const fetchData = async () => {
    try {
      const response = await get("/schedule/test");
      setData(response.data);
      setIsLoading(false);
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

  const renderJadwalTesRow = (item, index) => (
    <tr className="bg-white border-b" key={item.id || index}>
      <td className="px-6 py-4 text-gray-900">{item.nama_gelombang}</td>
      <td className="px-6 py-4 text-gray-900">
        {new Date(item.tanggal_tes).toLocaleDateString("id-ID")}
      </td>
      <td className="px-6 py-4 text-gray-900">{item.jam_mulai}</td>
      <td className="px-6 py-4 text-gray-900">{item.jam_selesai}</td>
      <td className="px-6 py-4 text-gray-900">{item.informasi_ruangan}</td>
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
    <Dashboard title="Jadwal Tes">
      <h1 className="text-2xl font-bold text-gray-900">
        Jadwal Tes
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
          title="Jadwal Tes"
          headers={headTable}
          to="/add-jadwal-tes"
          data={isLoading ? [] : data}
          itemsPerPage={5}
          renderRow={renderJadwalTesRow}
        >
          {isLoading && (
            <tr>
              <td colSpan={headTable.length} className="py-4 text-center">
                Loading...
              </td>
            </tr>
          )}
        </Tabel>

        {showModal && (
          <DetailJadwalTes
            id={selectedId}
            onClose={() => setShowModal(false)}
          />
        )}

        {showEditModal && (
          <EditJadwalTes
            id={selectedId}
            onClose={() => setShowEditModal(false)}
            onUpdate={fetchData}
          />
        )}
      </div>
    </Dashboard>
  );
};

export default JadwalTes;
