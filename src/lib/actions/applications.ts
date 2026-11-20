const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URI || "http://localhost:5000";


export async function applyToAJOb(data){
    const res = await fetch(`${BASE_URL}/applications`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(data), // actually send the form data
    });
    return res.json();
}