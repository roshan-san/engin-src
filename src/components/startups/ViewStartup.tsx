import type { Doc } from "../../../convex/_generated/dataModel";
import { StartupInfo } from "./StartupInfo";

interface ViewStartupProps {
  startup: Doc<"startups">;
}

export function ViewStartup({ startup }: ViewStartupProps) {
  return (
    <div className="p-0">
      <StartupInfo startup={startup} />
    </div>
  );
} 