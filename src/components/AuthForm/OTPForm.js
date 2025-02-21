import React, { useEffect, useState } from 'react';
import AuthContainer from '../layouts/AuthContainer';
import { MuiOtpInput } from 'mui-one-time-password-input';
import { useMutation } from '@apollo/client';
import { VERIFY_OTP } from '../../queries/auth';
import { enqueueSnackbar } from 'notistack';
import { Alert, Button } from '@mui/material';

function OTPForm({ otpEmail, onResend }) {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60); // 1 minute
    const [verifyOTP] = useMutation(VERIFY_OTP);

    useEffect(() => {
        if (otp.length === 4) {
            handleVerifyOtp();
        }
    }, [otp]);

    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(intervalId); // Cleanup interval
        }
    }, [timer]);

    const handleResend = () => {
        setTimer(60); // Reset the timer to 60 seconds
        if (onResend) {
            onResend(); // Call the resend function
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const { data } = await verifyOTP({
                variables: {
                    otpCode: otp,
                    email: otpEmail,
                },
            });

            enqueueSnackbar(
                `User registered successfully! Welcome, ${data.verifyOTP.email}`,
                {
                    variant: 'alert',
                    severity: 'success',
                },
            );
            localStorage.setItem('token', data.verifyOTP.token);
            localStorage.setItem('email', data.verifyOTP.email);
            window.location.href = '/';
        } catch (err) {
            enqueueSnackbar(err.message, {
                variant: 'alert',
                severity: 'error',
            });
        }
    };

    return (
        <AuthContainer headerText={'Verify OTP'}>
            <Alert everity="success" sx={{ marginBottom: 2 }}>
                OTP sent successfully. Please check your email.
            </Alert>
            <MuiOtpInput value={otp} onChange={setOtp} />
            <Button
                disabled={timer > 0}
                sx={{ marginTop: 2 }}
                fullWidth
                variant="contained"
                onClick={handleResend}
            >
                {timer > 0 ? `Resend OTP in ${timer} seconds` : 'Resend OTP'}
            </Button>
        </AuthContainer>
    );
}

export default OTPForm;
