import AccessDenied from '@/components/public/AllProperties/DetailsPage/accessDenied';
import PropertyDetails from '@/components/public/AllProperties/DetailsPage/PropertyDetails';
import { PropertyDetailsById } from '@/lib/api/properties';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const page = async ({ params }) => {
    const { id } = await params;
    const user = await getUserSession()
    if (!user) {
        return <div className="w-full min-h-[calc(100vh-80px)] pt-[80px] md:pt-[100px] pb-12 sm:pb-16 px-4 md:px-6 flex items-center justify-center transition-colors duration-300 bg-white dark:bg-gray-900">
            <AccessDenied />
        </div>
    }
    // console.log(id);
    const property = await PropertyDetailsById(id);
    // console.log(property);
    return (
        <PropertyDetails property={property} />
    );
};

export default page;