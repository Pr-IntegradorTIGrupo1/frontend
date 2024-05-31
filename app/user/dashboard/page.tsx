import DocumentsTable from '@/components/Document/DocumentsTable'
import Link from 'next/link'
import React from 'react'

const DocumentDashboard = () => {


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Tabla de Documentos
        </h1>
        <DocumentsTable />
      </div>
    </div>
  );
}

export default DocumentDashboard
