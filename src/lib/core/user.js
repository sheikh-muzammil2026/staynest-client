'use client'

import { authClient } from "../auth-client";

export const getUserInfo = async()=>{
    const { data: session } = authClient.useSession();
    const user = session?.user;
    return user || null

}  