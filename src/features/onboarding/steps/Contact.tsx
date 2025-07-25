import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { useOnboard } from "../context/useOnboard";

export default function Contact() {
  const { currentStep, setCurrentStep, formData, updateFormData } = useOnboard();
  const [githubUrl, setGithubUrl] = useState(formData.github_url as string || "");
  const [linkedinUrl, setLinkedinUrl] = useState(
    formData.linkedin_url as string || ""
  );

  const handleSubmit = () => {
    updateFormData("github_url", githubUrl);
    updateFormData("linkedin_url", linkedinUrl);
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
          <FaGithub className="text-primary w-5 h-5" />
          Add your social links
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <FaGithub className="w-6 h-6 text-foreground/80" />
            <Input
              placeholder="GitHub URL"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-14 text-lg rounded-xl"
              autoFocus
            />
          </div>
          <div className="flex items-center gap-3">
            <FaLinkedinIn className="w-6 h-6 text-foreground/80" />
            <Input
              placeholder="LinkedIn URL"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              className="h-14 text-lg rounded-xl"
            />
          </div>
        </div>
      </div>
      <div className="w-full p-4 flex justify-between gap-4 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          className="flex-1 h-12 text-lg font-medium hover:bg-muted/50 transition-colors"
        >
          Previous
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          className="flex-1 h-12 text-lg font-medium transition-all hover:scale-[1.02]"
        >
          Finish
        </Button>
      </div>
    </div>
  );
}
