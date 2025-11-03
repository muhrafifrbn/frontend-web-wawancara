/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import HasilForm from '../../template/HasilForm';
import { useFormContext } from '../../Context/FormContext';
import { post, get } from '../../utils/api';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const HasilSiswa = () => {
    const { state, resetFormData } = useFormContext();
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); 
    const location = useLocation();
    const [fetchedData, setFetchedData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await get(`/students/detail/${id}`);
                    setFetchedData(response);
                    setLoading(false);
                } catch (error) {
                    setErrorMsg('Terjadi Kesalahan Saat Mengambil Data!');
                }
            };
            fetchData();
        } else {
            setLoading(false);
        }
    }, [id]);

    //const dataSource = id ? fetchedData : { ...state.form1Siswa, ...state.form2Siswa };
    const dataSource = id ? fetchedData || {} : { ...state.form1Siswa, ...state.form2Siswa };

    const handleSubmit = async (e) => {
        if (id) return;

        const combinedData = {
            ...state.form1Siswa,
            ...state.form2Siswa,
        };
        
        try {
            const response = await post('/students/submit', combinedData);
            if (response?.status === 201) {
                setSuccessMsg('Data Berhasil Dikirim!');
                resetFormData();
                setTimeout(() => setSuccessMsg(''), 3000);
                navigate('/siswa', { state: { successMsg: 'Data Berhasil Dikirim!' } });
            } else {
                setErrorMsg('Terjadi Kesalahan Saat Mengirimkan Data!');
                setTimeout(() => setErrorMsg(''), 3000);
            }
        } catch (error) {
            setErrorMsg('Terjadi Kesalahan Saat Mengirimkan Data!');
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
              { title: 'Nama Siswa', value: dataSource?.student_name},
              { title: 'Kompetensi Keahlian', value: dataSource?.skill_competence},
              { title: 'Asal Sekolah', value: dataSource?.previous_school},
              { title: 'Gender', value: dataSource?.gender === 'Male' ? 'Laki-Laki': 'Perempuan'},
              { title: 'Visi Siswa', value: dataSource?.student_vision},
              { title: 'Misi Siswa', value: dataSource?.student_mission},
            ]} 
            title={'Hasil Observasi Siswa'} 
            judul='IDENTITAS PESERTA DIDIK'
            to='/siswa'
            errorMsg={id ? '' : errorMsg}
            successMsg={id ? '' : successMsg}
            onSubmit={id ? null : handleSubmit}
            childName={dataSource?.student_name} 
          >
            <div className='px-0 mt-4 text-gray-800'>
              {[{ title: 'A. Tentang Kompetensi Keahlian', data: [
                { e: 'Alasan Memilih Kompetensi Keahlian', value: dataSource?.reason_choosing_competence},
                { e: 'Pengetahuan Tentang Kompetensi Tersebut', value: dataSource?.knowledge_about_competence},
                { e: 'Apakah pernah memiliki karya di kompetensi tersebut', value: dataSource?.has_competence_work == 0 ? "Tidak Pernah" : "Pernah"},
                { e: 'Apa motivasi memilih Kompetensi tersebut', value: dataSource?.motivation_for_competence},
                { e: 'Apa harapanmu di kompetensi tersebut', value: dataSource?.expectations_for_competence},
              ]},
              { title: 'B. Tentang Sekolah', data: [
                { e: 'Alasan memilih bersekolah di SMK Letris Indonesia 2', value: dataSource?.reason_choosing_school},
                { e: 'Apa pernah aktif dalam keperguruan OSIS ataupun Ekskul ketika di SMP/MTS', value: dataSource?.active_in_extracurricular == 1 ? "Pernah": "Tidak Pernah"},
                { e: 'Apa pernah memiliki prestasi Ketika di SMP/MTS', value: dataSource?.achievements == null ? "Tidak Pernah" : dataSource?.achievements},
                { e: 'Apa pernah melanggar tata tertib selama sekolah di SMP/MTS', value: dataSource?.ever_broken_rules == 1 ? "Pernah" : "Tidak Pernah"},
                { e: 'Jika Diterima Di SMK Letris Indonesia 2, Apakah Siap dan bersedia mengikuti seluruh tata tertib yang berlaku di SMK Letris Indonesia 2', value: dataSource?.agree_to_rules == 1 ? "Bersedia" : "Tidak Bersedia"},
              ]},
              {
                title: 'C. Data Tambahan', data : [
                  { e: 'Catatan Pewawancara', value: dataSource?.interviewer_notes == null ? "Tidak Ada Catatan" : dataSource?.interviewer_notes},
                  { e: 'Tanggal wawancara', value: new Date(dataSource?.interview_date).toLocaleDateString('id-ID') },
                  { e: 'Pewawancara Siswa', value: dataSource?.interviewer_name },
                ]
              }
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

export default HasilSiswa;
