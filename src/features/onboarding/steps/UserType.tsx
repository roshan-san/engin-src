import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FaBriefcase,
  FaUserCog,
  FaUserGraduate,
  FaUserTie,
} from "react-icons/fa";
import { useOnboarding } from "../context/OnboardContext";

const roles = [
  {
    id: "Creator/Collaborator",
    title: "Creator/Collaborator",
    icon: FaUserCog,
    description: "Build and collaborate on projects",
  },
  {
    id: "Mentor",
    title: "Mentor",
    icon: FaUserGraduate,
    description: "Guide and support others",
  },
  {
    id: "Investor",
    title: "Investor",
    icon: FaUserTie,
    description: "Support promising projects",
  },
];

export default function UserType() {
  const { nextStep, previousStep, onboardingData } = useOnboarding();
  const [selectedUserType, setSelectedUserType] = useState(
    onboardingData.user_type || "",
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      nextStep({ user_type: selectedUserType });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && selectedUserType) {
      handleSubmit();
    }
  };

  return (
    <div
      className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
          <FaBriefcase className="text-primary w-5 h-5" />
          Select your primary role
        </h3>
        <RadioGroup
          value={selectedUserType}
          onValueChange={setSelectedUserType}
          className="grid gap-4 w-full"
        >
          {roles.map((type) => {
            const Icon = type.icon;
            return (
              <label
                key={type.id}
                className={`flex items-center space-x-4 p-6 rounded-xl border cursor-pointer transition-all duration-200 ease-in-out ${
                  selectedUserType === type.id
                    ? "border-primary bg-primary/10 shadow-lg scale-[1.02]"
                    : "border-border hover:border-primary/50 hover:shadow-md hover:scale-[1.01]"
                }`}
              >
                <RadioGroupItem value={type.id} id={type.id} className="mt-1" />
                <div className="flex items-center gap-5 flex-1">
                  <div
                    className={`p-3.5 rounded-full transition-all duration-200 ${
                      selectedUserType === type.id
                        ? "bg-primary text-primary-foreground scale-110"
                        : "bg-muted/80 hover:bg-muted"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-lg">{type.title}</div>
                    <div className="text-sm text-muted-foreground/90">
                      {type.description}
                    </div>
                  </div>
                </div>
              </label>
            );
          })}
        </RadioGroup>
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
          className="flex-1 h-12 text-lg font-medium transition-all hover:scale-[1.02]"
        >
          {isLoading ? "Saving..." : "Finish"}
        </Button>
      </div>
    </div>
  );
}
