/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Forum from '../../template/Forum';
import { Link, useNavigate } from 'react-router-dom';
import { useFormContext } from '../../Context/FormContext';


const ForumOrangTua2 = () => {
    const { state, updateFormData } = useFormContext(); 
    const [dataForm2, setDataForm2] = useState(state.form2 || { 
        reason_choosing_school: '',
        parent_view_on_school: '',
        know_about_school: '',
        response_to_program: '',
        willing_to_communicate: '1',
        willing_to_pay_fees: ' 1',
        accept_consequences: '1',
        interviewer_notes: '',
        interview_date: '',
        interviewer_name: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm2({
            ...dataForm2,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateFormData('form2', dataForm2); 
        navigate('/hasilOrtu'); 
    };

    return (
        <div>
            <Forum title={'From Data Orang Tua'}>
                <div className='max-w-5xl px-4 mx-auto mt-5'>
                    <div className='flex items-center text-[12px] justify-center w-full font-medium sm:text-sm '>
                        <div className='flex items-center justify-center gap-2 px-4 py-2 border-2 rounded-full sm:py-2 border-gray-300'>
                            <span className='size-[18px] sm:size-[20px] flex items-center justify-center border-2 rounded-full border-gray-300'>1</span>
                            <span>Data Orang Tua & Anak</span>
                        </div>
                        <div className='border-2'></div>
                        <div className="flex w-[10px] sm:w-[40px] bg-gray-300 h-0.5" />
                        <div className='flex items-center justify-center gap-2 px-4 py-2 text-gray-600 border-2 border-maroon rounded-full'>
                            <span className='size-[18px] sm:size-[20px] flex items-center justify-center border-2 rounded-full border-maroon'>2</span>
                            <span>Tentang Sekolah</span>
                        </div>
                    </div>
                    <div className='w-full pb-4 mt-12 border-b-2'>
                        <p className='text-lg font-medium text-gray-600'> Bagian 2</p>
                        <h1 className='mt-1 text-xl font-semibold'>Tentang Sekolah</h1>
                    </div>
                    <div className='mt-5'>
                        <form className='w-full text-gray-600 mt-7 ' onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="reason_choosing_school" className="block mb-2 font-medium text-md e">Alasan Memilih SMK Letris Indonesia 2</label>
                                <input
                                    type="text"
                                    id="reason_choosing_school"
                                    name="reason_choosing_school"
                                    value={dataForm2.reason_choosing_school}
                                    onChange={handleChange}
                                    className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                    placeholder="Masukan Alasan Orang Tua"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="parent_view_on_school" className="block mb-2 font-medium text-md e">Pandangan Orang Tua Terhadap SMK Letris Indonesia 2</label>
                                <input
                                    type="text"
                                    id="parent_view_on_school"
                                    name="parent_view_on_school"
                                    value={dataForm2.parent_view_on_school}
                                    onChange={handleChange}
                                    className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                    placeholder="Masukan Pandangan Orang Tua"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="know_about_school" className="block mb-2 font-medium text-md e">Tahu SMK Letris Indonesia 2 Dari Mana</label>
                                <input
                                    type="text"
                                    id="know_about_school"
                                    name='know_about_school'
                                    value={dataForm2.know_about_school}
                                    onChange={handleChange}
                                    className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                    placeholder="Tahu SMK Letris Indonesia 2 Dari Mana"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="response_to_program" className="block mb-2 font-medium text-md e">Bagaimana Tanggapan Bapak/Ibu Tentang Program Sekolah</label>
                                <input
                                    type="text"
                                    id="response_to_program"
                                    name='response_to_program'
                                    value={dataForm2.response_to_program}
                                    onChange={handleChange}
                                    className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                    placeholder="Bagaimana Tanggapan Bapak/Ibu tentang program sekolah"
                                    required
                                />
                            </div>
                            <div className="w-full pb-4 mt-8 mb-4 border-b-2">
                                <h1 className="mt-1 text-xl font-semibold">Komitmen Orang Tua Terhadap Program Sekolah</h1>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="willing_to_communicate" className="block mb-2 font-medium leading-7 text-justify leadi text-md">Apakah bapak ibu siap untuk berkomunikasi dengan wali kelas menghadiri rapat awal tahun mengambil raport hasil belajar siswa dan menghadiri panggilan sekolah dalam pendampingan belajar siswa selama siswa menjadi siswa SMK negeri Indonesia 2</label>
                                <select 
                                    id="willing_to_communicate" 
                                    className={`select-option border border-gray-300 h-12 ${dataForm2.willing_to_communicate ? 'text-black' : 'text-gray-400'} text-sm rounded-lg focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`} 
                                    name='willing_to_communicate' 
                                    value={dataForm2.willing_to_communicate} 
                                    onChange={handleChange}
                                    aria-label=''
                                    defaultValue=""
                                    required
                                >
                                    <option value="" className='text-gray-400' disabled>
                                        Pilih Jawaban
                                    </option>
                                    <option value="1">Siap</option>
                                    <option value="0">Tidak</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="willing_to_pay_fees" className="block mb-2 font-medium leading-7 text-justify leadi text-md">Apakah bapak dan ibu bisa berkomitmen dalam melakukan pembayaran sekolah, seperti Daftar ulang, SPP, dan kegiatan sekolah lainnya</label>
                                <select 
                                    id="willing_to_pay_fees" 
                                    className={`select-option border border-gray-300 h-12 ${dataForm2.willing_to_pay_fees ? 'text-black' : 'text-gray-400'} text-sm rounded-lg focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`} 
                                    name='willing_to_pay_fees' 
                                    value={dataForm2.willing_to_pay_fees} 
                                    onChange={handleChange}
                                    aria-label=''
                                    defaultValue=""
                                    required
                                >
                                    <option value="" className='text-gray-400' disabled>
                                        Pilih Jawaban
                                    </option>
                                    <option value="1">Bersedia</option>
                                    <option value="0">Tidak</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="accept_consequences" className="block mb-2 font-medium text-justify text-md e">Jika Ananda selama bersekolah melanggar peraturan sekolah tidak mau belajar atau pun mengerjakan tugas sekolah lalu dilakukan pendampingan oleh sekolah namun masih tidak berubah menjadi lebih baik apakah menerima jika nantinya jika rapat pleno kenaikan kelas dinyatakan tinggal kelas atau dikembalikan ke orang tua</label>
                                <select 
                                    id="accept_consequences" 
                                    name='accept_consequences' 
                                    value={dataForm2.accept_consequences} 
                                    onChange={handleChange} 
                                    className={`select-option border border-gray-300 h-12 ${dataForm2.accept_consequences ? 'text-black' : 'text-gray-400'} text-sm rounded-lg focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                                    aria-label=''
                                    defaultValue=""
                                    required
                                >
                                    <option value="" className='text-gray-400' disabled>
                                        Pilih Jawaban
                                    </option>
                                    <option value="1">Bersedia</option>
                                    <option value="0">Tidak</option>
                                </select>
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
                                value={dataForm2.interview_date} 
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
                                    value={dataForm2.interviewer_name} 
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
                                value={dataForm2.interviewer_notes} 
                                onChange={handleChange}
                                ></textarea>
                            
                            </div>

                            <div className="flex justify-end w-full gap-3 mt-8">
                                <Link to={"/form-orang-tua-1"} className="px-5 py-2 text-sm font-semibold text-center bg-white border-2 rounded-md text-maroon border-maroon active:scale-95 focus:outline-none ">Previous</Link>
                                <button type="submit" className="px-5 py-2 text-sm font-semibold text-center text-white rounded-md bg-maroon hover:bg-red-900 active:scale-95 focus:outline-none ">Submit</button>
                            
                            </div>
                        </form>
                    </div>
                </div>
            </Forum>
        </div>
    );
}

export default ForumOrangTua2;
