import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"
import { Loader2 } from "lucide-react"
import { signInMutation } from "../contexts/useAuth"

export function GithubButton() { 
    const signIn = signInMutation("github")
    
    return (
        <Button 
            className="bg-[#24292F] hover:bg-[#24292F]/90 text-white"
            onClick={() => signIn.mutate()}
            disabled={signIn.isPending}
        >
            {signIn.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
                <FaGithub className="h-5 w-5" />
            )}
            <span className="text-base">
                Sign in with Github
            </span>
        </Button>
    )
}