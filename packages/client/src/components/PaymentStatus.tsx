import { useEffect, useState } from 'react';
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from './ui/table';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Clock, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from './ui/badge';
import { getContractorPayments, getContractorByEmail } from '../api/api';
import { format } from 'date-fns';

interface Payment {
  paymentId: string;
  assignmentId: string;
  gigTitle: string;
  amount: string;
  paymentDate: string;
  status: string;
  projectLink: string;
}

export const PaymentStatus: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const profileData = localStorage.getItem('contractorProfile');
        console.log("data is:", profileData);
        
        if (!profileData) {
          setError('Contractor profile not found. Please complete your profile.');
          setLoading(false);
          return;
        }
        
        const profileJson = JSON.parse(profileData);
      
        let contractorId = profileJson.contractorId;
        
        if (!contractorId && profileJson.email) {
          const contractorResponse = await getContractorByEmail({ email: profileJson.email });
          
          if (contractorResponse && contractorResponse.contractor) {
            contractorId = contractorResponse.contractor.contractorId;
            const updatedProfile = { ...profileJson, contractorId };
            localStorage.setItem('contractorProfile', JSON.stringify(updatedProfile));
          }
        }
        
        if (!contractorId) {
          setLoading(false);
          return;
        }
        
        const response = await getContractorPayments(contractorId);
        
        if (response && response.payments) {
          const formattedPayments = response.payments.map((payment: any) => ({
            ...payment,
            paymentDate: payment.paymentDate ? 
              format(new Date(payment.paymentDate), 'MMM dd, yyyy') : 
              'N/A'
          }));
          
          setPayments(formattedPayments);
        }
      } catch (err) {
        console.error('Error fetching payments:', err);
        setError('Failed to load payment data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="w-full">
      <Card className="border shadow-sm bg-white">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-3xl font-bold text-blue-600">Payment Status</CardTitle>
          <p className="text-gray-600">
            View the status of your payments below. Contact support if you have any questions.
          </p>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            </div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">
              <AlertCircle className="h-10 w-10 mx-auto mb-2" />
              <p>{error}</p>
            </div>
          ) : payments.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <CreditCard className="h-10 w-10 mx-auto mb-2" />
              <p>No payment records found. Completed gigs will appear here after payment.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-medium text-gray-700">Payment ID</TableHead>
                  <TableHead className="font-medium text-gray-700">Project</TableHead>
                  <TableHead className="font-medium text-gray-700">Amount</TableHead>
                  <TableHead className="font-medium text-gray-700">Date</TableHead>
                  <TableHead className="font-medium text-gray-700">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map(payment => (
                  <TableRow key={payment.paymentId} className="border-b hover:bg-blue-50 transition-colors">
                    <TableCell className="font-medium text-gray-900">
                      {payment.paymentId.substring(0, 10)}...
                    </TableCell>
                    <TableCell>{payment.gigTitle}</TableCell>
                    <TableCell className="font-medium text-blue-600">{payment.amount}</TableCell>
                    <TableCell>{payment.paymentDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          <div className="mt-6 mx-4 mb-4 p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-md font-semibold mb-3 text-gray-900">Payment Status Information</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 p-2 rounded-md hover:bg-white transition-colors">
                <Clock className="h-5 w-5 mt-0.5 text-amber-500" />
                <span>
                  <span className="font-semibold text-amber-700">Pending:</span> Your payment is awaiting
                  processing by our finance team.
                </span>
              </li>
              <li className="flex items-start gap-3 p-2 rounded-md hover:bg-white transition-colors">
                <CreditCard className="h-5 w-5 mt-0.5 text-blue-500" />
                <span>
                  <span className="font-semibold text-blue-700">Paid:</span> Payment has been successfully
                  transferred to your account.
                </span>
              </li>
              <li className="flex items-start gap-3 p-2 rounded-md hover:bg-white transition-colors">
                <AlertCircle className="h-5 w-5 mt-0.5 text-red-500" />
                <span>
                  <span className="font-semibold text-red-700">Failed:</span> Your payment was
                  not processed. Please contact support for more information.
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
