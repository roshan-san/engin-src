import UserName from "./steps/UserName";
import Location from "./steps/Location";
import Contact from "./steps/Contact";
import Skills from "./steps/Skills";
import Interests from "./steps/Interests";
import { useOnboarding } from "./context/OnboardContext";
import { Progress } from "@/components/ui/progress";
export default function OnboardingSteps() {
  const { step } = useOnboarding();

  return (
    <>
      <Progress hidden={step==0} value={(step/6)*100}/>
      {step === 1 && <UserName />}
      {step === 2 && <Location />}    
      {step === 3 && <Skills />}
      {step === 4 && <Interests />}
      {step === 5 && <Contact />}
    </>
  );
}
