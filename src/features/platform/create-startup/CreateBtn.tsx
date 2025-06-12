import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerTrigger } from "@/components/ui/drawer";
import { FaPlus } from "react-icons/fa";
import StartupCreationSteps from "./StartupCreationSteps";
import { StartupCreateProvider } from "./context/StartupCreateContext";
export default function CreateBtn() {
  return (
    <>
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
            <StartupCreateProvider>
            <StartupCreationSteps />
            </StartupCreateProvider>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
