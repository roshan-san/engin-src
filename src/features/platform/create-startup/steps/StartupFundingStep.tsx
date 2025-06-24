import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaMoneyBillWave } from "react-icons/fa";
import { useCreateStartup } from "../context/CreateStartupContext";
import { useNavigate } from "@tanstack/react-router";

export const StartupFundingStep = () => {
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
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
          <FaMoneyBillWave className="text-primary w-5 h-5" />
          How much funding do you have?
        </h3>
        <Input
          name="funding"
          type="number"
          placeholder="Enter funding amount"
          value={startupData.funding || ""}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="h-14 text-lg rounded-xl"
          autoFocus
        />
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