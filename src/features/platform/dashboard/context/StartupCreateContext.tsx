import { createContext, useContext, useState } from "react";
import type { StartupCreationFormValues } from "../validations/startup";
type StartupCreationContextType = {
  startupCreationData: Partial<StartupCreationFormValues>;
  step: number;
  nextStep: (data?: Partial<StartupCreationFormValues>) => void;
  previousStep: () => void;
};

const StartupCreationContext = createContext<StartupCreationContextType | null>(null);

export const OnboardingProvider = ({ 
  children,
}: { 
  children: React.ReactNode;
}) => {
  const [startupCreationData, setStartupCreationData] = useState<Partial<StartupCreationFormValues>>({});
  const [step, setStep] = useState(1);

  const updateData = (newData: Partial<StartupCreationFormValues>) =>
    setStartupCreationData((prev) => ({ ...prev, ...newData }));

  const nextStep = (data?: Partial<StartupCreationFormValues>) => {
    if (data) {
      updateData(data);
    }
    setStep(Math.min(5, step + 1));
  };

  const previousStep = () => {
    setStep(Math.max(1, step - 1));
  };

  return (
    <StartupCreationContext.Provider value={{ 
      startupCreationData, 
      step, 
      nextStep, 
      previousStep,
    }}>
      {children}
    </StartupCreationContext.Provider>
  );
};

export const useStartupCreation = () => {
  const context = useContext(StartupCreationContext);
  if (!context) throw new Error("useStartupCreation must be used within StartupCreationProvider");
  return context;
};
