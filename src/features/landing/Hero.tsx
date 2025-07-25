import { GithubButton } from "../authentication/login-buttons/GithubButton";
import { GoogleButton } from "../authentication/login-buttons/GoogleButton";
import { AuthStatus } from "../authentication/AuthStatus";

export default function Hero() {
  return (
    <div className="flex-1 flex-col flex w-full items-center justify-center gap-4 p-4">
      <div className="flex flex-col justify-center items-center gap-4">
        <h1 className="text-center text-4xl font-bold bg-gradient-to-r from-primary to-accent-foreground text-transparent bg-clip-text">
          Got an idea? Launch your startup today!
        </h1>
        <p className="text-xl text-center text-muted-foreground">
          Connect with founders, mentors, and investors to build your startup.
        </p>
      </div>
      
      {/* Auth Status for debugging */}
      <AuthStatus />
      
      <div className="p-4 flex md:flex-row flex-col gap-4 justify-center items-center">
        <GithubButton />
        <GoogleButton />
      </div>
    </div>
  );
}
