import React, { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Check } from "lucide-react";

interface ApplyToPositionProps {
  positionId: Id<"positions">;
  applicantId: Id<"profiles">;
  onSuccess: () => void;
}

export const ApplyToPosition: React.FC<ApplyToPositionProps> = ({ positionId, applicantId, onSuccess }) => {
  const applyToPosition = useMutation(api.startups.mutations.applyToPosition);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Check if user has already applied to this position
  const existingApplication = useQuery(api.startups.queries.getApplicationByUser, {
    positionId,
    applicantId,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await applyToPosition({ positionId, applicantId, message });
      setMessage("");
      onSuccess();
      setOpen(false);
    } catch (err: any) {
      setError(err.message || "Failed to apply.");
    }
    setLoading(false);
  };

  // If user has already applied, show status
  if (existingApplication) {
    return (
      <div className="flex items-center gap-2">
        <Badge 
          variant={existingApplication.status === "accepted" ? "default" : 
                  existingApplication.status === "rejected" ? "destructive" : "secondary"}
          className="flex items-center gap-1"
        >
          <Check className="h-3 w-3" />
          {existingApplication.status === "accepted" ? "Accepted" :
           existingApplication.status === "rejected" ? "Rejected" : "Applied"}
        </Badge>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Apply</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply to Position</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Message (optional)"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Applying..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}; 