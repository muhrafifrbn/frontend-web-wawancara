import React, { useState, useEffect } from "react";
import { get, put } from "../../../utils/api";
import ModalContainer from "../../../components/DetailModal/ModalContainer";
import LoadingSpinner from "../../../components/DetailModal/LoadingSpinner";

const EditRegistrationModal = ({ id, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        competence_name: "",
        current_registered: 0,
        max_capacity: 0
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await get(`registration/detail/${id}`);
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
        setFormData((prev) => ({ 
            ...prev, 
            [name]: name === "current_registered" || name === "max_capacity" ? parseInt(value) : value 
        }));
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setSaving(true);
        try {
            await put(`registration/update/${id}`, {
                max_capacity: formData.max_capacity,
                current_registered: formData.current_registered
            });
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
            <ModalContainer title="Edit Data Registrasi" onClose={onClose}>
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
            title="Edit Data Registrasi" 
            subtitle="Edit informasi kapasitas dan pendaftar untuk jurusan"
            onClose={onClose}
            primaryButton={primaryButton}
            secondaryButton={secondaryButton}
        >
            <form onSubmit={handleSubmit} className="space-y-6 text-gray-600">
                <div className="border-b pb-4">
                    <h3 className="text-lg font-semibold mb-4">Data Jurusan</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="mb-4">
                            <label htmlFor="competence_name" className="block mb-2 font-medium text-md">Nama Jurusan</label>
                            <input
                                type="text"
                                id="competence_name"
                                name="competence_name"
                                value={formData.competence_name || ""}
                                disabled
                                className="shadow-sm bg-gray-100 border-[2px] border-gray-300 outline-none text-sm rounded-md block w-full p-2.5 h-12"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="current_registered" className="block mb-2 font-medium text-md">Jumlah Registrasi Saat Ini</label>
                            <input
                                type="number"
                                id="current_registered"
                                name="current_registered"
                                value={formData.current_registered || 0}
                                onChange={handleChange}
                                min="0"
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="max_capacity" className="block mb-2 font-medium text-md">Kapasitas Maksimal</label>
                            <input
                                type="number"
                                id="max_capacity"
                                name="max_capacity"
                                value={formData.max_capacity || 0}
                                onChange={handleChange}
                                min="0"
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </ModalContainer>
    );
};

export default EditRegistrationModal;
