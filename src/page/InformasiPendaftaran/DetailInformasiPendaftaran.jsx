import React, { useState, useEffect } from "react";
import { get } from "../../utils/api";
import InfoItem from "../../components/DetailModal/InfoItem";
import InfoSection from "../../components/DetailModal/InfoSection";
import ModalContainer from "../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../components/DetailModal/LoadingSpinner";

const DetailInformasiPendaftaran = ({ id, onClose }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await get(`/information/registration/${id}`);
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

  //   console.log(detail);

  return (
    <ModalContainer
      title="Detail Data Informasi Pendaftaran"
      subtitle="Informasi lengkap data informasi pendaftaran"
      onClose={onClose}
    >
      {loading ? (
        <LoadingSpinner />
      ) : detail ? (
        <div className="space-y-8">
          <InfoSection title="Informasi Pendaftaran">
            <InfoItem label="Nama Gelombang" value={detail.nama_gelombang} />
            <InfoItem
              label="Tanggal Mulai"
              value={new Date(detail.tanggal_mulai).toLocaleDateString("id-ID")}
            />
            <InfoItem
              label="Tanggal Akhir"
              value={new Date(detail.tanggal_mulai).toLocaleDateString("id-ID")}
            />
            <InfoItem label="Tahun Ajaran" value={detail.tahun_ajaran} />
            <InfoItem label="Kouta" value={detail.kouta} />
            <InfoItem
              label="Status Gelombang"
              value={detail.status_gelombang}
            />
          </InfoSection>
          <InfoItem label="Deskripsi" value={detail.deskripsi} />
        </div>
      ) : (
        <div className="">gagal bosku</div>
      )}
    </ModalContainer>
  );
};

export default DetailInformasiPendaftaran;
