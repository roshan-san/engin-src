import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FaMoneyBillWave } from "react-icons/fa";
import { startupFundingSchema, type StartupFundingFormValues } from "@/features/platform/dashboard/validations/startup";
import { useStartupCreation } from "../context/StartupCreateContext";



export default function StartupFunding() {
  const { startupCreationData, nextStep, previousStep } = useStartupCreation();
  const form = useForm<StartupFundingFormValues>({
    resolver: zodResolver(startupFundingSchema),
    defaultValues: {
      funding: startupCreationData.funding || 0,
    },
  });

  const handleSubmit = async (data: StartupFundingFormValues) => {
    const isValid = await form.trigger();
    if (isValid) {
      nextStep({
        funding: data.funding,
      });
    }
  };

  return (
    <div className="w-full flex justify-center items-center gap-6 flex-col h-full p-4 max-w-2xl mx-auto">
      <div className="flex flex-col gap-6 w-full">
        <h3 className="text-xl font-semibold text-foreground tracking-wide uppercase flex items-center gap-3">
          <FaMoneyBillWave className="text-primary w-5 h-5" />
          How much funding do you have?
        </h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="funding"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input 
                      type="number"
                      placeholder="Enter funding amount" 
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
          Create Startup
        </Button>
      </div>
    </div>
  );
} 