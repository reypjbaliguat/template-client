import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { enqueueSnackbar } from 'notistack';
import AuthForm from '../components/AuthForm/AuthForm';

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

function Login() {
    const [login, { loading }] = useMutation(LOGIN);

    const handleLogin = async (data) => {
        const { email, password } = data;
        try {
            const { data } = await login({ variables: { email, password } });
            localStorage.setItem('token', data.login.token);
            window.location.href = '/';
        } catch (err) {
            enqueueSnackbar('Invalid credentials', {
                variant: 'alert',
                severity: 'error',
            });
        }
    };

    return <AuthForm handleFormSubmit={handleLogin} submitLoading={loading} />;
}

export default Login;
