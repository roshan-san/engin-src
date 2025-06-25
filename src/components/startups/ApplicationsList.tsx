import React, { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id, Doc } from "../../../convex/_generated/dataModel";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { Users, MessageCircle, CheckCircle, XCircle, Clock } from "lucide-react";

interface ApplicationsListProps {
  positionId: Id<"positions">;
}

function ApplicantInfo({ applicantId }: { applicantId: Id<"profiles"> }) {
  const profile = useQuery(api.profile.queries.getProfileById, { profileId: applicantId });
  if (!profile) return <span className="text-xs text-muted-foreground">Loading...</span>;
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 min-w-0">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="relative">
          {profile.avatar_url && (
            <img src={profile.avatar_url} alt="avatar" className="w-10 h-10 rounded-full ring-2 ring-primary/20 flex-shrink-0" />
          )}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-foreground truncate">{profile.username || profile.name || "Unknown"}</h4>
          <p className="text-sm text-muted-foreground truncate">@{profile.username || "username"}</p>
        </div>
      </div>
      {profile.username && (
        <Link to={`/message/${profile.username}` as any}>
          <Button size="sm" variant="outline" className="w-full sm:w-auto gap-2 hover:bg-primary hover:text-primary-foreground transition-colors">
            <MessageCircle className="h-4 w-4" />
            Message
          </Button>
        </Link>
      )}
    </div>
  );
}

export const ApplicationsList: React.FC<ApplicationsListProps> = ({ positionId }) => {
  const applications = useQuery(api.startups.queries.listApplications, { positionId });
  const updateStatus = useMutation(api.startups.mutations.updateApplicationStatus);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-amber-600" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/50";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50";
      default:
        return "bg-muted text-muted-foreground border-muted";
    }
  };

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
      
      {!applications || applications.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-muted/50 flex items-center justify-center">
            <Users className="h-8 w-8 text-muted-foreground/50" />
          </div>
          <p className="text-muted-foreground text-sm">No applications yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {applications.map((app: Doc<"applications">) => (
            <Card key={app._id} className="border-muted/50 hover:border-primary/20 transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <ApplicantInfo applicantId={app.applicantId} />
                  <Badge 
                    variant="outline" 
                    className={`px-3 py-1 text-sm font-medium flex items-center gap-1 flex-shrink-0 ${getStatusColor(app.status)}`}
                  >
                    {getStatusIcon(app.status)}
                    {app.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="break-words leading-relaxed">
                  {app.message ? app.message : <span className="italic text-muted-foreground/70">No message provided</span>}
                </CardDescription>
                {app.status === "pending" && (
                  <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-muted/50">
                    <Button
                      size="sm"
                      variant="default"
                      disabled={loadingId === app._id}
                      onClick={() => handleStatus(app._id, "accepted")}
                      className="w-full sm:w-auto gap-2 hover:bg-green-600 hover:text-white transition-colors"
                    >
                      {loadingId === app._id ? "Accepting..." : "Accept Application"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={loadingId === app._id}
                      onClick={() => handleStatus(app._id, "rejected")}
                      className="w-full sm:w-auto gap-2 hover:bg-red-600 hover:text-white transition-colors"
                    >
                      {loadingId === app._id ? "Rejecting..." : "Reject Application"}
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