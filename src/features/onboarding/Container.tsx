import { useState } from "react";

import { OnboardingProvider } from "./context/OnboardContext";
import UserName from "./steps/UserName";
import Location from "./steps/Location";
import Contact from "./steps/Contact";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const handleNext = () => {
    setStep(Math.min(4, step + 1));
  };
  const handlePrevious = () => {
    setStep(Math.max(1, step - 1));
  };

  return (
    <OnboardingProvider>
      {step === 1 && <UserName handleNext={handleNext} handlePrevious={handlePrevious} />}
      {step === 2 && <Location handleNext={handleNext} handlePrevious={handlePrevious} />}    
      {step === 3 && <Skills handleNext={handleNext} handlePrevious={handlePrevious} />}
      {step === 4 && <Contact handleNext={handleNext} handlePrevious={handlePrevious} />}
    </OnboardingProvider>
  );
}
