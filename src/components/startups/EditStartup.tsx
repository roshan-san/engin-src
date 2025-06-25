import type { Doc } from "../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
    <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-md p-2 md:p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-2">Startup Info</CardTitle>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lightbulb className="h-6 w-6" />
          </span>
          <div>
            <EditableField
              label="Name"
              value={name}
              field="name"
              icon={null}
              valueClass="text-lg font-semibold text-foreground"
            />
            <EditableField
              label="Description"
              value={description}
              field="description"
              icon={null}
              multiline
              valueClass="text-base text-muted-foreground"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-t border-muted my-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-amber-600 font-semibold text-base">
              <AlertTriangle className="h-5 w-5" />
              <span>Problem</span>
            </div>
            <EditableField
              label="Problem"
              value={problem}
              field="problem"
              icon={null}
              multiline
              valueClass="text-base text-muted-foreground pl-7"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-green-600 font-semibold text-base">
              <Lightbulb className="h-5 w-5" />
              <span>Solution</span>
            </div>
            <EditableField
              label="Solution"
              value={solution}
              field="solution"
              icon={null}
              multiline
              valueClass="text-base text-muted-foreground pl-7"
            />
          </div>
        </div>
        <div className="border-t border-muted my-2" />
        <div className="flex flex-wrap gap-4 mt-2">
          <EditableField
            label="Location"
            value={location}
            field="location"
            icon={<MapPin className="h-4 w-4 text-blue-500" />}
            badge
            badgeClass="bg-blue-100 text-blue-800 text-sm font-semibold"
            valueClass="text-sm font-semibold"
          />
          <EditableField
            label="Funding"
            value={funding}
            field="funding"
            icon={<DollarSign className="h-4 w-4 text-green-500" />}
            type="number"
            badge
            prefix="$"
            badgeClass="bg-green-100 text-green-800 text-sm font-semibold"
            valueClass="text-sm font-semibold"
          />
          <EditableField
            label="Team Size"
            value={teamSize}
            field="team_size"
            icon={<Users className="h-4 w-4 text-purple-500" />}
            type="number"
            badge
            badgeClass="bg-purple-100 text-purple-800 text-sm font-semibold"
            valueClass="text-sm font-semibold"
          />
        </div>
      </CardContent>
    </Card>
  );
} 