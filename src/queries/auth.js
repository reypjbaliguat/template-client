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
        signUp(email: $email, password: $password)
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

export const VERIFY_OTP = gql`
    mutation VerifyOTP($email: String!, $otpCode: String!) {
        verifyOTP(email: $email, otpCode: $otpCode) {
            id
            email
            token
        }
    }
`;

export const RESEND_OTP = gql`
    mutation ResendOTP($email: String!) {
        resendOTP(email: $email)
    }
`;
