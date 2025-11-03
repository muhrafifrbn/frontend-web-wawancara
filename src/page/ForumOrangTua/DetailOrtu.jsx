/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { get } from "../../utils/api";
import InfoItem from "../../components/DetailModal/InfoItem";
import InfoSection from "../../components/DetailModal/InfoSection";
import ModalContainer from "../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../components/DetailModal/LoadingSpinner";

const DetailOrtu = ({ id, onClose }) => {
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
      title="Detail Data Orang Tua" 
      subtitle="Informasi lengkap data orang tua peserta didik" 
      onClose={onClose}
    >
      {loading ? (
        <LoadingSpinner />
      ) : detail && (
        <div className="space-y-8">
          <InfoSection title="Informasi Orang Tua">
            <InfoItem label="Nama Ayah" value={detail.father_name} />
            <InfoItem label="Nama Ibu" value={detail.mother_name} />
            <InfoItem label="Pekerjaan Ayah" value={detail.father_job} />
            <InfoItem label="Pekerjaan Ibu" value={detail.mother_job} />
            <InfoItem label="Email Ayah" value={detail.father_email} />
            <InfoItem label="Email Ibu" value={detail.mother_email} />
          </InfoSection>

          <InfoSection title="Informasi Anak">
            <InfoItem label="Nama Anak" value={detail.child_name} />
            <InfoItem label="Kompetensi Keahlian" value={detail.major} />
            <InfoItem label="Hubungan Dengan Anak" value={detail.relationship_to_student} />
            <InfoItem label="Status Anak Dalam Keluarga" value={detail.child_status} />
            <InfoItem 
              label="Riwayat Penyakit Berat Pada Anak" 
              value={detail.has_serious_illness == 1 ? "Ada" : "Tidak Ada"} 
            />
            <InfoItem label="Pandangan Orang Tua Terhadap Anak" value={detail.parent_view_on_child} />
          </InfoSection>

          <InfoSection title="Terkait Sekolah">
            <InfoItem label="Alasan Memilih SMK Letris Indonesia 2" value={detail.reason_choosing_school} />
            <InfoItem label="Pandangan Orang Tua Terhadap SMK Letris Indonesia 2" value={detail.parent_view_on_school} />
            <InfoItem label="Tahu SMK Letris Indonesia 2 Melalui" value={detail.know_about_school} />
            <InfoItem label="Tanggapan Orang Tua Tentang Program Sekolah" value={detail.response_to_program} />
          </InfoSection>

          <InfoSection title="Komitmen Orang Tua">
            <InfoItem 
              label="Berkomitmen Untuk Menjalin Komunikasi" 
              value={detail.willing_to_communicate == 1 ? "Bersedia" : "Tidak"} 
            />
            <InfoItem 
              label="Berkomitmen Untuk Menerima Konsekuensi" 
              value={detail.accept_consequences == 1 ? "Bersedia" : "Tidak"} 
            />
            <InfoItem 
              label="Berkomitmen Untuk Membayar Biaya" 
              value={detail.willing_to_pay_fees == 1 ? "Bersedia" : "Tidak"} 
            />
            <InfoItem 
              label="Informasi Tambahan Tentang Anak" 
              value={detail.additional_info || "Tidak Ada Informasi Tambahan"} 
            />
          </InfoSection>

          <InfoSection title="Informasi Wawancara">
            <InfoItem 
              label="Catatan Pewawancara" 
              value={detail.interviewer_notes || "Tidak Ada Informasi Tambahan"} 
            />
            <InfoItem 
              label="Nama Pewawancara" 
              value={detail.interviewer_name || "Tidak Ada Informasi Tambahan"} 
            />
            <InfoItem 
              label="Tanggal Ditambahkan" 
              value={new Date(detail.created_at).toLocaleDateString('id-ID')} 
            />
          </InfoSection>
        </div>
      )}
    </ModalContainer>
  );
};

export default DetailOrtu;