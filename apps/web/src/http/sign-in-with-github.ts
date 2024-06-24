import { api } from './api-client'

interface SignInWithGithubRequest {
  code: string
}

interface SignInWithGithubResponse {
  token: string
}

export const signInWithGithub = async (data: SignInWithGithubRequest) => {
  const { code } = data

  const response = await api
    .post('sessions/github', {
      json: {
        code,
      },
    })
    .json<SignInWithGithubResponse>()

  return response
}
