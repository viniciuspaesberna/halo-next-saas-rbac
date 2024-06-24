import { api } from './api-client'

interface SignInWithPasswordRequest {
  email: string
  password: string
}

interface SignInWithPasswordResponse {
  token: string
}

export const signInWithPassword = async (data: SignInWithPasswordRequest) => {
  const { email, password } = data

  const response = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithPasswordResponse>()

  return response
}
