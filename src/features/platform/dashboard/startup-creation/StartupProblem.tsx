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
import { FaExclamationTriangle } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { startupProblemSchema, type StartupProblemFormValues } from "@/features/platform/dashboard/validations/startup";
import { useStartupCreation } from "../context/StartupCreateContext";


export default function StartupProblem() {
  const { startupCreationData, nextStep, previousStep } = useStartupCreation();
  const form = useForm<StartupProblemFormValues>({
    resolver: zodResolver(startupProblemSchema),
    defaultValues: {
      problem: startupCreationData.problem || "",
    },
  });

  const handleSubmit = async (data: StartupProblemFormValues) => {
    const isValid = await form.trigger();
    if (isValid) {
      nextStep({
        problem: data.problem,
      });
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
          <FaExclamationTriangle className="text-primary w-5 h-5" />
          What problem are you solving?
        </h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="problem"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      placeholder="Describe the problem your startup is solving..." 
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