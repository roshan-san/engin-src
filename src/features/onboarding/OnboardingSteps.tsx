import UserName from "./steps/UserName";
import Location from "./steps/Location";
import Contact from "./steps/Contact";
import Skills from "./steps/Skills";
import Interests from "./steps/Interests";
import UserType from "./steps/UserType";
import WorkType from "./steps/WorkType";
import { useOnboarding } from "./context/OnboardContext";
import { Progress } from "@/components/ui/progress";
export default function OnboardingSteps() {
  const { step } = useOnboarding();

  return (
    <>
      <Progress hidden={step==0} value={(step/7)*100}/>
      {step === 1 && <UserName />}
      {step === 2 && <UserType />}
      {step === 3 && <WorkType />}
      {step === 4 && <Location />}    
      {step === 5 && <Skills />}
      {step === 6 && <Interests />}
      {step === 7 && <Contact />}
    </>
  );
}
