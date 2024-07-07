import { gql } from "@apollo/client";

export const GET_ALL_TEMPLATES = gql`
    query GetAllTemplates {
        getAllTemplate {
            id
            title
            format
        }
    }
`;

export const GET_ALL_DOCUMENTS = gql`
    query GetAllDocuments {
        getAllDocument {
            id
            id_project
            id_user
            title
            timestamp
            template{
                id
                title
                format
            }
            version{
                version
            }
            requirements{
                id
                content
                status

            }

        }
    }
`;

//CONTROL DE VERSIONES
export const GET_DOCUMENT_BY_ID = gql`
    query GetDocumentById($id: Int!) {
        getDocument(id: $id) {
            id
            id_project
            id_user
            title
            timestamp
            version{
                version
            }
            requirements{
                id
                content

            }
        }
}
`
;