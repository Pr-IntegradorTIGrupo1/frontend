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

export const GET_ALL_DOCUMENTS_LAST_VERSION_QUERY = gql`
    query GetAllDocuments {
        getAllDocumentsLastVersion {
            id
            id_document
            title
            timestamp
            read_only
            is_active
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

export const GET_USER_BY_ID = gql`
    query GetUser($id: Int!) {
        getUser(id: $id) {
            id
            firstName
            lastName
            email
            projects{
                id
                name
            }
        }
    }
`;