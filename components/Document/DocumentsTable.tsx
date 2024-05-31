'use client';
import { Requirement } from "@/interfaces/Requirement";
import { Document } from "@/interfaces/Document";
import DataTable from "react-data-table-component";
import { Forum } from "@/interfaces/Forum";
import { Template } from "@/interfaces/Template";
import { Version } from "@/interfaces/Version";
import { useRouter } from 'next/navigation'

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


// Datos de prueba
const data: Document[] = [
    {
        id: 1,
        id_user: 1,
        title: "Documento 01",
        timestamp: "2021-09-01",
        //forums: [],
        //templates: [],
        //version: [],
        //requirements: [],
    },
    {
        id: 2,
        id_user: 2,
        title: "Documento 02",
        timestamp: "2021-09-02",
        //forums: [],
        //templates: [],
        //version: [],
        //requirements: [],
    },

];

const columns = [
    {
        name: "Documento ID",
        selector: (row: Document) => row.id,
        sortable: true,
        grow: 0.4
    },
    {
        name: "Titulo",
        selector: (row: Document) => row.title,
        sortable: true,
    },
    {
        name: "fecha creacion",
        selector: (row: Document) => row.timestamp,
        sortable: true,
        grow: 0.4
    },

];

export default function DocumentsTable() {
    const router = useRouter()

    return (
        <div className="space-y-8 w-[1000px] ">
            <DataTable
                title="Documentos"
                columns={columns}
                data={data}
                pagination
                onRowClicked={row => router.push(`/user/dashboard/document/${row.id}`)}
                customStyles={customStyles}
            />
        </div>
    )

}