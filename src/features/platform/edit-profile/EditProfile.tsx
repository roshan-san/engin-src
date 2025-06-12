import type { Profile } from "@/types/supa-types";
import Connections from "./components/Connections";
import Dropdowns from "./components/Dropdowns";
import { AvatarEditor } from "./components/AvatarEdit";

export default function ProfileView({ profile }: { profile: Profile }) {
  return (  
    <div className="flex items-center justify-center">
      <Connections profile={profile}/>
      <Dropdowns profile={profile}/>
      <AvatarEditor profile={profile}/>
    </div>
  )
}
