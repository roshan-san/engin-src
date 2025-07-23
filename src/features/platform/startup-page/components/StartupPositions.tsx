import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Briefcase, MapPin, Users } from "lucide-react";
import { ApplyToPosition } from "../../positions/ApplyToPosition";
import type { Doc } from "../../../../../convex/_generated/dataModel";

interface StartupPositionsProps {
  startup: Doc<"startups">;
  positions: any[];
  profile: any;
  isOwner: boolean;
}

export function StartupPositions({ startup, positions, profile, isOwner }: StartupPositionsProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800/50";
      case "closed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800/50";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400 border-gray-200 dark:border-gray-800/50";
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">Open Positions</h2>
      <div className="space-y-3">
        {!positions || positions.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-muted/50 flex items-center justify-center">
              <Briefcase className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground/50" />
            </div>
            <h4 className="text-base sm:text-lg font-semibold text-foreground pt-4">No positions available</h4>
            <p className="text-sm sm:text-base text-muted-foreground max-w-sm sm:max-w-md mx-auto px-4 pt-2">
              Check back later for new opportunities.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {positions.map((position) => (
              <Card key={position._id} className="group border-0 shadow-lg bg-gradient-to-br from-background to-muted/30 hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    {/* Position Info */}
                    <div className="flex-1 min-w-0 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm sm:text-base text-foreground truncate">
                            {position.title}
                          </h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs px-2 py-0.5 border ${getStatusColor(position.status)}`}
                          >
                            {position.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {position.description}
                      </p>
                      
                      {/* Position Details */}
                      <div className="flex flex-wrap items-center gap-3 pt-2">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                          <span className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                            {startup.location}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm text-muted-foreground">•</span>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          Created {new Date(position.createdAt).toLocaleDateString()}
                        </span>
                        {position.requirements && (
                          <>
                            <span className="text-xs sm:text-sm text-muted-foreground">•</span>
                            <div className="flex items-center gap-1.5">
                              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                              <span className="text-xs sm:text-sm text-purple-700 dark:text-purple-300">
                                {position.requirements}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      {profile && !isOwner && (
                        <ApplyToPosition
                          positionId={position._id}
                          applicantId={profile._id}
                          onSuccess={() => {}}
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 