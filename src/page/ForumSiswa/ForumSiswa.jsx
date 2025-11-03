/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Forum from '../../template/Forum';
import { Link, useNavigate } from 'react-router-dom';
import { useFormContext } from '../../Context/FormContext';

const ForumSiswa = () => {

    const navigate = useNavigate();
    const {state, updateFormData} = useFormContext();
    const [dataForm1Siswa, setDataForm1Siswa] = useState(state.form1Siswa || {
        student_name : '',
        student_email: '',
        student_phone_number:'',
        place_of_birth: '',
        date_of_birth: '',
        gender: '',
        religion: '',
        nationality: '',
        previous_school: '',
        student_vision: '',
        student_mission: ''
    });

    console.log(dataForm1Siswa);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm1Siswa({
            ...dataForm1Siswa,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateFormData('form1Siswa', dataForm1Siswa);
        //console.log(`Data Form 1 Siswa : ${dataForm1Siswa}`);
        navigate('/form-siswa-2');
    };

    useEffect(() => {
        if (state.form1Siswa) {
            setDataForm1Siswa(state.form1Siswa);
        }
    }, [state.form1Siswa]);
    //    useEffect(() => {
    //         setDataForm1Siswa(state.from1Siswa); 
    //     }, [state.from1Siswa]);
    
    
    return (
        <div>
            <Forum title={'From Data Peserta Didik'}>
                <div className='max-w-5xl px-4 mx-auto mt-5'>

                    <div className='flex items-center text-[12px] justify-center w-full font-medium sm:text-sm '>
                        <div className='flex items-center justify-center gap-2 px-4 py-2 border-2 rounded-full sm:py-2 border-maroon'> <span className='size-[18px] sm:size-[20px] flex items-center justify-center border-2 rounded-full border-maroon'>1</span> <span>Data Siswa</span></div>
                        <div className='border-2'></div>

                        <div className="flex w-[10px] sm:w-[40px] bg-gray-300 h-0.5" />

                        <div className='flex items-center justify-center gap-2 px-4 py-2 text-gray-600 border-2 border-gray-300 rounded-full'> <span className='size-[18px] sm:size-[20px] flex items-center justify-center border-2 rounded-full border-gray-300'>2</span> <span>Tentang Sekolah & Prestasi Siswa</span></div>
                    </div>
                    <div className='w-full pb-4 mt-12 border-b-2'>
                        <p className='text-lg font-medium text-gray-600'> Bagian 1</p>
                        <h1 className='mt-1 text-xl font-semibold'>Data Siswa</h1>
                    </div>


                    <div className='mt-5'>

                        <form className='w-full text-gray-600 mt-7' onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="student_name"
                                    className="block mb-2 font-medium text-md e"
                                >
                                    Nama Siswa
                                </label>
                                <input
                                    type="text"
                                    id="student_name"
                                    name="student_name"
                                    value={dataForm1Siswa.student_name}
                                    onChange={handleChange}
                                    className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                    placeholder="Masukan Nama Siswa"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                            <label
                                htmlFor="student_vision"
                                className="block mb-2 font-medium text-md e"
                            >
                                Visi Siswa
                            </label>
                            <textarea
                                type="text"
                                id="student_vision"
                                name="student_vision"
                                value={dataForm1Siswa.student_vision}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Visi Siswa"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="student_mission"
                                className="block mb-2 font-medium text-md e"
                            >
                                Misi
                            </label>
                            <textarea
                                type="text"
                                id="student_mission"
                                name="student_mission"
                                value={dataForm1Siswa.student_mission}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Misi Siswa"
                                required
                            />
                        </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="previous_school"
                                    className="block mb-2 font-medium text-md e"
                                >
                                    Asal Sekolah Siswa Sebelumnya
                                </label>
                                <input
                                    type="text"
                                    id="previous_school"
                                    name="previous_school"
                                    value={dataForm1Siswa.previous_school}
                                    onChange={handleChange}
                                    className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                    placeholder="Masukan Sekolah Siswa Sebelumnya"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="student_email"
                                    className="block mb-2 font-medium text-md e"
                                >
                                    Email Siswa
                                </label>
                                <input
                                    type="email"
                                    id="student_email"
                                    name="student_email"
                                    value={dataForm1Siswa.student_email}
                                    onChange={handleChange}
                                    className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                    placeholder="Masukan Email Siswa"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="student_phone_number"
                                    className="block mb-2 font-medium text-md e"
                                >
                                    Nomor Telpon Siswa
                                </label>
                                <input
                                    type="text"
                                    id="student_phone_number"
                                    name="student_phone_number"
                                    value={dataForm1Siswa.student_phone_number}
                                    onChange={handleChange}
                                    className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                    placeholder="Masukan Nomor Telpon Siswa"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="place_of_birth"
                                    className="block mb-2 font-medium text-md e"
                                >
                                    Tempat Lahir Siswa
                                </label>
                                <input
                                    type="text"
                                    id="place_of_birth"
                                    name="place_of_birth"
                                    value={dataForm1Siswa.place_of_birth}
                                    onChange={handleChange}
                                    className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                    placeholder="Masukan Tempat Lahir Siswa"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="date_of_birth"
                                    className="block mb-2 font-medium text-md e"
                                >
                                    Tanggal Lahir Siswa
                                </label>
                                <input
                                    type="date"
                                    id="date_of_birth"
                                    name="date_of_birth"
                                    value={dataForm1Siswa.date_of_birth}
                                    onChange={handleChange}
                                    className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                    placeholder=""
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="gender" className="block mb-2 font-medium text-md">
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={dataForm1Siswa.gender}
                                    onChange={handleChange}
                                    className="select-option border border-gray-300 h-12 text-gray-600 text-sm rounded-lg focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5"
                                    aria-label="Pilih Gender"
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled className="text-gray-600">
                                        Pilih Gender
                                    </option>
                                    <option value="Male" className="text-black">
                                        Laki-Laki
                                    </option>
                                    <option value="Female" className="text-black">
                                        Perempuan
                                    </option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="religion" className="block mb-2 font-medium text-md">
                                    Agama
                                </label>
                                <select
                                    id="religion"
                                    name="religion"
                                    value={dataForm1Siswa.religion}
                                    onChange={handleChange}
                                    className="select-option border border-gray-300 h-12 text-gray-600 text-sm rounded-lg focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5"
                                    aria-label="Pilih Agama"
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled className="text-gray-600">
                                        Pilih Agama Siswa
                                    </option>
                                    <option value="Islam" className="text-black">
                                        Islam
                                    </option>
                                    <option value="Katolik" className="text-black">
                                        Katolik
                                    </option>
                                    <option value="Protestan" className="text-black">
                                        Protestan
                                    </option>
                                    <option value="Buddha" className="text-black">
                                        Buddha
                                    </option>
                                    <option value="Hindu" className="text-black">
                                        Hindu
                                    </option>
                                    <option value="Kepercayaan Kepada Tuhan YME" className="text-black">
                                        Kepercayaan Kepada Tuhan YME
                                    </option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="nationality"
                                    className="block mb-2 font-medium text-md e"
                                >
                                    Kewarganegaraan
                                </label>
                                <input
                                    type="text"
                                    id="nationality"
                                    name="nationality"
                                    value={dataForm1Siswa.nationality}
                                    onChange={handleChange}
                                    className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                    placeholder="Masukan Kewarganegaraan Siswa"
                                    required
                                />
                            </div>
                            <div className='flex justify-end w-full gap-3 mt-8'>

                                <Link to={'/siswa'}
                                    className="px-5 py-2 text-sm font-semibold text-center bg-white border-2 rounded-md text-maroon border-maroon active:scale-95 focus:outline-none "
                                >
                                    Previous
                                </Link>
                                <button type="submit" className="px-5 py-2 text-sm font-semibold text-center text-white rounded-md bg-maroon hover:bg-red-900 active:scale-95 focus:outline-none ">
                                    Next
                                </button>
                            </div>


                        </form>
                    </div>
                </div>

            </Forum>
        </div>
    )
}

export default ForumSiswa
