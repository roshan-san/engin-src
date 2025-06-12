import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FaInfoCircle } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { startupDescriptionSchema } from "@/features/platform/create-startup/validations/startup";
import { useStartupCreation } from "../context/StartupCreateContext";
import type { StartupInsert } from "@/types/supa-types";


export default function StartupDescription() {
  const { startupCreationData, nextStep, previousStep } = useStartupCreation();
  const form = useForm({
    resolver: zodResolver(startupDescriptionSchema),
    defaultValues: {
      description: startupCreationData.description || "",
    },
  });

  const handleSubmit = async (data: StartupInsert) => {
    const isValid = await form.trigger();
    if (isValid) {
      nextStep({
        description: data.description,
      });
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
          <FaInfoCircle className="text-primary w-5 h-5" />
          Describe your startup
        </h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="Tell us about your startup..." 
                      {...field}
                      className="h-32 text-lg rounded-xl resize-none"
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
          Next
        </Button>
      </div>
    </div>
  );
} 