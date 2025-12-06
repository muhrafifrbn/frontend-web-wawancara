/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const ModalContainer = ({
  title,
  subtitle,
  children,
  onClose,
  primaryButton,
  secondaryButton,
  msg,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="m-4 lg:m-0 bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 px-8 py-6 bg-white border-b rounded-t-xl">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="mt-1 text-gray-500">{subtitle}</p>}
          {msg &&
            (msg.includes("berhasil") ? (
              <div className="p-3 mt-2 mb-4 text-sm text-green-700 bg-green-100 border border-green-400 rounded ">
                {msg}
              </div>
            ) : (
              <div className="p-3 mt-2 mb-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded">
                {msg}
              </div>
            ))}
        </div>

        {/* Body */}
        <div className="flex-grow p-8 overflow-y-auto scroll-smooth">
          {children}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 z-10 px-8 py-4 bg-white border-t rounded-b-xl">
          {secondaryButton ? (
            // If both primaryButton and secondaryButton are provided, show them
            <div className="flex justify-end w-full gap-4">
              <div className="w-1/2">{secondaryButton}</div>
              <div className="w-1/2">{primaryButton}</div>
            </div>
          ) : (
            // Otherwise, show the default close button
            <button
              onClick={onClose}
              className="w-full px-6 py-3 font-medium text-white transition-colors duration-200 bg-red-500 rounded-lg hover:bg-red-600"
            >
              Tutup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalContainer;
