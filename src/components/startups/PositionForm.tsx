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
import type { Id } from "../../../convex/_generated/dataModel";
import { Briefcase, Sparkles } from "lucide-react";

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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <DialogTitle className="text-xl font-bold">Create New Position</DialogTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            Add a new job opportunity to attract talented individuals to your startup
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Position Title *</label>
              <Input 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="e.g., Senior Frontend Developer, Product Manager, etc."
                required 
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Job Description *</label>
              <Textarea 
                value={description} 
                onChange={e => setDescription(e.target.value)} 
                placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                required 
                className="min-h-[120px] resize-none"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Requirements (Optional)</label>
              <Input 
                value={requirements} 
                onChange={e => setRequirements(e.target.value)} 
                placeholder="e.g., 3+ years experience, React knowledge, remote-friendly"
              />
              <p className="text-xs text-muted-foreground">
                List key skills, experience, or qualifications needed for this role
              </p>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Button 
              type="submit" 
              disabled={loading || !title.trim() || !description.trim()} 
              className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Create Position
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 