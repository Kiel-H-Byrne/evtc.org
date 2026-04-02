import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Assuming you want to redirect the root path ("/") to "/coming-soon"
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/coming-soon', request.url))
  }
}
