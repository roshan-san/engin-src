import { createContext, useContext, useState } from "react";
import type { OnboardingFormValues } from "../validations/onboarding";
type OnboardingContextType = {
  onboardingData: Partial<OnboardingFormValues>;
  updateData: (newData: Partial<OnboardingFormValues>) => void;
  step: number;
  nextStep: (data?: Partial<OnboardingFormValues>) => void;
  previousStep: () => void;
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export const OnboardingProvider = ({ 
  children,
}: { 
  children: React.ReactNode;
}) => {
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingFormValues>>({});
  const [step, setStep] = useState(2);

  const updateData = (newData: Partial<OnboardingFormValues>) =>
    setOnboardingData((prev) => ({ ...prev, ...newData }));

  const nextStep = (data?: Partial<OnboardingFormValues>) => {
    if (data) {
      updateData(data);
    }
    setStep(Math.min(5, step + 1));
  };

  const previousStep = () => {
    setStep(Math.max(1, step - 1));
  };

  return (
    <OnboardingContext.Provider value={{ 
      onboardingData, 
      updateData, 
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
