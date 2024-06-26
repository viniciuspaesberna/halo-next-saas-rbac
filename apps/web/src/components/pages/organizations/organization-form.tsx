'use client'

import { AlertTriangle, Check, Loader2 } from 'lucide-react'

import { createOrganizationAction } from '@/app/(app)/create-organization/actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import { cn } from '@/lib/utils'

export const OrganizationForm = () => {
  const [state, handleSubmit, isPending] = useFormState(
    createOrganizationAction,
  )

  const { success, message, fieldErrors } = state

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!success && message && (
        <Alert variant="destructive" className="text-sm">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save organization failed</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      {success && message && (
        <Alert variant="success" className="text-sm">
          <Check className="size-4" />
          <AlertTitle>Organization saved</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Organization name</Label>
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
        <Label htmlFor="domain">E-mail domain</Label>
        <Input
          name="domain"
          type="text"
          id="domain"
          inputMode="url"
          placeholder="example.com"
          className={cn(
            '',
            fieldErrors?.domain && ' border-rose-500 dark:border-rose-400',
          )}
        />

        {fieldErrors?.domain && (
          <p className="text-xs font-medium text-rose-500 dark:text-rose-400">
            {fieldErrors.domain[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex space-x-2">
          <Checkbox
            name="shouldAttachUsersByDomain"
            id="shouldAttachUsersByDomain"
            className="mt-1"
          />
          <label htmlFor="shouldAttachUsersByDomain" className=" space-y-1">
            <span className="text-sm font-medium leading-none">
              Auto-join new members
            </span>
            <p className="text-sm text-muted-foreground">
              This will automatically invite all members with same e-mail domain
              to the this organization
            </p>
          </label>
        </div>

        {fieldErrors?.shouldAttachUsersByDomain && (
          <p className="text-xs font-medium text-rose-500 dark:text-rose-400">
            {fieldErrors.shouldAttachUsersByDomain[0]}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? <Loader2 className="animate-spin" /> : 'Save organization'}
      </Button>
    </form>
  )
}
