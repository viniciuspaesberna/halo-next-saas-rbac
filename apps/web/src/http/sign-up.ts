import { api } from './api-client'

interface SignUpRequest {
  name: string
  email: string
  password: string
}

type SignUpResponse = void

export const signUp = async (data: SignUpRequest): Promise<SignUpResponse> => {
  const { name, email, password } = data

  await api.post('users', {
    json: {
      name,
      email,
      password,
    },
  })
}
