import { Progress } from "@/components/ui/progress";
import {
  CreateStartupProvider,
  useCreateStartup,
} from "./context/CreateStartupContext";
import { StartupNameStep } from "./steps/StartupNameStep";
import { StartupLocationStep } from "./steps/StartupLocationStep";
import { StartupDescriptionStep } from "./steps/StartupDescriptionStep";
import { StartupProblemStep } from "./steps/StartupProblemStep";
import { StartupSolutionStep } from "./steps/StartupSolutionStep";
import { StartupTeamStep } from "./steps/StartupTeamStep";
import { StartupFundingStep } from "./steps/StartupFundingStep";

const CreateStartupForm = () => {
  const { step } = useCreateStartup();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StartupNameStep />;
      case 2:
        return <StartupLocationStep />;
      case 3:
        return <StartupDescriptionStep />;
      case 4:
        return <StartupProblemStep />;
      case 5:
        return <StartupSolutionStep />;
      case 6:
        return <StartupTeamStep />;
      case 7:
        return <StartupFundingStep />;
      default:
        return <div></div>;
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Progress hidden={step >= 7} value={(step / 7) * 100} className="mb-4" />
      {renderStep()}
    </div>
  );
};

export default function CreateStartup() {
  return (
    <CreateStartupProvider>
      <CreateStartupForm />
    </CreateStartupProvider>
  );
} 