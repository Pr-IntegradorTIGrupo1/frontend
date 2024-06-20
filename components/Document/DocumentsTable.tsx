'use client';
import { Document } from "@/interfaces/Document";
import DataTable from "react-data-table-component";
import { useRouter } from 'next/navigation'
import { useQuery } from "@apollo/client";
import { GET_ALL_DOCUMENTS } from "@/components/apollo/queries";

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
        width: "300px"
    },
    {
        name: "fecha creacion",
        selector: (row: Document) => row.timestamp,
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
        name: "Template",
        selector: (row: Document) => row.template.title,
        sortable: true,
    }

];

export default function DocumentsTable() {
    const { data: dataDocuments, loading: loadingDocuments, error: errorDocuments, refetch } = useQuery(GET_ALL_DOCUMENTS)
    console.log(dataDocuments)

    const router = useRouter()

    if (loadingDocuments) return <p>Loading...</p>
    if (errorDocuments) return <p>Error...</p>

    return (
        <div className="space-y-8 w-[1000px] ">
            <DataTable
                title="Documentos"
                columns={columns}
                data={dataDocuments?.getAllDocument}
                pagination
                onRowClicked={row => router.push(`/user/dashboard/document/${row.id}`)}
                customStyles={customStyles}
            />
        </div>
    )

}