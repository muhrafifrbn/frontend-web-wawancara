import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../template/Dashboard";
import Tabel from "../template/Tabel";
import { get, put } from "../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import Notification from "../components/Notification/Notif";
import useTitle from "../utils/useTitle";
import { AuthContext } from "../Context/AuthContext";

const KonfirmasiPembayaran = () => {
  useTitle("Konfirmasi Pembayaran");
  const location = useLocation();
  const navigate = useNavigate();
  const [successMsg, setSuccessMsg] = useState(location.state?.successMsg);
  const [errorMsg, setErrorMsg] = useState(location.state?.errorMsg);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConfirming, setIsConfirming] = useState(null);

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

  const url_image = "http://localhost:5500"; // Set a fallback base URL if it's undefined

  const getImageSrc = (path) => {
    if (!path) return "";
    // Make sure the path is prefixed with the correct URL to the uploads folder
    return `${url_image}/uploads/payment/${path}`;
  };

  const headTable = [
    { judul: "Nomor Pendaftaran" },
    { judul: "Nama" },
    { judul: "Bukti Foto" },
    { judul: "Aksi" },
  ];

  // Fetch data pembayaran
  const fetchData = async () => {
    try {
      const response = await get("/payment-form");
      const paymentData = response.data;

      // Ambil detail nomor_formulir dan nama_lengkap dari endpoint /detail/:id untuk setiap item
      const detailedData = await Promise.all(
        paymentData.map(async (item) => {
          const detailResponse = await get(
            `/regist-form/detail/${item.id_formulir}`
          );
          return { ...item, ...detailResponse.data }; // Gabungkan data pembayaran dengan detail
        })
      );

      setData(detailedData);
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

  // Handle konfirmasi pembayaran
  const handleConfirm = async (id) => {
    try {
      setIsConfirming(id);
      const response = await put(`/payment-form/confirm/${id}`);
      if (response?.status >= 200 && response?.status < 300) {
        setSuccessMsg("Pembayaran berhasil dikonfirmasi");
        fetchData();
      } else {
        setErrorMsg("Gagal mengkonfirmasi pembayaran");
      }
    } catch (error) {
      setErrorMsg("Gagal mengkonfirmasi pembayaran");
    } finally {
      setIsConfirming(null);
    }
  };

  const renderKonfirmasiPembayaran = (item, index) => (
    <tr className="bg-white border-b" key={item.id || index}>
      <td className="px-6 py-4 text-gray-900">
        {item.nomor_formulir ||
          item.registration_number ||
          item.participant_card_number ||
          "-"}
      </td>
      <td className="px-6 py-4 text-gray-900">
        {item.nama_lengkap || item.student_name || item.nama || "-"}
      </td>
      <td className="px-6 py-4 text-gray-900">
        <div className="flex items-center">
          <img
            src={getImageSrc(item.bukti_bayar)}
            alt="Bukti Pembayaran"
            className="object-cover w-24 h-16 border rounded"
          />
        </div>
      </td>
      <td className="flex items-center justify-center py-6">
        {isAdmin && (
          <button
            onClick={() => handleConfirm(item.id)}
            disabled={isConfirming === item.id}
            className={`px-4 py-2 rounded-md text-white ${
              isConfirming === item.id
                ? "bg-gray-400"
                : "bg-red-600 hover:bg-red-500"
            } active:scale-95`}
          >
            {isConfirming === item.id ? "Mengkonfirmasi..." : "Konfirmasi"}
          </button>
        )}
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
