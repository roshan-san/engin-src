import type { Profile } from "@/utils/supa-types";
import Connections from "./components/Connections";
import Dropdowns from "./components/Dropdowns";
export default function ProfileView({ profile }: { profile: Profile }) {
  return (  
    <div>
      <Connections profile={profile}/>
      <Dropdowns profile={profile}/>
    </div>
  )
}
