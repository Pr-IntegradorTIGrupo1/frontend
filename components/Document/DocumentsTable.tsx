'use client';
import { Document } from "@/interfaces/Document";
import DataTable from "react-data-table-component";
import { useRouter } from 'next/navigation'
import { useQuery } from "@apollo/client";
import { GET_DOCUMENTS_BY_USER } from "@/components/apollo/queries";
import { useEffect, useState } from 'react';


const customStyles = {
    rows: {
        style: {
            cursor: 'pointer', // Cambia el cursor a una mano
            '&:hover': {
                backgroundColor: 'aliceblue', // Cambia el color de fondo al pasar el ratón por encima
            },
        },
    },
};

const columns = [
    {
        name: "ID",
        selector: (row: Document) => row.id,
        sortable: true,
        width: "80px"
    },
    {
        name: "Titulo",
        selector: (row: Document) => row.title,
        sortable: true,
        width: "250px"
    },
    {
        name: "fecha creacion",
        selector: (row: Document) => new Date(row.timestamp).toLocaleString(),
        sortable: true,
        width: "180px"
    },
    {
        name: "Version",
        selector: (row: Document) => row.version.version,
        sortable: true,
        width: "100px"
    },
    {
        name: "Plantilla",
        selector: (row: Document) => row.template.title,
        sortable: true,
        width: "150px"
    },
    {
        name: "Proyecto",
        selector: (row: Document) => row.project.name,
    }


];

export default function DocumentsTable() {
    const [userId, setUserId] = useState<number | null>(null);
    const { data: dataDocuments, loading: loadingDocuments, error: errorDocuments, refetch } = useQuery(GET_DOCUMENTS_BY_USER,{
        variables: { id_user: userId }
    
    })
    //console.log(dataDocuments)

    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
        const parsedUserData = JSON.parse(userData);
        setUserId(parseInt(parsedUserData.id));
        }
        refetch();
      }, [refetch]);

    const router = useRouter()

    if (loadingDocuments) return <p>Loading...</p>
    if (errorDocuments) return <p>Error...</p>

    return (
        <div className="space-y-8 w-[1000px] ">
            <DataTable
                title="Documentos"
                columns={columns}
                data={dataDocuments?.getDocumentsByUser || []}
                pagination
                onRowClicked={row => router.push(`/user/dashboard/document/${row.id}`)}
                customStyles={customStyles}
            />
        </div>
    )

}