import PropertyDetails from '@/components/public/AllProperties/DetailsPage/PropertyDetails';
import { PropertyDetailsById } from '@/lib/api/properties';
import React from 'react';

const page = async ({ params }) => {
    const { id } = await params;
    console.log(id);
    const property = await PropertyDetailsById(id);
    console.log(property);
    return (
        <PropertyDetails property={property} />
    );
};

export default page;