
import { getUsers } from '@/lib/api/user';
import React from 'react';

const JobDetailPage =async () => {
    const users = await getUsers()

    console.log(users);
    return (
        <div>
            <h2>job details</h2>
        </div>
    );
};

export default JobDetailPage
;