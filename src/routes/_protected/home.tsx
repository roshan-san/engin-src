import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>Welcome to the Home Page</h1>
    </div>
  </div>
}
