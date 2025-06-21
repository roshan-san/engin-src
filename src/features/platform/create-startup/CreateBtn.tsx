import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { FaPlus } from "react-icons/fa";
import CreateStartup from "./CreateStartup";

export function CreateBtn() {
    return (
      <div className=" fixed bottom-25 right-5 z-50">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="w-15 h-15 rounded-full p-0 sm:w-auto sm:rounded-md sm:px-4 sm:py-2">
              <FaPlus className="h-4 w-4 sm:hidden" />
              <span className="hidden sm:inline">Create startup</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent className=" w-full">
            <DrawerHeader>
              <DrawerTitle>Create your startup</DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <CreateStartup />
          </DrawerContent>
        </Drawer>
      </div>
    );
  }