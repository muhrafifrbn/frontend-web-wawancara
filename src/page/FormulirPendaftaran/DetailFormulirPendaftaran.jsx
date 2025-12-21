import React, { useState, useEffect } from "react";
import { get } from "../../utils/api";
import InfoItem from "../../components/DetailModal/InfoItem";
import InfoSection from "../../components/DetailModal/InfoSection";
import ModalContainer from "../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../components/DetailModal/LoadingSpinner";

const DetailFormulirPendaftaran = ({ id, onClose }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await get(`/regist-form/detail/${id}`);
        setDetail(response.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  // Fungsi untuk memformat tanggal agar lebih enak dibaca
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <ModalContainer
      title="Detail Data Pendaftaran Siswa"
      subtitle="Informasi lengkap calon siswa baru"
      onClose={onClose}
    >
      {loading ? (
        <LoadingSpinner />
      ) : detail ? (
        <div className="space-y-8">
          {/* BAGIAN 1: DATA PENDAFTARAN */}
          <InfoSection title="Informasi Pendaftaran">
            <InfoItem label="Nomor Formulir" value={detail.nomor_formulir} />
            <InfoItem label="Jurusan Dipilih" value={detail.jurusan_dipilih} />
            <InfoItem
              label="Status Kelulusan"
              value={detail.hasil_lulus}
              // Opsional: Kamu bisa menambahkan badge warna jika komponen InfoItem mendukungnya
            />
          </InfoSection>

          {/* BAGIAN 2: DATA DIRI */}
          <InfoSection title="Data Diri Calon Siswa">
            <InfoItem label="Nama Lengkap" value={detail.nama_lengkap} />
            <InfoItem label="Tempat Lahir" value={detail.tempat_lahir} />
            <InfoItem
              label="Tanggal Lahir"
              value={formatDate(detail.tanggal_lahir)}
            />
            <InfoItem label="Jenis Kelamin" value={detail.jenis_kelamin} />
            <InfoItem label="Agama" value={detail.agama} />
            <InfoSection title="Asal Sekolah">
              <InfoItem
                label="Sekolah Asal"
                value={detail.sekolah_asal ?? "-"}
              />
            </InfoSection>
          </InfoSection>

          {/* BAGIAN 3: ALAMAT & KONTAK */}
          <InfoSection title="Kontak & Alamat">
            <InfoItem label="Email" value={detail.email ?? "-"} />
            <InfoItem label="Nomor Telepon" value={detail.telepon ?? "-"} />
            <div className="col-span-2">
              <InfoItem label="Alamat Lengkap" value={detail.alamat ?? "-"} />
            </div>
          </InfoSection>

          {/* BAGIAN 4: DATA ORANG TUA */}
          <InfoSection title="Data Orang Tua">
            <InfoItem label="Nama Ayah" value={detail.nama_ayah ?? "-"} />
            <InfoItem label="Nama Ibu" value={detail.nama_ibu ?? "-"} />
          </InfoSection>
        </div>
      ) : (
        <div className="py-10 font-bold text-center text-red-500">
          Data pendaftaran tidak ditemukan atau gagal dimuat.
        </div>
      )}
    </ModalContainer>
  );
};

export default DetailFormulirPendaftaran;
