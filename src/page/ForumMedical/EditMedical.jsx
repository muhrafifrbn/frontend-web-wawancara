import React, { useState, useEffect } from "react";
import { get, put } from "../../utils/api";
import ModalContainer from "../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../components/DetailModal/LoadingSpinner";
import formatDateForInput from "../../utils/formatDateForInput";

const EditMedical = ({ id, onClose, onUpdate = () => {} }) => {
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
            const response = await get(`/medical/detail/${id}`);
            response.date_of_birth = formatDateForInput(response.date_of_birth);
            response.interview_date = formatDateForInput(response.interview_date);
            
            // Convert text values back to numeric values for the dropdowns
            response.parent_knowledge_smoking_history = 
                response.parent_knowledge_smoking_history === "Pernah" ? "1" : "0";
            response.parent_knowledge_tattoo_piercing = 
                response.parent_knowledge_tattoo_piercing === "Ada" ? "1" : "0";
                
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
                dataToSubmit.date_of_birth = dataToSubmit.date_of_birth.substring(0, 10);
            }
            if (dataToSubmit.interview_date) {
                dataToSubmit.interview_date = dataToSubmit.interview_date.substring(0, 10);
            }
           
            await put(`/medical/update/${id}`, dataToSubmit);
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
            <ModalContainer title="Edit Data Medical" onClose={onClose}>
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
            title="Edit Data Medical" 
            subtitle="Edit informasi lengkap data medical peserta didik"
            onClose={onClose}
            primaryButton={primaryButton}
            secondaryButton={secondaryButton}
        >
            <form onSubmit={handleSubmit} className="space-y-6 text-gray-600">
                <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-4">Informasi Medical</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <label htmlFor="student_name" className="block mb-2 font-medium text-md">Nama Calon Peserta Didik</label>
                            <input
                                type="text"
                                id="student_name"
                                name="student_name"
                                value={formData.student_name || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Nama Calon Peserta Didik"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="participant_card_number" className="block mb-2 font-medium text-md">Nomor Kartu Peserta</label>
                            <input
                                type="number"
                                id="participant_card_number"
                                name="participant_card_number"
                                value={formData.participant_card_number || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Nomor Kartu Peserta"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="place_of_birth" className="block mb-2 font-medium text-md">Tempat Lahir</label>
                            <input
                                type="text"
                                id="place_of_birth"
                                name="place_of_birth"
                                value={formData.place_of_birth || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Tempat Lahir"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="date_of_birth" className="block mb-2 font-medium text-md">Tanggal Lahir</label>
                            <input
                                type="date"
                                id="date_of_birth"
                                name="date_of_birth"
                                value={formData.date_of_birth || ""}
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
                                <option value="" className="text-gray-400" disabled>Pilih Gender</option>
                                <option value="Male" className="text-gray-500">Laki-Laki</option>
                                <option value="Female" className="text-gray-500">Perempuan</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="address" className="block mb-2 font-medium text-md">Alamat</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={formData.address || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Alamat"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="medical_notes" className="block mb-2 font-medium text-md">Catatan Medis</label>
                            <input
                                type="text"
                                id="medical_notes"
                                name="medical_notes"
                                value={formData.medical_notes || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Catatan Medis"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="allergies" className="block mb-2 font-medium text-md">Alergi</label>
                            <input
                                type="text"
                                id="allergies"
                                name="allergies"
                                value={formData.allergies || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Alergi"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="medical_conditions" className="block mb-2 font-medium text-md">Kondisi Medis</label>
                            <input
                                type="text"
                                id="medical_conditions"
                                name="medical_conditions"
                                value={formData.medical_conditions || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Kondisi Medis"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="weight" className="block mb-2 font-medium text-md">Berat Badan</label>
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                value={formData.weight || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Berat Badan"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="height" className="block mb-2 font-medium text-md">Tinggi Badan</label>
                            <input
                                type="number"
                                id="height"
                                name="height"
                                value={formData.height || ""}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Tinggi Badan"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="blood_type" className="block mb-2 font-medium text-md">Golongan Darah</label>
                            <select
                                id="blood_type"
                                name="blood_type"
                                value={formData.blood_type || ""}
                                onChange={handleChange}
                                className={`select-option border-[2px] border-gray-300 h-12 ${formData.blood_type ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                            >
                                <option value="" className="text-gray-400" disabled>Pilih Golongan Darah</option>
                                <option value="A+" className="text-gray-500">A+</option>
                                <option value="A-" className="text-gray-500">A-</option>
                                <option value="B+" className="text-gray-500">B+</option>
                                <option value="B-" className="text-gray-500">B-</option>
                                <option value="AB+" className="text-gray-500">AB+</option>
                                <option value="AB-" className="text-gray-500">AB-</option>
                                <option value="O+" className="text-gray-500">O+</option>
                                <option value="O-" className="text-gray-500">O-</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="parent_knowledge_smoking_history" className="block mb-2 font-medium text-md">Riwayat Merokok</label>
                            <select
                                id="parent_knowledge_smoking_history"
                                name="parent_knowledge_smoking_history"
                                value={formData.parent_knowledge_smoking_history || ""}
                                onChange={handleChange}
                                className={`select-option border-[2px] border-gray-300 h-12 ${formData.parent_knowledge_smoking_history ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                            >
                                <option value="" className="text-gray-400" disabled>Pilih Jawaban</option>
                                <option value="1" className="text-gray-500">Pernah</option>
                                <option value="0" className="text-gray-500">Tidak Pernah</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="parent_knowledge_tattoo_piercing" className="block mb-2 font-medium text-md">Tindik / Tato</label>
                            <select
                                id="parent_knowledge_tattoo_piercing"
                                name="parent_knowledge_tattoo_piercing"
                                value={formData.parent_knowledge_tattoo_piercing || ""}
                                onChange={handleChange}
                                className={`select-option border-[2px] border-gray-300 h-12 ${formData.parent_knowledge_tattoo_piercing ? 'text-black' : 'text-gray-400'} text-sm rounded-md focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                            >
                                <option value="" className="text-gray-400" disabled>Pilih Jawaban</option>
                                <option value="1" className="text-gray-500">Ada</option>
                                <option value="0" className="text-gray-500">Tidak Ada</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="interview_date" className="block mb-2 font-medium text-md">Tanggal Wawancara</label>
                            <input
                                type="date"
                                id="interview_date"
                                name="interview_date"
                                value={formData.interview_date || ""}
                                onChange={handleChange}
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

export default EditMedical;