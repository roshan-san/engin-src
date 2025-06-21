import { createContext, useContext, useState } from "react";
import type { StartupInsert } from "@/types/supa-types";


type StartupCreationContextType = {
  startupCreationData: Partial<StartupInsert>;
  step: number;
  nextStep: (data?: Partial<StartupInsert>) => void;
  previousStep: () => void;
};

const StartupCreationContext = createContext<StartupCreationContextType | null>(null);

export const StartupCreateProvider = ({ children,}: { children: React.ReactNode;}) => {

  const [startupCreationData, setStartupCreationData] = useState<Partial<StartupInsert>>({});
  const [step, setStep] = useState(1);

  const updateData = (newData: Partial<StartupInsert>) =>
    setStartupCreationData((prev) => ({ ...prev, ...newData }));

  const nextStep = (data?: Partial<StartupInsert>) => {
    if (data) {
      updateData(data);
    }{
      setStep(Math.min(7, step + 1));
    }
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

