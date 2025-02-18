import {
    Button,
    Card,
    CardContent,
    Grid2 as Grid,
    TextField,
    Typography,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { enqueueSnackbar } from 'notistack';

function Template({ title, body, id }) {
    const bodyRef = useRef();
    const handleCopy = () => {
        navigator.clipboard.writeText(bodyRef.current.value);
        enqueueSnackbar('Successfully copied to clipboard.', {
            variant: 'alert',
            severity: 'success',
        });
    };
    return (
        <Grid size={{ xs: 12, sm: 6, lg: 3, md: 4 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {title}
                    </Typography>

                    <TextField
                        id="outlined-multiline-static"
                        label="Body"
                        inputRef={bodyRef}
                        multiline
                        fullWidth
                        rows={10}
                        defaultValue={body}
                    />

                    <Grid
                        container
                        justifyContent={'space-between'}
                        spacing={1}
                        mt={2}
                    >
                        <Grid item size={6}>
                            <Button
                                color="primary"
                                variant="outlined"
                                startIcon={<ContentCopyIcon />}
                                fullWidth
                                onClick={handleCopy}
                            >
                                Copy
                            </Button>
                        </Grid>
                        <Grid item size={6}>
                            <Link to={`/template/${id}`}>
                                <Button
                                    variant="outlined"
                                    color="success"
                                    startIcon={<EditIcon />}
                                    fullWidth
                                >
                                    Edit
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Template;
