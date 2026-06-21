// ১. সব প্রোপার্টি ডেটা নিয়ে আসার ফাংশন
export const getAllProperties = async () => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URI;
        if (!baseUrl) {
            throw new Error("NEXT_PUBLIC_SERVER_URI is not defined in environment variables.");
        }

        const res = await fetch(`${baseUrl}/properties`, {
            next: { revalidate: 60 } // প্রতি ৬০ সেকেন্ড পর পর ডেটা ব্যাকগ্রাউন্ডে আপডেট হবে (Next.js Specific)
        });

        // যদি রেসপন্স ওকে (200-299) না হয়
        if (!res.ok) {
            throw new Error(`Failed to fetch properties. Status: ${res.status}`);
        }

        const data = await res.json();
        return data;

    } catch (error) {
        console.error("Error in getAllProperties:", error.message);
        return []; // ক্র্যাশ এড়াতে এরর হলে একটি খালি অ্যারে রিটার্ন করা নিরাপদ
    }
};


// ২. ফিচারড প্রোপার্টি ডেটা নিয়ে আসার ফাংশন
export const getFeaturedProperties = async () => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_SERVER_URI;

        const res = await fetch(`${baseUrl}/featuredProperties`, {
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch featured properties. Status: ${res.status}`);
        }
        const data = await res.json();
        return data;

    } catch (error) {
        console.error("Error in getFeaturedProperties:", error.message);
        return []; // সেফটি ফলব্যাক
    }
};


export const PropertyDetailsById = async(id)=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/properties/${id}`);
  const data = await res.json();
  return data;
}



// ✅ API call function (ফাইল: @/lib/api/properties)
export const addProperty = async (propertyData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/owner/properties`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
    });
    
    // ✅ বাগ ফিক্স: response.json() আগে কল করতে হবে, নয়তো data অবজেক্টটি পাওয়া যাবে না
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }

    return data;
};