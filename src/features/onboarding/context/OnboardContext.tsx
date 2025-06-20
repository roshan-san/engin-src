import { createContext, useContext, useState } from "react";

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

  const updateData = (newData: Record<string, any>) =>
    setOnboardingData((prev) => ({ ...prev, ...newData }));

  const nextStep = (data?: Record<string, any>) => {
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
