import { dummyPayments } from '../dummy-data/dummyData';
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from './ui/table';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Clock, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

import { Badge } from './ui/badge';

export const PaymentStatus: React.FC = () => {
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
              {dummyPayments.map(payment => (
                <TableRow key={payment.id} className="border-b hover:bg-blue-50 transition-colors">
                  <TableCell className="font-medium text-gray-900">{payment.id}</TableCell>
                  <TableCell>{payment.project}</TableCell>
                  <TableCell className="font-medium text-blue-600">{payment.amount}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payment.status === 'Approved'
                          ? 'secondary'
                          : payment.status === 'Paid'
                            ? 'secondary'
                            : payment.status === 'Rejected'
                              ? 'destructive'
                              : 'outline'
                      }
                      className={
                        payment.status === 'Approved'
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : payment.status === 'Paid'
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                            : payment.status === 'Rejected'
                              ? 'bg-red-100 text-red-700 hover:bg-red-200'
                              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 mx-4 mb-4 p-4 bg-gray-50 rounded-lg border">
            <h3 className="text-md font-semibold mb-3 text-gray-900">Payment Status Information</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 p-2 rounded-md hover:bg-white transition-colors">
                <Clock className="h-5 w-5 mt-0.5 text-amber-500" />
                <span>
                  <span className="font-semibold text-amber-700">Pending Approval:</span> Your payment is awaiting
                  review by our finance team.
                </span>
              </li>
              <li className="flex items-start gap-3 p-2 rounded-md hover:bg-white transition-colors">
                <CheckCircle className="h-5 w-5 mt-0.5 text-green-500" />
                <span>
                  <span className="font-semibold text-green-700">Approved:</span> Your payment has been approved
                  and will be processed within 2-3 business days.
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
                  <span className="font-semibold text-red-700">Rejected:</span> Your payment request was
                  declined. Please contact support for more information.
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
