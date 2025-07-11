import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import { LogOut } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export default function SignOutButton() {
  const { signOut } = useAuthActions();
  const navigate = useNavigate()
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 rounded-full text-red-500 hover:bg-red-100"
      onClick={() => {
        navigate({to:"/"})
        signOut()}}
    >
      <LogOut className="h-5 w-5" />
    </Button>
  );
}
