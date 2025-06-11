import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { usernameSchema } from "../validations/onboarding";
import { useOnboarding } from "../context/OnboardContext";
import { useAuth } from "../../authentication/context/AuthContext";

type UsernameFormData = z.infer<typeof usernameSchema>;

export default function UserName() {
  const { nextStep } = useOnboarding();
  const { user ,signOut} = useAuth();
  const form = useForm<UsernameFormData>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });

  if (!user) {
    return <div>Error loading user data</div>
  }

  const handleSubmit = async (data: UsernameFormData) => {
    nextStep(data);
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.user_metadata.avatar_url} />
            <AvatarFallback>
              {user.user_metadata.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span>
            hello {user.user_metadata.name}
          </span>
        </h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="Choose Your Username" 
                      {...field}
                      className="h-14 text-lg rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full p-4 flex justify-between gap-4 mt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={signOut}
                className="flex-1 h-12 text-lg font-medium hover:bg-muted/50 transition-colors"
              >
                Sign Out 
              </Button>
              <Button 
                type="submit"
                className="flex-1 h-12 text-lg font-medium transition-all hover:scale-[1.02]"
              >
                Next
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
