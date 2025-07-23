import { Button } from "@/components/ui/button";
import { FaInfoCircle } from "react-icons/fa";
import { useCreateStartup } from "../context/CreateStartupContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const StartupDescriptionStep = () => {
  const { startupData, handleChange, nextStep, previousStep } =
    useCreateStartup();

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
          <FaInfoCircle className="text-primary w-5 h-5" />
          Describe your startup
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="description" className="text-sm font-medium mb-2 block">
              Description
            </Label>
            <Textarea
              name="description"
              placeholder="Tell us about your startup..."
              value={startupData.description || ""}
              onChange={handleChange}
              className="h-32 text-base resize-none"
              autoFocus
            />
          </div>
          <div>
            <Label htmlFor="tags" className="text-sm font-medium mb-2 block">
              Key Features/Tags (comma-separated)
            </Label>
            <Input
              name="tags"
              placeholder="e.g., AI-powered, Real-time monitoring, Cloud-based..."
              value={startupData.tags || ""}
              onChange={handleChange}
              className="text-base"
            />
          </div>
        </div>
      </div>
      <div className="w-full p-4 flex justify-between gap-4 mt-4">
        <Button
          type="button"
          variant="outline"
          onClick={previousStep}
          className="flex-1 h-12 text-lg font-medium"
        >
          Previous
        </Button>
        <Button onClick={nextStep} className="flex-1 h-12 text-lg font-medium">
          Next
        </Button>
      </div>
    </div>
  );
}; 