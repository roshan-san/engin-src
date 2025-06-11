import { createContext, useContext, useState } from "react";
import type { StartupCreationFormValues } from "../validations/startup";
import { useCreateStartup } from "../hooks/useStartups";
import { useNavigate } from "@tanstack/react-router";

type StartupCreationContextType = {
  startupCreationData: Partial<StartupCreationFormValues>;
  step: number;
  nextStep: (data?: Partial<StartupCreationFormValues>) => void;
  previousStep: () => void;
  isCreating: boolean;
  error: Error | null;
};

const StartupCreationContext = createContext<StartupCreationContextType | null>(null);

export const StartupCreateProvider = ({ 
  children,
}: { 
  children: React.ReactNode;
}) => {
  const [startupCreationData, setStartupCreationData] = useState<Partial<StartupCreationFormValues>>({});
  const [step, setStep] = useState(1);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate()
  
  const { mutate: createStartup, isPending: isCreating } = useCreateStartup();

  const updateData = (newData: Partial<StartupCreationFormValues>) =>
    setStartupCreationData((prev) => ({ ...prev, ...newData }));

  const nextStep = (data?: Partial<StartupCreationFormValues>) => {
    if (data) {
      updateData(data);
    }
    
    if (step === 7) {
      createStartup(startupCreationData as StartupCreationFormValues, {
        onSuccess: (data) => {
          setStartupCreationData({});
          setStep(1);
          setError(null);
          navigate({
            to: "/startups/$startupid",
            params: {startupid: data.id}
          });
        },
        onError: (error) => {
          setError(error as Error);
        }
      });
    } else {
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
      isCreating,
      error,
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
