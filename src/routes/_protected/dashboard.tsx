import { CreateBtn } from "@/features/platform/create-startup/CreateBtn";
import Header from "@/features/platform/Header";
import { StartupLists } from "@/features/platform/view-startups/StartupLists";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_protected/dashboard")({
  component: RouteComponent,
});



function RouteComponent() {
  
  return (
    <div className="flex flex-col h-full p-4">
      <Header>Dashboard</Header>
      <StartupLists/>
      <CreateBtn />
    </div>
  );
}
