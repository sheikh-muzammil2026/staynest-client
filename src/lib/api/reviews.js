
export const submitReview  = async(newReview)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/reviews`, {
        method: "POST",
            headers: {
            "content-type" : 'application/json'
            },
        body: JSON.stringify(newReview)
        
    })
     const data = await res.json();
        return data;
}


export const getReviws = async()=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/reviews`);
  const data = await res.json();
  return data;
}
