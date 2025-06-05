import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomIcon from '@/components/CustomIcon'; // Custom component
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'; // Assuming recharts is used for Chart component
import { useNavigate } from 'react-router-dom';

const spendingData = [
  { name: 'Groceries', value: 400, fill: '#8884d8' },
  { name: 'Utilities', value: 300, fill: '#82ca9d' },
  { name: 'Transport', value: 200, fill: '#ffc658' },
  { name: 'Dining', value: 280, fill: '#ff8042' },
  { name: 'Other', value: 180, fill: '#00C49F' },
];

const transactionsData = [
  { id: 'T1', date: '2024-07-28', description: 'Supermarket Purchase', amount: -55.00, currency: 'USD' },
  { id: 'T2', date: '2024-07-27', description: 'Salary Deposit', amount: 2500.00, currency: 'USD' },
  { id: 'T3', date: '2024-07-26', description: 'Online Subscription', amount: -12.99, currency: 'USD' },
  { id: 'T4', date: '2024-07-25', description: 'Restaurant Bill', amount: -78.50, currency: 'USD' },
];

const DashboardPage = () => {
  console.log('DashboardPage loaded');
  const navigate = useNavigate();

  return (
    <ScrollArea className="h-screen bg-gradient-to-br from-slate-50 to-sky-100 dark:from-slate-900 dark:to-sky-900">
      <div className="container mx-auto p-4 md:p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome Back, User!</h1>
            <p className="text-gray-600 dark:text-gray-300">Here's your financial overview.</p>
          </div>
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User Avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Account Balances Card */}
          <Card className="lg:col-span-1 bg-white dark:bg-slate-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Account Balances
                <CustomIcon name="Landmark" className="text-blue-500" />
              </CardTitle>
              <CardDescription>Your current funds</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Individual Account</h3>
                <p className="text-2xl text-green-600 dark:text-green-400">$10,250.75</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Joint Account (Main)</h3>
                <p className="text-2xl text-green-600 dark:text-green-400">$5,800.20</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" onClick={() => navigate('/account-details')}>
                <CustomIcon name="Settings2" className="mr-2 h-4 w-4" />
                Manage Accounts
              </Button>
            </CardFooter>
          </Card>

          {/* Spending Insights Card */}
          <Card className="md:col-span-2 lg:col-span-2 bg-white dark:bg-slate-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Spending Insights (This Month)
                <CustomIcon name="PieChart" className="text-purple-500" />
              </CardTitle>
              <CardDescription>Your spending habits at a glance</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={spendingData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {spendingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Quick Actions Card */}
           <Card className="lg:col-span-1 bg-white dark:bg-slate-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CustomIcon name="Zap" className="mr-2 text-yellow-500" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button onClick={() => console.log('Transfer action')} className="bg-blue-600 hover:bg-blue-700 text-white">
                <CustomIcon name="Send" className="mr-2 h-4 w-4" /> Transfer
              </Button>
              <Button onClick={() => console.log('Pay action')} className="bg-green-600 hover:bg-green-700 text-white">
                <CustomIcon name="CreditCard" className="mr-2 h-4 w-4" /> Pay Bill
              </Button>
              <Button onClick={() => console.log('Deposit action')} className="bg-purple-600 hover:bg-purple-700 text-white col-span-2">
                <CustomIcon name="Download" className="mr-2 h-4 w-4" /> Deposit Funds
              </Button>
            </CardContent>
          </Card>


          {/* Recent Transactions Card */}
          <Card className="md:col-span-2 lg:col-span-3 bg-white dark:bg-slate-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Transactions
                <CustomIcon name="History" className="text-indigo-500" />
              </CardTitle>
              <CardDescription>Your latest financial activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionsData.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell className={`text-right font-medium ${transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {transaction.amount.toFixed(2)} {transaction.currency}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* CTA for Joint Account */}
          <Card className="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CustomIcon name="Users" className="mr-3 text-yellow-300" size={32} />
                Share Your Finances, Seamlessly
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">
                Open a joint account today and manage shared expenses with ease.
                Enjoy transparency and collaborative banking.
              </p>
              <Button 
                variant="default" 
                size="lg" 
                onClick={() => navigate('/joint-account-intro')}
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-semibold shadow-md transition-transform hover:scale-105"
              >
                <CustomIcon name="PlusCircle" className="mr-2" />
                Open a Joint Account
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </ScrollArea>
  );
};

export default DashboardPage;