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
import DetailInformasiPendaftaran from "./InformasiPendaftaran/DetailInformasiPendaftaran";
import EditInformasiPendaftaran from "./InformasiPendaftaran/EditInformasiPendaftaran";

const InformasiPendaftaran = () => {
  useTitle("Informasi Pendaftaran");
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
    onDelete: (id) => deleteData(`/information/registration/delete/${id}`),
    itemName: "data informasi pendaftaran",
    onSuccess: (id) => {
      setData(data.filter((item) => item.user_id !== id));
      setSuccessMsg("Data user berhasil dihapus");
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
      setErrorMsg("Gagal menghapus data user");
    },
  });

  const headTable = [
    { judul: "Nama Gelombang" },
    { judul: "Tanggal Mulai" },
    { judul: "Tanggal Selesai" },
    { judul: "Tahun Ajaran" },
    { judul: "Status Gelombang" },
    { judul: "Deskripsi" },
    { judul: "Aksi" },
  ];

  const fetchData = async () => {
    try {
      const response = await get("/information/registration");
      // const sortedData = sortLatedData(response);
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

  const renderInformasiPendaftaranRow = (item, index) => (
    <tr className="bg-white border-b" key={item.id || index}>
      <td className="px-6 py-4 text-gray-900">{item.nama_gelombang}</td>
      <td className="px-6 py-4 text-gray-900">
        {new Date(item.tanggal_mulai).toLocaleDateString("id-ID")}
      </td>
      <td className="px-6 py-4 text-gray-900">
        {new Date(item.tanggal_akhir).toLocaleDateString("id-ID")}
      </td>
      <td className="px-6 py-4 text-gray-900">{item.tahun_ajaran}</td>
      <td className="px-6 py-4 text-gray-900">{item.status_gelombang}</td>
      <td className="px-6 py-4 text-gray-900">{item.deskripsi}</td>
      {/* <td className="px-6 py-4 text-gray-900"></td> */}
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
    <Dashboard title="Informasi Pendaftaran">
      <h1 className="text-2xl font-bold text-gray-900">
        Informasi Pendaftaran
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
          title="Informasi Pendaftaran"
          headers={headTable}
          to="/add-informasi-pendaftaran"
          data={isLoading ? [] : data}
          itemsPerPage={5}
          renderRow={renderInformasiPendaftaranRow}
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
          <DetailInformasiPendaftaran
            id={selectedId}
            onClose={() => setShowModal(false)}
          />
        )}

        {showEditModal && (
          <EditInformasiPendaftaran
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
