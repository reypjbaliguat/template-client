import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';

function LogoutDialog({ open, handleClose }) {
    const handleSignOut = () => {
        localStorage.removeItem('token'); // Remove token
        localStorage.removeItem('id'); // Remove id
        localStorage.removeItem('email'); // Remove email
        window.location.href = '/login'; // Redirect to login page
    };
    return (
        <Dialog onClose={handleClose} open={open} sx={{ padding: 4 }}>
            <DialogContent>
                <Button variant="contained" onClick={handleSignOut}>
                    {' '}
                    Logout{' '}
                </Button>
            </DialogContent>
        </Dialog>
    );
}

export default LogoutDialog;
