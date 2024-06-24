'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { signInWithGithub } from '@/app/auth/actions'
import { signUpAction } from '@/app/auth/sign-up/actions'
import githubIcon from '@/assets/github.svg'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/use-form-state'
import { cn } from '@/lib/utils'

export const SignUpForm = () => {
  const router = useRouter()

  const onSuccess = () => {
    router.push('/auth/sign-in')
  }

  const [state, handleSubmit, isPending] = useFormState(signUpAction, onSuccess)

  const { fieldErrors, message, success } = state

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="w-full text-center text-xl font-medium">Register</h1>

        {!success && message && (
          <Alert variant="destructive" className="text-sm">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            name="name"
            id="name"
            className={cn(
              '',
              fieldErrors?.name && ' border-rose-500 dark:border-rose-400',
            )}
          />

          {fieldErrors?.name && (
            <p className="text-xs font-medium text-rose-500 dark:text-rose-400">
              {fieldErrors.name[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            name="email"
            type="email"
            id="email"
            className={cn(
              '',
              fieldErrors?.email && ' border-rose-500 dark:border-rose-400',
            )}
          />

          {fieldErrors?.email && (
            <p className="text-xs font-medium text-rose-500 dark:text-rose-400">
              {fieldErrors.email[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            type="password"
            id="password"
            className={cn(
              '',
              fieldErrors?.password && ' border-rose-500 dark:border-rose-400',
            )}
          />

          {fieldErrors?.password && (
            <p className="text-xs font-medium text-rose-500 dark:text-rose-400">
              {fieldErrors.password[0]}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="password_confirmation">Confirm your password</Label>
          <Input
            name="password_confirmation"
            type="password"
            id="password_confirmation"
            className={cn(
              '',
              fieldErrors?.password_confirmation &&
                ' border-rose-500 dark:border-rose-400',
            )}
          />

          {fieldErrors?.password_confirmation && (
            <p className="text-xs font-medium text-rose-500 dark:text-rose-400">
              {fieldErrors?.password_confirmation[0]}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isPending} className="w-full">
          {isPending ? <Loader2 className="animate-spin" /> : 'Create account'}
        </Button>

        <Button
          type="button"
          variant="link"
          size="sm"
          asChild
          className="w-full"
        >
          <Link href="/auth/sign-in">Already registered? Sign in</Link>
        </Button>
      </form>

      <Separator className="mt-4" />

      <form action={signInWithGithub}>
        <Button type="submit" variant="outline" className="mt-4 w-full">
          <Image
            src={githubIcon}
            alt=""
            className="text-forground mr-2 size-4"
          />
          Sign up with Github
        </Button>
      </form>
    </>
  )
}
