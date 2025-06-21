import { CreateBtn } from "@/features/platform/create-startup/CreateBtn";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_protected/dashboard")({
  component: RouteComponent,
});



function RouteComponent() {
  
  return (
    <div className="border-2 border-pink-700">

      <CreateBtn />
  
    </div>
  );
}
