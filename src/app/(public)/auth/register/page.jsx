import RegisterPage from '@/components/auth/register';
import React from 'react';

export const metadata = {
    title: "Register",
    description: "Sign up to your StayNest account.",
};
const page = () => {
    return (
        <RegisterPage />
    );
};

export default page;