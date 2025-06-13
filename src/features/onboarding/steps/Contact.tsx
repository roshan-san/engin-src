import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { contactSchema } from "../validations/onboarding";
import { useOnboarding } from "../context/OnboardContext";
import type { ProfileInsert } from "@/types/supa-types";



export default function Contact() {
  const { nextStep, previousStep, onboardingData } = useOnboarding();
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      github_url: onboardingData.github_url || "",
      linkedin_url: onboardingData.linkedin_url || "",
    },
  });

  const handleSubmit = async (data: ProfileInsert) => {
    const isValid = await form.trigger();
    if (isValid) {
      nextStep({
        github_url: data.github_url,
        linkedin_url: data.linkedin_url,
      });
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
          <FaGithub className="text-primary w-5 h-5" />
          Add your social links
        </h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="github_url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <FaGithub className="w-6 h-6 text-foreground/80" />
                      <Input 
                        placeholder="GitHub URL" 
                        {...field}
                        className="h-14 text-lg rounded-xl"
                        autoFocus
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin_url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <FaLinkedinIn className="w-6 h-6 text-foreground/80" />
                      <Input 
                        placeholder="LinkedIn URL" 
                        {...field}
                        className="h-14 text-lg rounded-xl"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      <div className="w-full p-4 flex justify-between gap-4 mt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={previousStep}
          className="flex-1 h-12 text-lg font-medium hover:bg-muted/50 transition-colors"
        >
          Previous
        </Button>
        <Button 
          type="submit"
          onClick={form.handleSubmit(handleSubmit)}
          className="flex-1 h-12 text-lg font-medium transition-all hover:scale-[1.02]"
        >
          Finish
        </Button>
      </div>
    </div>
  );
}
