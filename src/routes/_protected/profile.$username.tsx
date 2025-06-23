import { createFileRoute } from "@tanstack/react-router";
import ViewProfile from "@/features/platform/view-profile/ViewProfile";
import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { FullScreenLoader } from "@/components/FullScreenLoader";

export const Route = createFileRoute("/_protected/profile/$username")({
  component: ProfilePage,
});

function ProfilePage() {
  const {username }=Route.useParams()
  const profile = useQuery(api.profile.queries.getProfileByUsername,{
    username:username
  })
  if (profile == undefined){
    return <FullScreenLoader/>
  }
  if(!profile){
    return <div>Profile not found</div>
  }
 
  return <ViewProfile profile={profile} />;
}
