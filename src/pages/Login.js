import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login] = useMutation(LOGIN);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login({ variables: { email, password } });
            localStorage.setItem('token', data.login.token);
            window.location.href = '/dashboard';
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
