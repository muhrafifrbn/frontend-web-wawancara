import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../template/Dashboard";
import Tabel from "../template/Tabel";
import { FaEye, FaTrash, FaFilePen } from "react-icons/fa6";
import { get, deleteData } from "../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import Notification from "../components/Notification/Notif";
import useTitle from "../utils/useTitle";
import { AuthContext } from "../Context/AuthContext";
import DeleteConfirmation from "../components/Notification/DeleteConfirmation";

const KonfirmasiPembayaran = () => {
  useTitle("Konfirmasi Pembayaran");
  const location = useLocation();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState(location.state?.successMsg);
  const [errorMsg, setErrorMsg] = useState(location.state?.errorMsg);
  const [data, setData] = useState([]); // Dummy data
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
    onDelete: (id) => deleteData(`/payment-form/delete/${id}`), // Update route for payment confirmation
    itemName: "data konfirmasi pembayaran",
    onSuccess: (id) => {
      setData(data.filter((item) => item.id !== id)); // Ensure id is correct in data filter
      setSuccessMsg("Data konfirmasi pembayaran berhasil dihapus");
    },
    onError: (error) => {
      console.error("Error deleting payment confirmation:", error);
      setErrorMsg("Gagal menghapus data konfirmasi pembayaran");
    },
  });

  const headTable = [
    { judul: "Nama Tagihan" },
    { judul: "Nama Bank" },
    { judul: "Bukti Bayar" },
    { judul: "Tanggal Transfer" },
    { judul: "Jumlah Tagihan" },
    { judul: "Aksi" },
  ];

  const fetchData = async () => {
    try {
      const response = await get("/payment-form"); // Fetch data from payment form route
      setData(response.data);
      setIsLoading(false);
    } catch (err) {
      setErrorMsg("Gagal Mengambil Data");
      setIsLoading(false);
      console.error("Error fetching payment data:", err);
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

  const renderKonfirmasiPembayaran = (item, index) => (
    <tr className="bg-white border-b" key={item.id || index}>
      <td className="px-6 py-4 text-gray-900">{item.nama_tagihan}</td>
      <td className="px-6 py-4 text-gray-900">{item.nama_bank}</td>
      <td className="px-6 py-4 text-gray-900">{item.bukti_bayar}</td>
      <td className="px-6 py-4 text-gray-900">
        {new Date(item.tanggal_transfer).toLocaleDateString("id-ID")}
      </td>
      <td className="px-6 py-4 text-gray-900">{item.jumlah_tagihan}</td>
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
    <Dashboard title="Konfirmasi Pembayaran">
      <h1 className="text-2xl font-bold text-gray-900">
        Konfirmasi Pembayaran
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
          title="Konfirmasi Pembayaran"
          headers={headTable}
          to=""
          data={isLoading ? [] : data}
          itemsPerPage={5}
          renderRow={renderKonfirmasiPembayaran}
        >
          {isLoading && (
            <tr>
              <td colSpan={headTable.length} className="py-4 text-center">
                Loading...
              </td>
            </tr>
          )}
        </Tabel>
      </div>
    </Dashboard>
  );
};

export default KonfirmasiPembayaran;
