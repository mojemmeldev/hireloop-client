const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URI || "http://localhost:5000";

// Shape of the job form data sent to the API
export type NewJobFormData = {
    title: string;
    company: string;
    category: string;
    jobType: string;
    isRemote: boolean;
    location: string;
    deadline: string;
    minSalary: string;
    maxSalary: string;
    salaryFrequency: string;
    responsibilities: string;
    qualifications: string;
};

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
