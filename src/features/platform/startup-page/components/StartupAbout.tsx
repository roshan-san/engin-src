import { Card, CardContent } from "../../../../components/ui/card";
import { Info, Target } from "lucide-react";
import type { Doc } from "@/../convex/_generated/dataModel";

interface StartupAboutProps {
  startup: Doc<"startups">;
  isOwner: boolean;
}

export function StartupAbout({ startup, isOwner }: StartupAboutProps) {
  return (
    <div className="space-y-6">
      {/* About Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">About {startup.name}</h2>
        <Card className="border shadow-sm">
          <CardContent className="p-6">
            <p className="text-muted-foreground leading-relaxed">
              {startup.description}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Problem & Solution Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Problem & Solution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Problem
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {startup.problem}
              </p>
            </CardContent>
          </Card>
          <Card className="border shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                Solution
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {startup.solution}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Key Features</h2>
        <Card className="border shadow-sm">
          <CardContent className="p-6">
            {startup.tags && startup.tags.length > 0 ? (
              <ul className="space-y-3">
                {startup.tags?.map((tag: string, index: number) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{tag}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground text-sm">
                No key features listed yet. {isOwner && "Add some features to showcase your startup's capabilities."}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 