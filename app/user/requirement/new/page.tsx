import CreateRequirementForm from '@/components/requirement/CreateRequirementForm'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Formulario para creación de Documento de Requisitos
        </h1>
        <CreateRequirementForm />
      </div>
    </div>
    
  )
}

export default page