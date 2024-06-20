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
