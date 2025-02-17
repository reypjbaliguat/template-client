import { CircularProgress, Grid2 as Grid } from '@mui/material';
import TopNav from '../components/layouts/TopNav';
import TemplateContainer from '../components/template/TemplateContainer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Template from '../components/template/Template';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const GET_TEMPLATES_QUERY = gql`
    query GetTemplates($userId: ID!) {
        getTemplates(userId: $userId) {
            id
            title
            body
        }
    }
`;

function Dashboard() {
    const { loading, data, refetch } = useQuery(GET_TEMPLATES_QUERY, {
        variables: { userId: localStorage.getItem('id') },
    });
    useEffect(() => {
        refetch();
    }, [data]);

    return (
        <Grid container flexDirection={'column'}>
            <TopNav />
            {loading ? (
                <CircularProgress />
            ) : (
                <TemplateContainer>
                    {data.getTemplates.map(({ id, title, body }) => (
                        <Template id={id} key={id} title={title} body={body} />
                    ))}

                    <Grid
                        size={{ xs: 12, sm: 6, lg: 3, md: 4 }}
                        sx={{
                            border: '1px solid hsl(215, 15%, 92%)',
                            borderRadius: 4,
                            minHeight: 400,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            transition: 'all .5s',
                            ':hover': {
                                boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',
                            },
                        }}
                    >
                        <Link to="/template/create">
                            <AddCircleOutlineIcon
                                color="primary"
                                fontSize="large"
                            />
                        </Link>
                    </Grid>
                </TemplateContainer>
            )}
        </Grid>
    );
}

export default Dashboard;
