import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { enqueueSnackbar } from 'notistack';
import AuthForm from '../components/AuthForm/AuthForm';
import { LOGIN } from '../queries/auth';

function Login() {
    const [login, { loading }] = useMutation(LOGIN);

    const handleLogin = async (data) => {
        const { email, password } = data;
        try {
            const { data } = await login({ variables: { email, password } });
            localStorage.setItem('token', data.login.token);
            localStorage.setItem('email', data.login.email);
            window.location.href = '/';
        } catch (err) {
            enqueueSnackbar(err.message, {
                variant: 'alert',
                severity: 'error',
            });
        }
    };

    if (localStorage.getItem('token')) {
        window.location.href = '/';
    }
    return <AuthForm handleFormSubmit={handleLogin} submitLoading={loading} />;
}

export default Login;
