import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Label is also part of shadcn
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import CustomIcon from '@/components/CustomIcon'; // Custom component
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from 'react-router-dom';
import VisualProgressTracker from '@/components/VisualProgressTracker';


const applicantSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be YYYY-MM-DD"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(5, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
});

const formSchema = z.object({
  inviteType: z.enum(["existingMember", "newUser"]),
  existingMemberSearch: z.string().optional(),
  applicant1: applicantSchema,
  applicant2: applicantSchema.optional(), // Optional if inviting new user and filling later
  agreeToTerms: z.boolean().refine(val => val === true, "You must agree to the terms"),
});

const existingMembers = [
  { value: "john.doe@example.com", label: "John Doe (john.doe@example.com)" },
  { value: "jane.smith@example.com", label: "Jane Smith (jane.smith@example.com)" },
  { value: "alice.w@example.com", label: "Alice Wonderland (alice.w@example.com)" },
];

const progressSteps = ["Party Details", "Configuration", "Review & Submit"];

const JointAccountPartyDetailsPage = () => {
  console.log('JointAccountPartyDetailsPage loaded');
  const navigate = useNavigate();
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [showCommand, setShowCommand] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inviteType: "newUser",
      applicant1: { /* Pre-fill with logged-in user data if available */
        firstName: "Current",
        lastName: "User",
        email: "current.user@example.com",
        phone: "1234567890",
        dob: "1990-01-01",
        address: "123 Main St",
        city: "Anytown",
        postalCode: "12345",
        country: "USA",
      },
      agreeToTerms: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Party Details Submitted:", values);
    // Logic to handle data, potentially update applicant2 if existingMember was selected
    navigate('/joint-account-configuration');
  };
  
  const inviteType = form.watch("inviteType");

  return (
    <ScrollArea className="h-screen bg-slate-50 dark:bg-slate-900 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <VisualProgressTracker totalSteps={progressSteps.length} currentStep={1} stepLabels={progressSteps} className="mb-8" />
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">Joint Account Application</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Step 1: Provide Applicant Details</p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="applicant1" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-6">
                <TabsTrigger value="applicant1">Applicant 1 (You)</TabsTrigger>
                <TabsTrigger value="applicant2Invite">Applicant 2 (Invite)</TabsTrigger>
                <TabsTrigger value="applicant2Details" disabled={inviteType === "existingMember" && !selectedMember}>
                  Applicant 2 (Details)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="applicant1">
                <Card className="bg-white dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle>Applicant 1 Details (Primary)</CardTitle>
                    <CardDescription>Please verify or enter your details.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.keys(applicantSchema.shape).map((fieldName) => (
                      <FormField
                        key={`applicant1.${fieldName}`}
                        control={form.control}
                        name={`applicant1.${fieldName as keyof z.infer<typeof applicantSchema>}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="capitalize">{fieldName.replace(/([A-Z])/g, ' $1')}</FormLabel>
                            <FormControl>
                              <Input placeholder={`Enter ${fieldName.toLowerCase()}`} {...field} type={fieldName === 'dob' ? 'date' : fieldName === 'email' ? 'email' : 'text'} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        ))}
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applicant2Invite">
                <Card className="bg-white dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle>Invite Second Applicant</CardTitle>
                    <CardDescription>How would you like to add the second applicant?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="inviteType"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Invitation Method</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="existingMember" />
                                </FormControl>
                                <FormLabel className="font-normal">Invite Existing Bank Member</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="newUser" />
                                </FormControl>
                                <FormLabel className="font-normal">Invite New User (by email/phone)</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {inviteType === "existingMember" && (
                      <div className="relative">
                        <Label htmlFor="existingMemberSearch">Search Existing Member</Label>
                        <Input 
                            id="existingMemberSearch"
                            placeholder="Click to search by name or email"
                            value={selectedMember ? existingMembers.find(m => m.value === selectedMember)?.label : ""}
                            onFocus={() => setShowCommand(true)}
                            readOnly
                            className="cursor-pointer"
                        />
                        {showCommand && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-slate-700 dark:border-slate-600">
                                <Command>
                                    <CommandInput 
                                        placeholder="Type name or email..." 
                                        onBlurCapture={() => setTimeout(() => setShowCommand(false), 100)} 
                                    />
                                    <CommandList>
                                        <CommandEmpty>No member found.</CommandEmpty>
                                        <CommandGroup heading="Suggestions">
                                        {existingMembers.map((member) => (
                                            <CommandItem
                                            key={member.value}
                                            value={member.value}
                                            onSelect={(currentValue) => {
                                                setSelectedMember(currentValue === selectedMember ? null : currentValue);
                                                form.setValue("existingMemberSearch", currentValue);
                                                // Potentially pre-fill applicant2 details here if member is selected
                                                console.log("Selected member:", currentValue);
                                                setShowCommand(false);
                                            }}
                                            >
                                            {member.label}
                                            </CommandItem>
                                        ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="applicant2Details">
                <Card className="bg-white dark:bg-slate-800">
                  <CardHeader>
                    <CardTitle>Applicant 2 Details</CardTitle>
                    <CardDescription>
                      {inviteType === 'existingMember' && selectedMember ? 
                       `Details for ${existingMembers.find(m => m.value === selectedMember)?.label}. Please verify.` :
                       `Please provide details for the second applicant.`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {Object.keys(applicantSchema.shape).map((fieldName) => (
                      <FormField
                        key={`applicant2.${fieldName}`}
                        control={form.control}
                        name={`applicant2.${fieldName as keyof z.infer<typeof applicantSchema>}`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="capitalize">{fieldName.replace(/([A-Z])/g, ' $1')}</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder={`Enter ${fieldName.toLowerCase()}`} 
                                {...field} 
                                type={fieldName === 'dob' ? 'date' : fieldName === 'email' ? 'email' : 'text'} 
                                // If existing member selected, you might make fields read-only or pre-fill
                                // disabled={inviteType === 'existingMember' && !!selectedMember} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        ))}
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow bg-white dark:bg-slate-800">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I/We agree to the <a href="/terms" target="_blank" className="text-blue-600 hover:underline">terms and conditions</a> for opening a joint account.
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate('/joint-account-intro')}>
                <CustomIcon name="ArrowLeft" className="mr-2 h-4 w-4" /> Back
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                Next: Configure Account <CustomIcon name="ArrowRight" className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </ScrollArea>
  );
};

export default JointAccountPartyDetailsPage;