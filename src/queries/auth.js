import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            email
            token
        }
    }
`;

export const SIGN_UP = gql`
    mutation SignUp($email: String!, $password: String!) {
        signUp(email: $email, password: $password) {
            id
            email
            token
        }
    }
`;

export const GOOGLE_LOGIN = gql`
    mutation GoogleLogin($token: String!) {
        googleLogin(token: $token) {
            id
            email
            token
        }
    }
`;
