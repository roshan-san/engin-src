import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"
import { useAuth } from "../context/AuthContext"

export function GithubButton() { 
    const {signInWithGitHub}=useAuth() 
    return (
        <Button 
        className="bg-[#24292F] hover:bg-[#24292F]/90 text-white"
        onClick={signInWithGitHub}
        >
            <FaGithub className="h-5 w-5" />
            <span className="text-base">
                Sign in with Github
            </span>
        </Button>
    )
}