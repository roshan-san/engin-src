import UserName from "./steps/UserName";
import Location from "./steps/Location";
import Contact from "./steps/Contact";
import Skills from "./steps/Skills";
import Interests from "./steps/Interests";
import { useOnboarding } from "./context/OnboardContext";

export default function OnboardingSteps() {
  const { step } = useOnboarding();

  return (
    <>
      {step === 1 && <UserName />}
      {step === 2 && <Location />}    
      {step === 3 && <Skills />}
      {step === 4 && <Interests />}
      {step === 5 && <Contact />}
    </>
  );
}
