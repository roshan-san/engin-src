import { useMutation } from "convex/react";
import { createContext, useContext, useState } from "react";
import {api} from "@/../convex/_generated/api"
import { useConvexAuth } from "convex/react";

type OnboardingContextType = {
  onboardingData: Record<string, any>;
  step: number;
  nextStep: (data?: Record<string, any>) => void;
  previousStep: () => void;
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export const OnboardingProvider = ({ 
  children,
}: { 
  children: React.ReactNode;
}) => {
  const [onboardingData, setOnboardingData] = useState<Record<string, any>>({});
  const [step, setStep] = useState(1);
  const { isAuthenticated } = useConvexAuth();

  const updateData = (newData: Record<string, any>) =>
    setOnboardingData((prev) => ({ ...prev, ...newData }));
  const createProfile = useMutation(api.profile.createProfile)
  const nextStep = (data?: Record<string, any>) => {
    if (data) {
      updateData(data);
      if (step == 7) {
        if (!isAuthenticated) {
          console.error("User is not authenticated, cannot create profile");
          alert("Please sign in to complete your profile");
          return;
        }
        const finalData = { ...onboardingData, ...data };
        console.log("final data", finalData);
        createProfile(finalData)
          .then((result) => {
            console.log("Profile created successfully:", result);
          })
          .catch((error) => {
            console.error("Failed to create profile:", error);
          });
      }
    }
    setStep(Math.min(7, step + 1));
  };

  const previousStep = () => {
    setStep(Math.max(1, step - 1));
  };

  return (
    <OnboardingContext.Provider value={{ 
      onboardingData,  
      step, 
      nextStep, 
      previousStep,
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error("useOnboarding must be used within OnboardingProvider");
  return context;
};
