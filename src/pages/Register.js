import React from 'react';
import { useMutation } from '@apollo/client';
import { enqueueSnackbar } from 'notistack';
import AuthForm from '../components/AuthForm/AuthForm';
import { SIGN_UP } from '../queries/auth';

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
            localStorage.setItem('token', data.signUp.token);
            localStorage.setItem('id', data.signUp.id);
            localStorage.setItem('email', data.signUp.email);
            enqueueSnackbar(
                `User registered successfully! Welcome, ${data.signUp.email}`,
                {
                    variant: 'alert',
                    severity: 'success',
                },
            );
            window.location.href = '/';
        } catch (err) {
            enqueueSnackbar(err.message, {
                variant: 'alert',
                severity: 'error',
            });
        }
    };

    return <AuthForm handleFormSubmit={handleSubmit} isLogin={false} />;
}

export default Register;
