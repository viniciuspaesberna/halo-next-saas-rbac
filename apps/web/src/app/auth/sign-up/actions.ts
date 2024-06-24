'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signUp } from '@/http/sign-up'

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Please, enter your full name',
    }),
    email: z
      .string()
      .email({ message: 'Please, provide a valid e-mail address.' }),
    password: z.string().min(6, 'Password must have at least 6 characters.'),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match.',
    path: ['password_confirmation', 'password'],
  })

export const signUpAction = async (data: FormData) => {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const fieldErrors = result.error.flatten().fieldErrors

    return { success: false, message: null, fieldErrors }
  }

  const { name, email, password } = result.data

  try {
    await signUp({
      name,
      email,
      password,
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
