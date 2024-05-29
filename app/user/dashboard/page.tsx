import Link from 'next/link'
import React from 'react'

const DocumentDashboard = () => {
  const documents = [
    { id: 1, name: 'Doc 1' },
    { id: 2, name: 'Doc 2' },
    { id: 3, name: 'Doc 3' }
  ]

  return (
    <div className="p-2">
      <h1 className="text-2xl font-bold mb-4">Dashboard del Usuario</h1>
      <div className="flex flex-col gap-4">
        {documents.map(doc => (
          <div key={doc.id} className="bg-white shadow-md rounded-lg p-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">{doc.name}</h2>
            <Link href={`/user/dashboard/document/${doc.id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                Ver Detalle
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocumentDashboard
