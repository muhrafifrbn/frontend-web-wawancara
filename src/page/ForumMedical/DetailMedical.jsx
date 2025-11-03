/* eslint-disable react/prop-types */
import React from "react";
import { get } from "../../utils/api";
import InfoItem from "../../components/DetailModal/InfoItem";
import InfoSection from "../../components/DetailModal/InfoSection";
import ModalContainer from "../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../components/DetailModal/LoadingSpinner";

const DetailMedical = ({ id, onClose }) => {
  const [detail, setDetail] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await get(`/medical/detail/${id}`);
        setDetail(response);
      } catch (error) {
        console.log("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  return (
    <ModalContainer 
      title="Detail Data Medis" 
      subtitle="Informasi lengkap data medis peserta didik" 
      onClose={onClose}
    >
      {loading ? (
        <LoadingSpinner />
      ) : detail && (
        <div className="space-y-8">
          <InfoSection title="Informasi Pribadi">
            <InfoItem label="Nama Calon Peserta Didik" value={detail.student_name} />
            <InfoItem label="Nomor Peserta" value={detail.participant_card_number} />
            <InfoItem label="Tempat Lahir" value={detail.place_of_birth} />
            <InfoItem 
              label="Tanggal Lahir" 
              value={new Date(detail.date_of_birth).toLocaleDateString('id-ID')} 
            />
            <InfoItem label="Jenis Kelamin" value={detail.gender == "Male" ? "Laki-laki" : "Perempuan"} />
            <InfoItem label="Alamat" value={detail.address} />
          </InfoSection>

          <InfoSection title="Data Kesehatan">
            <InfoItem label="Berat Badan" value={`${detail.weight} kg`} />
            <InfoItem label="Tinggi Badan" value={`${detail.height} cm`} />
            <InfoItem label="Golongan Darah" value={detail.blood_type} />
            <InfoItem label="Catatan Medis" value={detail.medical_notes} />
            <InfoItem label="Alergi" value={detail.allergies} />
            <InfoItem label="Kondisi Medis" value={detail.medical_conditions} />
          </InfoSection>

          <InfoSection title="Riwayat & Informasi Tambahan">
            <InfoItem 
              label="Riwayat Merokok" 
              value={detail.parent_knowledge_smoking_history ? "Ya" : "Tidak"} 
            />
            <InfoItem 
              label="Riwayat Tato / Tindik" 
              value={detail.parent_knowledge_tattoo_piercing ? "Ya" : "Tidak"} 
            />
          </InfoSection>

          <InfoSection title="Informasi Wawancara">
            <InfoItem 
              label="Catatan Pewawancara" 
              value={detail.interviewer_notes} 
            />
            <InfoItem 
              label="Nama Pewawancara" 
              value={detail.interviewer_name} 
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

export default DetailMedical;