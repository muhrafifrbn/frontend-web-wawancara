import React, { useState, useEffect } from "react";
import { get, put } from "../../utils/api";
import ModalContainer from "../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../components/DetailModal/LoadingSpinner";
import formatDateForInput from "../../utils/formatDateForInput";
import { useNavigate } from "react-router-dom";

const EditInformasiTes = ({ id, onClose, onUpdate }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Jangan lupa untuk menggati endpointnya ya
  // Ini akan mengambil data informasi tes sesuai id
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await get(`/information/test/${id}`);
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

  // untuk menghandle nilai inputan
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // untuk menghandle submit formnya
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setErrors({});
    setSaving(true);
    try {
      // Create a copy of the form data
      const dataToSubmit = { ...formData };

      // Format the start and end if it exists using the formatDateForInput function
      if (dataToSubmit.tanggal_mulai || dataToSubmit.tanggal_akhir) {
        dataToSubmit.tanggal_mulai = formatDateForInput(
          dataToSubmit.tanggal_mulai
        );
        dataToSubmit.tanggal_akhir = formatDateForInput(
          dataToSubmit.tanggal_akhir
        );
      }

      // jangan lupa untuk ganti endpointnya
      await put(`/information/test/${id}`, dataToSubmit);
      onUpdate(); // Refresh data di parent component
      setMessage("Data berhasil diupdate");
      setTimeout(() => {
        onClose(); // Tutup modal
      }, 1000);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      if (error.response && error.response.data.errors) {
        const errorResponse = error.response.data.errors;
        const formattedErrors = {};

        errorResponse.forEach((error) => {
          formattedErrors[error.path] = error.msg;
        });
        setMessage("Data gagal di update");
        setErrors(formattedErrors);
      } else {
        setMessage("Data gagal di update");
        setErrors({
          general: "Gagal menambahkan Informasi Tes. Silahkan coba lagi!",
        });
      }
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

  return (
    <ModalContainer
      title="Edit Data Informasi Tes"
      subtitle="Edit informasi lengkap data Informasi Tes"
      onClose={onClose}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
      msg={message}
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          {/* Nama Tes */}
          <div className="col-span-2">
            <label
              htmlFor="nama_tes"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Tes
            </label>
            <input
              type="text"
              id="nama_tes"
              name="nama_tes"
              value={formData?.nama_tes || ""}
              onChange={handleChange}
              className={`shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md 
                    ${errors?.nama_tes ? "ring-red-500 border-red-500" : ""} 
                  focus:ring-red-500 focus:border-red-500 block w-full p-2.5 `}
              required
            />
            {errors.nama_tes && (
              <div className="mt-2 text-sm text-red-500">{errors.nama_tes}</div>
            )}
          </div>

          {/* Deskripsi Tes */}
          <div className="col-span-2">
            <label
              htmlFor="deskripsi_tes"
              className="block text-sm font-medium text-gray-700"
            >
              Deskripsi Tes
            </label>
            <textarea
              id="deskripsi_tes"
              name="deskripsi_tes"
              value={formData?.deskripsi_tes || ""}
              onChange={handleChange}
              className={`shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md 
                    ${
                      errors?.deskripsi_tes ? "ring-red-500 border-red-500" : ""
                    } 
                  focus:ring-red-500 focus:border-red-500 block w-full p-2.5 `}
              required
            />
            {errors.deskripsi_tes && (
              <div className="mt-2 text-sm text-red-500">
                {errors.deskripsi_tes}
              </div>
            )}
          </div>
        </div>
      </form>
    </ModalContainer>
  );
};

export default EditInformasiTes;
