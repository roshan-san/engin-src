import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { Loader2 } from "lucide-react"
import { signInMutation } from "../store/authStore"

export function GoogleButton() {  
    const signIn = signInMutation("google")
    
    return (
        <Button 
            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
            onClick={() => signIn.mutate()}
            disabled={signIn.isPending}
        >
            {signIn.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                <FcGoogle className="h-5 w-5" />
            )}
            <span className="text-base">
                Sign in with Google
            </span>
        </Button>
    )
}