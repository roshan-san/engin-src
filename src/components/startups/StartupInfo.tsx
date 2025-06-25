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
import { MapPin, DollarSign, Users, AlertTriangle, Lightbulb, MessageCircle } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Link } from "@tanstack/react-router";

interface StartupInfoProps {
  startup: Doc<"startups">;
}

export function StartupInfo({ startup }: StartupInfoProps) {
  const ownerProfile = useQuery(api.profile.queries.getProfileById, { profileId: startup.ownerId });

  return (
    <Card className="border-0 shadow-lg bg-background rounded-xl overflow-hidden">
      {/* Header */}
      <CardHeader className="p-4 sm:p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/10">
        <div className="space-y-4">
          {/* Startup info */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
            {/* Icon and title */}
            <div className="flex items-start gap-3 lg:gap-4 flex-1 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
                  <Lightbulb className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <CardTitle className="text-xl sm:text-2xl font-bold leading-tight break-words">
                  {startup.name}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-muted-foreground break-words leading-relaxed">
                  {startup.description}
                </CardDescription>
              </div>
            </div>
            
            {/* Owner info */}
            {ownerProfile && (
              <div className="w-full lg:w-auto lg:flex-shrink-0">
                <div className="flex flex-col items-start lg:items-end gap-3">
                  <div className="w-full lg:w-auto flex items-center gap-3 p-3 rounded-xl bg-background/80 backdrop-blur-sm border border-primary/10">
                    {ownerProfile.avatar_url && (
                      <img src={ownerProfile.avatar_url} alt="avatar" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full ring-2 ring-primary/20 flex-shrink-0" />
                    )}
                    <div className="min-w-0 flex-1 lg:flex-none">
                      <span className="font-semibold text-sm sm:text-base truncate block">{ownerProfile.username || ownerProfile.name || "Owner"}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">Founder</span>
                    </div>
                  </div>
                  {ownerProfile.username && (
                    <Link to="/message/$username" params={{ username: ownerProfile.username }} className="w-full lg:w-auto">
                      <Button size="sm" variant="outline" className="w-full lg:w-auto gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        Message
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6 space-y-6">
        {/* Problem & Solution */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Problem */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20 flex-shrink-0">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-amber-700 dark:text-amber-300">The Problem</h3>
              </div>
              <div className="pl-10 sm:pl-12">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">{startup.problem}</p>
              </div>
            </div>
            
            {/* Solution */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20 flex-shrink-0">
                  <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-green-700 dark:text-green-300">Our Solution</h3>
              </div>
              <div className="pl-10 sm:pl-12">
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed break-words">{startup.solution}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="pt-6 border-t border-muted/50">
          <h3 className="text-base sm:text-lg font-semibold text-center lg:text-left pb-4">Key Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Location */}
            <div className="group p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">Location</span>
              </div>
              <p className="font-semibold text-sm sm:text-base text-blue-900 dark:text-blue-100 truncate">{startup.location}</p>
            </div>
            
            {/* Funding */}
            <div className="group p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">Funding</span>
              </div>
              <p className="font-semibold text-sm sm:text-base text-green-900 dark:text-green-100">${startup.funding.toLocaleString()}</p>
            </div>
            
            {/* Team Size */}
            <div className="group p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 pb-2">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">Team Size</span>
              </div>
              <p className="font-semibold text-sm sm:text-base text-purple-900 dark:text-purple-100">{startup.team_size} members</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 