import { ModeToggle } from "@/components/ModeToggle";
import { InstallPWAButton } from "@/components/InstallPWAButton";

export default function Header({ children }: { children: string }) {
  return (
    <div className="w-full flex items-center justify-between p-4">
      <span className="text-4xl uppercase font-bold text-primary tracking-wider">
        {children}
      </span>
      <div className="flex items-center gap-2">
        <InstallPWAButton variant="ghost" size="sm" />
        <ModeToggle />
      </div>
    </div>
  );
}
