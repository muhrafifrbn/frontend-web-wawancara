import React, { useState, useEffect } from "react";
import { get, put } from "../../utils/api";
import ModalContainer from "../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../components/DetailModal/LoadingSpinner";
import formatDateForInput from "../../utils/formatDateForInput";

const EditJadwalTes = ({ id, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch schedule data by id
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await get(`/information/schedule-tes/${id}`);
        console.log(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const [gelombangOptions, setGelombangOptions] = useState([]);
  const [loadingGelombang, setLoadingGelombang] = useState(true);
  const [errorGelombang, setErrorGelombang] = useState("");

  useEffect(() => {
    const fetchGelombang = async () => {
      try {
        setLoadingGelombang(true);
        setErrorGelombang("");

        const response = await get("/information/registration");

        setGelombangOptions(response.data);
        console.log("Data gelombang:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorGelombang("Gagal memuat data gelombang");
      } finally {
        setLoadingGelombang(false);
      }
    };

    // pertama kali komponen kebuka -> fetching
    fetchGelombang();

    // setiap kali window/tab ini balik fokus -> fetch lagi
    const handleFocus = () => {
      fetchGelombang();
    };

    window.addEventListener("focus", handleFocus);

    // bersihin event listener pas komponen ga dipake lagi (unmount)
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    // console.log(err);
    try {
      const dataToSubmit = { ...formData };
      console.log(dataToSubmit);

      await put(`/information/schedule-test/update/${id}`, dataToSubmit);
      onUpdate(); // Refresh parent data
      setMessage("Data berhasil diupdate");
      setTimeout(() => {
        onClose(); // Close modal
      }, 1000);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    } finally {
      setSaving(false);
    }
  };

  const primaryButton = (
    <button
      onClick={handleSubmit}
      disabled={saving}
      className="w-full px-5 py-2 text-sm font-semibold text-center text-white bg-red-500 rounded-md active:scale-95 focus:outline-none"
    >
      {saving ? "Menyimpan..." : "Simpan"}
    </button>
  );

  const secondaryButton = (
    <button
      onClick={onClose}
      className="w-full px-5 py-2 text-sm font-semibold text-center text-red-500 bg-white border-2 border-red-500 rounded-md active:scale-95 focus:outline-none"
    >
      Batal
    </button>
  );

  if (loading) return <LoadingSpinner />;

  return (
    <ModalContainer
      title="Edit Data Jadwal Tes"
      subtitle="Edit informasi Jadwal Tes"
      onClose={onClose}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
      msg={message}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* Tanggal Tes */}
          <div>
            <label
              htmlFor="tanggal_tes"
              className="block text-sm font-medium text-gray-700"
            >
              Tanggal Tes
            </label>
            <input
              type="date"
              id="tanggal_tes"
              name="tanggal_tes"
              value={
                formData?.tanggal_tes
                  ? formatDateForInput(formData.tanggal_tes)
                  : ""
              }
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          {/* Jam Mulai */}
          <div>
            <label
              htmlFor="jam_mulai"
              className="block text-sm font-medium text-gray-700"
            >
              Jam Mulai
            </label>
            <input
              type="time"
              id="jam_mulai"
              name="jam_mulai"
              value={formData?.jam_mulai || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          {/* Jam Selesai */}
          <div>
            <label
              htmlFor="jam_selesai"
              className="block text-sm font-medium text-gray-700"
            >
              Jam Selesai
            </label>
            <input
              type="time"
              id="jam_selesai"
              name="jam_selesai"
              value={formData?.jam_selesai || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          {/* Informasi Ruangan */}
          <div className="col-span-2">
            <label
              htmlFor="informasi_ruangan"
              className="block text-sm font-medium text-gray-700"
            >
              Informasi Ruangan
            </label>
            <input
              type="text"
              id="informasi_ruangan"
              name="informasi_ruangan"
              value={formData?.informasi_ruangan || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>

          {/* id_gelombang */}
          <div>
            <label
              htmlFor="id_gelombang"
              className="block text-sm font-medium text-gray-700"
            >
              ID Gelombang
            </label>
            <select
              id="id_gelombang"
              name="id_gelombang"
              value={formData?.id_gelombang || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
              required
            >
              <option value="" disabled>
                Pilih Gelombang
              </option>
              {/* Populate options from gelombangOptions */}
              {gelombangOptions.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.nama_gelombang}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </ModalContainer>
  );
};

export default EditJadwalTes;
