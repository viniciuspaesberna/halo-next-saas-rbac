import { Header } from '@/components/header'
import { OrganizationForm } from '@/components/pages/organizations/organization-form'

const CreateOrganizationPage = () => {
  return (
    <div className="space-y-4 py-4">
      <Header />

      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1 className="text-2xl font-bold">Create Organization</h1>

        <OrganizationForm />
      </main>
    </div>
  )
}

export default CreateOrganizationPage
