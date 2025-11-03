/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import HasilForm from '../../template/HasilForm';
import { useFormContext } from '../../Context/FormContext';
import { post, get } from '../../utils/api';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const HasilOrtu = () => {
    const { state, resetFormData } = useFormContext();
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); 
    const location = useLocation();
    const [fetchedData, setFetchedData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data jika ID tersedia
    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await get(`/parents/detail/${id}`);
                    setFetchedData(response);
                    setLoading(false)
                } catch (error) {
                    setErrorMsg('Terjadi Kesalahan Saat Mengambil Data!');
                } 
            };
            fetchData();
        } else {
            setLoading(false);
        }
    }, [id]);

    // Data yang akan digunakan (state.form1 jika tanpa ID, fetchedData jika ada ID)
    const dataSource = id ? fetchedData : { ...state.form1, ...state.form2 };


    // Fungsi submit data ke backend (hanya dijalankan jika tanpa ID)
    const handleSubmit = async (e) => {
        if (id) return; // Jika dalam mode preview, tidak boleh submit

        const combinedData = {
            ...state.form1,
            ...state.form2,
        };

        try {
            const response = await post('/parents/submit', combinedData);
            if (response?.status === 201) {
                setSuccessMsg('Data berhasil dikirim!');
                resetFormData();
                setTimeout(() => setErrorMsg(''), 3000);
                navigate('/ortu', { state: { successMsg: 'Data berhasil dikirim!' } });
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
                        { title: 'Nama Ayah', value: dataSource?.father_name || '-' },
                        { title: 'Nama Ibu', value: dataSource?.mother_name || '-' },
                        { title: 'Nama Siswa', value: dataSource?.child_name}, 
                        { title: 'Kompetensi Keahlian', value: dataSource?.major || '-' },
                        { title: 'Pekerjaan Ayah', value: dataSource?.father_job || '-' },
                        { title: 'Pekerjaan Ibu', value: dataSource?.mother_job || '-' },
                    ]} 
                    title={"Hasil Observarsi Orang Tua"} 
                    judul='ORANG TUA' 
                    to='/ortu'
                    errorMsg={errorMsg}
                    successMsg={successMsg}
                    onSubmit={id ? null : handleSubmit} // Nonaktifkan submit jika hanya preview
                    childName={dataSource?.child_name} 
                >
                    <div className='px-0 mt-4 text-gray-800'>
                        {[{ title: 'A. Pengetahuan Orang Tua Tentang Anak', data: [
                            { e: 'Status anak dalam Keluarga', value: dataSource?.child_status || '-' },
                            { e: 'Apakah anak memiliki penyakit berat bawaan dari lahir / kecil yang mengganggu dalam belajar', value: dataSource?.has_serious_illness == 1 ? 'Ada' : 'Tidak Ada' },
                            { e: 'Pandangan orang tua terhadap karakter anak dirumah', value: dataSource?.parent_view_on_child || '-' },
                        ]},
                        { title: 'B. Motivasi Memilih Sekolah', data: [
                            { e: 'Alasan memilih SMK Letris Indonesia 2', value: dataSource?.reason_choosing_school || '-' },
                            { e: 'Pandangan tentang sekolah', value: dataSource?.parent_view_on_school || '-' },
                            { e: 'Tahu SMK Letris Indonesia 2 dari mana', value: dataSource?.know_about_school || '-' },
                        ]},
                        { title: 'C. Komitmen Terhadap Program Sekolah', data: [
                            { e: 'Apakah bapak ibu siap untuk berkomunikasi dengan wali kelas menghadiri rapat awal tahun mengambil raport hasil belajar siswa dan menghadiri panggilan sekolah dalam pendampingan belajar siswa selama menjadi siswa SMK negeri Indonesia 2', value: dataSource?.willing_to_communicate == 1 ? 'Siap' : 'Tidak' },
                            {e:'Apakah bapak dan ibu bisa berkomitmen dalam melakukan pembayaran sekolah, seperti Daftar ulang, SPP, dan kegiatan sekolah lainnya', value: dataSource?.willing_to_pay_fees == 1 ? 'Bersedia' : 'Tidak'}
                        ]},
                        { title: 'D. Konsekuensi Jika Melanggar', data: [
                            { e: 'Jika Ananda selama bersekolah melanggar peraturan sekolah tidak mau belajar atau pun mengerjakan tugas sekolah lalu dilakukan pendampingan oleh sekolah namun masih tidak berubah menjadi lebih baik apakah menerima jika nantinya jika rapat pleno kenaikan kelas dinyatakan tinggal kelas atau dikembalikan ke orang tua', value: dataSource?.accept_consequences == 1 ? 'Bersedia' : 'Tidak' },
                        ]},
                        { title: 'E. Data Tambahan', data: [
                            { e: 'Catatan Pewawancara', value: dataSource?.interviewer_notes || 'Tidak ada catatan' },
                            { e: 'Tanggal Wawancara', value:  new Date(dataSource?.interview_date).toLocaleDateString('id-ID')},
                            { e: 'Pewawancara', value: dataSource?.interviewer_name },
                        ]},
                        ].map((section, index) => (
                            <div key={index}>
                                <h1 className='mt-5 font-medium text-md sm:text-xl'>{section.title}</h1>
                                <ul className='mt-2 space-y-2 sm:ms-6'>
                                    {section.data.map((e, i) => (
                                        <li key={i} className='flex items-start justify-between gap-5 text-md sm:text-lg'>
                                            <p className='sm:w-[560px] w-[360px]'>{e.e}</p>
                                            <div className='flex gap-3 ms-2 sm:w-[400px] w-[310px]'>
                                                : <p className='text-wrap'>{e.value}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))} 
                    </div>
                </HasilForm>
            )}
        </div>
    );
};

export default HasilOrtu;
