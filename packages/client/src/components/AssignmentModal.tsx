import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface Assignment {
  assignmentId: string;
  gigId: string;
  title: string;
  description: string;
  requiredSkills: string;
  experienceLevel: string;
  estimatedDuration: string;
  hourlyRate: string;
  assignmentStatus: string;
  assignedAt: string;
  completedAt: string | null;
  paymentMethod: string;
}

interface AssignmentDialogProps {
  assignment: Assignment;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (projectLink: string) => void;
}

const AssignmentDialog: React.FC<AssignmentDialogProps> = ({
  assignment,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [projectLink, setProjectLink] = useState('');

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(projectLink);
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center pb-2 border-b">
            {assignment.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Assignment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-500">Description</p>
                <p className="font-medium">{assignment.description}</p>
              </div>
              <div>
                <p className="text-slate-500">Required Skills</p>
                <p className="font-medium">{assignment.requiredSkills}</p>
              </div>
              <div>
                <p className="text-slate-500">Experience Level</p>
                <p className="font-medium">{assignment.experienceLevel}</p>
              </div>
              <div>
                <p className="text-slate-500">Estimated Duration</p>
                <p className="font-medium">{assignment.estimatedDuration}</p>
              </div>
              <div>
                <p className="text-slate-500">Hourly Rate</p>
                <p className="font-medium text-green-600">${assignment.hourlyRate}</p>
              </div>
              <div>
                <p className="text-slate-500">Status</p>
                <p className="font-medium">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      assignment.assignmentStatus === 'assigned'
                        ? 'bg-blue-100 text-blue-800'
                        : assignment.assignmentStatus === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {assignment.assignmentStatus}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Payment Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-500">Assigned Date</p>
                <p className="font-medium">
                  {new Date(assignment.assignedAt).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-slate-500">Completion Date</p>
                <p className="font-medium">
                  {assignment.completedAt
                    ? new Date(assignment.completedAt).toLocaleDateString()
                    : 'Not provided'}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Label htmlFor="projectLink" className="text-sm font-medium">
              Project Link
            </Label>
            <div className="flex mt-1">
              <Input
                id="projectLink"
                type="url"
                placeholder="Enter your project repository or deployment URL"
                value={projectLink}
                onChange={e => setProjectLink(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Submit Project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignmentDialog;
