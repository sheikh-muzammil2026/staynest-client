import LoginPage from '@/components/auth/login';
import React from 'react';

export const metadata = {
    title: "Login",
    description: "Sign in to your StayNest account.",
};

const page = () => {
    return (
        <LoginPage />
    );
};

export default page;