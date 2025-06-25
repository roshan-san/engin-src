import type { Doc } from "../../../convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { MapPin, DollarSign, Users, AlertTriangle, Lightbulb } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Link } from "@tanstack/react-router";

interface StartupInfoProps {
  startup: Doc<"startups">;
}

export function StartupInfo({ startup }: StartupInfoProps) {
  const ownerProfile = useQuery(api.profile.queries.getProfileById, { profileId: startup.ownerId });

  return (
    <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-md min-h-[340px] p-2 md:p-6 relative">
      <CardHeader>
        <div className="flex items-center gap-3 justify-between">
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
          {ownerProfile && (
            <div className="flex flex-col items-end gap-1 min-w-[120px]">
              <div className="flex items-center gap-2">
                {ownerProfile.avatar_url && (
                  <img src={ownerProfile.avatar_url} alt="avatar" className="w-8 h-8 rounded-full" />
                )}
                <span className="font-medium text-sm">{ownerProfile.username || ownerProfile.name || "Owner"}</span>
              </div>
              {ownerProfile.username && (
                <Link to="/message/$username" params={{ username: ownerProfile.username }}>
                  <Button size="sm" variant="outline">Message Owner</Button>
                </Link>
              )}
            </div>
          )}
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