import { cookies } from 'next/headers'
import { type NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  cookies().delete('token')

  const redirectUrl = request.nextUrl.clone()

  redirectUrl.pathname = '/auth/sign-in'

  return NextResponse.redirect(redirectUrl)
}
