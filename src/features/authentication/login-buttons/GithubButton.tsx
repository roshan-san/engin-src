import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"
import supabase from "@/utils/supabase"

export function GithubButton() { 
    return (
        <Button 
        className="bg-[#24292F] hover:bg-[#24292F]/90 text-white"
        onClick={() => supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo:`${import.meta.env.VITE_APP_URL}/register`
            }
        })}
        >
            <FaGithub className="h-5 w-5" />
            <span className="text-base">
                Sign in with Github
            </span>
        </Button>
    )
}