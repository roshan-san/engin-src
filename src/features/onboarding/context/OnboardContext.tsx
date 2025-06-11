import { createContext, useContext, useState } from "react";
import type { OnboardingFormValues } from "../validations/onboarding";

type OnboardingContextType = {
  onboardingData: Partial<OnboardingFormValues>;
  updateData: (newData: Partial<OnboardingFormValues>) => void;
};

const OnboardingContext = createContext<OnboardingContextType | null>(null);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingFormValues>>({});

  const updateData = (newData: Partial<OnboardingFormValues>) =>
    setOnboardingData((prev) => ({ ...prev, ...newData }));

  return (
    <OnboardingContext.Provider value={{ onboardingData, updateData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error("useOnboarding must be used within OnboardingProvider");
  return context;
};
