import { gql } from "@apollo/client";
//createTemplate(input: CreateTemplateInput!): Template!
//input CreateTemplateInput {
    //title: String!
    //format: String!
  //}
export const CREATE_TEMPLATE_MUTATION = gql`
    mutation CreateTemplate($input: CreateTemplateInput!) {
        createTemplate(input: $input ) {
            success
            message
        }
    }   
`;

export const CREATE_DOCUMENT_MUTATION = gql`   
    mutation CreateDocument($input: CreateDocumentInput!) {
        createDocument(input: $input ) {
            success
            message
        }
    }   
`;

//CONTROL DE VERSIONES
export const UPDATE_DOCUMENT_MUTATION = gql`
    mutation UpdateDocument($input: UpdateDocumentInput!) {
        updateDocument(input: $input ) {
            success
            message
        }
    }   
`;
export const UPDATE_REQUIREMENT = gql`
  mutation UpdateRequirement($input: UpdateRequirementInput!) {
    updateRequirement(input: $input) {
      id
      status
    }
  }
`;

//FOROS
export const CREATE_FORUM_MUTATION = gql`
    mutation CreateForum($input: CreateForumInput!) {
        createForum(input: $input ) {
            id
            title
            content
            status
        }
    }   
`;

//COMENTARIOS
export const CREATE_COMMENT_MUTATION = gql`
    mutation CreateComment($input: CreateCommentInput!) {
        createComment(input: $input ) {
            id
            content
        }
    }   
`;
