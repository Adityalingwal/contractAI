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
    return <GigDetailView gig={selectedGig} onBack={handleBack} />;
  }

  return (
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
              <p className="text-sm text-muted-foreground mt-2">
                <span className="font-medium">Budget:</span> {gig.budget}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" onClick={() => handleSeeMore(gig)}>
                See More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
