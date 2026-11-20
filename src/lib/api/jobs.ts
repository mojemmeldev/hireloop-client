import { JobRow } from "../types/jobs";


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URI || "http://localhost:5000";

export const getJobs = async (query:''):Promise<JobRow[]>=>{
    const res =await fetch(`${BASE_URL}/jobs?${query}`)
    return res.json();

}