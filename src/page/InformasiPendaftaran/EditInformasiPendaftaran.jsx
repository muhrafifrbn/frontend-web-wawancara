import React, { useState, useEffect } from "react";
import { get, put } from "../../utils/api";
import ModalContainer from "../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../components/DetailModal/LoadingSpinner";
import formatDateForInput from "../../utils/formatDateForInput";

const EditInformasiPendaftaran = ({ id, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
    try {
      // Create a copy of the form data
      const dataToSubmit = { ...formData };

      // Format the start and end if it exists using the formatDateForInput function
      if (dataToSubmit.tanggal_mulai || dataToSubmit.tanggal_akhir) {
        dataToSubmit.tanggal_mulai = formatDateForInput(
          dataToSubmit.tanggal_mulai
        );
        dataToSubmit.tanggal_mulai = formatDateForInput(
          dataToSubmit.tanggal_mulai
        );
      }

      // Validate dates
      if (
        new Date(dataToSubmit.tanggal_mulai) >= new Date(formData.tanggal_akhir)
      ) {
        setError("Tanggal selesai harus setelah tanggal mulai");
        setIsSubmitting(false);
        return;
      }

      await put(`/parents/update/${id}`, dataToSubmit);
      onUpdate(); // Refresh data di parent component
      onClose();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
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
    >
        
    </ModalContainer>
  )
};

export default EditInformasiPendaftaran;
