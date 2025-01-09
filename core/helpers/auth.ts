import { useSession } from 'next-auth/react';

export const useCurrentUser = () => {
    const session = useSession();
    return session?.data?.user.email;
};

export const useCurrentRole = () => {
    const session = useSession();
    return session?.data?.user?.role;
};

export const getUserByEmail = async (email: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users/email/${email}`);
    const user = await res.json();
    return user;
};

export const createOAuthUser = async (email: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/register-social`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const user = await res.json();
    return user;
};

export const loginOAuthUser = async (email: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/social-login`, {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const user = await res.json();
    return user;
};
