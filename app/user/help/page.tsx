'use client'
import HelpInfo from '@/components/user/HelpInfo'
import React from 'react'


const HelpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
        <div className="bg-white shadow-lg rounded-lg p-8">
            <HelpInfo/>
        </div>
    </div>
  )
}

export default HelpPage