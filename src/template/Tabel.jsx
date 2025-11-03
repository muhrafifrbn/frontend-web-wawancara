/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';

const Tabel = ({ title, headers, children, to, handle, data, itemsPerPage = 5, renderRow }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(itemsPerPage);

  useEffect(() => {
    // Reset to first page when search changes or items per page changes
    setCurrentPage(1);
  }, [searchTerm, currentItemsPerPage]);

  // Update current items per page when prop changes
  useEffect(() => {
    setCurrentItemsPerPage(itemsPerPage);
  }, [itemsPerPage]);

  // Update filtered data when either data or search term changes
  useEffect(() => {
    if (Array.isArray(data)) {
      if (!searchTerm.trim()) {
        // If no search term, use all data
        setFilteredData(data);
      } else {
        // Filter data based on search term
        const filtered = data.filter(item => {
          return Object.values(item).some(value => {
            // Convert to string to handle different value types (numbers, etc.)
            const strValue = String(value).toLowerCase();
            return strValue.includes(searchTerm.toLowerCase());
          });
        });
        setFilteredData(filtered);
      }
    } else {
      setFilteredData([]);
    }
  }, [data, searchTerm]);

  // Calculate pagination values
  const totalItems = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / currentItemsPerPage));
  
  // Ensure currentPage is within valid range
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages]);

  // Get current items for display
  const indexOfLastItem = currentPage * currentItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - currentItemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    const value = e.target.value === 'all' ? filteredData.length : Number(e.target.value);
    setCurrentItemsPerPage(value);
  };

  // Custom render function for table rows
  const renderChildren = () => {
    if (!Array.isArray(data)) {
      return children; // Return original children if no data provided
    }

    if (totalItems === 0) {
      return (
        <tr>
          <td colSpan={headers.length} className="text-center py-4">
            {data.length === 0 ? 'Tidak Ada Data' : 'Tidak ditemukan hasil pencarian'}
          </td>
        </tr>
      );
    }

    // If renderRow prop provided, use it to render rows
    if (renderRow && typeof renderRow === 'function') {
      return currentItems.map((item, index) => renderRow(item, index));
    }

    // Default: return children (should be handled by parent)
    return children;
  };

  return (
    <div>
      <div className="flex items-end justify-between py-5 text-lg font-semibold text-left text-gray-900 bg-white shadow-sm sm:p-5 rtl:text-right">
        <div className='w-[70%]'>
          <div className='flex items-center justify-between w-full'>
            <h1 className='text-xl font-semibold'>
              Data {title}
            </h1>
          </div>
          <p className="mt-1 text-sm font-normal text-gray-800">
            Tabel berisi data {title} harap melakukan cek rutin terhadap data
          </p>
        </div>

        {/* Search and Add buttons on the right */}
        <div className="flex flex-col sm:flex-row gap-2 items-end">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400 w-4 h-4" />
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-normal rounded-lg focus:ring-maroon focus:border-maroon block w-full pl-10 p-2"
              placeholder="Cari data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {to && (
            <Link 
              className='px-2 py-2 text-[13px] whitespace-nowrap sm:text-sm text-white rounded-lg lg:px-4 bg-maroon hover:bg-red-800 active:scale-95 transition-all'
              to={to}
            >
              Tambah Data
            </Link>
          )}
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-sm custom-scrollbar">
        <table className="relative w-full text-sm text-left text-gray-500 rtl:text-right border-collapse">
          <thead className="text-xs text-white uppercase bg-maroon">
            <tr>
              {headers.map((item, i) => (
                <th key={i} scope="col" className="px-6 py-3 text-nowrap">
                  {item.judul}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) ? renderChildren() : children}
          </tbody>
        </table>
      </div>

      {/* Pagination controls - only show if we have data */}
      {Array.isArray(data) && data.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-4 px-2 gap-y-3">
          {/* <div className="flex items-center gap-2 border border-gray-900 p-2 rounded-lg">
            <span className="text-sm font-medium text-gray-700">Per halaman</span>
            <hr className=' broder-grey-900'/>
            <select
              value={currentItemsPerPage >= filteredData.length ? 'all' : currentItemsPerPage}
              onChange={handleItemsPerPageChange}
              className=""
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value="all">Semua</option>
            </select>
          </div> */}
          <div className="flex items-center gap-2 border p-2 border-gray-900 rounded-lg relative">
            <span className="text-sm font-medium text-gray-700">Per halaman</span>
            <div className="h-full ml-2 absolute left-[calc(50%-1px)] top-0 w-px bg-gray-900"></div>
            <select
              value={currentItemsPerPage >= filteredData.length ? 'all' : currentItemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border-none focus:ring-0 text-sm p-0 bg-white"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value="all">Semua</option>
            </select>
          </div>
          <div className="flex items-center justify-between w-full sm:w-auto gap-x-4">
            <div className="text-sm text-gray-700">
              Menampilkan {totalItems === 0 ? 0 : (currentPage - 1) * currentItemsPerPage + 1} - {Math.min(currentPage * currentItemsPerPage, totalItems)} dari {totalItems} data
            </div>
            
            {totalPages > 1 && (
              <nav className="flex items-center gap-x-1" aria-label="Pagination">
                <button
                  type="button"
                  className="min-h-[38px] min-w-[38px] py-1 px-2 inline-flex items-center gap-x-1 text-sm text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-maroon disabled:opacity-50 disabled:pointer-events-none"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  aria-label="Previous"
                >
                  <FaAngleLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>
                
                <div className="flex items-center gap-x-1">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => paginate(i + 1)}
                      className={`min-h-[38px] min-w-[38px] py-1 px-2 inline-flex items-center justify-center text-sm rounded-md focus:outline-none focus:ring-1 focus:ring-maroon ${
                        currentPage === i + 1
                          ? 'bg-maroon text-white'
                          : 'text-gray-700 bg-white hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                
                <button
                  type="button"
                  className="min-h-[38px] min-w-[38px] py-1 px-2 inline-flex items-center gap-x-1 text-sm text-gray-700 bg-white hover:bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-maroon disabled:opacity-50 disabled:pointer-events-none"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  aria-label="Next"
                >
                  <span className="hidden sm:inline">Next</span>
                  <FaAngleRight className="w-4 h-4" />
                </button>
              </nav>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tabel;
