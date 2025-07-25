import React, { createContext, useState, type ReactNode } from 'react';

interface OnboardContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  formData: Record<string, unknown>;
  setFormData: (data: Record<string, unknown>) => void;
  updateFormData: (key: string, value: unknown) => void;
  resetFormData: () => void;
}

const OnboardContext = createContext<OnboardContextType | undefined>(undefined);

export { OnboardContext };

interface OnboardProviderProps {
  children: ReactNode;
}

export const OnboardProvider: React.FC<OnboardProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, unknown>>({});

  const updateFormData = (key: string, value: unknown) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFormData = () => {
    setFormData({});
    setCurrentStep(0);
  };

  const value: OnboardContextType = {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    updateFormData,
    resetFormData,
  };

  return (
    <OnboardContext.Provider value={value}>
      {children}
    </OnboardContext.Provider>
  );
};
