import { api } from './api-client'

interface getOrganizationsResponse {
  organizations: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
  }[]
}

export const getOrganizations = async () => {
  const response = await api
    .get('organizations')
    .json<getOrganizationsResponse>()

  return response
}
