import { useAuthActions } from "@convex-dev/auth/react";
import { createFileRoute } from "@tanstack/react-router";
import { useConvexAuth } from "convex/react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { FaPlus } from "react-icons/fa";
import CreateStartup from "@/features/platform/create-startup/CreateStartup";

export const Route = createFileRoute("/_protected/dashboard")({
  component: RouteComponent,
});

function CreateBtn() {
  return (
    <div className=" fixed bottom-20 right-10 z-50">
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="flex items-center justify-center w-10 h-10 p-0">
            <FaPlus className="w-4 h-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className=" w-full">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <CreateStartup />
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function RouteComponent() {
  
  return (
    <div className="border-2 border-pink-700">

      <CreateBtn />
  
    </div>
  );
}
