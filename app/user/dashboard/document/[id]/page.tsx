'use client'
import React from 'react'
import { Switch } from '@headlessui/react'
import { PencilIcon } from '@heroicons/react/solid'
import { useQuery, useMutation } from '@apollo/client'
import { useRouter } from 'next/navigation'
import { UPDATE_REQUIREMENT } from '@/components/apollo/mutations'
import { GET_DOCUMENT } from '@/components/apollo/queries'
import Link from 'next/link'

type Requirement = {
  id: number;
  content: string;
  status: boolean;
}

const DocumentDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const documentId = parseInt(params.id)

  const { loading, error, data } = useQuery(GET_DOCUMENT, {
    variables: { id: documentId },
  })

  const [updateRequirement] = useMutation(UPDATE_REQUIREMENT)

  const handleStateChange = async (id: number, status: boolean) => {
    try {
      await updateRequirement({
        variables: {
          input: {
            id,
            status
          }
        },
        optimisticResponse: {
          updateRequirement: {
            id,
            status,
            __typename: 'Requirement'
          }
        },
        update: (cache, { data: { updateRequirement } }) => {
          const existingDocument = cache.readQuery<any>({
            query: GET_DOCUMENT,
            variables: { id: documentId }
          })

          if (existingDocument) {
            const updatedRequirements = existingDocument.getDocument.requirements.map(
              (req: Requirement) => req.id === updateRequirement.id ? { ...req, status: updateRequirement.status } : req
            )

            cache.writeQuery({
              query: GET_DOCUMENT,
              variables: { id: documentId },
              data: {
                getDocument: {
                  ...existingDocument.getDocument,
                  requirements: updatedRequirements
                }
              }
            })
          }
        }
      })
    } catch (error) {
      console.error('Error updating requirement:', error)
    }
  }

  const parseContent = (content: string) => {
    try {
      const parsedContent = JSON.parse(content);
      if (Array.isArray(parsedContent.content)) {
        return parsedContent.content.join('\n');
      }
      return parsedContent.content.toString();
    } catch (e) {
      console.error('Error parsing content:', e);
      return content;
    }
  }

  if (loading) return <div>Cargando...</div>
  if (error) return <div>Error: {error.message}</div>

  const { title, requirements } = data.getDocument

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Detalle del Documento: {title}</h1>
      <div className="space-y-4">
        {requirements.map((requirement: Requirement) => (
          <div key={requirement.id} className="bg-white shadow-md rounded-lg p-6 flex justify-between items-center w-full">
            <div className="flex-grow flex items-center space-x-4">
              <span className="text-lg font-medium flex-grow whitespace-pre-line">
                {parseContent(requirement.content)}
              </span>
              <Link href={`/user/versionControl/${params.id}`}>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">{requirement.status ? 'Completado' : 'Pendiente'}</span>
              <Switch
                checked={requirement.status}
                onChange={(state) => handleStateChange(requirement.id, state)}
                className={`${requirement.status ? 'bg-green-500' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Toggle State</span>
                <span
                  className={`${requirement.status ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform bg-white rounded-full transition`}
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