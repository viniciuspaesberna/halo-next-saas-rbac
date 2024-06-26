import { Header } from '@/components/header'

export default async function Home() {
  return (
    <div className="space-y-4 py-4">
      <Header />

      <main className="mx-auto flex w-full max-w-[1200px] items-center justify-center space-y-4">
        <p className="mt-80 text-xl text-muted-foreground">
          Select an organization
        </p>
      </main>
    </div>
  )
}
