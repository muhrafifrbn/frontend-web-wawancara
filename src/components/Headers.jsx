/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { FaAngleRight } from "react-icons/fa6";

const Headers = ({logo ,title}) => {
  return (
    <div className='flex justify-between w-full text-gray-900 pb-2 border-b-[1px] border-maroon'>
        <div className='flex items-center gap-2'>
            <div>{logo}</div>
            <p>{title}</p>
        </div>
        <div className='flex items-center gap-2 text-sm text-blue-500 cursor-pointer'>
            <p>View All</p>
            <FaAngleRight className='text-[13px] mt-[2.4px] font-sm'/>
        </div>
        
      
    </div>
  )
}

export default Headers
