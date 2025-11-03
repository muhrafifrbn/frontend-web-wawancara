import React, { useState, useEffect } from "react";
import { get, put } from "../../utils/api";
import ModalContainer from "../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../components/DetailModal/LoadingSpinner";
import formatDateForInput from "../../utils/formatDateForInput";

const EditOrtuModal = ({ id, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await get(`/parents/detail/${id}`);
        setFormData(response);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    try {
      // Create a copy of the form data
      const dataToSubmit = { ...formData };
      
      // Format the interview_date if it exists using the formatDateForInput function
      if (dataToSubmit.interview_date) {
        dataToSubmit.interview_date = formatDateForInput(dataToSubmit.interview_date);
      }
      
      
      await put(`/parents/update/${id}`, dataToSubmit);
      onUpdate(); // Refresh data di parent component
      onClose();
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ModalContainer title="Edit Data Orang Tua" onClose={onClose}>
        <LoadingSpinner />
      </ModalContainer>
    );
  }

  const primaryButton = (
    <button
      onClick={handleSubmit}
      disabled={saving}
      className="w-full px-5 py-2 text-sm font-semibold text-center rounded-md bg-red-500 text-white active:scale-95 focus:outline-none"
    >
      {saving ? "Menyimpan..." : "Simpan"}
    </button>
  );

  const secondaryButton = (
    <button
      onClick={onClose}
      className="w-full px-5 py-2 text-sm font-semibold text-center bg-white border-2 rounded-md text-red-500 border-red-500 active:scale-95 focus:outline-none"
    >
      Batal
    </button>
  );

  return (
    <ModalContainer 
      title="Edit Data Orang Tua" 
      subtitle="Edit informasi lengkap data orang tua peserta didik"
      onClose={onClose}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
    >
      <form onSubmit={handleSubmit} className="space-y-6 text-gray-600">
        {/* Informasi Orang Tua */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4">Informasi Orang Tua</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="father_name" className="block mb-2 font-medium text-md">Nama Ayah</label>
              <input
                type="text"
                id="father_name"
                name="father_name"
                value={formData.father_name || ""}
                onChange={handleChange}
                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                placeholder="Masukan Nama Ayah Calon Siswa/i"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mother_name" className="block mb-2 font-medium text-md">Nama Ibu</label>
              <input
                type="text"
                id="mother_name"
                name="mother_name"
                value={formData.mother_name || ""}
                onChange={handleChange}
                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                placeholder="Masukan Nama Ibu Calon Siswa/i"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="father_job" className="block mb-2 font-medium text-md">Pekerjaan Ayah</label>
              <input
                type="text"
                id="father_job"
                name="father_job"
                value={formData.father_job || ""}
                onChange={handleChange}
                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                placeholder="Masukan Pekerjaan Ayah Calon Siswa/i"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mother_job" className="block mb-2 font-medium text-md">Pekerjaan Ibu</label>
              <input
                type="text"
                id="mother_job"
                name="mother_job"
                value={formData.mother_job || ""}
                onChange={handleChange}
                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                placeholder="Masukan Pekerjaan Ibu Calon Siswa/i"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="father_email" className="block mb-2 font-medium text-md">Email Ayah</label>
              <input
                type="email"
                id="father_email"
                name="father_email"
                value={formData.father_email || ""}
                onChange={handleChange}
                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                placeholder="Kosongkan Jika Tidak Ada"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mother_email" className="block mb-2 font-medium text-md">Email Ibu</label>
              <input
                type="email"
                id="mother_email"
                name="mother_email"
                value={formData.mother_email || ""}
                onChange={handleChange}
                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                placeholder="Kosongkan Jika Tidak Ada"
              />
            </div>
          </div>
        </div>

        {/* Informasi Anak */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4">Informasi Anak</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="child_name" className="block mb-2 font-medium text-md">Nama Anak</label>
              <input
                type="text"
                id="child_name"
                name="child_name"
                value={formData.child_name || ""}
                onChange={handleChange}
                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                placeholder="Masukan Nama Anak"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="major" className="block mb-2 font-medium text-md">Kompetensi Keahlian</label>
              <select 
                id="major" 
                name="major" 
                value={formData.major || ""} 
                onChange={handleSelectChange}
                className={`select-option border-[2px] border-gray-300 h-12 ${formData.major ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
              >
                <option value="" className="text-gray-400" disabled>Pilih Kompetensi Keahlian</option>
                <option value="Rekayasa Perangkat Lunak dan Gim" className="text-gray-500">Rekayasa Perangkat Lunak dan Gim</option>
                <option value="Desain Komunikasi Visual Reguler" className="text-gray-500">Desain Komunikasi Visual Reguler</option>
                <option value="Desain Komunikasi Visual Bilingual" className="text-gray-500">Desain Komunikasi Visual Bilingual</option>
                <option value="Manajemen Pekantoran dan Layanan Bisnis Reguer" className="text-gray-500">Manajemen Pekantoran dan Layanan Bisnis Reguler</option>
                <option value="Manajemen Pekantoran dan Layanan Bisnis Bilingual" className="text-gray-500">Manajemen Pekantoran dan Layanan Bisnis Bilingual</option>
                <option value="Pemasaran dan Bisnis Retail" className="text-gray-500">Pemasaran dan Bisnis Retail</option>
                <option value="Akutansi dan Keuangan Lembaga" className="text-gray-500">Akutansi dan Keuangan</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="relationship_to_student" className="block mb-2 font-medium text-md">Hubungan Dengan Anak</label>
              <select
                id="relationship_to_student"
                name="relationship_to_student"
                value={formData.relationship_to_student || ""}
                onChange={handleSelectChange}
                className={`select-option border-[2px] border-gray-300 h-12 ${formData.relationship_to_student ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
              >
                <option value="" className="text-gray-400" disabled>Pilih Hubungan Orang Tua Dengan Anak</option>
                <option value="Orang Tua" className="text-gray-500">Orang Tua</option>
                <option value="Wali" className="text-gray-500">Wali</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="child_status" className="block mb-2 font-medium text-md">Status Anak Dalam Keluarga</label>
              <select
                id="child_status"
                name="child_status"
                value={formData.child_status || ""}
                onChange={handleSelectChange}
                className={`select-option border-[2px] border-gray-300 h-12 ${formData.child_status ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
              >
                <option value="" className="text-gray-400" disabled>Pilih Status Anak Dalam Keluarga</option>
                <option value="Anak Kandung" className="text-gray-500">Anak Kandung</option>
                <option value="Anak Angkat" className="text-gray-500">Anak Angkat</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="has_serious_illness" className="block mb-2 font-medium text-md">Apakah anak Memiliki Riwayat Penyakit Berat</label>
              <select
                id="has_serious_illness"
                name="has_serious_illness"
                value={formData.has_serious_illness}
                onChange={handleSelectChange}
                className={`select-option border-[2px] border-gray-300 h-12 ${formData.has_serious_illness !== undefined ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
              >
                <option value="" className="text-gray-400" disabled>Pilih Jawaban</option>
                <option value="1" className="text-gray-500">Ada</option>
                <option value="0" className="text-gray-500">Tidak Ada</option>
              </select>
            </div>
            <div className="md:col-span-2 mb-4">
              <label htmlFor="parent_view_on_child" className="block mb-2 font-medium text-md">Pandangan Orang Tua Terhadap Karakter Anak</label>
              <input
                type="text"
                id="parent_view_on_child"
                name="parent_view_on_child"
                value={formData.parent_view_on_child || ""}
                onChange={handleChange}
                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                placeholder="Masukan Pandangan Orang Tua Terhadap Karakter Anak"
              />
            </div>
          </div>
        </div>

        {/* Terkait Sekolah */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4">Tentang Sekolah</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="mb-4">
              <label htmlFor="reason_choosing_school" className="block mb-2 font-medium text-md">Alasan Memilih SMK Letris Indonesia 2</label>
              <input
                type="text"
                id="reason_choosing_school"
                name="reason_choosing_school"
                value={formData.reason_choosing_school || ""}
                onChange={handleChange}
                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                placeholder="Masukan Alasan Orang Tua"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="parent_view_on_school" className="block mb-2 font-medium text-md">Pandangan Orang Tua Terhadap SMK Letris Indonesia 2</label>
              <input
                type="text"
                id="parent_view_on_school"
                name="parent_view_on_school"
                value={formData.parent_view_on_school || ""}
                onChange={handleChange}
                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                placeholder="Masukan Pandangan Orang Tua"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="know_about_school" className="block mb-2 font-medium text-md">Tahu SMK Letris Indonesia 2 Dari Mana</label>
              <input
                type="text"
                id="know_about_school"
                name="know_about_school"
                value={formData.know_about_school || ""}
                onChange={handleChange}
                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                placeholder="Tahu SMK Letris Indonesia 2 Dari Mana"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="response_to_program" className="block mb-2 font-medium text-md">Bagaimana Tanggapan Bapak/Ibu Tentang Program Sekolah</label>
              <input
                type="text"
                id="response_to_program"
                name="response_to_program"
                value={formData.response_to_program || ""}
                onChange={handleChange}
                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                placeholder="Bagaimana Tanggapan Bapak/Ibu tentang program sekolah"
              />
            </div>
          </div>
        </div>

        {/* Komitmen Orang Tua */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4">Komitmen Orang Tua Terhadap Program Sekolah</h3>
          <div className="space-y-3">
            <div className="mb-4">
              <label htmlFor="willing_to_communicate" className="block mb-2 font-medium text-md">Apakah bapak ibu siap untuk berkomunikasi dengan wali kelas</label>
              <select 
                id="willing_to_communicate" 
                name="willing_to_communicate" 
                value={formData.willing_to_communicate} 
                onChange={handleSelectChange}
                className={`select-option border-[2px] border-gray-300 h-12 ${formData.willing_to_communicate !== undefined ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
              >
                <option value="" className="text-gray-400" disabled>Pilih Jawaban</option>
                <option value="1" className="text-gray-500">Siap</option>
                <option value="0" className="text-gray-500">Tidak</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="willing_to_pay_fees" className="block mb-2 font-medium text-md">Apakah bapak dan ibu bisa berkomitmen dalam melakukan pembayaran sekolah</label>
              <select 
                id="willing_to_pay_fees" 
                name="willing_to_pay_fees" 
                value={formData.willing_to_pay_fees} 
                onChange={handleSelectChange}
                className={`select-option border-[2px] border-gray-300 h-12 ${formData.willing_to_pay_fees !== undefined ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
              >
                <option value="" className="text-gray-400" disabled>Pilih Jawaban</option>
                <option value="1" className="text-gray-500">Bersedia</option>
                <option value="0" className="text-gray-500">Tidak</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="accept_consequences" className="block mb-2 font-medium text-md">Apakah menerima konsekuensi jika anak melanggar peraturan sekolah</label>
              <select 
                id="accept_consequences" 
                name="accept_consequences" 
                value={formData.accept_consequences} 
                onChange={handleSelectChange}
                className={`select-option border-[2px] border-gray-300 h-12 ${formData.accept_consequences !== undefined ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
              >
                <option value="" className="text-gray-400" disabled>Pilih Jawaban</option>
                <option value="1" className="text-gray-500">Bersedia</option>
                <option value="0" className="text-gray-500">Tidak</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="additional_info" className="block mb-2 font-medium text-md">Informasi Tambahan Tentang Anak</label>
              <input
                type="text"
                id="additional_info"
                name="additional_info"
                value={formData.additional_info || ""}
                onChange={handleChange}
                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                placeholder="Kosongkan Jika Tidak Ada"
              />
            </div>
          </div>
        </div>

        {/* Informasi Wawancara */}
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-4">Keterangan Pewawancara</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="interview_date" className="block mb-2 font-medium text-md">Tanggal Wawancara</label>
              <input
                type="date"
                id="interview_date"
                name="interview_date"
                value={formatDateForInput(formData.interview_date)}
                onChange={handleChange}
                required
                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="interviewer_name" className="block mb-2 font-medium text-md">Nama Pewawancara</label>
              <input
                type="text"
                id="interviewer_name"
                name="interviewer_name"
                value={formData.interviewer_name || ""}
                onChange={handleChange}
                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                placeholder="Nama Pewawancara"
              />
            </div>
            <div className="md:col-span-2 mb-4">
              <label htmlFor="interviewer_notes" className="block mb-2 font-medium text-md">Catatan Khusus Pewawancara</label>
              <textarea 
                id="interviewer_notes" 
                name="interviewer_notes" 
                value={formData.interviewer_notes || ""}
                onChange={handleChange}
                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 min-h-[80px]"
                placeholder="Kosongkan Jika Tidak Ada Catatan"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </ModalContainer>
  );
};

export default EditOrtuModal;