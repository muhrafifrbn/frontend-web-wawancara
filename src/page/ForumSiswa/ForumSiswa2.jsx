/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import Forum from '../../template/Forum';
import { Link, useNavigate } from 'react-router-dom';
import { useFormContext } from '../../Context/FormContext';

const ForumSiswa2 = () => {
      const navigate = useNavigate();
        const {state, updateFormData} = useFormContext();
        const [dataForm2Siswa, setdataForm2Siswa] = useState(state.form2Siswa || {
            skill_competence: '',
            reason_choosing_competence: '',
            knowledge_about_competence: '',
            has_competence_work: '',
            motivation_for_competence: '',
            expectations_for_competence: '',
            reason_choosing_school: '',
            active_in_extracurricular: '',
            achievements: '',
            agree_to_rules: '',
            ever_broken_rules: '',
            interviewer_notes: '',
            interviewer_name: '',
            interview_date: '',
        });

        const handleChange = (e) => {
            const {name,value} = e.target;
            setdataForm2Siswa({
                ...dataForm2Siswa,
                [name]: value,       
            });
            //console.log(dataForm2Siswa);
        };

        
        const handleSubmit = (e) => {
            e.preventDefault();
            updateFormData('form2Siswa', dataForm2Siswa);
            navigate('/hasilSiswa');
        };
        
        useEffect(() => {
            if (state.form2Siswa) {
                setdataForm2Siswa(state.form2Siswa);
            }
        }, [state.form2Siswa]);


    return (
        <Forum title={'From Data Peserta Didik'}>
            <div className='max-w-5xl px-4 mx-auto mt-5'>

                <div className='flex items-center justify-center text-[12px] w-full font-medium sm:text-sm '>
                    <div className='flex items-center justify-center gap-2 px-4 py-2 text-gray-600 border-2 border-gray-300 rounded-full'> <span className='size-[18px] sm:size-[20px] flex items-center justify-center border-2 rounded-full border-gray-300'>1</span> <span>Data Siswa</span></div>
                    <div className="flex w-[10px] sm:w-[40px] bg-gray-300 h-0.5 " />
                    <div className='flex items-center justify-center gap-2 px-4 py-2 border-2 rounded-full border-maroon'> <span className='size-[18px] sm:size-[20px] flex items-center justify-center border-2 rounded-full border-maroon'>2</span> <span>Tentang Sekolah & Prestasi Siswa</span></div>
                    <div className='border-2'></div>

                </div>
                <div className='w-full pb-4 mt-12 border-b-2'>
                    <p className='text-lg font-medium text-gray-600'>Bagian A</p>
                    <h1 className='mt-1 text-xl font-semibold'>Tentang Kompetensi Keahlian dan Prestasi</h1>
                </div>


                <div className='mt-5'>

                    <form className='w-full text-gray-600 mt-7' onSubmit={handleSubmit}>

                    <div className="mb-4">
                                <label htmlFor="skill_competence" className="block mb-2 font-medium leading-7 text-justify leadi text-md">Kompetensi Keahlian</label>
                                <select 
                                    id="skill_competence" 
                                    className={`select-option border border-gray-300 h-12 ${dataForm2Siswa.skill_competence? 'text-black' : 'text-gray-400'} text-sm rounded-lg focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`} 
                                    name='skill_competence' 
                                    value={dataForm2Siswa.skill_competence} 
                                    onChange={handleChange}
                                    aria-label=''
                                    defaultValue=""
                                    required
                                >
                                    <option value="" className='text-gray-400' disabled>
                                        Pilih Jawaban
                                    </option>
                                    <option value="Rekayasa Perangkat Lunak dan Gim"  className='text-gray-500'>Rekayasa Perangkat Lunak dan Gim</option>
                                    <option value="Desain Komunikasi Visual Reguler" className='text-gray-500'>Desain Komunikasi Visual Reguler</option>
                                    <option value="Desain Komunikasi Visual Bilingual"  className='text-gray-500'>Desain Komunikasi Visual Bilingual</option>
                                    <option value="Manajemen Pekantoran dan Layanan Bisnis Reguer"  className='text-gray-500'>Manajemen Pekantoran dan Layanan Bisnis Reguler</option>
                                    <option value="Manajemen Pekantoran dan Layanan Bisnis Bilingual" className='text-gray-500'>Manajemen Pekantoran dan Layanan Bisnis Bilingual</option>
                                    <option value="Pemasaran dan Bisnis Retail" className='text-gray-500'>Pemasaran dan Bisnis Retail</option>
                                    <option value="Akutansi dan Keuangan" className='text-gray-500'>Akutansi dan Keuangan</option>
                                </select>
                            </div>

                        <div className="mb-4">
                            <label
                                htmlFor="reason_choosing_competence"
                                className="block mb-2 font-medium text-md e"
                            >
                                Alasan Memilih Kompetensi Keahlian
                            </label>
                            <textarea
                                type="text"
                                id="reason_choosing_competence"
                                name="reason_choosing_competence"
                                value={dataForm2Siswa.reason_choosing_competence}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Alasan Memilih Bersekolah di SMK Letris Indonesia 2"
                                required
                            />
                        </div>

                        {/* //?option */}

                        <div className=''>
                            <div className="w-full">
                                <label
                                    htmlFor="knowledge_about_competence"
                                    className="block mb-2 font-medium text-md e"
                                >
                                    Apakah Siswa Sudah Tahu Tentang Kompetensi Keahlian yang Dipilihnya
                                </label>
                                    <select
                                        id="knowledge_about_competence"
                                        name="knowledge_about_competence"
                                        value={dataForm2Siswa.knowledge_about_competence}
                                        onChange={handleChange}
                                        aria-label=''
                                        defaultValue=""
                                        
                                        className={`select-option border border-gray-300 h-12 ${dataForm2Siswa.knowledge_about_competence? 'text-black' : 'text-gray-400'} text-sm rounded-lg focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                                    >
                                        <option value="" className='text-gray-400' disabled>
                                            Pilih Jawaban
                                        </option>
                                        <option value="Tahu" className='text-gray-500'>Tahu</option>
                                        <option value="Balum Tahu" className='text-gray-500'>Belum Tahu</option>
                                    
                                    </select>
                                </div>
                            <div className="w-full my-4">
                            <label
                                htmlFor="has_competence_work"
                                className="block mb-2 font-medium text-md e"
                            >
                                Apakah Siswa Pernah Memiliki Karya di Kompetensi yang Dipilihnya
                            </label>
                            <select 
                                    id="has_competence_work" 
                                    className={`select-option border border-gray-300 h-12 ${dataForm2Siswa.has_competence_work? 'text-black' : 'text-gray-400'} text-sm rounded-lg focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`} 
                                    name='has_competence_work' 
                                    value={dataForm2Siswa.has_competence_work} 
                                    onChange={handleChange}
                                    aria-label=''
                                    defaultValue=""
                                    required
                                >
                                    <option value="" className='text-gray-400' disabled>
                                        Pilih Jawaban
                                    </option>
                                    <option value="1"  className='text-gray-500'>Ada</option>
                                    <option value="0" className='text-gray-500'>Tidak Ada</option>
                                </select>
                            </div>

                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="motivation_for_competence"
                                className="block mb-2 font-medium text-md e"
                            >
                                Apa Motivasi Siswa Sehingga Memilih Kompetensi Tersebut
                            </label>
                            <input
                                type="text"
                                id="motivation_for_competence"
                                name='motivation_for_competence'
                                value={dataForm2Siswa.motivation_for_competence}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Motivasi Siswa Memilih Kompetensinya"
                                required
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label
                                htmlFor="expectations_for_competence"
                                className="block mb-2 font-medium text-md e"
                            >
                                Apa Harapan Siswa di Kompetensi yang Dipilihnya
                            </label>
                            <input
                                type="text"
                                id="expectations_for_competence"
                                name='expectations_for_competence'
                                value={dataForm2Siswa.expectations_for_competence}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Harapan Siswa Memilih Kompetensinya"
                                required
                            />
                        </div>

                        <div className='w-full pb-4 mt-12 border-b-2'>
                            <h1 className='mt-1 text-xl font-semibold'>Tentang Sekolah</h1>
                        </div>
                        <div className="my-4">
                            <label
                                htmlFor="reason_choosing_school"
                                className="block mb-2 font-medium text-md e"
                            >
                                Apa Alasan Siswa Memilih SMK Letris Indonesia 2
                            </label>
                            <input
                                type="text"
                                id="reason_choosing_school"
                                name='reason_choosing_school'
                                value={dataForm2Siswa.reason_choosing_school}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Alasan Siswa/i Memilih SMK Letris Indonesia 2"
                                required
                            />
                        </div>
                        <div className="flex flex-col justify-between w-full gap-3 mb-4 lg:flex-row">
                            <div className="w-full lg:w-[50%] my-4">
                                <label
                                    htmlFor="active_in_extracurricular"
                                    className="block mb-2 font-medium text-md e"
                                >
                                    Apa Pernah Aktif Dalam  OSIS Ataupun Ekskul Ketika di SMP/MTS
                                </label>
                                <select
                                        id="active_in_extracurricular"
                                        name='active_in_extracurricular'
                                        value={dataForm2Siswa.active_in_extracurricular}
                                        onChange={handleChange}
                                        aria-label=''
                                        defaultValue=""
                                        required
                                        className={`select-option border border-gray-300 h-12 ${dataForm2Siswa.active_in_extracurricular? 'text-black' : 'text-gray-400'} text-sm rounded-lg focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                                    >
                                        <option value="" className='text-gray-400' disabled>
                                            Pilih Jawaban
                                        </option>
                                        <option value="1" className='text-gray-500'>Pernah</option>
                                        <option value="0" className='text-gray-500'>Belum </option>
                                </select>
                            </div>
                            <div className="w-full lg:w-[50%] my-4">
                                <label
                                    htmlFor="achievements"
                                    className="block mb-2 font-medium text-md e"
                                >
                                    Apa Pernah Memiliki Prestasi Ketika di SMP/MTS
                                </label>
                                <select
                                        id="achievements"
                                        name='achievements'
                                        value={dataForm2Siswa.achievements}
                                        onChange={handleChange}
                                        aria-label=''
                                        defaultValue=""
                                        required
                                        className={`select-option border border-gray-300 h-12 ${dataForm2Siswa.achievements? 'text-black' : 'text-gray-400'} text-sm rounded-lg focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                                    >
                                        <option value="" className='text-gray-400' disabled>
                                            Pilih Jawaban
                                        </option>
                                        <option value="Ya" className='text-gray-500'>Ya</option>
                                        <option value="Tidak" className='text-gray-500'>Belum </option>
                                </select>
                            </div>
                        </div>

                        <div className="flex flex-col justify-between w-full gap-3 mb-4 lg:flex-row">
                            <div className="w-full lg:w-[50%] my-4">
                                <label
                                    htmlFor="ever_broken_rules"
                                    className="block mb-2 font-medium text-md e"
                                >
                                    Apakah Pernah Melanggar Tata Tertib Selama Bersekolah di SMP/MTS
                                </label>
                                <select
                                        id="ever_broken_rules"
                                        name='ever_broken_rules'
                                        value={dataForm2Siswa.ever_broken_rules}
                                        onChange={handleChange}
                                        aria-label=''
                                        defaultValue=""
                                        required
                                        className={`select-option border border-gray-300 h-12 ${dataForm2Siswa.ever_broken_rules? 'text-black' : 'text-gray-400'} text-sm rounded-lg focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                                    >
                                        <option value="" className='text-gray-400' disabled>
                                            Pilih Jawaban
                                        </option>
                                        <option value="1" className='text-gray-500'>Pernah</option>
                                        <option value="0" className='text-gray-500'>Tidak Pernah</option>
                                </select>
                            </div>
                            <div className="w-full lg:w-[50%] my-4">
                                <label
                                    htmlFor="agree_to_rules"
                                    className="block mb-2 font-medium text-md e"
                                >
                                    Apakah Siswa Siap dan bersedia mengikuti seluruh tata tertib di SMK Letris Indonesia 2
                                </label>
                                <select
                                        id="agree_to_rules"
                                        name='agree_to_rules'
                                        value={dataForm2Siswa.agree_to_rules}
                                        onChange={handleChange}
                                        aria-label=''
                                        defaultValue=""
                                        required
                                        className={`select-option border border-gray-300 h-12 ${dataForm2Siswa.agree_to_rules? 'text-black' : 'text-gray-400'} text-sm rounded-lg focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                                    >
                                        <option value="" className='text-gray-400' disabled>
                                            Pilih Jawaban
                                        </option>
                                        <option value="1" className='text-gray-500'>Bersedia</option>
                                        <option value="0" className='text-gray-500'>Tidak Bersedia</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full pb-4 mt-8 mb-4 border-b-2">
                                <h1 className="mt-1 text-xl font-semibold">Keterangan Pewawancara</h1>
                            </div>
                            <div className="mb-4">
                            <label
                                htmlFor="interview_date"
                                className="block mb-2 font-medium text-md e"
                            >
                               Tanggal Wawancara
                            </label>
                            <input
                                type="date"
                                id="interview_date"
                                name='interview_date' 
                                value={dataForm2Siswa.interview_date} 
                                onChange={handleChange} 
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Tanggal Wawancara"
                                required
                            />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="interviewer_name"
                                    className="block mb-2 font-medium text-md e"
                                >
                                Nama Pewawancara
                                </label>
                                <input
                                    type="text"
                                    id="interviewer_name"
                                    name="interviewer_name"
                                    className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                    placeholder="Nama Pewawancara"
                                    value={dataForm2Siswa.interviewer_name} 
                                    onChange={handleChange} 
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="interviewer_notes"
                                    className="block mb-2 font-medium text-md e"
                                >
                                    Catatan Khusus Pewawancara
                                </label>
                                <textarea 
                                id="interviewer_notes" 
                                name="interviewer_notes" 
                                placeholder='Kosongan Jika Tidak Ada Catatan'
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                value={dataForm2Siswa.interviewer_notes} 
                                onChange={handleChange}
                                ></textarea>
                            
                            </div>
                        
                        <div className='flex justify-end w-full gap-3 mt-8'>

                            <Link to={'/form-siswa-1'}
                                type="submit"
                                className="px-5 py-2 text-sm font-semibold text-center bg-white border-2 rounded-md text-maroon border-maroon active:scale-95 focus:outline-none "
                            >
                             Previous
                            </Link>
                            <button
                            to={'/hasilSiswa'}
                            type="submit"
                                className="px-5 py-2 text-sm font-semibold text-center text-white rounded-md bg-maroon hover:bg-red-900 active:scale-95 focus:outline-none "
                            >
                                Submit
                            </button>
                        </div>

                    </form>
                </div>
            </div>

        </Forum>
    )
}

export default ForumSiswa2
