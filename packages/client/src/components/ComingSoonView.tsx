import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { FileText } from 'lucide-react';

interface ComingSoonViewProps {
  title: string;
}

const ComingSoonView: React.FC<ComingSoonViewProps> = ({ title }) => {
  return (
    <div className="p-6 text-center">
      <Card className="p-12">
        <CardContent>
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-medium text-primary mb-2">{title}</h3>
          <p className="text-muted-foreground">This feature is coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComingSoonView;