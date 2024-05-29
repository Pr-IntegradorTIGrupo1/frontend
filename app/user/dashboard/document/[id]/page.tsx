'use client'
import React, { useEffect, useState } from 'react'
import { Switch } from '@headlessui/react'
import { PencilIcon, CheckIcon, XIcon } from '@heroicons/react/solid'

type Requisito = {
  requisito_id: number;
  contenido: string;
  estado: boolean;
}

const DocumentDetail = ({ params }: { params: { id: string } }) => {
  const [requisitos, setRequisitos] = useState<Requisito[]>([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    // Modificar llamada a la API con la ruta correcta
    /*
    fetch(`/api/document/${params.id}/requisitos`)
      .then(response => response.json())
      .then(data => {
        setRequisitos(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching requisitos:', error)
        setLoading(false)
      })
    */

    // Datos de prueba
    const testRequisitos: Requisito[] = [
      {
        requisito_id: 1,
        contenido: 'Requisito 1',
        estado: true,
      },
      {
        requisito_id: 2,
        contenido: 'Requisito 2',
        estado: false,
      },
      {
        requisito_id: 3,
        contenido: 'Requisito 3',
        estado: true,
      },
    ]

    // Simulación de la carga de datos
    setTimeout(() => {
      setRequisitos(testRequisitos)
      setLoading(false)
    }, 400)
  }, [params.id])

  const handleEditToggle = (id: number) => {
    setEditMode(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleContentChange = (id: number, content: string) => {
    setRequisitos(prev =>
      prev.map(req => req.requisito_id === id ? { ...req, contenido: content } : req)
    )
  }

  const handleStateChange = (id: number, state: boolean) => {
    setRequisitos(prev =>
      prev.map(req => req.requisito_id === id ? { ...req, estado: state } : req)
    )
  }

  if (loading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalle del Documento N°: {params.id}</h1>
      <div className="space-y-4">
        {requisitos.map(requisito => (
          <div key={requisito.requisito_id} className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {editMode[requisito.requisito_id] ? (
                <input
                  type="text"
                  value={requisito.contenido}
                  onChange={(e) => handleContentChange(requisito.requisito_id, e.target.value)}
                  className="text-lg font-medium border rounded p-2"
                />
              ) : (
                <span className="text-lg font-medium">{requisito.contenido}</span>
              )}
              <button
                onClick={() => handleEditToggle(requisito.requisito_id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
              >
                {editMode[requisito.requisito_id] ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <PencilIcon className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="flex items-center space-x-2 pl-4">
              <span className="text-sm font-medium">{requisito.estado ? 'Completado' : 'Pendiente'}</span>
              <Switch
                checked={requisito.estado}
                onChange={(state) => handleStateChange(requisito.requisito_id, state)}
                className={`${requisito.estado ? 'bg-green-500' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Toggle State</span>
                <span
                  className={`${requisito.estado ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition`}
                />
              </Switch>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DocumentDetail
