import React, { useState, useEffect } from "react";
import { get } from "../../utils/api";
import InfoItem from "../../components/DetailModal/InfoItem";
import InfoSection from "../../components/DetailModal/InfoSection";
import ModalContainer from "../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../components/DetailModal/LoadingSpinner";

const DetailJadwalTes = ({ id, onClose }) => {
  const [detail, setDetail] = useState(null);
  const [daftarTes, setTes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await get(`/information/schedule-test/${id}`);
        const response_tes = await get("/information/test");
        console.log(response.data);
        setDetail(response.data);
        setTes(response_tes.data);
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
      title="Detail Jadwal Tes"
      subtitle="Informasi lengkap mengenai jadwal tes"
      onClose={onClose}
    >
      {loading ? (
        <LoadingSpinner />
      ) : detail ? (
        <div className="space-y-8">
          <InfoSection title="Informasi Jadwal Tes">
            <InfoItem
              label="Tanggal Tes"
              value={new Date(detail.tanggal_tes).toLocaleDateString("id-ID")}
            />
            <InfoItem
              label="Jam Mulai"
              value={detail.jam_mulai?.slice(0, 5)} // Format "HH:MM"
            />
            <InfoItem
              label="Jam Selesai"
              value={detail.jam_selesai?.slice(0, 5)}
            />
            <InfoItem
              label="Informasi Ruangan"
              value={detail.informasi_ruangan}
            />
            <InfoItem
              label="Gelombang"
              value={detail.nama_gelombang ?? detail.id_gelombang}
            />
          </InfoSection>
          <div className="p-4 rounded-lg bg-gray-50">
            <div className="mb-1 text-sm text-gray-500">
              Informasi Tes yang akan dilakukan
            </div>

            {daftarTes && daftarTes.length > 0 ? (
              <ul className="ml-5 space-y-1 font-medium text-gray-900 list-disc">
                {daftarTes.map((item) => (
                  <li key={item.id}>{item.nama_tes}</li>
                ))}
              </ul>
            ) : (
              <div className="text-sm text-gray-500">Tidak ada data tes</div>
            )}
          </div>
        </div>
      ) : (
        <div className="">Gagal memuat detail</div>
      )}
    </ModalContainer>
  );
};

export default DetailJadwalTes;
