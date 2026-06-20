import Favorites from '@/components/dashboard/tenant/fevorites';
import { getFavorites } from '@/lib/api/favorites';
import React from 'react';

const FavoritesPage = async () => {
    const favorites = await getFavorites()

    return (
        <div>
            <Favorites data={favorites} />
        </div>
    );
};

export default FavoritesPage;