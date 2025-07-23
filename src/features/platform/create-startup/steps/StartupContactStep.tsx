import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Mail, Phone } from "lucide-react";
import { useCreateStartup } from "../context/CreateStartupContext";

export const StartupContactStep = () => {
  const {
    startupData,
    handleChange,
    handleCreate,
    previousStep,
    isCreating,
  } = useCreateStartup();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCreate();
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4">
      <div className="flex flex-col gap-6 w-full max-w-md">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
          <Globe className="text-primary w-5 h-5" />
          Contact Information
        </h3>
        <p className="text-sm text-muted-foreground text-center">
          Add your startup's contact details (optional)
        </p>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <Input
              name="website"
              placeholder="Website URL"
              value={startupData.website || ""}
              onChange={handleChange}
              className="h-12 text-base rounded-xl"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <Input
              name="email"
              type="email"
              placeholder="Contact email"
              value={startupData.email || ""}
              onChange={handleChange}
              className="h-12 text-base rounded-xl"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-muted-foreground" />
            <Input
              name="phone"
              type="tel"
              placeholder="Phone number"
              value={startupData.phone || ""}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="h-12 text-base rounded-xl"
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
        <Button
          onClick={handleCreate}
          disabled={isCreating}
          className="flex-1 h-12 text-lg font-medium"
        >
          {isCreating ? "Creating..." : "Create Startup"}
        </Button>
      </div>
    </div>
  );
}; 