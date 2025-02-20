import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { enqueueSnackbar } from 'notistack';
import AuthForm from '../components/AuthForm/AuthForm';
import { SIGN_UP } from '../queries/auth';
import OTPForm from '../components/AuthForm/OTPForm';

function Register() {
    const [signUp] = useMutation(SIGN_UP);
    const [page, setPage] = useState('otp');
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

    switch (page) {
        case 'register':
            return <AuthForm handleFormSubmit={handleSubmit} isLogin={false} />;
        case 'otp':
            return <OTPForm />;
        default:
            return <></>;
    }
}

export default Register;
