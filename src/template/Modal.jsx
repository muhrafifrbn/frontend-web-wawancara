import React, { useState } from 'react'
import { FaX } from "react-icons/fa6";

const Modal = ({ modal, title, children }) => {
    return (
        <div>
            <div
                id="authentication-modal"
                tabIndex={-1}
                aria-hidden="true"
                className={`${modal.showModal ? 'flex' : 'hidden'} bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[99] justify-center  items-center w-full md:inset-0 h-[calc(100%-1rem)] min-h-screen  `}
            >
                <div className="relative w-full max-w-[880px] max-h-full p-4">
                    {/* Modal content */}
                    <div className="relative p-4 px-4 mb-6 bg-white rounded shadow-lg md:p-8 md:py-7 ">
                        <div className='absolute text-gray-400 cursor-pointer hover:text-maroon top-3 right-3'
                        ><FaX
                                onClick={() => modal.setModal(false)}
                            /></div>
                        <div className="grid grid-cols-1 gap-4 text-sm gap-y-2 lg:grid-cols-3">
                            <div className="text-gray-600">
                                <p className="text-lg font-medium text-maroon">{title}</p>
                                <p>Please fill out all the fields.</p>
                            </div>
                            <div className="lg:col-span-2">
                                <form className="mx-w-full auto max ">
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input
                                            type="email"
                                            name="floating_email"
                                            id="floating_email"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-400 outline-none appearance-none  peer"
                                            placeholder=" "
                                            required=""
                                        />
                                        <label
                                            htmlFor="floating_email"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-maroon  peer-active:text-maroon   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Email address
                                        </label>
                                    </div>
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input
                                            type="password"
                                            name="floating_password"
                                            id="floating_password"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-400 outline-none appearance-none peer"
                                            placeholder=" "
                                            required=""
                                        />
                                        <label
                                            htmlFor="floating_password"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-maroon peer-active:text-maroon   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Password
                                        </label>
                                    </div>
                                    <div className="relative z-0 w-full mb-5 group">
                                        <input
                                            type="password"
                                            name="repeat_password"
                                            id="floating_repeat_password"
                                            className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-400 outline-none appearance-none peer"
                                            placeholder=" "
                                            required=""
                                        />
                                        <label
                                            htmlFor="floating_repeat_password"
                                            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-maroon peer-active:text-maroon   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                        >
                                            Confirm password
                                        </label>
                                    </div>
                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input
                                                type="text"
                                                name="floating_first_name"
                                                id="floating_first_name"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-400 outline-none appearance-none peer"
                                                placeholder=" "
                                                required=""
                                            />
                                            <label
                                                htmlFor="floating_first_name"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-maroon peer-active:text-maroon   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                First name
                                            </label>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input
                                                type="text"
                                                name="floating_last_name"
                                                id="floating_last_name"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-400 outline-none appearance-none peer"
                                                placeholder=" "
                                                required=""
                                            />
                                            <label
                                                htmlFor="floating_last_name"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-maroon peer-active:text-maroon   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Last name
                                            </label>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 md:gap-6">
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input
                                                type="tel"
                                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                                name="floating_phone"
                                                id="floating_phone"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-400 outline-none appearance-none peer"
                                                placeholder=" "
                                                required=""
                                            />
                                            <label
                                                htmlFor="floating_phone"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-maroon peer-active:text-maroon   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Phone number (123-456-7890)
                                            </label>
                                        </div>
                                        <div className="relative z-0 w-full mb-5 group">
                                            <input
                                                type="text"
                                                name="floating_company"
                                                id="floating_company"
                                                className="block py-2.5 px-0 w-full text-sm text-gray-700 bg-transparent border-0 border-b-2 border-gray-400 outline-none appearance-none peer"
                                                placeholder=" "
                                                required=""
                                            />
                                            <label
                                                htmlFor="floating_company"
                                                className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-maroon peer-active:text-maroon   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                                            >
                                                Company (Ex. Google)
                                            </label>
                                        </div>
                                    </div>
                                  
                                    <button className='w-full px-5 py-1 font-medium text-white border-2 border-maroon bg-maroon'>Submit</button>
                                </form>
                            </div>

                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
