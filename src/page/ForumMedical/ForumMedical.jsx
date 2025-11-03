/* eslint-disable no-unused-vars */
import React, {useState,useEffect} from 'react';
import Forum from '../../template/Forum';
import { Link, useNavigate } from 'react-router-dom';
import { useFormContext } from '../../Context/FormContext';

const ForumMedical = () => {
    const navigate = useNavigate();
const {state,updateFormData} = useFormContext();
const [dataForm, setdataForm] = useState(state.formMedic || {
    student_name: '',
    participant_card_number: '',
    place_of_birth: '',
    date_of_birth: '',
    gender: '',
    address: '',
    medical_notes: '',
    allergies: '',
    medical_conditions: '',
    weight:'',
    height:'',
    blood_type: '',
    parent_knowledge_smoking_history: '',
    parent_knowledge_tattoo_piercing: '',
    interview_date: '',
    interviewer_name: '',
    interviewer_notes: '',
});


    const handleChange = (e) => {
        const { name, value } = e.target;
        setdataForm({
            ...dataForm,
            [name]: value,
        });
        console.log(dataForm)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateFormData('formMedic', dataForm); 
        navigate('/hasilMedical'); 
    };

    useEffect(() => {
        if (state.formMedic) {
            setdataForm(state.formMedic);
        }
    }, [state.formMedic]);
    

  return (
    <Forum title={'From Data Medical Check Up'}>
            <div className='max-w-5xl px-4 mx-auto mt-5'>
                <div className='w-full pb-4 mt-16 border-b-2'>
                    <h1 className='mt-1 text-xl font-semibold text-gray-600'>Data Identitas Calon Peserta Didik</h1>
                </div>
                <div className='mt-5'>

                    <form className='w-full text-gray-600 mt-7 ' onSubmit={handleSubmit}>
                    <div className="mb-4">
                            <label
                                htmlFor="student_name"
                                className="block mb-2 font-medium text-md e"
                            >
                                Nama Calon Peserta Didik
                            </label>
                            <input
                                type="text"
                                id="student_name"
                                name='student_name'
                                value={dataForm.student_name}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Nama Calon Peserta Didik"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="participant_card_number"
                                className="block mb-2 font-medium text-md e"
                            >
                                Nomor Kartu Peserta
                            </label>
                            <input
                                type="number"
                                id="participant_card_number"
                                name='participant_card_number'
                                value={dataForm.participant_card_number}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Nomor Kartu Peserta Calon Peserta Didik"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="place_of_birth"
                                className="block mb-2 font-medium text-md e"
                            >
                                Tempat Lahir Calon Peserta Didik
                            </label>
                            <input
                                type="text"
                                id="place_of_birth"
                                name='place_of_birth'
                                value={dataForm.place_of_birth}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Tempat Lahir Calon Peserta Didik"
                                required
                            />
                        </div>
                        <div className="mb-4">
                                <label
                                    htmlFor="date_of_birth"
                                    className="block mb-2 font-medium text-md e"
                                >
                                    Tanggal Lahir Calon Peserta Didik
                                </label>
                                <input
                                    type="date"
                                    id="date_of_birth"
                                    name="date_of_birth"
                                    value={dataForm.date_of_birth}
                                    onChange={handleChange}
                                    className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                    placeholder="Masukan Tanggal "
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
                                    value={dataForm.gender}
                                    onChange={handleChange}
                                    className={`select-option border border-gray-300 h-12 ${dataForm.gender ? 'text-black' : 'text-gray-400'} text-sm rounded-lg focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
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
                                <label
                                    htmlFor="address"
                                    className="block mb-2 font-medium text-md e"
                                >
                                    Alamat Calon Peserta Didik
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={dataForm.address}
                                    onChange={handleChange}
                                    className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                    placeholder="Masukan Alamat Tempat Tinggal Calon Peserta Didik"
                                    required
                                />
                            </div>
                            <div className='w-full pb-4 mt-16 border-b-2'>
                                <h1 className='mt-1 text-xl font-semibold text-gray-600'>Data Observasi Kesehatan Calon Peserta Didik</h1>
                            </div>
                        <div className="mb-4">
                            <label
                                htmlFor="height"
                                className="block mb-2 font-medium text-md e"
                            >
                                Tinggi Badan
                            </label>
                            <input
                                type="number"
                                id="height"
                                name="height"
                                value={dataForm.height}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Tinggi Badan Dalam CM (contoh : 170)"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="height"
                                className="block mb-2 font-medium text-md e"
                            >
                                Berat Badan
                            </label>
                            <input
                                type="number"
                                id="weight"
                                name="weight"
                                value={dataForm.weight}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Masukan Berat Badan Dalam KG (contoh : 70)"
                                required
                            />
                        </div>
                        <div className="mb-4">
                                <label htmlFor="blood_type" className="block mb-2 font-medium text-md">
                                    Golong Darah
                                </label>
                                <select
                                    id="blood_type"
                                    name="blood_type"
                                    value={dataForm.blood_type}
                                    onChange={handleChange}
                                    className={`select-option border border-gray-300 h-12 ${dataForm.blood_type ? 'text-black' : 'text-gray-400'} text-sm rounded-lg focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                                    aria-label="Pilih Golongan Darah Calon Peserta Didik"
                                    defaultValue=""
                                    required
                                >
                                    <option value="" disabled className="text-gray-600">
                                        Pilih Golongan Darah Calon Peserta Didik
                                    </option>
                                    <option value="A+" className="text-black">
                                        A+
                                    </option>
                                    <option value="A-" className="text-black">
                                        A-
                                    </option>
                                    <option value="B+" className="text-black">
                                        B+
                                    </option>
                                    <option value="B-" className="text-black">
                                        B-
                                    </option>
                                    <option value="AB+" className="text-black">
                                        AB+
                                    </option>
                                    <option value="AB-" className="text-black">
                                        AB-
                                    </option>
                                    <option value="O" className="text-black">
                                        O+
                                    </option>
                                    <option value="O-" className="text-black">
                                        O-
                                    </option>
                                </select>
                            </div>
                        <div className="mb-4">
                            <label
                                htmlFor="medical_conditions"
                                className="block mb-2 font-medium text-md e"
                            >
                                Riwayat Penyakit
                            </label>
                            <input
                                type="text"
                                id="medical_conditions"
                                name="medical_conditions"
                                value={dataForm.medical_conditions}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder='Masukan "Tidak Ada" Jika Tidak Mempunyai Riwayat Penyakit'
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="allergies"
                                className="block mb-2 font-medium text-md e"
                            >
                               Riwayat Alergi
                            </label>
                            <input
                                type="text"
                                id="allergies"
                                name="allergies"
                                value={dataForm.allergies}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder='Masukan "Tidak Ada" Jika Tidak Mempunyai Riwayat Alergi'
                                required
                            />
                        </div>
                        <div className='flex justify-between w-full gap-3 mb-4'>
                            <div className="w-[49%]">
                            <label
                                htmlFor="parent_knowledge_smoking_history"
                                className="block mb-2 font-medium text-md e"
                            >
                                Riwayat Merokok
                            </label>
                                <select
                                    id="parent_knowledge_smoking_history"
                                    name="parent_knowledge_smoking_history"
                                    value={dataForm.parent_knowledge_smoking_history}
                                    onChange={handleChange}
                                    className={`select-option border border-gray-300 h-12 ${dataForm.parent_knowledge_smoking_history ? 'text-black' : 'text-gray-400'} text-sm rounded-lg focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                                    aria-label=''
                                    defaultValue=""
                                    required
                                    >
                                    <option value="" disabled className="text-gray-600">
                                        Pilih Jawaban
                                    </option>
                                    <option value="1" className="text-black">
                                        Pernah
                                    </option>
                                    <option value="0" className="text-black">
                                        Tidak Pernah
                                    </option>
                                </select>
                            </div>
                            <div className="w-[49%]">
                            <label
                                htmlFor="parent_knowledge_tattoo_piercing"
                                className="block mb-2 font-medium text-md e"
                            >
                                Tindik / Tato
                            </label>
                                <select
                                    id="parent_knowledge_tattoo_piercing"
                                    name="parent_knowledge_tattoo_piercing"
                                    value={dataForm.parent_knowledge_tattoo_piercing}
                                    onChange={handleChange}
                                    className={`select-option border border-gray-300 h-12 ${dataForm.parent_knowledge_tattoo_piercing ? 'text-black' : 'text-gray-400'} text-sm rounded-lg focus:ring-maroon outline-none focus:border-maroon block w-full p-2.5`}
                                    aria-label=''
                                    defaultValue=""
                                    required
                                >   
                                    <option value="" disabled className="text-gray-600">
                                        Pilih Jawaban
                                    </option>
                                    <option value="1" className="text-black">
                                        Ada
                                    </option>
                                    <option value="0" className="text-black">
                                        Tidak Ada
                                    </option>
                                </select>
                            </div>
                         

                        </div>
                        
                        <div className="mb-4">
                            <label
                                htmlFor="medical_notes"
                                className="block mb-2 font-medium text-md e"
                            >
                               Setelah Melakukan Pemeriksaan Maka Kami Menyatakan
                            </label>
                            <input
                                type="text"
                                id="medical_notes"
                                name="medical_notes"
                                value={dataForm.medical_notes}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Setelah Melakukan Pemeriksaan Maka Kami Menyatakan"
                                required
                            />
                        </div>


                      
                        <div className='w-full pb-4 mt-8 mb-4 border-b-2'>
                            <h1 className='mt-1 text-xl font-semibold'>Tanggal Pewawancara</h1>
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
                                name="interview_date"
                                value={dataForm.interview_date}
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
                                value={dataForm.interviewer_name}
                                onChange={handleChange}
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Nama Pewawancara"
                                required
                            />
                        </div>

                        <div className="mb-4">
                        <label htmlFor="interviewer_notes" className="block mb-2 font-medium text-md">
                            Catatan Khusus Pewawancara
                        </label>
                        <textarea
                            id="interviewer_notes"
                            name="interviewer_notes"
                            value={dataForm.interviewer_notes}
                            onChange={handleChange}
                            className="shadow-sm bg-white border-[2px] border-gray-300 outline-none text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 min-h-[100px]"
                            placeholder="Masukan Catatan Apabila Ada"
              />
            </div>


                        <div className='flex justify-end w-full gap-3 mt-8'>

                            <Link to={'/medical'}
                                type="submit"
                                className="px-5 py-2 text-sm font-semibold text-center bg-white border-2 rounded-md text-maroon border-maroon active:scale-95 focus:outline-none "
                            >
                                Previous
                            </Link>
                            <button
                                to={'/hasilMedical'}
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

export default ForumMedical
