import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { enqueueSnackbar } from 'notistack';
import AuthForm from '../components/AuthForm/AuthForm';

const SIGN_UP = gql`
    mutation SignUp($email: String!, $password: String!) {
        signUp(email: $email, password: $password) {
            id
            email
            role
            token
        }
    }
`;

function Register() {
    const [signUp] = useMutation(SIGN_UP);
    const handleSubmit = async (data) => {
        const { password, confirmPassword, email } = data;
        if (password !== confirmPassword) {
            enqueueSnackbar("Passwords don't match!", {
                variant: 'alert',
                severity: 'error',
            });
            return;
        }
        try {
            const { data } = await signUp({
                variables: { email, password },
            });
            enqueueSnackbar(
                `User registered successfully! Welcome, ${data.signUp.email}`,
                {
                    variant: 'alert',
                    severity: 'success',
                },
            );
        } catch (err) {
            enqueueSnackbar('Registration failed. Try again.', {
                variant: 'alert',
                severity: 'error',
            });
        }
    };

    return <AuthForm handleFormSubmit={handleSubmit} isLogin={false} />;
}

export default Register;
