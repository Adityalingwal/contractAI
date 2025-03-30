import React, { useState, useEffect } from 'react';
import { getCompletedGigsForPayment, sendGigPayment } from '../api/api';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { ExternalLinkIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from './ui/use-toast';

interface CompletedGig {
  assignmentId: string;
  gigId: string;
  contractorId: string;
  contractorName: string;
  payeeId: string;
  title: string;
  hourlyRate: string;
  completedAt: string;
  projectLink: string;
  paymentStatus: string;
}

export const SendPaymentView: React.FC = () => {
  const [completedGigs, setCompletedGigs] = useState<CompletedGig[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCompletedGigs();
    
  }, []);

  const fetchCompletedGigs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getCompletedGigsForPayment();
      console.log('response is: ', response);
      if (response && response.gigs) {
        setCompletedGigs(response.gigs);
      } else {
        setCompletedGigs([]);
      }
    } catch (err) {
      setError('Failed to load completed gigs for payment');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleSendPayment = async (gig: CompletedGig) => {
    setProcessingPayment(gig.assignmentId);
    try {
      await sendGigPayment({
        assignmentId: gig.assignmentId,
        payeeId: gig.payeeId,
        amount: parseFloat(gig.hourlyRate),
        gigTitle: gig.title
      });
      
      setCompletedGigs(prev => 
        prev.filter(item => item.assignmentId !== gig.assignmentId)
      );
      
      toast({
        title: "Payment Successful",
        description: `Payment sent to ${gig.contractorName} for ${gig.title}`,
        variant: "default",
      });
    } catch (err) {
      console.error('Error sending payment:', err);
      toast({
        title: "Payment Failed",
        description: `Failed to send payment: ${(err as Error).message}`,
        variant: "destructive",
      });
    } finally {
      setProcessingPayment(null);
    }
  };

  return (
    <div className="w-full">
      <Card className="border shadow-sm bg-white">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-3xl font-bold text-blue-600">Send Payments</CardTitle>
          <p className="text-gray-600">Process payments for completed contracts</p>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
              <span className="ml-3 text-gray-600">Loading completed contracts...</span>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-20 text-red-500">
              <span>{error}</span>
            </div>
          ) : completedGigs.length === 0 ? (
            <div className="flex justify-center items-center py-20 text-gray-500">
              <span>No completed contracts waiting for payment.</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-medium text-gray-700">Title</TableHead>
                  <TableHead className="font-medium text-gray-700">Contractor</TableHead>
                  <TableHead className="font-medium text-gray-700">Completed Date</TableHead>
                  <TableHead className="font-medium text-gray-700">Project Link</TableHead>
                  <TableHead className="font-medium text-gray-700">Amount</TableHead>
                  <TableHead className="font-medium text-gray-700">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {completedGigs.map(gig => (
                  <TableRow 
                    key={gig.assignmentId}
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900">
                      {gig.title}
                    </TableCell>
                    <TableCell>{gig.contractorName}</TableCell>
                    <TableCell>{formatDate(gig.completedAt)}</TableCell>
                    <TableCell>
                      <a 
                        href={gig.projectLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-500 hover:underline"
                      >
                        View Project <ExternalLinkIcon className="ml-1 h-4 w-4" />
                      </a>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      ${parseFloat(gig.hourlyRate).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleSendPayment(gig)}
                        disabled={processingPayment === gig.assignmentId}
                        className="bg-green-600 hover:bg-green-700 flex items-center space-x-1"
                      >
                        {processingPayment === gig.assignmentId ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            <span>Send Payment</span>
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SendPaymentView;