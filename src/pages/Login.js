import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, TextField, Box, Typography, Stack } from '@mui/material';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

const GOOGLE_LOGIN = gql`
    mutation GoogleLogin($token: String!) {
        googleLogin(token: $token) {
            id
            email
            token
        }
    }
`;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useMutation(LOGIN);
    const [googleLogin] = useMutation(GOOGLE_LOGIN);

    // Handle Google login success
    const handleGoogleSuccess = async (response) => {
        const token = response.credential;
        try {
            const { data } = await googleLogin({ variables: { token } });
            localStorage.setItem('token', data.googleLogin.token);
            window.location.href = '/';
        } catch (err) {
            alert('Google login failed');
        }
    };

    // Handle Google login failure
    const handleGoogleFailure = (response) => {
        console.error('Google Login Failed:', response);
        alert('Google login failed. Please try again.');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login({ variables: { email, password } });
            localStorage.setItem('token', data.login.token);
            window.location.href = '/';
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <GoogleOAuthProvider clientId="671486762103-a64mvno1dst0ihjpald84hd8fba7sckj.apps.googleusercontent.com">
            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                }}
            >
                <Box
                    sx={{
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: '#ffffff',
                        maxWidth: 400,
                        width: '100%',
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Login
                    </Typography>

                    {/* Email/Password Login Form */}
                    <form onSubmit={handleLogin}>
                        <Stack spacing={2}>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ backgroundColor: '#1976d2' }}
                            >
                                Login
                            </Button>
                        </Stack>
                    </form>

                    <Typography
                        variant="body1"
                        align="center"
                        sx={{ marginY: 2, fontWeight: 'bold' }}
                    >
                        OR
                    </Typography>

                    {/* Google Login Button */}
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleFailure}
                    />
                </Box>
            </Box>
        </GoogleOAuthProvider>
    );
}

export default Login;
