import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CustomIcon from '@/components/CustomIcon'; // Custom component
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from 'react-router-dom';

const JointAccountIntroPage = () => {
  console.log('JointAccountIntroPage loaded');
  const navigate = useNavigate();

  const benefits = [
    { icon: "Users" as const, title: "Shared Management", description: "Easily manage finances together with a partner or family member." },
    { icon: "TrendingUp" as const, title: "Achieve Goals Faster", description: "Pool your resources to save for common goals like a vacation or a home." },
    { icon: "ShieldCheck" as const, title: "Transparency & Trust", description: "Both account holders have full visibility into transactions and balances." },
    { icon: "CreditCard" as const, title: "Dual Debit Cards", description: "Receive individual debit cards for convenient access to shared funds." },
  ];

  return (
    <ScrollArea className="h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
      <div className="container mx-auto max-w-3xl py-12">
        <Card className="shadow-xl bg-white dark:bg-slate-800">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900">
              <CustomIcon name="UserPlus" size={32} className="text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">Open a Joint Account</CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300 mt-2">
              Simplify shared finances and achieve your goals together.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 py-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Why Choose a Joint Account?</h2>
            <div className="space-y-6 mb-8">
              {benefits.map(benefit => (
                <div key={benefit.title} className="flex items-start space-x-3">
                  <CustomIcon name={benefit.icon} className="text-green-500 dark:text-green-400 mt-1" size={20} />
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-100">{benefit.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg">
                <h3 className="text-md font-semibold text-blue-700 dark:text-blue-300 mb-2 flex items-center">
                    <CustomIcon name="Info" size={18} className="mr-2"/> Important Information
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                    Joint accounts involve shared responsibility for all transactions and balances. Ensure you understand the terms and conditions before proceeding. Both parties will need to provide identification and complete the application process.
                </p>
            </div>

          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-center items-center p-6 bg-gray-50 dark:bg-slate-700/50 border-t dark:border-slate-600">
            <Button 
              size="lg" 
              onClick={() => navigate('/joint-account-party-details')}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-transform hover:scale-105"
            >
              <CustomIcon name="PlayCircle" className="mr-2" />
              Start Application
            </Button>
            <Button 
              variant="link" 
              onClick={() => navigate('/dashboard')}
              className="mt-4 sm:mt-0 sm:ml-4 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Maybe Later
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ScrollArea>
  );
};

export default JointAccountIntroPage;