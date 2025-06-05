import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import VisualProgressTracker from '@/components/VisualProgressTracker'; // Custom component
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import CustomIcon from '@/components/CustomIcon'; // Custom component
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox'; // For digital signature confirmation

// Mock data that would come from previous steps
const reviewData = {
  applicant1: { name: "Current User", email: "current.user@example.com", phone: "123-456-7890" },
  applicant2: { name: "Invited User", email: "invited.user@example.com", phone: "098-765-4321" },
  configuration: {
    applicant1SpendingLimit: 1000,
    applicant2SpendingLimit: 1000,
    notifications: "Large Transactions, Low Balance",
    accountNickname: "Shared Expenses",
  },
};

const progressSteps = ["Party Details", "Configuration", "Review & Submit"];

const JointAccountReviewSubmitPage = () => {
  console.log('JointAccountReviewSubmitPage loaded');
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [showSignDialog, setShowSignDialog] = useState(false);

  const handleDigitalSign = () => {
    // Simulate signing process
    setIsSigned(true);
    setShowSignDialog(false);
    console.log("Account digitally signed by current user.");
  };

  const handleSubmitApplication = () => {
    if (!isSigned) {
        alert("Please complete the digital signature process first.");
        return;
    }
    console.log("Application Submitted:", reviewData);
    // API call to submit application
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <ScrollArea className="h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
        <div className="container mx-auto max-w-lg py-12 text-center">
          <VisualProgressTracker totalSteps={progressSteps.length} currentStep={progressSteps.length} stepLabels={progressSteps} className="mb-8" />
          <Alert variant="default" className="bg-green-50 dark:bg-green-900/50 border-green-300 dark:border-green-700">
            <CustomIcon name="CheckCircle2" className="h-5 w-5 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-xl font-semibold text-green-700 dark:text-green-300">Application Submitted Successfully!</AlertTitle>
            <AlertDescription className="text-green-600 dark:text-green-400 mt-2">
              Your joint account application has been received. You will be notified about the status within 2-3 business days.
              Both applicants will receive email confirmations and further instructions if needed.
            </AlertDescription>
          </Alert>
          <Button onClick={() => navigate('/dashboard')} className="mt-8 bg-blue-600 hover:bg-blue-700 text-white">
            <CustomIcon name="LayoutDashboard" className="mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="h-screen bg-slate-50 dark:bg-slate-900 p-4">
      <div className="container mx-auto max-w-3xl py-8">
        <VisualProgressTracker totalSteps={progressSteps.length} currentStep={3} stepLabels={progressSteps} className="mb-8" />
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white">Joint Account Application</h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Step 3: Review & Submit</p>

        <Card className="bg-white dark:bg-slate-800 shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CustomIcon name="ClipboardList" className="mr-2 text-blue-500" />
              Application Summary
            </CardTitle>
            <CardDescription>Please review all details carefully before submitting.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Applicant Details Section */}
            <section>
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Applicant Details</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Applicant 1 (Primary)</TableCell>
                    <TableCell>{reviewData.applicant1.name}</TableCell>
                    <TableCell>{reviewData.applicant1.email}</TableCell>
                    <TableCell>{reviewData.applicant1.phone}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Applicant 2</TableCell>
                    <TableCell>{reviewData.applicant2.name}</TableCell>
                    <TableCell>{reviewData.applicant2.email}</TableCell>
                    <TableCell>{reviewData.applicant2.phone}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </section>

            {/* Account Configuration Section */}
            <section>
              <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-200">Account Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm p-4 border rounded-md dark:border-slate-700">
                <p><strong>Account Nickname:</strong> {reviewData.configuration.accountNickname}</p>
                <p><strong>Applicant 1 Limit:</strong> ${reviewData.configuration.applicant1SpendingLimit}</p>
                <p><strong>Applicant 2 Limit:</strong> ${reviewData.configuration.applicant2SpendingLimit}</p>
                <p><strong>Notifications:</strong> {reviewData.configuration.notifications}</p>
              </div>
            </section>
          </CardContent>
        </Card>
        
        {/* Digital Signing */}
        <Card className="bg-white dark:bg-slate-800 shadow-xl mb-8">
            <CardHeader>
                <CardTitle className="flex items-center">
                    <CustomIcon name="PenSquare" className="mr-2 text-green-500" />
                    Digital Signature
                </CardTitle>
                <CardDescription>
                    {isSigned ? "Application digitally signed." : "Please complete the digital signature to proceed."}
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isSigned ? (
                    <div className="flex items-center text-green-600 dark:text-green-400">
                        <CustomIcon name="CheckCircle" className="mr-2"/>
                        <span>Your part of the digital signature is complete. Applicant 2 will be prompted to sign if not yet done.</span>
                    </div>
                ) : (
                     <Dialog open={showSignDialog} onOpenChange={setShowSignDialog}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full">
                                <CustomIcon name="Edit3" className="mr-2"/> Initiate Digital Signature
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-800">
                            <DialogHeader>
                                <DialogTitle>Digital Signature Agreement</DialogTitle>
                                <DialogDescription>
                                By checking the box and clicking 'Sign & Agree', you are electronically signing this application and agree to all terms and conditions.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="py-4 space-y-4">
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    [Placeholder for full legal agreement text. This would typically be a scrollable area with the actual terms.]
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum. Donec rutrum sed sem quis venenatis. Proin viverra risus a eros volutpat tempor.
                                </p>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="signature-confirm" onCheckedChange={(checked) => console.log("Signature confirmed: ", checked)} />
                                    <label htmlFor="signature-confirm" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    I have read and agree to the terms.
                                    </label>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="button" onClick={handleDigitalSign} className="bg-green-600 hover:bg-green-700 text-white">
                                    Sign & Agree
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </CardContent>
        </Card>


        <div className="flex justify-between items-center pt-6">
          <Button variant="outline" onClick={() => navigate('/joint-account-configuration')}>
            <CustomIcon name="ArrowLeft" className="mr-2 h-4 w-4" /> Back to Configuration
          </Button>
          <Button 
            onClick={handleSubmitApplication} 
            disabled={!isSigned} 
            className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
          >
            <CustomIcon name="Send" className="mr-2 h-4 w-4" /> Submit Application
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default JointAccountReviewSubmitPage;