/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import HasilForm from '../../template/HasilForm';
import { useFormContext } from '../../Context/FormContext';
import { post, get } from '../../utils/api';
import { useNavigate, useParams } from 'react-router-dom';

const HasilMedical = () => {
    const { state, resetFormData } = useFormContext();
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const [fetchedData, setFetchedData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data jika ID tersedia
    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await get(`/medical/detail/${id}`);
                    setFetchedData(response);
                } catch (error) {
                    setErrorMsg('Terjadi Kesalahan Saat Mengambil Data!');
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        } else {
            setLoading(false);
        }
    }, [id]);

    // Data yang akan digunakan
    const dataSource = id ? fetchedData : { ...state.formMedic };

    // Fungsi submit data ke backend (hanya dijalankan jika tanpa ID)
    const handleSubmit = async (e) => {
        if (id) return; // Jika dalam mode preview, tidak boleh submit

        try {
            const response = await post('/medical/submit', dataSource);
            if (response?.status === 201) {
                setSuccessMsg('Data berhasil dikirim!');
                resetFormData();
                setTimeout(() => setErrorMsg(''), 3000);
                navigate('/medical', { state: { successMsg: 'Data berhasil dikirim!' } });
            } else {
                setErrorMsg('Terjadi kesalahan saat mengirim data.');
                setTimeout(() => setErrorMsg(''), 3000);
            }
        } catch (error) {
            setErrorMsg('Terjadi kesalahan saat mengirim data.');
            setTimeout(() => setErrorMsg(''), 3000);
        }
    };

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <HasilForm 
                    data1={[
                        { title: 'Nama Siswa', value: dataSource?.student_name || '-' },
                        {title: 'Nomor Kartu Peserta', value: dataSource?.participant_card_number},
                        { title: 'Tempat/Tanggal Lahir', value: dataSource?.place_of_birth && dataSource?.date_of_birth ? `${dataSource.place_of_birth}, ${new Date(dataSource.date_of_birth).toLocaleDateString('id-ID')}` : '-' },
                        { title: 'Jenis Kelamin', value: dataSource?.gender == 'Male' ? 'Laki-laki' : 'Perempuan' },
                        { title: 'Alamat Tinggal', value: dataSource?.address || '-' },
                    ]}
                    title="Hasil Observasi Medis"
                    judul="HASIL MEDICAL PESERTA DIDIK"
                    to="/medical"
                    errorMsg={errorMsg}
                    successMsg={successMsg}
                    onSubmit={id ? null : handleSubmit}
                    childName={dataSource?.student_name} 
                >
                    <div className='px-0 mt-4 text-gray-800'>
                        <h1 className='font-medium text-md sm:text-xl'>A. KETERANGAN</h1>
                        <ul className='mt-2 space-y-2 sm:ms-6'>
                            {[
                                { e: 'Tinggi Badan', value: dataSource?.height || '-' },
                                { e: 'Berat Badan', value: dataSource?.weight || '-' },
                                { e: 'Golongan Darah', value: dataSource?.blood_type || '-' },
                                { e: 'Riwayat Penyakit', value: dataSource?.medical_conditions || '-' },
                                { e: 'Riwayat Merokok', value: dataSource?.smoking_history === 1 ? 'Ya' : 'Tidak' },
                                { e: 'Tindik/Tatto', value: dataSource?.tattoo_piercing === 1 ? 'Ya' : 'Tidak' },
                                { e: 'Setelah di lakukan pemeriksaan fisik dan kesehatan maka kami menyatakan', value: dataSource?.medical_notes || '-' },
                                { e: 'Catatan Pewawancara', value: dataSource?.interviewer_notes || 'Tidak ada catatan' },
                                { e: 'Tanggal Wawancara', value: new Date(dataSource?.interview_date).toLocaleDateString('id-ID') || '-' },
                                { e: 'Pewawancara', value: dataSource?.interviewer_name || '-' },
                            ].map((item, i) => (
                                <li key={i} className='flex items-start justify-between gap-1 text-md sm:text-lg'>
                                    <p className='sm:w-[560px] w-[360px]'>{item.e}</p>
                                    <div className='flex gap-3 ms-2 sm:w-[400px] w-[310px]'>
                                        : <p className='text-wrap'>{item.value}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </HasilForm>
            )}
        </div>
    );
};

export default HasilMedical;
