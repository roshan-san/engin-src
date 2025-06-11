import { OnboardingProvider } from "./context/OnboardContext";
import UserName from "./steps/UserName";
import Location from "./steps/Location";
import Contact from "./steps/Contact";
import Skills from "./steps/Skiill";
import Interests from "./steps/Interests";
import { useAuth } from "../authentication/context/AuthContext";
import { useOnboarding } from "./context/OnboardContext";

function OnboardingSteps() {
  const { step, handleNext, handlePrevious, user } = useOnboarding();

  return (
    <>
      {step === 1 && <UserName handleNext={handleNext} handlePrevious={handlePrevious} user={user} />}
      {step === 2 && <Location handleNext={handleNext} handlePrevious={handlePrevious} />}    
      {step === 3 && <Skills handleNext={handleNext} handlePrevious={handlePrevious} />}
      {step === 4 && <Interests handleNext={handleNext} handlePrevious={handlePrevious} />}
      {step === 5 && <Contact handleNext={handleNext} handlePrevious={handlePrevious} />}
    </>
  );
}

export default function OnboardingPage() {
  const { user } = useAuth();

  return (
    <OnboardingProvider user={user}>
      <OnboardingSteps />
    </OnboardingProvider>
  );
}
