import { gql } from '@apollo/client';

export const GET_TEMPLATES_QUERY = gql`
    query GetTemplates {
        getTemplates {
            id
            title
            body
        }
    }
`;

export const CREATE_TEMPLATE_MUTATION = gql`
    mutation CreateTemplate($title: String!, $body: String!) {
        addTemplate(title: $title, body: $body) {
            id
            title
            body
        }
    }
`;

export const UPDATE_TEMPLATE_MUTATION = gql`
    mutation UpdateTemplate($id: ID!, $title: String, $body: String) {
        updateTemplate(id: $id, title: $title, body: $body) {
            id
            title
            body
            updatedAt
        }
    }
`;

export const GET_TEMPLATE_QUERY = gql`
    query GetTemplate($id: ID!) {
        getTemplate(id: $id) {
            id
            title
            body
        }
    }
`;

export const DELETE_TEMPLATE_MUTATION = gql`
    mutation DeleteTemplate($id: ID!) {
        deleteTemplate(id: $id) {
            id
            title
        }
    }
`;
