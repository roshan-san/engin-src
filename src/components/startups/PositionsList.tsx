import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id, Doc } from "../../../convex/_generated/dataModel";
import { PositionForm } from "./PositionForm";
import { ApplyToPosition } from "./ApplyToPosition";
import { ApplicationsList } from "./ApplicationsList";
import { useUser } from "../../features/authentication/UserContext";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Briefcase, Plus } from "lucide-react";

interface PositionsListProps {
  startupId: Id<"startups">;
  isOwner: boolean;
}

export const PositionsList: React.FC<PositionsListProps> = ({ startupId, isOwner }) => {
  const positions = useQuery(api.startups.queries.listPositions, { startupId });
  const [formOpen, setFormOpen] = useState(false);
  const { profile } = useUser();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-semibold">Open Positions</h3>
          <Badge variant="secondary" className="ml-2">
            {positions?.length || 0}
          </Badge>
        </div>
        {isOwner && (
          <Button
            onClick={() => setFormOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Position
          </Button>
        )}
      </div>

      {/* Floating Add Position Button for owners */}
      {isOwner && (
        <PositionForm
          open={formOpen}
          onOpenChange={setFormOpen}
          startupId={startupId}
          onSuccess={() => {}}
        />
      )}

      {/* List positions */}
      <div className="space-y-4">
        {!positions || positions.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No open positions.</p>
            <p className="text-sm">
              {isOwner 
                ? "Create your first position to start building your team." 
                : "Check back later for new opportunities."
              }
            </p>
          </div>
        ) : (
          positions.map((pos: Doc<"positions">) => (
            <div key={pos._id} className="p-6 bg-muted/50 rounded-lg border space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h4 className="text-lg font-semibold">{pos.title}</h4>
                  <p className="text-muted-foreground">{pos.description}</p>
                  {pos.requirements && (
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Requirements:</span> {pos.requirements}
                    </div>
                  )}
                </div>
                <Badge variant={pos.status === "open" ? "default" : "outline"}>
                  {pos.status}
                </Badge>
              </div>
              
              <div className="pt-2 border-t">
                {/* Show ApplyToPosition for visitors */}
                {!isOwner && profile && (
                  <ApplyToPosition
                    positionId={pos._id}
                    applicantId={profile._id}
                    onSuccess={() => {}}
                  />
                )}
                {/* Show ApplicationsList for owner */}
                {isOwner && <ApplicationsList positionId={pos._id} />}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}; 