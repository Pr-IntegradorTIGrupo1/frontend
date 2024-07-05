import VersionTable from '@/components/controlVersion/VersionTable';
import Link from 'next/link'
import React from 'react'

const VersionDashboard = () => {


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Tabla de Documentos
        </h1>
        <VersionTable />
      </div>
    </div>
  );
}

export default VersionDashboard
