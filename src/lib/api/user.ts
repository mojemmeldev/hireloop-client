const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URI || "http://localhost:5000";


export const getUserPremiumById = async (userId:string) => {
    const res = await fetch(`${BASE_URL}/users/${userId}/premium`);
    return res.json();
};
