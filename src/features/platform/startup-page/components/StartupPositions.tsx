import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../../components/ui/dialog";
import { Briefcase, MapPin, Users, Calendar, Plus, Eye } from "lucide-react";
import { ApplyToPosition } from "../../positions/ApplyToPosition";
import { ApplicationsList } from "../../collabs/ApplicationsList";
import { PositionForm } from "../../positions/PositionForm";
import { useState } from "react";
import type { Doc } from "../../../../../convex/_generated/dataModel";

interface StartupPositionsProps {
  startup: Doc<"startups">;
  positions: any[];
  profile: any;
  isOwner: boolean;
}

export function StartupPositions({ startup, positions, profile, isOwner }: StartupPositionsProps) {
  const [selectedPosition, setSelectedPosition] = useState<Doc<"positions"> | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewApplicationsOpen, setIsViewApplicationsOpen] = useState(false);

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-xl lg:text-2xl font-semibold text-foreground flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-primary" />
          Open Positions
        </h2>
        
        <div className="flex items-center gap-2">
          {isOwner && (
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2 h-9 sm:h-10">
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="text-xs sm:text-sm">Create Position</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Position</DialogTitle>
                  <DialogDescription>
                    Add a new position to attract talent to your startup.
                  </DialogDescription>
                </DialogHeader>
                <PositionForm 
                  startupId={startup._id} 
                  onSuccess={() => setIsCreateDialogOpen(false)} 
                />
              </DialogContent>
            </Dialog>
          )}
          
          <Badge variant="secondary" className="px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm font-medium w-fit">
            {positions?.length || 0} position{(positions?.length || 0) !== 1 ? 's' : ''}
          </Badge>
        </div>
      </div>
      
      {!positions || positions.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 lg:w-20 lg:h-20 mx-auto rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <Briefcase className="h-8 w-8 lg:h-10 lg:w-10 text-muted-foreground/50" />
          </div>
          <h4 className="text-lg lg:text-xl font-semibold text-foreground mb-2">No positions available</h4>
          <p className="text-muted-foreground max-w-md mx-auto">
            {isOwner 
              ? "Create your first position to start building your team." 
              : "Check back later for new opportunities or contact the team directly."
            }
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:gap-6">
          {positions.map((position) => (
            <Card key={position._id} className="group border border-border/50 shadow-sm bg-background/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] overflow-hidden">
              <CardContent className="p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 lg:gap-6">
                  {/* Position Info */}
                  <div className="flex-1 min-w-0 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-lg lg:text-xl text-foreground truncate">
                              {position.title}
                            </h4>
                            <Badge 
                              variant="outline" 
                              className={`text-xs px-3 py-1 border ${getStatusColor(position.status)}`}
                            >
                              {position.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground leading-relaxed line-clamp-3">
                            {position.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Position Details */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 text-blue-600" />
                        <span className="text-blue-700 dark:text-blue-300 font-medium">
                          {startup.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 text-purple-600" />
                        <span className="text-purple-700 dark:text-purple-300">
                          {new Date(position.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {position.requirements && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 text-green-600" />
                          <span className="text-green-700 dark:text-green-300">
                            {position.requirements}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:flex-shrink-0">
                    {isOwner ? (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedPosition(position);
                            setIsViewApplicationsOpen(true);
                          }}
                          className="gap-2 h-9 sm:h-10"
                        >
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="text-xs sm:text-sm">View Apps</span>
                        </Button>
                      </>
                    ) : (
                      profile && (
                        <ApplyToPosition
                          positionId={position._id}
                          applicantId={profile._id}
                          onSuccess={() => {}}
                        />
                      )
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialogs */}
      {selectedPosition && (
        <>
          {/* View Applications Dialog */}
          <Dialog open={isViewApplicationsOpen} onOpenChange={setIsViewApplicationsOpen}>
            <DialogContent className="sm:max-w-4xl">
              <DialogHeader>
                <DialogTitle>Applications for {selectedPosition.title}</DialogTitle>
                <DialogDescription>
                  Review applications for this position.
                </DialogDescription>
              </DialogHeader>
              <ApplicationsList positionId={selectedPosition._id} />
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
} 