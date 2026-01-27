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

  // Fungsi untuk mengolah JSON Ruangan agar rapi tapi tetap seirama dengan UI asli
  const formatRuangan = (jsonString) => {
    try {
      const data = JSON.parse(jsonString);
      return (
        <div className="flex flex-col gap-y-1">
          {Object.entries(data).map(([key, value]) => {
            // Mengubah 'tes_kesehatan' menjadi 'Tes Kesehatan'
            const formattedKey = key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase());

            return (
              <div key={key} className="text-[14px] leading-relaxed">
                <span className="font-normal">{formattedKey}:</span>{" "}
                <span className="font-bold text-gray-900">{value}</span>
              </div>
            );
          })}
        </div>
      );
    } catch (e) {
      // Jika bukan JSON, tampilkan teks aslinya dengan style standar
      return <span className="font-semibold text-gray-900">{jsonString}</span>;
    }
  };

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
            <InfoItem label="Jam Mulai" value={detail.jam_mulai?.slice(0, 5)} />
            <InfoItem
              label="Jam Selesai"
              value={detail.jam_selesai?.slice(0, 5)}
            />

            {/* Bagian ini yang kita olah datanya agar tidak muncul format JSON */}
            <InfoItem
              label="Informasi Ruangan"
              value={formatRuangan(detail.informasi_ruangan)}
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
