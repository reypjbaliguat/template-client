interface Credentials {
    email: string;
    password?: string;
}

export const login = async (credentials: Credentials) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
        method: 'POST',
        body: new URLSearchParams({
            email: credentials.email,
            password: credentials.password!
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Origin: process.env.NEXT_PUBLIC_URL!
        }
    });

    return res;
};

export const signUp = async (payload: Credentials) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const error = await response.json();
            return error;
        }
        return response;
    } catch (error) {
        return error;
    }
};
