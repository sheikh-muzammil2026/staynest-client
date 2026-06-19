import { NextResponse } from 'next/server'
import { getSession } from './lib/core/session'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
    const user = await getSession()
   
    
  if(!user){
    return NextResponse.redirect(new URL('/', request.url))
  }
}
 
export const config = {
  matcher: '/dashboard/:path*',
}