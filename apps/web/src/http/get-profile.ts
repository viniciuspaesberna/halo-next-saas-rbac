import { api } from './api-client'

interface getProfileResponse {
  user: {
    id: string
    name: string
    email: string
    avatarUrl: string | null
  }
}

export const getProfile = async () => {
  const response = await api.get('profile').json<getProfileResponse>()

  return response
}
