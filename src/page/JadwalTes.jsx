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
import DetailJadwalTes from "./JadwalTes/DetailJadwalTes";
import EditJadwalTes from "./JadwalTes/EditJadwalTes";

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
    onDelete: (id) => deleteData(`/information/schedule-test/delete/${id}`),
    itemName: "data jadwal tes",
    onSuccess: (id) => {
      setData((prev) => prev.filter((item) => item.id !== id));
      setSuccessMsg("Data jadwal tes berhasil dihapus");
    },
    onError: (error) => {
      console.error("Error deleting schedule:", error);
      setErrorMsg("Gagal menghapus data jadwal tes");
    },
  });

  const headTable = [
    { judul: "Tanggal Tes" },
    { judul: "Jam Mulai" },
    { judul: "Jam Selesai" },
    { judul: "Informasi Ruangan" },
    { judul: "Nama Gelombang" },
    { judul: "Aksi" },
  ];

  const fetchData = async () => {
    try {
      const response = await get("/information/schedule-test");
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

  const renderJadwalTesRow = (item, index) => {
    // PARSE INFORMASI_RUANGAN DARI STRING JSON → OBJECT
    let infoRuangan = {};
    if (item.informasi_ruangan) {
      try {
        if (typeof item.informasi_ruangan === "string") {
          infoRuangan = JSON.parse(item.informasi_ruangan);
        } else {
          // kalau backend sudah ngasih object, langsung pakai
          infoRuangan = item.informasi_ruangan;
        }
        // console.log(infoRuangan);
      } catch (e) {
        console.error(
          "Gagal parse informasi_ruangan:",
          e,
          item.informasi_ruangan
        );
        infoRuangan = {};
      }
    }

    return (
      <tr className="bg-white border-b" key={item.id || index}>
        {/* 1. Tanggal Tes */}
        <td className="px-6 py-4 text-gray-900">
          {item.tanggal_tes
            ? new Date(item.tanggal_tes).toLocaleDateString("id-ID")
            : "-"}
        </td>

        {/* 2. Jam Mulai */}
        <td className="px-6 py-4 text-gray-900">{item.jam_mulai || "-"}</td>

        {/* 3. Jam Selesai */}
        <td className="px-6 py-4 text-gray-900">{item.jam_selesai || "-"}</td>

        {/* 4. Informasi Ruangan */}
        <td className="px-6 py-4 text-gray-900">
          <div className="flex flex-col gap-1 text-sm">
            <span>
              <span className="font-semibold">Tes Kesehatan: </span>
              {infoRuangan.tes_kesehatan || "-"}
            </span>
            <span>
              <span className="font-semibold">Wawancara: </span>
              {infoRuangan.wawancara || "-"}
            </span>
            <span>
              <span className="font-semibold">Psikotes: </span>
              {infoRuangan.psikotes || "-"}
            </span>
            <span>
              <span className="font-semibold">Tes Komputer (TIK): </span>
              {infoRuangan.tes_komputer || "-"}
            </span>
          </div>
        </td>

        {/* 5. Nama Gelombang */}
        <td className="px-6 py-4 text-gray-900">
          {item.nama_gelombang || "-"}
        </td>

        {/* 6. Aksi */}
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
  };

  return (
    <Dashboard title="Jadwal Tes">
      <h1 className="text-2xl font-bold text-gray-900">Jadwal Tes</h1>

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
