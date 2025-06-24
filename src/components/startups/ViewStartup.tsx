import { Doc } from "../../../convex/_generated/dataModel";
import { StartupInfo } from "./StartupInfo";

interface ViewStartupProps {
  startup: Doc<"startups">;
}

export function ViewStartup({ startup }: ViewStartupProps) {
  return (
    <div className="p-4 md:p-8">
      <StartupInfo startup={startup} />
    </div>
  );
} 