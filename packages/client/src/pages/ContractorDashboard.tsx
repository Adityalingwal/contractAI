import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';

const ContractorDashboard = () => {
  // This would be fetched from your API
  const contractor = {
    name: 'Jane Doe',
    avatar: '/avatar-placeholder.jpg',
    tagline: 'Full-stack developer with 8 years of experience',
    rating: 4.8,
    reviews: 36,
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    projects: [
      { id: 1, title: 'E-commerce Platform', description: 'Built a full e-commerce platform with React and Node.js', image: '/project1.jpg' },
      { id: 2, title: 'CRM System', description: 'Developed a customer relationship management system', image: '/project2.jpg' },
      { id: 3, title: 'Mobile App', description: 'Created a cross-platform mobile app using React Native', image: '/project3.jpg' },
    ],
    reviewsList: [
      { id: 1, author: 'John Smith', rating: 5, comment: 'Exceptional work, delivered on time.', date: '2023-12-15' },
      { id: 2, author: 'Sarah Johnson', rating: 4, comment: 'Great communication and skill set.', date: '2023-11-20' },
    ],
    activeProjects: [
      { id: 1, title: 'Dashboard Redesign', client: 'Acme Corp', progress: 75, deadline: '2024-04-15' },
    ]
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Section */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="w-24 h-24 mx-auto">
              <AvatarImage src={contractor.avatar} alt={contractor.name} />
              <AvatarFallback>{contractor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4">{contractor.name}</CardTitle>
            <CardDescription>{contractor.tagline}</CardDescription>
            <div className="flex items-center justify-center mt-2">
              <span className="text-yellow-500">★</span>
              <span className="ml-1">{contractor.rating}</span>
              <span className="text-muted-foreground ml-1">({contractor.reviews} reviews)</span>
            </div>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {contractor.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">{skill}</Badge>
              ))}
            </div>

            {contractor.activeProjects.length > 0 && (
              <>
                <h3 className="font-semibold mb-2">Active Projects</h3>
                <div className="space-y-4">
                  {contractor.activeProjects.map(project => (
                    <div key={project.id} className="border rounded-lg p-3">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{project.title}</h4>
                        <span className="text-sm text-muted-foreground">Due: {project.deadline}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Client: {project.client}</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Main Content Area */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="projects">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contractor.projects.map(project => (
                  <Card key={project.id}>
                    <div className="aspect-video w-full bg-muted rounded-t-lg overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{project.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Client Reviews</h2>
              <div className="space-y-4">
                {contractor.reviewsList.map(review => (
                  <Card key={review.id}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">{review.author}</CardTitle>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>★</span>
                          ))}
                        </div>
                      </div>
                      <CardDescription>{review.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="earnings" className="mt-6">
              <h2 className="text-2xl font-bold mb-4">Earnings & Payments</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Track your project payments and earnings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground py-8">Payment details will appear here</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ContractorDashboard; 