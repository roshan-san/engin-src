import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

interface PositionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startupId: Id<"startups">;
  onSuccess: () => void;
}

export function PositionForm({ open, onOpenChange, startupId, onSuccess }: PositionFormProps) {
  const createPosition = useMutation(api.startups.mutations.createPosition);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await createPosition({ startupId, title, description, requirements });
    setLoading(false);
    setTitle(""); setDescription(""); setRequirements("");
    onSuccess();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Position</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
          <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
          <Input value={requirements} onChange={e => setRequirements(e.target.value)} placeholder="Requirements (optional)" />
          <DialogFooter>
            <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Position"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 