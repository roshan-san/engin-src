import { Doc } from "../../../convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { MapPin, DollarSign, Users, AlertTriangle, Lightbulb } from "lucide-react";

interface StartupInfoProps {
  startup: Doc<"startups">;
}

export function StartupInfo({ startup }: StartupInfoProps) {
  return (
    <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lightbulb className="h-6 w-6" />
          </span>
          <div>
            <CardTitle className="text-2xl font-semibold leading-tight">
              {startup.name}
            </CardTitle>
            <CardDescription className="mt-1 text-base text-muted-foreground">
              {startup.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-amber-600 font-medium">
              <AlertTriangle className="h-5 w-5" />
              <span>Problem</span>
            </div>
            <p className="text-muted-foreground text-sm pl-7">{startup.problem}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <Lightbulb className="h-5 w-5" />
              <span>Solution</span>
            </div>
            <p className="text-muted-foreground text-sm pl-7">{startup.solution}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-2">
          <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span className="text-xs text-muted-foreground">Location</span>
            <span className="font-medium text-sm text-foreground">{startup.location}</span>
          </div>
          <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg">
            <DollarSign className="h-4 w-4 text-green-500" />
            <span className="text-xs text-muted-foreground">Funding</span>
            <Badge className="ml-1 bg-green-100 text-green-800" variant="outline">
              ${startup.funding.toLocaleString()}
            </Badge>
          </div>
          <div className="flex items-center gap-2 bg-muted px-3 py-2 rounded-lg">
            <Users className="h-4 w-4 text-purple-500" />
            <span className="text-xs text-muted-foreground">Team Size</span>
            <Badge className="ml-1 bg-purple-100 text-purple-800" variant="outline">
              {startup.team_size}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 