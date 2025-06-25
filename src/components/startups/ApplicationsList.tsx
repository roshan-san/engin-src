import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id, Doc } from "../../../convex/_generated/dataModel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

interface ApplicationsListProps {
  positionId: Id<"positions">;
}

function ApplicantInfo({ applicantId }: { applicantId: Id<"profiles"> }) {
  const profile = useQuery(api.profile.queries.getProfileById, { profileId: applicantId });
  if (!profile) return <span className="text-xs text-muted-foreground">Loading...</span>;
  return (
    <div className="flex items-center gap-2 mb-1">
      {profile.avatar_url && (
        <img src={profile.avatar_url} alt="avatar" className="w-6 h-6 rounded-full" />
      )}
      <span className="font-medium text-sm">{profile.username || profile.name || "Unknown"}</span>
      {profile.username && (
        <Link to={`/message/${profile.username}`}>
          <Button size="sm" variant="outline">Message</Button>
        </Link>
      )}
    </div>
  );
}

export const ApplicationsList: React.FC<ApplicationsListProps> = ({ positionId }) => {
  const applications = useQuery(api.startups.queries.listApplications, { positionId });
  const updateStatus = useMutation(api.startups.mutations.updateApplicationStatus);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function handleStatus(appId: Id<"applications">, status: "accepted" | "rejected") {
    setLoadingId(appId);
    try {
      await updateStatus({ applicationId: appId, status });
      // TODO: Show toast on success
    } catch (e) {
      // TODO: Show toast on error
    }
    setLoadingId(null);
  }

  return (
    <div className="mt-2">
      <h3 className="font-semibold mb-2 text-base">Applications</h3>
      {!applications || applications.length === 0 ? (
        <div className="text-muted-foreground text-sm">No applications yet.</div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app: Doc<"applications">) => (
            <Card key={app._id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <ApplicantInfo applicantId={app.applicantId} />
                <Badge variant={app.status === "pending" ? "outline" : app.status === "accepted" ? "default" : "destructive"}>
                  {app.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {app.message ? app.message : <span className="italic">No message</span>}
                </CardDescription>
                {app.status === "pending" && (
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="default"
                      disabled={loadingId === app._id}
                      onClick={() => handleStatus(app._id, "accepted")}
                    >
                      {loadingId === app._id ? "Accepting..." : "Accept"}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={loadingId === app._id}
                      onClick={() => handleStatus(app._id, "rejected")}
                    >
                      {loadingId === app._id ? "Rejecting..." : "Reject"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}; 