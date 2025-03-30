import React, { useState, useEffect } from 'react';
import { getGigsWithStatus } from '../api/api';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLinkIcon } from 'lucide-react';

interface Gig {
  gigId: string;
  title: string;
  description: string;
  requiredSkills: string;
  experienceLevel: string;
  estimatedDuration: string;
  hourlyRate: string;
  status: string;
  contractorName?: string;
  assignedAt?: string;
  completedAt?: string;
  projectLink?: string;
}

export const ContractStatusView: React.FC = () => {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  useEffect(() => {
    const fetchGigs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getGigsWithStatus();
        if (response && response.gigs) {
          setGigs(response.gigs);
        } else {
          setGigs([]);
        }
      } catch (err) {
        console.error('Error fetching gigs with status:', err);
        setError('Failed to load contract data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGigs();
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'in_progress':
      case 'assigned':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      case 'open':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
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

  const getFilteredGigs = () => {
    if (activeFilter === 'all') {
      return gigs;
    }
    return gigs.filter(gig => gig.status.toLowerCase() === activeFilter.toLowerCase());
  };

  const filteredGigs = getFilteredGigs();

  return (
    <div className="w-full">
      <Card className="border shadow-sm bg-white">
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-3xl font-bold text-blue-600">Contract Status</CardTitle>
          <p className="text-gray-600">Track the status of all your contracts</p>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant={activeFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('all')}
            >
              All
            </Button>
            <Button
              variant={activeFilter === 'open' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('open')}
            >
              Open
            </Button>
            <Button
              variant={activeFilter === 'assigned' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('assigned')}
            >
              Assigned
            </Button>
            <Button
              variant={activeFilter === 'completed' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveFilter('completed')}
            >
              Completed
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
              <span className="ml-3 text-gray-600">Loading contracts...</span>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-20 text-red-500">
              <span>{error}</span>
            </div>
          ) : filteredGigs.length === 0 ? (
            <div className="flex justify-center items-center py-20 text-gray-500">
              <span>No contracts found matching the selected filter.</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 hover:bg-gray-50">
                  <TableHead className="font-medium text-gray-700">Title</TableHead>
                  <TableHead className="font-medium text-gray-700">Status</TableHead>
                  <TableHead className="font-medium text-gray-700">Contractor</TableHead>
                  <TableHead className="font-medium text-gray-700">Assigned Date</TableHead>
                  <TableHead className="font-medium text-gray-700">Completed Date</TableHead>
                  <TableHead className="font-medium text-gray-700">Project Link</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGigs.map(gig => (
                  <TableRow 
                    key={gig.gigId}
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900">
                      {gig.title}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadgeStyle(gig.status)}>
                        {formatStatus(gig.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>{gig.contractorName || 'Unassigned'}</TableCell>
                    <TableCell>{gig.assignedAt ? formatDate(gig.assignedAt) : 'N/A'}</TableCell>
                    <TableCell>{gig.completedAt ? formatDate(gig.completedAt) : 'N/A'}</TableCell>
                    <TableCell>
                      {gig.projectLink ? (
                        <a 
                          href={gig.projectLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center text-blue-500 hover:underline"
                        >
                          View Project <ExternalLinkIcon className="ml-1 h-4 w-4" />
                        </a>
                      ) : (
                        'N/A'
                      )}
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

export default ContractStatusView;