import { useMutation, useQuery } from '@apollo/client';
import {
    Box,
    Button,
    CircularProgress,
    Grid2 as Grid,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import {
    CREATE_TEMPLATE_MUTATION,
    DELETE_TEMPLATE_MUTATION,
    GET_TEMPLATE_QUERY,
    UPDATE_TEMPLATE_MUTATION,
} from '../queries/template';

function DashboardDetailsPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isCreate = id === 'create';
    const header = isCreate ? 'Template Creation' : 'Update Template';
    const { loading, data } = useQuery(GET_TEMPLATE_QUERY, {
        variables: { id: id },
        skip: isCreate,
    });
    const [createTemplate, { loading: createLoading }] = useMutation(
        CREATE_TEMPLATE_MUTATION,
    );
    const [updateTemplate, { loading: updateLoading }] = useMutation(
        UPDATE_TEMPLATE_MUTATION,
    );
    const [deleteTemplate, { loading: deleteLoading }] = useMutation(
        DELETE_TEMPLATE_MUTATION,
    );
    const {
        handleSubmit,
        control,
        reset,
        formState: { isDirty },
    } = useForm({
        defaultValues: {
            title: '',
            body: '',
        },
    });
    const onSubmit = async (data) => {
        const { title, body } = data;
        if (isCreate) {
            try {
                const { data } = await createTemplate({
                    variables: {
                        title,
                        body,
                    },
                });
                enqueueSnackbar(
                    `Successfully created ${data.addTemplate.title} template.`,
                    {
                        variant: 'alert',
                        severity: 'success',
                    },
                );
                navigate(`/template/${data.addTemplate.id}`);
            } catch (err) {
                enqueueSnackbar(err.message, {
                    variant: 'alert',
                    severity: 'error',
                });
            }
        } else {
            try {
                const { data } = await updateTemplate({
                    variables: {
                        title,
                        body,
                        id,
                    },
                });
                enqueueSnackbar(
                    `Successfully updated ${data.updateTemplate.title} template.`,
                    {
                        variant: 'alert',
                        severity: 'success',
                    },
                );
                navigate(`/template/${data.updateTemplate.id}`);
            } catch (err) {
                enqueueSnackbar(err.message, {
                    variant: 'alert',
                    severity: 'error',
                });
            }
        }
    };
    const handleDelete = async () => {
        try {
            const { data } = await deleteTemplate({
                variables: {
                    id,
                },
            });
            enqueueSnackbar(
                `Successfully deleted ${data.deleteTemplate.title} template.`,
                {
                    variant: 'alert',
                    severity: 'success',
                },
            );
            navigate(`/`);
        } catch (err) {
            enqueueSnackbar(err.message, {
                variant: 'alert',
                severity: 'error',
            });
        }
    };
    useEffect(() => {
        if (data)
            reset({
                title: data.getTemplate.title,
                body: data.getTemplate.body,
            });
    }, [data]);
    return (
        <Box
            sx={{
                width: '100%',
                height: 'calc(100vh - 60px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                    backgroundColor: '#ffffff',
                    maxWidth: { xs: 250, sm: 400 },
                    width: '100%',
                    marginTop: 4,
                }}
            >
                <Typography variant="h5" gutterBottom>
                    {header}
                </Typography>

                {loading ? (
                    <CircularProgress />
                ) : (
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <Stack spacing={2}>
                            <Controller
                                name="title"
                                control={control}
                                rules={{
                                    required: 'Title is required',
                                    maxLength: 32,
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        label="Title"
                                        variant="outlined"
                                        error={!!error}
                                        helperText={error?.message}
                                        fullWidth
                                        {...field}
                                    />
                                )}
                            />
                            <Controller
                                name={`body`}
                                control={control}
                                rules={{
                                    required: 'Body is required',
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        label="Body"
                                        multiline
                                        fullWidth
                                        rows={10}
                                        error={!!error}
                                        helperText={error?.message}
                                        {...field}
                                    />
                                )}
                            />
                            {isCreate ? (
                                <Button
                                    loading={createLoading}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                >
                                    Create
                                </Button>
                            ) : (
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
                                            startIcon={<SaveIcon />}
                                            fullWidth
                                            type="submit"
                                            disabled={!isDirty}
                                            loading={updateLoading}
                                        >
                                            Save
                                        </Button>
                                    </Grid>
                                    <Grid item size={6}>
                                        <Button
                                            color="error"
                                            variant="outlined"
                                            startIcon={<DeleteIcon />}
                                            fullWidth
                                            onClick={handleDelete}
                                            loading={deleteLoading}
                                        >
                                            Delete
                                        </Button>
                                    </Grid>
                                </Grid>
                            )}
                        </Stack>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default DashboardDetailsPage;
