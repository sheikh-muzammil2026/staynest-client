export const submitFavorites = async(payload)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/favorites`,{
        method: "POST",
            headers: {
            "content-type" : 'application/json'
            },
        body: JSON.stringify(payload)
        
    })
         const data = await res.json();
        return data;
}