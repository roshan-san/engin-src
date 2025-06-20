import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { locationSchema } from "../validations/onboarding";
import { useOnboarding } from "../context/OnboardContext";
import type { ProfileInsert } from "@/types/supa-types";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { useState } from "react";

export default function Location() {
  const { nextStep, previousStep } = useOnboarding();
  const form = useForm({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      location: "",
    },
  });

  const createProfile = useMutation(api.onboarding.createProfile);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: ProfileInsert) => {
    const isValid = await form.trigger();
    if (isValid) {
      setIsLoading(true);
      try {
        // Convert null interests/skills to undefined for Convex
        const convexData = {
          ...data,
          interests: data.interests ?? undefined,
          skills: data.skills ?? undefined,
        };
        await createProfile(convexData);
        nextStep({
          location: data.location,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase">
          Where are you located?
        </h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="Enter your location" 
                      {...field}
                      className="h-14 text-lg rounded-xl"
                      autoFocus
                    />
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
          {isLoading ? 'Saving...' : 'Finish'}
        </Button>
      </div>
    </div>
  );
} 