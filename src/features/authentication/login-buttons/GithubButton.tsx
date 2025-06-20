import { Button } from "@/components/ui/button"
import { FaGithub } from "react-icons/fa"
import { useAuthActions } from "@convex-dev/auth/react";


export function GithubButton() {
    const {signIn}= useAuthActions()
    return (
        <Button
            className="bg-[#24292F] hover:bg-[#24292F]/90 text-white"
            onClick={() => void signIn("github")}
        >
            <FaGithub className="h-5 w-5" />

            <span className="text-base">
                Sign in with Github
            </span>
        </Button>
    )
}