import { Progress } from "@/components/ui/progress";
import StartupName from "./steps/StartupName";
import StartupLocation from "./steps/StartupLocation";
import StartupDescription from "./steps/StartupDescription";
import StartupProblem from "./steps/StartupProblem";
import StartupFunding from "./steps/StartupFunding";
import StartupSolution from "./steps/StartupSolution";
import { useStartupCreation } from "./context/StartupCreateContext";
import StartupTeam from "./steps/StartupTeam";
export default function StartupCreationSteps() {
  const { step } = useStartupCreation();

  return (
    <>
      <Progress hidden={step == 0} value={(step / 7) * 100} />
      {step === 1 && <StartupName />}
      {step === 2 && <StartupLocation />}
      {step === 3 && <StartupDescription />}
      {step === 4 && <StartupProblem />}
      {step === 5 && <StartupSolution />}
      {step === 6 && <StartupTeam />}
      {step === 7 && <StartupFunding />}
    </>
  );
}
