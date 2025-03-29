import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormData {
  full_name: string;
  email: string;
  linkedin_profile?: string;
}

const ContractorForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // Replace this with your submission logic (e.g., API call)
    console.log(data);
    reset();
  };

  return (
    <Card className="border border-gray-700 shadow-md rounded-md bg-gray-800 text-white">
      <CardHeader className="bg-gray-900 text-white p-4 rounded-t-md border-b border-gray-700">
        <CardTitle className="text-xl font-bold">Contractor Profile</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name Field */}
          <div>
            <Label htmlFor="full_name" className="block text-sm font-medium text-teal-300">
              Full Name
            </Label>
            <Input
              id="full_name"
              placeholder="John Doe"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
                         focus:border-teal-400 focus:ring-teal-400 text-white placeholder-gray-400"
              {...register('full_name', { required: 'Full name is required' })}
            />
            {errors.full_name && (
              <p className="mt-1 text-xs text-red-400">{errors.full_name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-teal-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
                         focus:border-teal-400 focus:ring-teal-400 text-white placeholder-gray-400"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* LinkedIn Profile Field */}
          <div>
            <Label htmlFor="linkedin_profile" className="block text-sm font-medium text-teal-300">
              LinkedIn Profile
            </Label>
            <Input
              id="linkedin_profile"
              type="url"
              placeholder="https://linkedin.com/in/username"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
                         focus:border-teal-400 focus:ring-teal-400 text-white placeholder-gray-400"
              {...register('linkedin_profile')}
            />
            {errors.linkedin_profile && (
              <p className="mt-1 text-xs text-red-400">{errors.linkedin_profile.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-teal-600 text-white hover:bg-teal-700 border-none"
          >
            Save Contractor
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContractorForm;
