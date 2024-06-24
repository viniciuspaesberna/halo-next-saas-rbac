import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ForgotPasswordPage = () => {
  return (
    <form action="" className="space-y-4">
      <h1 className="w-full text-center text-xl font-medium">
        Forgot password
      </h1>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" type="email" id="email" />
      </div>

      <Button type="submit" className="w-full">
        Recover password
      </Button>

      <Button type="button" variant="link" size="sm" asChild className="w-full">
        <Link href="/auth/sign-in">Sign in instead</Link>
      </Button>
    </form>
  )
}

export default ForgotPasswordPage
