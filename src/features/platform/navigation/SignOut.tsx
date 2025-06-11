import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { useSignOut } from '@/features/authentication/store/authStore'

export default function SignOutButton() {
  const { mutate: signOut, isPending } = useSignOut()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-full text-red-500 hover:bg-red-100"
      onClick={() => signOut()}
      disabled={isPending}
    >
      <LogOut className="h-5 w-5" />
    </Button>
  )
}
