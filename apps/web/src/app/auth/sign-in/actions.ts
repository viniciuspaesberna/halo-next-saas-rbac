'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(6, 'Password must have at least 6 characters.'),
})

export const signInWithEmailAndPassword = async (data: FormData) => {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors

    return { success: false, message: null, fieldErrors }
  }

  const { email, password } = result.data

  try {
    const { token } = await signInWithPassword({
      email,
      password,
    })

    cookies().set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return {
        success: false,
        message,
        fieldErrors: null,
      }
    }

    console.error(error)
    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      fieldErrors: null,
    }
  }

  return {
    success: true,
    message: 'Signed in with success',
    fieldErrors: null,
  }
}
