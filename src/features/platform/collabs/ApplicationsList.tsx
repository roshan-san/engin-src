import React from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import type { Id } from "@/../convex/_generated/dataModel";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Users } from "lucide-react";

interface ApplicationsListProps {
  positionId: Id<"positions">;
}

export const ApplicationsList: React.FC<ApplicationsListProps> = ({ positionId }) => {
  const applications = useQuery(api.startups.queries.listApplications, { positionId });
  const updateApplicationStatus = useMutation(api.startups.mutations.updateApplicationStatus);

  const handleStatusChange = async (applicationId: Id<"applications">, newStatus: "accepted" | "rejected") => {
    try {
      await updateApplicationStatus({ applicationId, status: newStatus });
    } catch (error) {
      console.error("Failed to update application status:", error);
    }
  };

  if (!applications) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Users className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground">Applications</h3>
        <Badge variant="secondary" className="ml-auto">
          {applications?.length || 0}
        </Badge>
      </div>
      
      {applications.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-full bg-muted/30 flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="font-medium mb-1">No applications yet</p>
          <p className="text-sm text-muted-foreground">Applications will appear here when people apply to this position.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app) => (
            <Card key={app._id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <CardTitle className="text-base">Application by {app.applicantId}</CardTitle>
                <Badge variant="secondary" className="text-xs capitalize">
                  {app.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {app.message || "No message provided."}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="default" onClick={() => handleStatusChange(app._id, "accepted")}>Accept</Button>
                  <Button size="sm" variant="outline" onClick={() => handleStatusChange(app._id, "rejected")}>Reject</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}; 