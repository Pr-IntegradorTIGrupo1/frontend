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