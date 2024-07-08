// versionControl/[id]/page.tsx
import CreateNewVersion from '@/components/controlVersion/CreateNewVersion'
import CreateTemplateForm from '@/components/template/CreateTemplateForm'
import React from 'react'
import { Document } from '../../../../../interfaces/Document';
import DocumentDetail from '@/components/Document/DocumentDetail';

const page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
      <div className="bg-white shadow-lg rounded-lg p-8 w-7/12">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Documento de Requisitos
        </h1>
        <DocumentDetail/>
      </div>
    </div>
    
  )
}

export default page