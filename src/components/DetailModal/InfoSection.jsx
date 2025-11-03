/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

export default function InfoSection({title, children}) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-3 pb-2 border-b">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  )
}