import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const BusinessDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSkill, setFilterSkill] = useState('');
  
  const contractors = [
    {
      id: 1,
      name: 'Jane Doe',
      avatar: '/avatar-placeholder.jpg',
      tagline: 'Full-stack developer with 8 years of experience',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
      rating: 4.8,
      reviewCount: 36,
      hourlyRate: 85
    },
    {
      id: 2,
      name: 'John Smith',
      avatar: '/avatar-placeholder-2.jpg',
      tagline: 'UI/UX designer specializing in web and mobile interfaces',
      skills: ['Figma', 'UI Design', 'UX Research', 'Adobe XD', 'Sketch'],
      rating: 4.6,
      reviewCount: 29,
      hourlyRate: 75
    },
    {
      id: 3,
      name: 'Alex Johnson',
      avatar: '/avatar-placeholder-3.jpg',
      tagline: 'Backend developer focusing on scalable architecture',
      skills: ['Python', 'Django', 'AWS', 'PostgreSQL', 'Docker'],
      rating: 4.9,
      reviewCount: 42,
      hourlyRate: 90
    }
  ];

  const activeProjects = [
    {
      id: 1,
      title: 'Website Redesign',
      contractor: 'Jane Doe',
      startDate: '2024-02-15',
      dueDate: '2024-04-30',
      status: 'In Progress',
      budget: 5000,
      paid: 2500
    }
  ];

  // Filter contractors based on search query and selected skill
  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         contractor.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSkill = !filterSkill || contractor.skills.includes(filterSkill);
    
    return matchesSearch && matchesSkill;
  });

  // Get unique skills for filter dropdown
  const allSkills = Array.from(new Set(contractors.flatMap(c => c.skills))).sort();

  return (
    <div className="container mx-auto py-8">
      <Tabs defaultValue="find">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
          <TabsTrigger value="find">Find Contractors</TabsTrigger>
          <TabsTrigger value="projects">Active Projects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="find">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search contractors by name or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="w-full md:w-64">
                <Select value={filterSkill} onValueChange={setFilterSkill}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by skill" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Skills</SelectItem>
                    {allSkills.map(skill => (
                      <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContractors.map(contractor => (
                <Card key={contractor.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={contractor.avatar} alt={contractor.name} />
                        <AvatarFallback>{contractor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{contractor.name}</CardTitle>
                        <div className="flex items-center mt-1">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1">{contractor.rating}</span>
                          <span className="text-muted-foreground ml-1">({contractor.reviewCount})</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground mb-3">{contractor.tagline}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {contractor.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                    <p className="font-medium">${contractor.hourlyRate}/hr</p>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex gap-2 w-full">
                      <Button variant="outline" className="flex-1">View Profile</Button>
                      <Button className="flex-1">Hire</Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredContractors.length === 0 && (
              <div className="text-center py-8">
                <h3 className="text-xl font-medium mb-2">No contractors found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="projects">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Your Active Projects</h2>
            
            {activeProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeProjects.map(project => (
                  <Card key={project.id}>
                    <CardHeader>
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>Contractor: {project.contractor}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge variant={project.status === 'In Progress' ? 'default' : 'secondary'}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Start Date:</span>
                          <span>{project.startDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Due Date:</span>
                          <span>{project.dueDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Budget:</span>
                          <span>${project.budget}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Paid:</span>
                          <span>${project.paid} (${project.budget - project.paid} remaining)</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" className="flex-1">View Details</Button>
                        <Button className="flex-1">Process Payment</Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border rounded-lg bg-muted/50">
                <h3 className="text-xl font-medium mb-2">No active projects</h3>
                <p className="text-muted-foreground mb-4">You don't have any active projects at the moment</p>
                <Button>Find a Contractor</Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessDashboard; 