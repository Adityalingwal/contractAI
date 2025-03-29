import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import { dummyContracts } from "../dummy-data/dummyData";
import { Badge } from "./ui/badge";

export const MyContracts: React.FC = () => {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">My Contracts</CardTitle>     
            <p className="text-muted-foreground">Track and manage your active and completed contracts</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyContracts.map((contract) => (
                  <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.id}</TableCell>
                    <TableCell>{contract.title}</TableCell>
                    <TableCell>
                      <Badge variant={
                        contract.status === 'Completed' ? 'secondary' : 
                        contract.status === 'In Progress' ? 'outline' : 
                        'destructive'
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