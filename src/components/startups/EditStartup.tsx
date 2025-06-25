import type { Doc } from "../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { useState } from "react";
import {
  MapPin,
  DollarSign,
  Users,
  AlertTriangle,
  Lightbulb,
  Pencil,
  Check,
  X,
} from "lucide-react";

interface EditStartupProps {
  startup: Doc<"startups">;
}

export function EditStartup({ startup }: EditStartupProps) {
  const updateStartup = useMutation(api.startups.mutations.updateStartup);

  // State for each field
  const [name, setName] = useState(startup.name);
  const [description, setDescription] = useState(startup.description);
  const [problem, setProblem] = useState(startup.problem);
  const [solution, setSolution] = useState(startup.solution);
  const [location, setLocation] = useState(startup.location);
  const [funding, setFunding] = useState(startup.funding);
  const [teamSize, setTeamSize] = useState(startup.team_size);

  // Editing state for each field
  const [editing, setEditing] = useState<null | string>(null);
  const [tempValue, setTempValue] = useState<string | number>("");

  // Helper to start editing a field
  const startEdit = (field: string, value: string | number) => {
    setEditing(field);
    setTempValue(value);
  };

  // Helper to cancel editing
  const cancelEdit = () => {
    setEditing(null);
    setTempValue("");
  };

  // Helper to save a field
  const saveEdit = async (field: string) => {
    let update: any = { startupId: startup._id };
    update[field] = tempValue;
    
    try {
      await updateStartup(update);
      // Update local state after successful save
      switch (field) {
        case "name": setName(tempValue as string); break;
        case "description": setDescription(tempValue as string); break;
        case "problem": setProblem(tempValue as string); break;
        case "solution": setSolution(tempValue as string); break;
        case "location": setLocation(tempValue as string); break;
        case "funding": setFunding(Number(tempValue)); break;
        case "team_size": setTeamSize(Number(tempValue)); break;
      }
      setEditing(null);
      setTempValue("");
    } catch (error) {
      console.error("Failed to update field:", error);
      // Don't close popover on error, let user try again
    }
  };

  // Render an editable field with popover
  function EditableField({
    label,
    value,
    field,
    icon,
    type = "text",
    multiline = false,
    badgeClass = "",
    valueClass = "",
    badge = false,
    prefix = "",
  }: {
    label: string;
    value: string | number;
    field: string;
    icon: React.ReactNode;
    type?: string;
    multiline?: boolean;
    badgeClass?: string;
    valueClass?: string;
    badge?: boolean;
    prefix?: string;
  }) {
    return (
      <div className="flex items-center gap-2 group">
        {icon}
        <span className="text-xs text-muted-foreground min-w-[70px]">{label}</span>
        {badge ? (
          <Badge className={badgeClass + " text-base font-semibold px-2 py-1 bg-muted"} variant="outline">
            {prefix}{value}
          </Badge>
        ) : (
          <span className={"font-medium text-sm text-foreground " + valueClass}>{prefix}{value}</span>
        )}
        <Popover open={editing === field} onOpenChange={open => !open && cancelEdit()}>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => startEdit(field, value)}
            >
              <Pencil className="h-4 w-4 text-primary" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-4" align="start">
            <form
              onSubmit={e => {
                e.preventDefault();
                saveEdit(field);
              }}
              className="flex flex-col gap-2"
            >
              <Label className="mb-1">Edit {label}</Label>
              {multiline ? (
                <Textarea
                  value={tempValue as string}
                  onChange={e => setTempValue(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      saveEdit(field);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <Input
                  type={type}
                  value={tempValue as string | number}
                  onChange={e => setTempValue(type === "number" ? Number(e.target.value) : e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      saveEdit(field);
                    }
                  }}
                  autoFocus
                />
              )}
              <div className="flex gap-2 mt-2 justify-end">
                <Button type="button" size="icon" variant="ghost" onClick={cancelEdit}>
                  <X className="h-4 w-4" />
                </Button>
                <Button type="submit" size="icon" variant="default">
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </PopoverContent>
        </Popover>
      </div>
    );
  }

  return (
    <Card className="shadow-2xl border-0 bg-gradient-to-br from-background to-muted/30 backdrop-blur-md rounded-2xl overflow-hidden">
      <CardHeader className="pb-6 bg-gradient-to-r from-primary/5 to-primary/10 border-b border-primary/10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg">
            <Lightbulb className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl lg:text-3xl font-bold">Startup Information</CardTitle>
            <CardDescription className="text-base">Edit your startup details and manage your team</CardDescription>
          </div>
        </div>
        
        <div className="space-y-4">
          <EditableField
            label="Name"
            value={name}
            field="name"
            icon={null}
            valueClass="text-xl lg:text-2xl font-bold text-foreground break-words"
          />
          <EditableField
            label="Description"
            value={description}
            field="description"
            icon={null}
            multiline
            valueClass="text-base text-muted-foreground break-words leading-relaxed"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-6 lg:p-8 space-y-8">
        {/* Problem & Solution Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-muted/50 pb-2">Problem & Solution</h3>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/20">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <h4 className="text-lg font-semibold text-amber-700 dark:text-amber-300">The Problem</h4>
              </div>
              <EditableField
                label="Problem"
                value={problem}
                field="problem"
                icon={null}
                multiline
                valueClass="text-muted-foreground break-words leading-relaxed pl-12"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
                  <Lightbulb className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-green-700 dark:text-green-300">Our Solution</h4>
              </div>
              <EditableField
                label="Solution"
                value={solution}
                field="solution"
                icon={null}
                multiline
                valueClass="text-muted-foreground break-words leading-relaxed pl-12"
              />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-muted/50 pb-2">Key Metrics</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="group p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-800/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <MapPin className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">Location</span>
              </div>
              <EditableField
                label="Location"
                value={location}
                field="location"
                icon={null}
                valueClass="font-semibold text-blue-900 dark:text-blue-100 truncate"
              />
            </div>
            
            <div className="group p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-800/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wide">Funding</span>
              </div>
              <EditableField
                label="Funding"
                value={funding}
                field="funding"
                icon={null}
                type="number"
                prefix="$"
                valueClass="font-semibold text-green-900 dark:text-green-100"
              />
            </div>
            
            <div className="group p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-800/50 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wide">Team Size</span>
              </div>
              <EditableField
                label="Team Size"
                value={teamSize}
                field="team_size"
                icon={null}
                type="number"
                valueClass="font-semibold text-purple-900 dark:text-purple-100"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 