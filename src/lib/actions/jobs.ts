import type { NewJobFormData as SharedNewJobFormData } from "@/lib/types/jobs";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URI || "http://localhost:5000";

// Re-exported from the shared type module so existing imports keep working.
export type NewJobFormData = SharedNewJobFormData;

export const createJob = async (data: NewJobFormData) => {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data), // actually send the form data
    });
    return res.json();
};


export const deleteJob = async (jobId : string)=>{
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
        method: "DELETE",        
    });
    return res.json();
}


export const updateJob = async ( jobId: string, data: Partial<NewJobFormData> ) => {
  const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};
