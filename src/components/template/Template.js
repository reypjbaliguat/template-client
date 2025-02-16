import {
    Button,
    Card,
    CardContent,
    Grid2 as Grid,
    TextField,
    Typography,
} from '@mui/material';

function Template() {
    return (
        <Grid size={{ xs: 12, sm: 6, lg: 3, md: 4 }} lg>
            <Card variant="outlined">
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Title
                    </Typography>
                    <TextField
                        id="outlined-multiline-static"
                        label="Body"
                        multiline
                        fullWidth
                        rows={10}
                        sx={{ color: 'text.secondary' }}
                        defaultValue="Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging cross all continents except Antarctica Lizards are a widespread group of squamate
                                reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica"
                    />
                    <Grid container spacing={1} mt={2}>
                        <Grid item size={4}>
                            <Button
                                color="primary"
                                variant="contained"
                                fullWidth
                            >
                                Copy
                            </Button>
                        </Grid>
                        <Grid item size={4}>
                            <Button
                                color="success"
                                variant="contained"
                                fullWidth
                            >
                                Edit
                            </Button>
                        </Grid>
                        <Grid item size={4}>
                            <Button fullWidth color="error" variant="contained">
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default Template;
