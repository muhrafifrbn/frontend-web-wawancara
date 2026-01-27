/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { get } from "../../utils/api";
import InfoItem from "../../components/DetailModal/InfoItem";
import InfoSection from "../../components/DetailModal/InfoSection";
import ModalContainer from "../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../components/DetailModal/LoadingSpinner";

const DetailSiswa = ({ id, onClose }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await get(`/students/detail/${id}`);
        setDetail(response);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  // Fungsi pembantu untuk format tanggal
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
      title="Detail Data Siswa"
      subtitle="Informasi lengkap data calon peserta didik"
      onClose={onClose}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        detail && (
          <div className="space-y-8">
            <InfoSection title="Informasi Pribadi Siswa">
              <InfoItem label="Nama Lengkap" value={detail.student_name} />
              <InfoItem label="Email" value={detail.student_email} />
              <InfoItem
                label="Nomor Telepon"
                value={detail.student_phone_number || "-"}
              />
              <InfoItem
                label="Asal Sekolah"
                value={detail.previous_school || "-"}
              />
              <InfoItem
                label="Tempat Lahir"
                value={detail.place_of_birth || "-"}
              />
              <InfoItem
                label="Tanggal Lahir"
                value={formatDate(detail.date_of_birth)}
              />
              <InfoItem
                label="Jenis Kelamin"
                value={
                  detail.gender === "Male"
                    ? "Laki-Laki"
                    : detail.gender === "Female"
                      ? "Perempuan"
                      : detail.gender || "-"
                }
              />
              <InfoItem label="Agama" value={detail.religion || "-"} />
              <InfoItem
                label="Kewarganegaraan"
                value={detail.nationality || "-"}
              />
              <InfoItem
                label="Visi Siswa"
                value={detail.student_vision || "-"}
              />
              <InfoItem
                label="Misi Siswa"
                value={detail.student_mission || "-"}
              />
            </InfoSection>

            <InfoSection title="Informasi Kompetensi">
              <InfoItem
                label="Kompetensi Keahlian"
                value={detail.skill_competence || "-"}
              />
              <InfoItem
                label="Alasan Memilih Kompetensi"
                value={detail.reason_choosing_competence || "-"}
              />
              <InfoItem
                label="Pengetahuan Tentang Kompetensi"
                value={detail.knowledge_about_competence || "-"}
              />
              <InfoItem
                label="Memiliki Karya di Kompetensi Ini"
                value={detail.has_competence_work == 1 ? "Ada" : "Tidak Ada"}
              />
              <InfoItem
                label="Motivasi Memilih Kompetensi"
                value={detail.motivation_for_competence || "-"}
              />
              <InfoItem
                label="Harapan di Kompetensi Ini"
                value={detail.expectations_for_competence || "-"}
              />
            </InfoSection>

            <InfoSection title="Informasi Tambahan">
              <InfoItem
                label="Alasan Memilih SMK Letris Indonesia 2"
                value={detail.reason_choosing_school || "-"}
              />
              <InfoItem
                label="Aktif Organisasi/Ekskul di SMP"
                value={
                  detail.active_in_extracurricular == 1 ? "Pernah" : "Belum"
                }
              />
              <InfoItem
                label="Prestasi Yang Pernah Diraih"
                value={detail.achievements || "Tidak Ada"}
              />
              <InfoItem
                label="Siap Mengikuti Tata Tertib"
                value={
                  detail.agree_to_rules == 1 ? "Bersedia" : "Tidak Bersedia"
                }
              />
              <InfoItem
                label="Pernah Melanggar Aturan di SMP"
                value={
                  detail.ever_broken_rules == 1 ? "Pernah" : "Tidak Pernah"
                }
              />
            </InfoSection>

            <InfoSection title="Informasi Wawancara">
              <InfoItem
                label="Nama Pewawancara"
                value={detail.interviewer_name || "Belum Ada Informasi"}
              />
              <InfoItem
                label="Tanggal Wawancara"
                value={formatDate(detail.interview_date)}
              />
              <InfoItem
                label="Catatan Pewawancara"
                value={detail.interviewer_notes || "Tidak Ada Catatan"}
              />
              <InfoItem
                label="Data Ditambahkan Pada"
                value={new Date(detail.created_at).toLocaleString("id-ID")}
              />
            </InfoSection>
          </div>
        )
      )}
    </ModalContainer>
  );
};

export default DetailSiswa;
