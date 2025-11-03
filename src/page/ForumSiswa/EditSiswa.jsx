import React, { useState, useEffect } from "react";
import { get, put } from "../../utils/api";
import ModalContainer from "../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../components/DetailModal/LoadingSpinner";
import formatDateForInput from "../../utils/formatDateForInput";

const EditSiswa = ({ id, onClose, onUpdate }) => {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await get(`/students/detail/${id}`);
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

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setSaving(true);
        try {
            const dataToSubmit = { ...formData };
            if (dataToSubmit.date_of_birth) {
                dataToSubmit.date_of_birth = formatDateForInput(dataToSubmit.date_of_birth);
            }
            if (dataToSubmit.interview_date) {
                dataToSubmit.interview_date = formatDateForInput(dataToSubmit.interview_date);
            }
            await put(`/students/update/${id}`, dataToSubmit);
            onUpdate();
            onClose();
        } catch (error) {
            console.error("Gagal menyimpan data:", error);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <ModalContainer title="Edit Data Siswa" onClose={onClose}>
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
            title="Edit Data Siswa" 
            subtitle="Edit informasi lengkap data siswa"
            onClose={onClose}
            primaryButton={primaryButton}
            secondaryButton={secondaryButton}
        >
            <form onSubmit={handleSubmit} className="space-y-6 text-gray-600">
                <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-4">Informasi Siswa</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="student_name" className="block mb-2 font-medium text-md">Nama Siswa</label>
                            <input
                                type="text"
                                id="student_name"
                                name="student_name"
                                value={formData.student_name || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Nama Siswa"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="student_vision" className="block mb-2 font-medium text-md">Visi Siswa</label>
                            <input
                                id="student_vision"
                                name="student_vision"
                                value={formData.student_vision || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Visi Siswa"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="student_mission" className="block mb-2 font-medium text-md">Misi Siswa</label>
                            <input
                                id="student_mission"
                                name="student_mission"
                                value={formData.student_mission || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Misi Siswa"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="previous_school" className="block mb-2 font-medium text-md">Asal Sekolah Siswa Sebelumnya</label>
                            <input
                                type="text"
                                id="previous_school"
                                name="previous_school"
                                value={formData.previous_school || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Sekolah Siswa Sebelumnya"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="student_email" className="block mb-2 font-medium text-md">Email Siswa</label>
                            <input
                                type="email"
                                id="student_email"
                                name="student_email"
                                value={formData.student_email || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Email Siswa"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="student_phone_number" className="block mb-2 font-medium text-md">Nomor Telpon Siswa</label>
                            <input
                                type="text"
                                id="student_phone_number"
                                name="student_phone_number"
                                value={formData.student_phone_number || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Nomor Telpon Siswa"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="place_of_birth" className="block mb-2 font-medium text-md">Tempat Lahir Siswa</label>
                            <input
                                type="text"
                                id="place_of_birth"
                                name="place_of_birth"
                                value={formData.place_of_birth || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Tempat Lahir Siswa"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="date_of_birth" className="block mb-2 font-medium text-md">Tanggal Lahir Siswa</label>
                            <input
                                type="date"
                                id="date_of_birth"
                                name="date_of_birth"
                                value={formatDateForInput(formData.date_of_birth)}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="gender" className="block mb-2 font-medium text-md">Gender</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender || ""}
                                onChange={handleChange}
                                className={`select-option border-[2px] border-gray-300 h-12 ${formData.gender ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                            >
                                <option value="" disabled className="text-gray-400">Pilih Gender</option>
                                <option value="Male" className="text-gray-500">Laki-Laki</option>
                                <option value="Female" className="text-gray-500">Perempuan</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="religion" className="block mb-2 font-medium text-md">Agama</label>
                            <select
                                id="religion"
                                name="religion"
                                value={formData.religion || ""}
                                onChange={handleChange}
                                className={`select-option border-[2px] border-gray-300 h-12 ${formData.religion ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                            >
                                <option value="" disabled className="text-gray-400">Pilih Agama</option>
                                <option value="Islam" className="text-gray-500">Islam</option>
                                <option value="Katolik" className="text-gray-500">Katolik</option>
                                <option value="Protestan" className="text-gray-500">Protestan</option>
                                <option value="Buddha" className="text-gray-500">Buddha</option>
                                <option value="Hindu" className="text-gray-500">Hindu</option>
                                <option value="Kepercayaan Kepada Tuhan YME" className="text-gray-500">Kepercayaan Kepada Tuhan YME</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="nationality" className="block mb-2 font-medium text-md">Kewarganegaraan</label>
                            <input
                                type="text"
                                id="nationality"
                                name="nationality"
                                value={formData.nationality || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Kewarganegaraan Siswa"
                            />
                        </div>
                    </div>
                </div>
                
                {/* Bagian dari ForumSiswa */}
                <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-4">Informasi Kompetensi</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="skill_competence" className="block mb-2 font-medium text-md">Kompetensi Keahlian</label>
                            <select
                                id="skill_competence"
                                name="skill_competence"
                                value={formData.skill_competence || ""}
                                onChange={handleChange}
                                className={`select-option border-[2px] border-gray-300 h-12 ${formData.skill_competence ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                            >
                                <option value="" disabled className="text-gray-400">Pilih Jawaban</option>
                                <option value="Rekayasa Perangkat Lunak dan Gim" className="text-gray-500">Rekayasa Perangkat Lunak dan Gim</option>
                                <option value="Desain Komunikasi Visual Reguler" className="text-gray-500">Desain Komunikasi Visual Reguler</option>
                                <option value="Desain Komunikasi Visual Bilingual" className="text-gray-500">Desain Komunikasi Visual Bilingual</option>
                                <option value="Manajemen Pekantoran dan Layanan Bisnis Reguer" className="text-gray-500">Manajemen Pekantoran dan Layanan Bisnis Reguler</option>
                                <option value="Manajemen Pekantoran dan Layanan Bisnis Bilingual" className="text-gray-500">Manajemen Pekantoran dan Layanan Bisnis Bilingual</option>
                                <option value="Pemasaran dan Bisnis Retail" className="text-gray-500">Pemasaran dan Bisnis Retail</option>
                                <option value="Akutansi dan Keuangan" className="text-gray-500">Akutansi dan Keuangan</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="reason_choosing_competence" className="block mb-2 font-medium text-md">Alasan Memilih Kompetensi Keahlian</label>
                            <textarea
                                id="reason_choosing_competence"
                                name="reason_choosing_competence"
                                value={formData.reason_choosing_competence || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Alasan Memilih Bersekolah di SMK Letris Indonesia 2"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="knowledge_about_competence" className="block mb-2 font-medium text-md">Apakah Siswa Sudah Tahu Tentang Kompetensi Keahlian yang Dipilihnya</label>
                            <select
                                id="knowledge_about_competence"
                                name="knowledge_about_competence"
                                value={formData.knowledge_about_competence || ""}
                                onChange={handleChange}
                                className={`select-option border-[2px] border-gray-300 h-12 ${formData.knowledge_about_competence ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                            >
                                <option value="" disabled className="text-gray-400">Pilih Jawaban</option>
                                <option value="Tahu" className="text-gray-500">Tahu</option>
                                <option value="Balum Tahu" className="text-gray-500">Belum Tahu</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="has_competence_work" className="block mb-2 font-medium text-md">Apakah Siswa Pernah Memiliki Karya di Kompetensi yang Dipilihnya</label>
                            <select
                                id="has_competence_work"
                                name="has_competence_work"
                                value={formData.has_competence_work || ""}
                                onChange={handleChange}
                                className={`select-option border-[2px] border-gray-300 h-12 ${formData.has_competence_work ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                            >
                                <option value="" disabled className="text-gray-400">Pilih Jawaban</option>
                                <option value="1" className="text-gray-500">Ada</option>
                                <option value="0" className="text-gray-500">Tidak Ada</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="motivation_for_competence" className="block mb-2 font-medium text-md">Apa Motivasi Siswa Sehingga Memilih Kompetensi Tersebut</label>
                            <input
                                type="text"
                                id="motivation_for_competence"
                                name="motivation_for_competence"
                                value={formData.motivation_for_competence || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Motivasi Siswa Memilih Kompetensinya"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="expectations_for_competence" className="block mb-2 font-medium text-md">Apa Harapan Siswa di Kompetensi yang Dipilihnya</label>
                            <input
                                type="text"
                                id="expectations_for_competence"
                                name="expectations_for_competence"
                                value={formData.expectations_for_competence || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Harapan Siswa Memilih Kompetensinya"
                            />
                        </div>
                    </div>
                </div>
                
                {/* Bagian dari ForumSiswa2 */}
                <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-4">Informasi Tambahan</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="reason_choosing_school" className="block mb-2 font-medium text-md">Apa Alasan Siswa Memilih SMK Letris Indonesia 2</label>
                            <input
                                type="text"
                                id="reason_choosing_school"
                                name="reason_choosing_school"
                                value={formData.reason_choosing_school || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Alasan Siswa/i Memilih SMK Letris Indonesia 2"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="active_in_extracurricular" className="block mb-2 font-medium text-md">Apa Pernah Aktif Dalam OSIS Ataupun Ekskul Ketika di SMP/MTS</label>
                            <select
                                id="active_in_extracurricular"
                                name="active_in_extracurricular"
                                value={formData.active_in_extracurricular || ""}
                                onChange={handleChange}
                                className={`select-option border-[2px] border-gray-300 h-12 ${formData.active_in_extracurricular ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                            >
                                <option value="" disabled className="text-gray-400">Pilih Jawaban</option>
                                <option value="1" className="text-gray-500">Pernah</option>
                                <option value="0" className="text-gray-500">Belum</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="achievements" className="block mb-2 font-medium text-md">Apa Pernah Memiliki Prestasi Ketika di SMP/MTS</label>
                            <select
                                id="achievements"
                                name="achievements"
                                value={formData.achievements || ""}
                                onChange={handleChange}
                                className={`select-option border-[2px] border-gray-300 h-12 ${formData.achievements ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                            >
                                <option value="" disabled className="text-gray-400">Pilih Jawaban</option>
                                <option value="Ya" className="text-gray-500">Ya</option>
                                <option value="Tidak" className="text-gray-500">Belum</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="agree_to_rules" className="block mb-2 font-medium text-md">Apakah Siswa Siap dan bersedia mengikuti seluruh tata tertib di SMK Letris Indonesia 2</label>
                            <select
                                id="agree_to_rules"
                                name="agree_to_rules"
                                value={formData.agree_to_rules || ""}
                                onChange={handleChange}
                                className={`select-option border-[2px] border-gray-300 h-12 ${formData.agree_to_rules ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                            >
                                <option value="" disabled className="text-gray-400">Pilih Jawaban</option>
                                <option value="1" className="text-gray-500">Bersedia</option>
                                <option value="0" className="text-gray-500">Tidak Bersedia</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="ever_broken_rules" className="block mb-2 font-medium text-md">Apakah Pernah Melanggar Tata Tertib Selama Bersekolah di SMP/MTS</label>
                            <select
                                id="ever_broken_rules"
                                name="ever_broken_rules"
                                value={formData.ever_broken_rules || ""}
                                onChange={handleChange}
                                className={`select-option border-[2px] border-gray-300 h-12 ${formData.ever_broken_rules ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                            >
                                <option value="" disabled className="text-gray-400">Pilih Jawaban</option>
                                <option value="1" className="text-gray-500">Pernah</option>
                                <option value="0" className="text-gray-500">Tidak Pernah</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                {/* Bagian Informasi Wawancara */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Informasi Wawancara</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="interviewer_notes" className="block mb-2 font-medium text-md">Catatan Khusus Pewawancara</label>
                            <textarea
                                id="interviewer_notes"
                                name="interviewer_notes"
                                value={formData.interviewer_notes || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Kosongan Jika Tidak Ada Catatan"
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
                        <div className="mb-4">
                            <label htmlFor="interview_date" className="block mb-2 font-medium text-md">Tanggal Wawancara</label>
                            <input
                                type="date"
                                id="interview_date"
                                name="interview_date"
                                value={formatDateForInput(formData.interview_date)}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </ModalContainer>
    );
};

export default EditSiswa;