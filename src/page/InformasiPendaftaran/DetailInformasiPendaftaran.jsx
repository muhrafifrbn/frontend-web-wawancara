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
        const response = await get(`/parents/detail/${id}`);
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
      title="Detail Data Informasi Pendaftaran"
      subtitle="Informasi lengkap data informasi pendaftaran"
      onClose={onClose}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        detail && (
          <div className="space-y-8">
            <InfoItem title="Informasi Pendaftaran">
              <InfoItem label="Gelombang" value={detail.nama_gelombang} />
              <InfoItem label="Tanggal Mulai" value={detail.tanggal_mulai} />
              <InfoItem label="Tanggal Akhir" value={detail.tanggal_akhir} />
              <InfoItem label="Tahun Ajaran" value={detail.tahun_ajaran} />
              <InfoItem label="Kouta" value={detail.kouta} />
              <InfoItem
                label="Status Gelombang"
                value={detail.status_gelombang}
              />
            </InfoItem>
          </div>
        )
      )}
    </ModalContainer>
  );
};

export default DetailInformasiPendaftaran;
