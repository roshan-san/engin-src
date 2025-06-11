import { Progress } from "@/components/ui/progress";
import StartupName from "./startup-creation/StartupName";
import StartupLocation from "./startup-creation/StartupLocation";
import StartupDescription from "./startup-creation/StartupDescription";
import StartupProblem from "./startup-creation/StartupProblem";
import StartupFunding from "./startup-creation/StartupFunding";
import StartupSolution from "./startup-creation/StartupSolution";
import { useStartupCreation } from "./context/StartupCreateContext";
import StartupTeam from "./startup-creation/StartupTeam";
export default function StartupCreationSteps() {
  const { step } = useStartupCreation();

  return (
    <>
      <Progress hidden={step==0} value={(step/7)*100}/>
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
