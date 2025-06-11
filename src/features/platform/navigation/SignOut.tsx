"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { LogOut, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useMutation } from '@tanstack/react-query'

export default function SignOutButton() {
  const router = useRouter()

  const { mutate: signOut, isPending } = useMutation({
    mutationFn: async () => {
      const supabase = createClient()
      await supabase.auth.signOut()
    },
    onSuccess: () => {
      router.push('/')
    },
    onError: (error) => {
      console.error('Error signing out:', error)
    }
  })

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-full text-red-500 hover:bg-red-100"
      onClick={() => signOut()}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <LogOut className="h-5 w-5" />
      )}
    </Button>
  )
}
