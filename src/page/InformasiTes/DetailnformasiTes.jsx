import React, { useState, useEffect } from "react";
import { get } from "../../utils/api";
import InfoItem from "../../components/DetailModal/InfoItem";
import InfoSection from "../../components/DetailModal/InfoSection";
import ModalContainer from "../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../components/DetailModal/LoadingSpinner";

const DetailInformasiTes = ({ id, onClose }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetching detail data sesuai id dan ganti endpoint nya
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await get(`/information/test/${id}`);
        console.log(response.data);
        setDetail(response.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  // Lalu tampilkan hasilnya dengan mereturn
  return (
    <ModalContainer
      title="Detail Data Informasi Tes"
      subtitle="Informasi lengkap data informasi tes"
      onClose={onClose}
    >
      {loading ? (
        <LoadingSpinner />
      ) : detail ? (
        <div className="space-y-8">
          <InfoSection title="Informasi Tes">
            <InfoItem label="Nama Tes" value={detail.nama_tes} />
            <InfoItem label="Deskripsi" value={detail.deskripsi_tes} />
          </InfoSection>
        </div>
      ) : (
        <div className="">gagal bosku</div>
      )}
    </ModalContainer>
  );
};

export default DetailInformasiTes;
