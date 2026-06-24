export const getTransactions = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/transactions`);
    const data = await res.json();
    return data;
}