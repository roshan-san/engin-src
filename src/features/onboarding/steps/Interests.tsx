import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPlus, FaTimes, FaHeart } from "react-icons/fa";
import { useOnboard } from "../context/useOnboard";

export default function Interests() {
  const { currentStep, setCurrentStep, formData, updateFormData } = useOnboard();
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    (formData.interests as string[]) || []
  );
  const [newInterest, setNewInterest] = useState("");

  const addInterest = () => {
    const trimmed = newInterest.trim();
    if (trimmed && !selectedInterests.includes(trimmed)) {
      setSelectedInterests([...selectedInterests, trimmed]);
      setNewInterest("");
    }
  };

  const removeInterest = (index: number) => {
    setSelectedInterests(selectedInterests.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    updateFormData("interests", selectedInterests);
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
              <FaHeart className="text-primary w-5 h-5" />
              Add Your Interests
            </h3>
            <div className="flex gap-3 mb-2">
              <Input
                placeholder="Add an interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (newInterest.trim()) {
                      addInterest();
                    } else if (selectedInterests.length > 0) {
                      handleSubmit();
                    }
                  }
                }}
                autoFocus
                className="h-14 text-lg rounded-xl flex-1"
              />
              <Button
                type="button"
                onClick={addInterest}
                className="h-14 w-14 rounded-xl"
              >
                <FaPlus className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              {selectedInterests.length === 0 ? (
                <p className="text-muted-foreground">
                  No interests added yet. Add some to get started!
                </p>
              ) : (
                selectedInterests.map((interest, index) => (
                  <div
                    key={index}
                    className="bg-primary/10 text-primary px-5 py-2.5 rounded-full flex items-center gap-2 shadow-sm"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => removeInterest(index)}
                      className="hover:text-destructive transition-colors"
                    >
                      <FaTimes className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
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
          {/* isLoading ? "Saving..." : "Next" */}
          Next
        </Button>
      </div>
    </div>
  );
}
