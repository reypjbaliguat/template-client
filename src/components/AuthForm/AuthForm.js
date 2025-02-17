import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    TextField,
    Button,
    Box,
    Typography,
    Stack,
    Grid2,
} from '@mui/material';
import { gql, useMutation } from '@apollo/client';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

const GOOGLE_LOGIN = gql`
    mutation GoogleLogin($token: String!) {
        googleLogin(token: $token) {
            id
            email
            token
        }
    }
`;

function AuthForm({ handleFormSubmit, submitLoading, isLogin = true }) {
    const [googleLogin] = useMutation(GOOGLE_LOGIN);
    const logo = `${process.env.PUBLIC_URL}/assets/template-logo.png`;

    const { handleSubmit, control, reset } = useForm({
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = (data) => {
        handleFormSubmit(data);
        reset(); // Reset form after submission
    };

    // Handle Google login success
    const handleGoogleSuccess = async (response) => {
        const token = response.credential;
        try {
            const { data } = await googleLogin({ variables: { token } });
            localStorage.setItem('token', data.googleLogin.token);
            localStorage.setItem('id', data.googleLogin.id);
            localStorage.setItem('email', data.googleLogin.email);
            window.location.href = '/';
        } catch (err) {
            alert('Google login failed');
        }
    };

    // Handle Google login failure
    const handleGoogleFailure = () => {
        enqueueSnackbar('Google login failed. Please try again.', {
            variant: 'alert',
            severity: 'error',
        });
    };

    const headerText = isLogin ? 'Login' : 'Register';
    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    flexDirection: 'column',
                }}
            >
                <img alt="logo" src={logo} height={100} />
                <Box
                    sx={{
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: '#ffffff',
                        maxWidth: { xs: 270, sm: 400 },
                        width: '100%',
                        marginTop: 4,
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        {headerText}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <Controller
                                name="email"
                                control={control}
                                rules={{ required: 'Email is required' }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Email"
                                        type="email"
                                        variant="outlined"
                                        error={!!error}
                                        helperText={error?.message}
                                        fullWidth
                                    />
                                )}
                            />
                            <Controller
                                name="password"
                                control={control}
                                rules={{ required: 'Password is required' }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        error={!!error}
                                        helperText={error?.message}
                                        fullWidth
                                    />
                                )}
                            />

                            {!isLogin && (
                                <Controller
                                    name="confirmPassword"
                                    control={control}
                                    rules={{
                                        required:
                                            'Confirm Password is required',
                                    }}
                                    render={({
                                        field,
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            {...field}
                                            label="Confirm Password"
                                            type="password"
                                            variant="outlined"
                                            error={!!error}
                                            helperText={error?.message}
                                            fullWidth
                                        />
                                    )}
                                />
                            )}

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                color="primary"
                                loading={submitLoading}
                            >
                                {headerText}
                            </Button>
                        </Stack>
                    </Box>

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
                        style={{ width: '100%' }}
                    />
                    <Grid2 justifyContent={'center'} container pt={2}>
                        <Link to={isLogin ? '/register' : '/login'}>
                            <Typography color="primary" variant="body2">
                                {isLogin
                                    ? 'Need account? Click here'
                                    : 'Already have an account? Login here.'}{' '}
                            </Typography>{' '}
                        </Link>
                    </Grid2>
                </Box>
            </Box>
        </GoogleOAuthProvider>
    );
}

export default AuthForm;
