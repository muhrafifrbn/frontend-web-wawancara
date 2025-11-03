import React from 'react';
import letris from '../images/logo.png';
import banten from '../images/banten.png';
import { FaAngleLeft } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const HasilForm = ({ title, judul, data1, children, errorMsg, successMsg, onSubmit, childName }) => {
    const navigate = useNavigate(); // Inisialisasi navigate

    // Fungsi untuk mengunduh PDF
    const downloadPDF = () => {
        const capture = document.getElementById('topdf');
        html2canvas(capture, { scale: 1 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 0.5); 
        const doc = new jsPDF('p', 'mm', 'a4');

        const imgWidth = doc.internal.pageSize.getWidth();
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        doc.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        const fileName = `Rekap SMK Letris Indonesia 2-${childName}.pdf`;
        doc.save(fileName);
    });
    };

    // Fungsi yang dipanggil saat tombol "Next" diklik
    const handleNext = async (e) => {
        e.preventDefault();
        if (onSubmit) {
            await onSubmit(); // Jalankan fungsi submit dari parent component
        }
        downloadPDF(); // Unduh PDF setelah submit selesai
    };

    return (
        <div className='pt-2'>
            <div id='topdf' className='max-w-5xl px-6 mx-auto text-gray-800 pb-14 '>
                <div className="w-full bg-re py-5 border-gray-900 border-b-[2px] headers">
                    <div className='flex justify-between w-full font-semibold text-gray-800 '>
                        <div className='lg:size-[150px] md:size-[130px] sm:size-[110px]  size-[70px]'>
                            <img src={letris} alt="" className='w-full' />
                        </div>
                        <div className='mt-0 text-center sm:mt-0'>
                            <h1 className='lg:text-[35px] md:text-[30px] sm:text-[23px] text-[14px]  font-semibold'>SEKOLAH MENENGAH KEJURUAN</h1>
                            <h2 className='text-[17px] mt-2 sm:mt-0 lg:text-[40px] md:text-[34px] sm:text-[27px] relative bottom-2 font-semibold'>SMK LETRIS INDONESIA 2</h2>
                            <div className='relative flex items-center justify-center gap-3 font-bold sm:text-sm text-[9px] md:text-lg sm:bottom-2 bottom-1'>
                                <p>NPSN : 69894185</p>
                                <p>NSS : 402286303080</p>
                            </div>
                            <p className='font-bold sm:text-sm text-[10px] md:text-md '>( AKREDITAS "A" )</p>
                        </div>
                        <div className='lg:size-[150px] md:size-[130px] sm:size-[110px] size-[70px]'>
                            <img src={banten} alt="" className='w-full' />
                        </div>
                    </div>
                    <div className='w-full text-[11px] mt-3 font-medium text-center text-gray-700  text-jus sm:text-lg'>
                        <p>Kompetisi Keahlian : Otomatis dan Tata Kelola Perkantoran , Akuntasi dam Keuangan Lembaga , Perbankan Syariah ,</p>
                        <p> Bisnis Daring dan Pemasaran, Teknik Komputer jaringan, Multimedia, Rekayasa Perangkat Lunak,</p>
                        <p>Jl.Raya Siliwangi No. 55 Pondok Benda - Pamulang Telp. 021-29446273 Kota Tangerang Selatan Provinsi Banten</p>
                        <a className='text-blue-500 underline'>www.smkletris2pamulang.sch.id</a>
                    </div>
                </div>

                <div className="w-full pt-8 border-b-[2px] pb-8 border-gray-900 Content1">
                    <h1 className='font-semibold text-center underline md:text-2xl'>{title} </h1>
                    <div className='w-full mt-9'>
                        <h1 className='font-semibold underline md:text-2xl'>DATA {judul}</h1>
                        <ul className='mt-2 space-y-1 font-semibold ' >
                            {data1.map((e, i) => (
                                <li key={i} className='flex items-center text-sm sm:text-lg'>
                                    <p className='sm:w-[280px] w-[200px] '>{e.title}</p>
                                    <div className='flex items-center sm:w-[180px] md:w-[500px] w-[250px]'>
                                        <p className=''>: <span className='ps-1' >{e.value}</span></p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                
                {children}

            </div>
            <div className='max-w-5xl px-4 mx-auto border-t-2 border-gray-600 pb-7 mt-9'>
                <div className='flex justify-end w-full gap-2 mt-8'>
                    {/* Tombol Previous yang menggunakan navigate untuk kembali satu langkah */}
                    <button 
                        onClick={() => navigate(-1)} 
                        className="px-5 py-2 text-sm font-semibold text-center bg-white border-2 rounded-md text-maroon border-maroon active:scale-95 focus:outline-none "
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext} // Panggil handleNext saat tombol "Next" diklik
                        type="submit"
                        className="px-5 py-2 text-sm font-semibold text-center text-white rounded-md bg-maroon hover:bg-red-900 active:scale-95 focus:outline-none "
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HasilForm;
