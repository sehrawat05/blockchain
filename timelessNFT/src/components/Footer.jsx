import React from 'react'
import timelessLogo from '../assets/timeless.png'
const Footer = () => {
  return (
    <div className='w-full gradient-bg-footer flex flex-col md:justify-center justify-between items-center p-4'>
        <div className='w-full flex sm:flex-row flex-col justify-between items-center my-4'>
            <div className='flex justify-center items-center'>
                <img className='w-32' src={timelessLogo} alt="Logo" />
                </div>
            <div className='flex flex-3 text-white text-base text-center  justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full'>
                <p className='cursor-pointer mx-2 '>Market</p>
                <p className='cursor-pointer mx-2 '>Artists</p>
                <p className='cursor-pointer mx-2 '>Features</p>
                <p className='cursor-pointer mx-2 '>Community</p>
            </div>
            <div className='flex justify-center items-center'>
                <p className='text-white text-sm'>&copy;2025 All rights are reserved.</p>

            </div>
        </div>
    </div>
  )
}

export default Footer
