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

//CONTROL DE VERSIONES
export const GET_DOCUMENT_BY_ID = gql`
    query GetDocumentById($id: Int!) {
        getDocument(id: $id) {
            id
            title
            timestamp
            version{
                version
            }
            requirements{
                id
                content

            }
            template{
                id
            }
        }
}
`
;

export const GET_ALL_VERSIONS_BY_DOCUMENT = gql`
    query GetAllVersionsByDocument($id_document: Int!) {
        getAllDocumentsVersions(id_document: $id_document) {
            id
            id_document
            version {
                version
                last_version
            }
        }
    }
`;

export const GET_ALL_DOCUMENT_LAST_VERSION = gql`
    query GetAllDocumentsLastVersion {
        getAllDocumentsLastVersion {
            id
            id_document
            title
            timestamp
            read_only
            is_active
            template {
                title
            }
            version {
                version
            }
            project {
                name
            }
        }
}
`
;

export const GET_DOCUMENT = gql`
  query getDocument($id: Int!) {
    getDocument(id: $id) {
      id
      title
      requirements {
        id
        content
        status
      }
    }
  }
`;

// FOROS
export const GET_FORUM_BY_DOCUMENT = gql`
    query GetForumByDocument($id: String!) {
        getForumsByDocument(id: $id) {
            id
            title
            content
            status
        }
}`;

export const GET_FORUM_BY_ID = gql`
    query GetForumById($id: Int!) {
        getForum(id: $id) {
            id
            title
            content
            status
        }
}`;

//COMENTARIOS

export const GET_COMMENTS_BY_FORUM = gql`
    query GetCommentsByForum($id: Int!) {
        getCommentsByForum(id: $id) {
            id
            content
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