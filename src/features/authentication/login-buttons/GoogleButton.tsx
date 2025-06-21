import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useAuthActions } from "@convex-dev/auth/react";

export function GoogleButton() {
  const { signIn } = useAuthActions();
  console.log(signIn);
  return (
    <Button
      className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
      onClick={() => void signIn("google")}
    >
      <FcGoogle className="h-5 w-5" />
      <span className="text-base">Sign in with Google</span>
    </Button>
  );
}
