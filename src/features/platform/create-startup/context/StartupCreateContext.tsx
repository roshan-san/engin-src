import { createContext, useContext, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { createStartupApi } from "@/api/startups";
import { useUser } from "@/features/authentication/store/authStore";
import type { StartupInsert } from "@/types/supa-types";

type StartupCreationContextType = {
  startupCreationData: Partial<StartupInsert>;
  step: number;
  nextStep: (data?: Partial<StartupInsert>) => void;
  previousStep: () => void;
  isCreating: boolean;
};

const StartupCreationContext = createContext<StartupCreationContextType | null>(null);

export const StartupCreateProvider = ({ children,}: { children: React.ReactNode;}) => {

  const [startupCreationData, setStartupCreationData] = useState<Partial<StartupInsert>>({});
  const [step, setStep] = useState(1);
  const navigate = useNavigate()
  const {data:user}  = useUser()
  
  const {mutate: createStartupMutation, isPending: isCreating} = useMutation({
    mutationKey: ["create-startup"],
    mutationFn: async () => {
      if (!user) throw new Error("User not authenticated");
      
      const data: StartupInsert = {
        description: startupCreationData.description!,
        founder_id: user.id,
        funding: startupCreationData.funding!,
        location: startupCreationData.location!,
        name: startupCreationData.name!,
        problem: startupCreationData.problem!,
        solution: startupCreationData.solution!,
        team_size: startupCreationData.team_size!,
        patent: startupCreationData.patent || ""
      };

      return createStartupApi(data);
    },
    onSuccess: (data) => {
      setStartupCreationData({});
      setStep(1);
      navigate({
        to: "/startups/$startupid",
        params: {startupid: data.id}
      });
    },
    onError: (error) => {
      console.error('Error creating startup:', error);
    }
  });

  const updateData = (newData: Partial<StartupInsert>) =>
    setStartupCreationData((prev) => ({ ...prev, ...newData }));

  const nextStep = (data?: Partial<StartupInsert>) => {
    if (data) {
      updateData(data);
    }
    if (step === 7) {
      createStartupMutation()
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
