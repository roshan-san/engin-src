import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"
import supabase from "@/utils/supabase"

export function GoogleButton() {  
    return (
        <Button 
            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
            onClick={() => supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo:`${import.meta.env.VITE_APP_URL}/register`
                }
            })}
        >
            <FcGoogle className="h-5 w-5" />
            <span className="text-base">
                Sign in with Google
            </span>
        </Button>
    )
}