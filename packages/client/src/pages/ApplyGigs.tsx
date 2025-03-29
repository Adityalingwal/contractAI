import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../components/ui/card';
import { GigDetailView } from '../components/GigDetailView';
import { Gig } from '../types/gigsTypes';
import { dummyGigs } from '../dummy-data/dummyData';

export const ApplyGigs: React.FC = () => {
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);

  const handleSeeMore = (gig: Gig) => {
    setSelectedGig(gig);
  };

  const handleBack = () => {
    setSelectedGig(null);
  };

  if (selectedGig) {
    return (
      <div className="pt-0 pb-6 px-6 md:pt-1 md:pb-8 md:px-8">
        <div className="border rounded-lg p-6 hover:shadow-xl transition-shadow">
          <GigDetailView gig={selectedGig} onBack={handleBack} />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-0 pb-6 px-6 md:pt-1 md:pb-8 md:px-8">
      <div className="border rounded-lg p-6 hover:shadow-xl transition-shadow">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold mb-2">Available Gigs</h1>

          <div className="space-y-4">
            {dummyGigs.map(gig => (
              <Card key={gig.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{gig.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {gig.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">{gig.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Budget:</span> {gig.budget}
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => handleSeeMore(gig)}
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                    >
                      See More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
