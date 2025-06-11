import { ModeToggle } from "@/components/ModeToggle";

export default function Header({children}:{children:string}) {
  return (
<div className="w-full flex items-center justify-between p-4">
          <span className="text-4xl uppercase font-bold text-primary tracking-wider">
            {children}
          </span>
           <ModeToggle />   
      </div>  )
}
