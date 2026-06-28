import { NextResponse } from 'next/server'
import { getUserSession } from './lib/core/session'

export async function proxy(request) {
  const user = await getUserSession()

  if (!user) {
    return NextResponse.redirect(new URL('/', request.url))
  }

}

export const config = {
  matcher: '/dashboard/:path*',
}