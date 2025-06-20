import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaUser } from "react-icons/fa";
import { useOnboarding } from "../context/OnboardContext";

export default function UserName() {
  const { nextStep, previousStep, onboardingData } = useOnboarding();
  const [username, setUsername] = useState(onboardingData.username || "");

  const handleSubmit = () => {
    nextStep({ username });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && username.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
          <FaUser className="text-primary w-5 h-5" />
          Choose your username
        </h3>
        <div className="space-y-4">
          <Input
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-14 text-lg rounded-xl"
            autoFocus
          />
        </div>
      </div>
      <div className="w-full p-4 flex justify-between gap-4 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={previousStep}
          className="flex-1 h-12 text-lg font-medium hover:bg-muted/50 transition-colors"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={!username.trim()}
          className="flex-1 h-12 text-lg font-medium transition-all hover:scale-[1.02]"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
