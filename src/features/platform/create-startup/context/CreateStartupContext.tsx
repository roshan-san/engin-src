import { createContext, useContext, useState, type ReactNode } from "react";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useNavigate } from "@tanstack/react-router";

interface StartupData {
  name: string;
  description: string;
  problem: string;
  solution: string;
  location: string;
  funding: string;
  team_size: string;
}

interface CreateStartupContextType {
  step: number;
  startupData: StartupData;
  isCreating: boolean;
  nextStep: () => void;
  previousStep: () => void;
  handleCreate: () => Promise<void>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const CreateStartupContext = createContext<
  CreateStartupContextType | undefined
>(undefined);

export const CreateStartupProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [step, setStep] = useState(1);
  const [startupData, setStartupData] = useState<StartupData>({
    name: "",
    description: "",
    problem: "",
    solution: "",
    location: "",
    funding: "",
    team_size: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const createStartup = useMutation(api.startups.mutations.createStartup);

  const nextStep = () => setStep((prev) => Math.min(7, prev + 1));
  const previousStep = () => setStep((prev) => Math.max(1, prev - 1));
  const navigate= useNavigate()

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      const numericData = {
        ...startupData,
        funding: Number(startupData.funding) || 0,
        team_size: Number(startupData.team_size) || 0,
      };
      const startup= await createStartup(numericData);
      navigate({to:"/startups/$startupid", params:{startupid: startup}});
      setStep(8)
    } catch (error) {
      console.error("Failed to create startup", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStartupData((prev) => ({ ...prev, [name]: value }));
  };

  const value = {
    step,
    startupData,
    isCreating,
    nextStep,
    previousStep,
    handleCreate,
    handleChange,
  };

  return (
    <CreateStartupContext.Provider value={value}>
      {children}
    </CreateStartupContext.Provider>
  );
};

export const useCreateStartup = () => {
  const context = useContext(CreateStartupContext);
  if (context === undefined) {
    throw new Error(
      "useCreateStartup must be used within a CreateStartupProvider"
    );
  }
  return context;
}; 