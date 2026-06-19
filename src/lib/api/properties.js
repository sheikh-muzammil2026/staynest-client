export const getAllProperties = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/properties`);
    const data = await res.json()
    return data;
}