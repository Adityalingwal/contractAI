import { dummyPayments } from '../dummy-data/dummyData';
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from './ui/table';
import { Card, CardHeader, CardContent, CardTitle } from './ui/card';
import { Clock, CreditCard, CheckCircle, AlertCircle } from 'lucide-react';

import { Badge } from './ui/badge';

export const PaymentStatus: React.FC = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Payment Status</CardTitle>
          <p className="text-muted-foreground">
            View the status of your payments below. Contact support if you have any questions.
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyPayments.map(payment => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.project}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
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
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="text-md font-semibold mb-2">Payment Status Information</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>
                  <span className="font-semibold">Pending Approval:</span> Your payment is awaiting
                  review by our finance team.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>
                  <span className="font-semibold">Approved:</span> Your payment has been approved
                  and will be processed within 2-3 business days.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-blue-500" />
                <span>
                  <span className="font-semibold">Paid:</span> Payment has been successfully
                  transferred to your account.
                </span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span>
                  <span className="font-semibold">Rejected:</span> Your payment request was
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
