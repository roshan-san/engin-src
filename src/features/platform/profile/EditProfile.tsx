import type { Profile } from "@/types/supa-types";
import Connections from "./edit-profile/Connections";
import Dropdowns from "./edit-profile/Dropdowns";
import { AvatarEditor } from "./edit-profile/AvatarEdit";
export default function ProfileView({ profile }: { profile: Profile }) {
  return (  
    <div className="flex items-center justify-center">
      <Connections profile={profile}/>
      <Dropdowns profile={profile}/>
      <AvatarEditor profile={profile}/>
    </div>
  )
}
