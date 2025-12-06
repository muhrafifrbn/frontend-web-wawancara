/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

export default function InfoItem({label, value}) {
  return (
    <div className="p-4 rounded-lg bg-gray-50">
      <div className="mb-1 text-sm text-gray-500">{label}</div>
      <div className="font-medium text-gray-900">{value || "Tidak Ada Informasi"}</div>
    </div>
  )
}