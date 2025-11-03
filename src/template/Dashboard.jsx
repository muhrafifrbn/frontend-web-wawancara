import React, { useState, useContext } from 'react';
import { FaHouse, FaGraduationCap, FaBars, FaUser, FaFileMedical, FaDatabase, FaArrowRightFromBracket, FaClockRotateLeft, FaUserGear } from 'react-icons/fa6';
import img from '../images/logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { post } from '../utils/api';
import { AuthContext } from '../Context/AuthContext';

const ModalProfil = ({ modal }) => {
    return (
        <div>
            {/* Modal profil content */}
        </div>
    );
};

const Dashboard = ({ title, children }) => {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(AuthContext);
    
    // Akses data dari state context dengan benar
    const userName = state?.user || "User"; // Langsung mengakses user dari state
    const userRole = state?.role; // Langsung mengakses role dari state
    
    const Logout = async () => {
        try {
            const response = await post("/auth/logout");
            // Dispatch logout untuk mengosongkan state
            dispatch({ type: "LOGOUT" });
            // Jika masih perlu, hapus dari localStorage juga
            localStorage.removeItem("token");
            localStorage.removeItem("userName");
            navigate("/");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const menuPanitia = [
        { name: 'Home', ic: <FaHouse />, to: '/home' },
        { name: 'Orang Tua', ic: <FaUser />, to: '/ortu' },
        { name: 'Siswa', ic: <FaGraduationCap />, to: '/siswa' },
        { name: 'Medical', ic: <FaFileMedical />, to: '/medical' }
    ];

    const menuRegistrator = [
        { name: 'Dashboard', ic: <FaHouse />, to: '/registrator' },
        { name: 'Data Landing Page', ic: <FaDatabase/>, to: '/daftar-ulang' },
    ];

    const menuAdmin = [
        { name: 'Dashboard', ic: <FaHouse />, to: '/dashboard' },
        { name: 'Orang Tua', ic: <FaUser />, to: '/ortu' },
        { name: 'Siswa', ic: <FaGraduationCap  />, to: '/siswa' },
        { name: 'Medical', ic: <FaFileMedical />, to: '/medical' },
        { name: 'User', ic: <FaUserGear  />, to: '/user' },
        { name: 'Logging', ic: <FaClockRotateLeft />, to: '/logging' },
        { name: 'Landing Page', ic: <FaHouse />, to: '/landing-page' },
        { name: 'Data Landing Page', ic: <FaDatabase/>, to: '/daftar-ulang' },
    ];

    // Menentukan menu yang akan ditampilkan berdasarkan peran
    let data = [];
    
    if (userRole === "admin") {
        data = menuAdmin;
    } else if (userRole === "registrator") {
        data = menuRegistrator;
    } else {
        data = menuPanitia;
    }

    function tanggal() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const [showProfile, setShowProfile] = useState(false);
    const [showYourProfile, setShowYourProfile] = useState(false);
    // Inisialisasi sidebar terbuka atau tertutup sesuai kebutuhan (true = terbuka)
    const [showSide, setShowSide] = useState(true);

    function handleSide() {
        setShowSide(!showSide);
    }

    return (
        <>
            <ModalProfil modal={{ showYourProfile, setShowYourProfile }} />
            <div>
                <nav className="fixed top-0 z-50 w-full h-[69px] bg-white/[99] border-b border-maroon">
                    <div className="h-full px-3 py-4 lg:px-5 lg:pl-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-start lg:ps-1 rtl:justify-end">
                                <button
                                    className="inline-flex items-center p-2 text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                    onClick={handleSide}
                                >
                                    <FaBars />
                                </button>
                                <div className="ml-2 items-center hidden lg:flex">
                                    <img
                                        src={img}
                                        className="w-[32px] bg-white me-3"
                                        alt="Logo"
                                    />
                                    <span className="self-center text-xl font-bold text-gray-800 sm:text-2xl whitespace-nowrap">
                                        SMK LETRIS INDONESIA 2
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center ms-3">
                                    <div>
                                        <button
                                            onClick={() => setShowProfile(!showProfile)}
                                            type="button"
                                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                                        >
                                            <FaUser className="pt-2 w-8 h-8 rounded-full bg-white text-gray-400" />
                                        </button>
                                    </div>
                                    <div className={`${showProfile ? 'absolute block' : 'hidden'} w-[240px] z-50 my-4 text-base list-none bg-white divide-y divide-gray-800 rounded shadow right-4 top-12 border-[0.6px] border-gray-900`}>
                                        <div className="px-4 py-3">
                                            <p className="text-sm text-gray-900">{userName}</p>
                                            <p className="text-sm text-gray-600">{userRole || 'User'}</p>
                                        </div>
                                        <ul>
                                            <li
                                                className="flex items-center justify-between px-4 py-2 text-gray-700 cursor-pointer hover:text-white hover:bg-maroon"
                                                onClick={Logout}
                                            >
                                                <span className="block text-sm">Log out</span>
                                                <FaArrowRightFromBracket />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                <aside className={`${showSide ? 'w-64' : 'w-0'} fixed top-0 left-0 z-40 h-screen transition-all duration-300 bg-gray-800 overflow-hidden border-r border-maroon`}>
                    <div className="h-full mt-1 px-4 pt-20 flex flex-col justify-between pb-4 overflow-y-auto bg-white/[99]">
                        <ul className="pb-4 space-y-2 font-medium ">
                            {data.map((e, i) => (
                                <li key={i} className='cursor-pointer'>
                                    <Link to={e.to}>
                                        <div className={`flex hover:shadow-lg hover:bg-white items-center gap-2 p-2 text-white rounded-lg group ${e.name === title ? 'shadow-lg py-2.5' : ''}`}>
                                            <span className={`${e.name === title ? 'bg-maroon text-white' : 'bg-white text-gray-900'} flex items-center shadow-md justify-center p-3 transition group-hover:bg-maroon group-hover:text-white duration-75 rounded-lg`}>
                                                {e.ic}
                                            </span>
                                            <span className={`${e.name === title ? 'text-black' : 'text-gray-600 group-hover:text-black'} font-medium m7-3`}>{e.name}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="px-4 py-4 text-white bg-white rounded-lg">
                            <p className="font-bold text-center text-maroon">{tanggal()}</p>
                        </div>
                    </div>
                </aside>
                <div className={`p-4 mt-[69px] bg-neutral-100/20 transition-all duration-300 ${showSide ? 'lg:ml-64' : 'ml-0'}`}>
                    <div className="border-gray-200 min-h-[620px]">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
