import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import { dummyContracts } from "../dummy-data/dummyData";
import { Badge } from "./ui/badge";

export const MyContracts: React.FC = () => {
    return (
      <div className="w-full">
        <Card className="border shadow-sm bg-white">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-3xl font-bold text-blue-600">My Contracts</CardTitle>     
            <p className="text-gray-600">Track and manage your active and completed contracts</p>
          </CardHeader>
          <CardContent className="p-0">
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
                {dummyContracts.map((contract) => (
                  <TableRow 
                    key={contract.id}
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <TableCell className="font-medium text-gray-900">{contract.id}</TableCell>
                    <TableCell>{contract.title}</TableCell>
                    <TableCell>
                      <Badge variant={
                        contract.status === 'Completed' ? 'secondary' : 
                        contract.status === 'In Progress' ? 'default' : 
                        'destructive'
                      }
                      className={
                        contract.status === 'Completed' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 
                        contract.status === 'In Progress' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 
                        'bg-red-100 text-red-700 hover:bg-red-200'
                      }>
                        {contract.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{contract.startDate}</TableCell>
                    <TableCell>{contract.endDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };