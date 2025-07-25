import UserName from "./steps/UserName";
import Location from "./steps/Location";
import Contact from "./steps/Contact";
import Skills from "./steps/Skills";
import Interests from "./steps/Interests";
import UserType from "./steps/UserType";
import WorkType from "./steps/WorkType";
import { useOnboard } from "./context/useOnboard";
import { Progress } from "@/components/ui/progress";
export default function OnboardingSteps() {
  const { currentStep } = useOnboard();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl mx-auto">
          <div className="mb-8">
            <Progress value={(currentStep / 7) * 100} className="h-2" />
            <p className="text-sm text-muted-foreground mt-2 text-center">
              Step {currentStep + 1} of 8
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-xl border p-8">
            {currentStep === 0 && <UserType />}
            {currentStep === 1 && <UserName />}
            {currentStep === 2 && <WorkType />}
            {currentStep === 3 && <Location />}
            {currentStep === 4 && <Skills />}
            {currentStep === 5 && <Interests />}
            {currentStep === 6 && <Contact />}
          </div>
        </div>
      </div>
    </div>
  );
}
