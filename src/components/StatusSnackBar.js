import { Alert } from '@mui/material';
import { SnackbarContent } from 'notistack';
import { forwardRef } from 'react';

const SuccessSnackbar = forwardRef(function SuccessSnackbar(props, ref) {
    const {
        // You have access to notistack props and options 👇🏼
        id,
        message,
        // as well as your own custom props 👇🏼
        severity,
        ...other
    } = props;

    return (
        <SnackbarContent
            ref={ref}
            role="alert"
            {...other}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
            <Alert variant="filled" severity={severity} className="text-white">
                {message}
            </Alert>
        </SnackbarContent>
    );
});

export default SuccessSnackbar;
