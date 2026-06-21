import Profile from '@/components/dashboard/tenant/profile';
import UserProfile from '@/components/shared/userProfile';
import React from 'react';

const ProfilePage = async () => {
    const user = await getUserSession()
    return (
        <div>
            {/* <Profile /> */}
            <UserProfile user={user} />
        </div>
    );
};

export default ProfilePage;