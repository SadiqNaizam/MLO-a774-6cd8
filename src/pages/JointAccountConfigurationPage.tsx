import React from 'react';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import CustomIcon from '@/components/CustomIcon'; // Custom component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from 'react-router-dom';
import VisualProgressTracker from '@/components/VisualProgressTracker';

const formSchema = z.object({
  applicant1SpendingLimit: z.number().min(0).max(5000),
  applicant2SpendingLimit: z.number().min(0).max(5000),
  notifications: z.object({
    largeTransactions: z.boolean().default(true),
    lowBalance: z.boolean().default(true),
    weeklySummary: z.boolean().default(false),
  }),
  accountNickname: z.string().optional(),
});

const progressSteps = ["Party Details", "Configuration", "Review & Submit"];

const JointAccountConfigurationPage = () => {
  console.log('JointAccountConfigurationPage loaded');
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicant1SpendingLimit: 1000,
      applicant2SpendingLimit: 1000,
      notifications: {
        largeTransactions: true,
        lowBalance: true,
        weeklySummary: false,
      },
      accountNickname: "Shared Expenses",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Account Configuration Submitted:", values);
    navigate('/joint-account-review-submit');
  };

  return (
    <ScrollArea className="h-screen bg-slate-50 dark:bg-slate-900 p-4">
      <div className="container mx-auto max-w-2xl py-8">
        <VisualProgressTracker totalSteps={progressSteps.length} currentStep={2} stepLabels={progressSteps} className="mb-8" />
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">Joint Account Application</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Step 2: Configure Your Account</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="bg-white dark:bg-slate-800 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CustomIcon name="SlidersHorizontal" className="mr-2 text-blue-500" />
                  Spending Limits
                </CardTitle>
                <CardDescription>Set individual daily spending limits for each account holder.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="applicant1SpendingLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Applicant 1 Limit: ${field.value}</FormLabel>
                      <FormControl>
                        <Slider
                          defaultValue={[field.value]}
                          max={5000}
                          step={50}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      </FormControl>
                      <FormDescription>Max daily spending for Applicant 1.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="applicant2SpendingLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Applicant 2 Limit: ${field.value}</FormLabel>
                      <FormControl>
                        <Slider
                          defaultValue={[field.value]}
                          max={5000}
                          step={50}
                          onValueChange={(value) => field.onChange(value[0])}
                        />
                      </FormControl>
                      <FormDescription>Max daily spending for Applicant 2.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="bg-white dark:bg-slate-800 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CustomIcon name="Bell" className="mr-2 text-purple-500" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what you want to be notified about.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="notifications.largeTransactions"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm dark:border-slate-700">
                      <div className="space-y-0.5">
                        <FormLabel>Large Transactions</FormLabel>
                        <FormDescription>Receive alerts for transactions over $500.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notifications.lowBalance"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm dark:border-slate-700">
                      <div className="space-y-0.5">
                        <FormLabel>Low Balance Warnings</FormLabel>
                        <FormDescription>Alerts when balance drops below $100.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="notifications.weeklySummary"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm dark:border-slate-700">
                      <div className="space-y-0.5">
                        <FormLabel>Weekly Summary</FormLabel>
                        <FormDescription>Get a summary of account activity each week.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            
            <Card className="bg-white dark:bg-slate-800 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CustomIcon name="PenTool" className="mr-2 text-green-500" />
                  Account Nickname (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="accountNickname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nickname</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Vacation Fund, Household Bills" {...field} />
                      </FormControl>
                      <FormDescription>Give your joint account a personalized name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="flex justify-between space-x-4 pt-6">
              <Button type="button" variant="outline" onClick={() => navigate('/joint-account-party-details')}>
                <CustomIcon name="ArrowLeft" className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Next: Review & Submit <CustomIcon name="ArrowRight" className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
};

export default JointAccountConfigurationPage;