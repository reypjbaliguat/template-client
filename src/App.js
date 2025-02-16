import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { client } from './apolloClient';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import { SnackbarProvider } from 'notistack';
import StatusSnackbar from './components/StatusSnackBar';
import './App.css';

function App() {
    return (
        <ApolloProvider client={client}>
            <SnackbarProvider
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                Components={{ alert: StatusSnackbar }}
                maxSnack={3}
            >
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </Router>
            </SnackbarProvider>
        </ApolloProvider>
    );
}

export default App;
