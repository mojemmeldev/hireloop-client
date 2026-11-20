import { getJobs } from '@/lib/api/jobs';
import React from 'react';

const BrowserJobsPage = async ({searchParams}:{searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) => {
    const search= await searchParams;
    const urlSearch= new URLSearchParams(search as Record<string,string>)
    const query = urlSearch.toString()
    console.log('search params',query);

    const jobs = await getJobs(query as '')


        return (
        <div>
            <h2>browser job page</h2>
            {jobs.map((job)=>(
                <li key={job._id}>{job.title}</li>
            ))}
        </div>
    );
};

export default BrowserJobsPage;