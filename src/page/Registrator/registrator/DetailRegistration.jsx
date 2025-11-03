/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { get } from "../../../utils/api";
import InfoItem from "../../../components/DetailModal/InfoItem";
import InfoSection from "../../../components/DetailModal/InfoSection";
import ModalContainer from "../../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../../components/DetailModal/LoadingSpinner";

const RegistrationDetailModal = ({ id, onClose }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await get(`registration/detail/${id}`);
        setDetail(response);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  return (
    <ModalContainer 
      title="Detail Data Registrasi" 
      subtitle="Informasi lengkap data registrasi jurusan" 
      onClose={onClose}
    >
      {loading ? (
        <LoadingSpinner />
      ) : detail && (
        <div className="space-y-8">
          <InfoSection title="Informasi Jurusan">
            <InfoItem label="ID Jurusan" value={detail.competence_id} />
            <InfoItem label="Nama Jurusan" value={detail.competence_name} />
          </InfoSection>

          <InfoSection title="Informasi Kapasitas">
            <InfoItem label="Jumlah Pendaftar Saat Ini" value={detail.current_registered} />
            <InfoItem label="Kapasitas Maksimal" value={detail.max_capacity} />
            <InfoItem 
              label="Persentase Pengisian" 
              value={`${((detail.current_registered / detail.max_capacity) * 100).toFixed(2)}%`} 
            />
            <InfoItem 
              label="Sisa Kuota" 
              value={detail.max_capacity - detail.current_registered} 
            />
          </InfoSection>

          <InfoSection title="Informasi Tambahan">
            <InfoItem 
              label="Tanggal Diperbarui" 
              value={detail.last_updated ? new Date(detail.last_updated).toLocaleDateString('id-ID') : "-"} 
            />
          </InfoSection>
        </div>
      )}
    </ModalContainer>
  );
};

export default RegistrationDetailModal;
