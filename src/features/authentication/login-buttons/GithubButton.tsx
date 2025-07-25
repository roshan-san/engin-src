import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { useAuthActions } from "@convex-dev/auth/react";

export function GithubButton() {
  const { signIn } = useAuthActions();
  
  const handleSignIn = async () => {
    try {
      await signIn("github");
    } catch (error) {
      console.error("GitHub sign-in failed:", error);
      // You could show a toast notification here
    }
  };

  return (
    <Button
      className="bg-[#24292F] hover:bg-[#24292F]/90 text-white"
      onClick={handleSignIn}
    >
      <FaGithub className="h-5 w-5" />
      <span className="text-base">Sign in with Github</span>
    </Button>
  );
}
