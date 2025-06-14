import type { ProfileInsert } from "@/types/supa-types";
import { createContext, useContext, useState } from "react";
type OnboardingContextType = {
  onboardingData: Partial<ProfileInsert>;
  step: number;
  nextStep: (data?: Partial<ProfileInsert>) => void;
  previousStep: () => void;
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export const OnboardingProvider = ({ 
  children,
}: { 
  children: React.ReactNode;
}) => {
  const [onboardingData, setOnboardingData] = useState<Partial<ProfileInsert>>({});
  const [step, setStep] = useState(1);

  const updateData = (newData: Partial<ProfileInsert>) =>
    setOnboardingData((prev) => ({ ...prev, ...newData }));

  const nextStep = (data?: Partial<ProfileInsert>) => {
    if (data) {
      updateData(data);
      console.log(onboardingData)
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
