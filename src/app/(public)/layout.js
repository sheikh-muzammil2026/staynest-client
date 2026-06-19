import Footer from '@/components/shared/footer';
import Navbar from '@/components/shared/navbar';
import React from 'react';

const PublicLayout = ({children}) => {
    return (
        <div>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    );
};

export default PublicLayout;