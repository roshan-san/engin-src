import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectValue,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Briefcase } from "lucide-react";
import type { Profile } from "@/types/supa-types";
import { updateProfile } from "@/api/profile";
import { useMutation } from "@tanstack/react-query";

export default function Dropdowns({ profile }: { profile: Profile }) {
  const { mutate: updateProfileMutation } = useMutation({
    mutationFn: (updatedData: Partial<Profile>) =>
      updateProfile(profile.id, updatedData),
  });

  return (
    <div className="flex items-center justify-center border-2">
      <div className="space-y-2">
        <Label className="font-medium">Work Type</Label>
        <Select
          defaultValue={profile.work_type}
          onValueChange={(value: "Full-Time" | "Part-Time" | "Contract") => {
            updateProfileMutation({ work_type: value });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select work type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Full-Time">Full-Time</SelectItem>
            <SelectItem value="Part-Time">Part-Time</SelectItem>
            <SelectItem value="Contract">Contract</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">User Type</Label>
        <Select
          defaultValue={profile.user_type}
          onValueChange={(
            value: "Creator/Collaborator" | "Investor" | "Mentor",
          ) => {
            updateProfileMutation({ user_type: value });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select user type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Creator/Collaborator">
              Creator/Collaborator
            </SelectItem>
            <SelectItem value="Investor">Investor</SelectItem>
            <SelectItem value="Mentor">Mentor</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
