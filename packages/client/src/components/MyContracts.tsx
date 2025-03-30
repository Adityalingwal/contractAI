import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { getContractorByEmail, getContractorAssignments } from '../api/api';
import { format } from 'date-fns';

interface Assignment {
  assignmentId: string;
  gigId: string;
  title: string;
  assignmentStatus: string;
  assignedAt: string;
  completedAt: string | null;
  hourlyRate: number;
  estimatedDuration: string;
}

export const MyContracts: React.FC = () => {
  const [contracts, setContracts] = useState<Assignment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [contractorId, setContractorId] = useState<string | null>(null);

  useEffect(() => {
    const fetchContractorId = async () => {
      try {
        const contractorProfile = localStorage.getItem('contractorProfile');
        
        if (!contractorProfile) {
          setError("No contractor profile found. Please complete your profile first.");
          return;
        }

        const profileData = JSON.parse(contractorProfile);
        const email = profileData.email;

        if (!email) {
          setError("No contractor email found. Please complete your profile first.");
          return;
        }
        
        const response = await getContractorByEmail({ email });
        
        if (response && response.contractor && response.contractor.contractorId) {
          setContractorId(response.contractor.contractorId);
        } else {
          setError("Could not find your contractor profile.");
        }
      } catch (err) {
        console.error("Error fetching contractor details:", err);
        setError("Failed to retrieve your profile. Please try again later.");
      }
    };

    fetchContractorId();
  }, []);

  useEffect(() => {
    if (!contractorId) return;

    const fetchContracts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await getContractorAssignments(contractorId);
        
        if (response && response.assignments) {
          setContracts(response.assignments);
        } else {
          setContracts([]);
        }
      } catch (err) {
        console.error("Error fetching assignments:", err);
        setError("Failed to load your contracts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, [contractorId]);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'in_progress':
      case 'assigned':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      case 'cancelled':
        return 'bg-red-100 text-red-700 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };

  const formatStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in_progress':
        return 'In Progress';
      case 'assigned':
        return 'Assigned';
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <div className="w-full">
      <Card className="border shadow-sm bg-white">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-3xl font-bold text-blue-600">My Contracts</CardTitle>
          <p className="text-gray-600">Track and manage your active and completed contracts</p>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
              <span className="ml-3 text-gray-600">Loading your contracts...</span>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-20 text-red-500">
              <span>{error}</span>
            </div>
          ) : contracts.length === 0 ? (
            <div className="flex justify-center items-center py-20 text-gray-500">
              <span>You don't have any contracts assigned yet.</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-medium text-gray-700">Contract ID</TableHead>
                  <TableHead className="font-medium text-gray-700">Title</TableHead>
                  <TableHead className="font-medium text-gray-700">Status</TableHead>
                  <TableHead className="font-medium text-gray-700">Start Date</TableHead>
                  <TableHead className="font-medium text-gray-700">End Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contracts.map(contract => (
                  <TableRow
                    key={contract.assignmentId}
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900">
                      {contract.gigId.substring(0, 8)}...
                    </TableCell>
                    <TableCell>{contract.title}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeStyle(contract.assignmentStatus)}>
                        {formatStatus(contract.assignmentStatus)}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(contract.assignedAt)}</TableCell>
                    <TableCell>
                      {contract.completedAt ? formatDate(contract.completedAt) : 'In Progress'}
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
