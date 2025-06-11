import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/features/authentication/context/AuthContext'

export default function SignOutButton() {
  const {signOut}= useAuth()

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-full text-red-500 hover:bg-red-100"
      onClick={() => signOut()}
    >
      <LogOut className="h-5 w-5" />
    </Button>
  )
}
