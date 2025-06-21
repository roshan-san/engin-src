import { createContext, useContext, useState, ReactNode } from "react";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";

interface CreateStartupContextType {
  step: number;
  startupData: any;
  isCreating: boolean;
  nextStep: () => void;
  previousStep: () => void;
  handleCreate: () => Promise<void>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const CreateStartupContext = createContext<CreateStartupContextType | undefined>(
  undefined
);

export const CreateStartupProvider = ({ children }: { children: ReactNode }) => {
  const [step, setStep] = useState(1);
  const [startupData, setStartupData] = useState<any>({});
  const [isCreating, setIsCreating] = useState(false);
  const createStartup = useMutation(api.startups.mutations.createStartup);

  const nextStep = () => setStep((prev) => Math.min(7, prev + 1));
  const previousStep = () => setStep((prev) => Math.max(1, prev - 1));

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      const numericData = {
        ...startupData,
        funding: Number(startupData.funding) || 0,
        team_size: Number(startupData.team_size) || 0,
      };
      await createStartup(numericData);
      setStep(8); // Or a success step
    } catch (error) {
      console.error("Failed to create startup", error);
    } finally {
      setIsCreating(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStartupData((prev: any) => ({ ...prev, [name]: value }));
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