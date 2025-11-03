import React from 'react'
import Forum from './Forum'

const FromSiswa2 = () => {
    return (
        <Forum title={'Forum Data Peserta Didik'}>
            <div className='max-w-5xl px-4 mx-auto mt-5'>

                <div className='flex items-center justify-center w-full -medium '>
                    <div className='flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-600 border-2 border-gray-300 rounded-full'> <span className='size-[20px] flex items-center justify-center border-2 rounded-full border-gray-300'>1</span> <span>  Kompetisi Keahlian </span></div>
                    <div className="hidden sm:flex w-[30px] bg-gray-200 h-0.5 dark:bg-gray-300" />
                    <div className='flex items-center justify-center gap-2 px-4 py-2 text-sm border-2 rounded-full border-maroon'> <span className='size-[20px] flex items-center justify-center border-2 rounded-full border-maroon'>2</span> <span>Tentang Sekolah </span></div>
                    <div className='border-2'></div>

                </div>
                <div className='w-full pb-4 mt-1 border-b-2'>
                    <p className='text-lg text-gray-600'> Step 2</p>
                    <h1 className='mt-1 text-xl font-semibold'>Tentang Sekolah</h1>
                </div>


                <div className='mt-5'>

                    <from className='w-full text-gray-600 mt-7 '>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block mb-2 font-medium text-md e"
                            >
                                Alasan Memilih Bersekolah di SMK Letris Indonesia 2
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Alasan Memilih Bersekolah di SMK Letris Indonesia 2"
                                required=""
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block mb-2 font-medium text-md e"
                            >
                                Pengetahuan Tentang Kompetisi
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="Pengetahuan Tentang Kompetisi"
                                required=""
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block mb-2 font-medium text-md e"
                            >
                                Apakah Pernah Memiliki Karya Kompetisi
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="  Apakah Pernah Memiliki Karya Kompetisi"
                                required=""
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block mb-2 font-medium text-md e"
                            >
                                Apakah Pernah Memiliki Karya Kompetisi
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow-sm bg-white border-[2px] border-gray-300 outline-none  text-sm rounded-md focus:ring-maroon focus:border-maroon block w-full p-2.5 h-12"
                                placeholder="  Apakah Pernah Memiliki Karya Kompetisi"
                                required=""
                            />
                        </div>

                        <div className='flex justify-end w-full mt-8'>

                            <button
                                type="submit"
                                className="px-5 py-2 text-sm font-semibold text-center text-white rounded-md bg-maroon hover:bg-red-900 active:scale-95 focus:outline-none "
                            >
                                Submit
                            </button>
                        </div>

                    </from>
                </div>
            </div>

        </Forum>
    )
}

export default FromSiswa2
