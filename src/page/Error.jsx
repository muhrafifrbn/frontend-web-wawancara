import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <section className="flex items-center min-h-screen p-16 dark:bg-gray-50 dark:text-gray-800">
    <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
            <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-400">
                <span className="sr-only">Error</span>404
            </h2>
            <p className="text-2xl font-semibold md:text-3xl">Maaf, halaman ini tidak ditemukan</p>
            <p className="mt-4 mb-8 dark:text-gray-600">Tetapi jangan khawatir, anda bisa kembali kedalam homepage</p>
            <Link to={'/home'}>
            <a rel="noopener noreferrer" href="#" className="px-8 py-3 font-semibold text-white rounded bg-maroon ">Back to homepage</a>
            </Link>
        </div>
    </div>
</section>
  )
}

export default Error
