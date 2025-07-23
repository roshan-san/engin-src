import React from "react";
import { Save, Edit } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Doc } from "../../../../convex/_generated/dataModel.d.ts";
import { useMediaQuery } from "../../../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose
} from "../../../components/ui/drawer";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";

interface StartupEditDrawerProps {
  startup: Doc<"startups">;
  iconOnly?: boolean;
  renderTrigger?: (props: { open: boolean; setOpen: (open: boolean) => void }) => React.ReactNode;
}

export function StartupEditDrawer({ startup, iconOnly = false, renderTrigger }: StartupEditDrawerProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {renderTrigger
            ? renderTrigger({ open, setOpen })
            : (
              <Button variant="outline" size="icon" className="h-8 w-8 p-0" aria-label="Edit Startup">
                <Edit className="h-4 w-4" />
                {!iconOnly && <span className="text-xs sm:text-sm">Edit Startup</span>}
              </Button>
            )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Startup</DialogTitle>
          </DialogHeader>
          <StartupForm startup={startup} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {renderTrigger
          ? renderTrigger({ open, setOpen })
          : (
            <Button variant="outline" size="icon" className="h-8 w-8 p-0" aria-label="Edit Startup">
              <Edit className="h-4 w-4" />
              {!iconOnly && <span className="text-xs sm:text-sm">Edit Startup</span>}
            </Button>
          )}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit Startup</DrawerTitle>
        </DrawerHeader>
        <div className="px-4">
          <StartupForm startup={startup} setOpen={setOpen} />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function StartupForm({ startup, setOpen }: { startup: Doc<"startups">, setOpen: (open: boolean) => void }) {
  const updateStartup = useMutation(api.startups.mutations.updateStartup);
  const [loading, setLoading] = React.useState(false);
  const [feedback, setFeedback] = React.useState<{type: 'error' | 'success', message: string} | null>(null);
  const [formData, setFormData] = React.useState({
    name: startup.name || "",
    description: startup.description || "",
    problem: startup.problem || "",
    solution: startup.solution || "",
    location: startup.location || "",
    funding: startup.funding || 0,
    team_size: startup.team_size || 1,
    stage: startup.stage || "Growth",
  });

  const handleEditInput = (field: string, value: string | number) => {
    setFeedback(null);
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    try {
      await updateStartup({
        startupId: startup._id,
        ...formData,
        stage: formData.stage || "Growth",
      });
      setFeedback({ type: 'success', message: 'Startup updated!' });
      setTimeout(() => setOpen(false), 1200);
    } catch (error: any) {
      setFeedback({ type: 'error', message: error.message || 'Failed to update startup' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleEditSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[60vh] md:max-h-[70vh] overflow-y-auto pr-2 pb-4">
        {/* Column 1 */}
        <div className="flex flex-col gap-5">
          <div>
            <Label htmlFor="name" className="text-sm font-semibold mb-1">Startup Name</Label>
            <Input id="name" value={formData.name} onChange={e => handleEditInput("name", e.target.value)} className="h-11 text-base" placeholder="Enter startup name" />
          </div>
          <div>
            <Label htmlFor="location" className="text-sm font-semibold mb-1">Location</Label>
            <Input id="location" value={formData.location} onChange={e => handleEditInput("location", e.target.value)} className="h-11 text-base" placeholder="City, Country" />
          </div>
          <div>
            <Label htmlFor="funding" className="text-sm font-semibold mb-1">Funding</Label>
            <Input id="funding" type="number" value={formData.funding} onChange={e => handleEditInput("funding", Number(e.target.value))} className="h-11 text-base" placeholder="$ Amount" min={0} />
          </div>
          <div>
            <Label htmlFor="team_size" className="text-sm font-semibold mb-1">Team Size</Label>
            <Input id="team_size" type="number" value={formData.team_size} onChange={e => handleEditInput("team_size", Number(e.target.value))} className="h-11 text-base" placeholder="Number of members" min={1} />
          </div>
        </div>
        {/* Column 2 */}
        <div className="flex flex-col gap-5">
          <div>
            <Label htmlFor="description" className="text-sm font-semibold mb-1">Short Description</Label>
            <Textarea id="description" value={formData.description} onChange={e => handleEditInput("description", e.target.value)} className="min-h-[60px] text-base resize-none" placeholder="What is your startup about?" />
          </div>
          <div>
            <Label htmlFor="problem" className="text-sm font-semibold mb-1">Problem</Label>
            <Textarea id="problem" value={formData.problem} onChange={e => handleEditInput("problem", e.target.value)} className="min-h-[40px] text-base resize-none" placeholder="What problem are you solving?" />
          </div>
          <div>
            <Label htmlFor="solution" className="text-sm font-semibold mb-1">Solution</Label>
            <Textarea id="solution" value={formData.solution} onChange={e => handleEditInput("solution", e.target.value)} className="min-h-[40px] text-base resize-none" placeholder="How are you solving it?" />
          </div>
          <div>
            <Label htmlFor="stage">Stage</Label>
            <Input
              id="stage"
              name="stage"
              value={formData.stage}
              onChange={e => handleEditInput('stage', e.target.value)}
              placeholder="e.g. Growth"
            />
          </div>
        </div>
      </div>
      {feedback && (
        <div className={`text-sm p-3 rounded-lg ${feedback.type === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'}`}>
          {feedback.message}
        </div>
      )}
      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={loading || (feedback?.type === 'success')} className="flex-1 gap-2 h-11 text-base font-semibold">
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  )
} 