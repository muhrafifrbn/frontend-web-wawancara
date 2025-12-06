import React, { useState, useEffect } from "react";
import { get, put } from "../../utils/api";
import ModalContainer from "../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../components/DetailModal/LoadingSpinner";
import formatDateForInput from "../../utils/formatDateForInput";
import { useNavigate } from "react-router-dom";

const EditInformasiPendaftaran = ({ id, onClose, onUpdate }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await get(`/information/registration/${id}`);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setErrors({});
    try {
      // Create a copy of the form data
      const dataToSubmit = { ...formData };
      // console.log(dataToSubmit);

      // Format the start and end if it exists using the formatDateForInput function
      if (dataToSubmit.tanggal_mulai || dataToSubmit.tanggal_akhir) {
        dataToSubmit.tanggal_mulai = formatDateForInput(
          dataToSubmit.tanggal_mulai
        );
        dataToSubmit.tanggal_akhir = formatDateForInput(
          dataToSubmit.tanggal_akhir
        );
      }

      await put(`/information/registration/update/${id}`, dataToSubmit);
      onUpdate(); // Refresh data di parent component
      setMessage("Data berhasil diupdate");
      setTimeout(() => {
        onClose(); // Tutup modal
      }, 1000);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      if (error.response && error.response.data.errors) {
        const serverErrors = error.response.data.errors;
        const formattedErrors = {};
        serverErrors.forEach((err) => {
          formattedErrors[err.path] = err.msg;
        });
        setMessage("Data gagal diupdate");
        setErrors(formattedErrors);
        // console.log(formData);
      } else {
        setErrors({ general: "Gagal menyimpan data. Silakan coba lagi." });
      }
      // console.log(dataToSubmit);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ModalContainer title="Edit Data Orang Tua" onClose={onClose}>
        <LoadingSpinner />
      </ModalContainer>
    );
  }

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

  return (
    <ModalContainer
      title="Edit Data Informasi Pendaftaran"
      subtitle="Edit informasi lengkap data Informasi Pendaftaran"
      onClose={onClose}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
      msg={message}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label
              htmlFor="nama_gelombang"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Gelombang
            </label>
            <select
              id="nama_gelombang"
              name="nama_gelombang"
              value={formData?.nama_gelombang || ""}
              onChange={handleSelectChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 ${
                errors?.nama_gelombang ? "ring-red-500 border-red-500" : ""
              }`}
              required
            >
              <option value="">Pilih Gelombang</option>
              <option value="Gelombang 1">Gelombang 1</option>
              <option value="Gelombang 2">Gelombang 2</option>
              <option value="Gelombang 3">Gelombang 3</option>
            </select>
            {errors.nama_gelombang && (
              <div className="mt-2 text-sm text-red-500">
                {errors.nama_gelombang}
              </div>
            )}
          </div>
          <div className="col-span-2">
            <label
              htmlFor="tanggal_mulai"
              className="block text-sm font-medium text-gray-700"
            >
              Tanggal Mulai
            </label>
            <input
              type="date"
              id="tanggal_mulai"
              name="tanggal_mulai"
              value={formatDateForInput(formData.tanggal_mulai)}
              onChange={handleChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 ${
                errors?.tanggal_mulai ? "ring-red-500 border-red-500" : ""
              }`}
              required
            />
            {errors.tanggal_mulai && (
              <div className="mt-2 text-sm text-red-500">
                {errors.tanggal_mulai}
              </div>
            )}
          </div>
          <div className="col-span-2">
            <label
              htmlFor="tanggal_akhir"
              className="block text-sm font-medium text-gray-700"
            >
              Tanggal Selesai
            </label>
            <input
              type="date"
              id="tanggal_akhir"
              name="tanggal_akhir"
              value={formatDateForInput(formData.tanggal_akhir)}
              onChange={handleChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 ${
                errors?.tanggal_akhir ? "ring-red-500 border-red-500" : ""
              }`}
              required
            />
            {errors.tanggal_akhir && (
              <div className="mt-2 text-sm text-red-500">
                {errors.tanggal_akhir}
              </div>
            )}
          </div>
          <div className="col-span-2">
            <label
              htmlFor="tahun_ajaran"
              className="block text-sm font-medium text-gray-700"
            >
              Tahun Ajaran
            </label>
            <input
              type="text"
              id="tahun_ajaran"
              name="tahun_ajaran"
              value={formData?.tahun_ajaran || ""}
              onChange={handleChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 ${
                errors?.tahun_ajaran ? "ring-red-500 border-red-500" : ""
              }`}
              required
            />
            {errors.tahun_ajaran && (
              <div className="mt-2 text-sm text-red-500">
                {errors.tahun_ajaran}
              </div>
            )}
          </div>
          <div className="col-span-2">
            <label
              htmlFor="status_gelombang"
              className="block text-sm font-medium text-gray-700"
            >
              Status Gelombang
            </label>
            <select
              id="status_gelombang"
              name="status_gelombang"
              value={formData?.status_gelombang || ""}
              onChange={handleSelectChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 ${
                errors?.status_gelombang ? "ring-red-500 border-red-500" : ""
              }`}
              required
            >
              <option value="">Pilih Status Gelombang</option>
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
            {errors.status_gelombang && (
              <div className="mt-2 text-sm text-red-500">
                {errors.status_gelombang}
              </div>
            )}
          </div>
          <div className="col-span-2">
            <label
              htmlFor="deskripsi"
              className="block text-sm font-medium text-gray-700"
            >
              Deskripsi
            </label>
            <textarea
              id="deskripsi"
              name="deskripsi"
              value={formData?.deskripsi || ""}
              onChange={handleChange}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500 ${
                errors?.deskripsi ? "ring-red-500 border-red-500" : ""
              }`}
              required
            />
            {errors.deskripsi && (
              <div className="mt-2 text-sm text-red-500">
                {errors.deskripsi}
              </div>
            )}
          </div>
        </div>
      </form>
    </ModalContainer>
  );
};

export default EditInformasiPendaftaran;
