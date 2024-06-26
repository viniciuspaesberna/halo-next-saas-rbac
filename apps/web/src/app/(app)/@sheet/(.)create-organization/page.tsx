import { InterceptedSheetContent } from '@/components/intercepted-sheet-content'
import { OrganizationForm } from '@/components/pages/organizations/organization-form'
import { Sheet, SheetHeader, SheetTitle } from '@/components/ui/sheet'

const CreateOrganizationPage = () => {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create organization</SheetTitle>
        </SheetHeader>

        <div className="py-4">
          <OrganizationForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  )
}

export default CreateOrganizationPage
