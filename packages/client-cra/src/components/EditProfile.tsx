import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  bio: string;
  skills: string;
}

export const EditProfile: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      bio: 'Experienced web developer with 5+ years of experience in React and TypeScript.',
      skills: 'React, TypeScript, Node.js, CSS, HTML',
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log('Profile updated:', data);
    // Here you would typically send this data to your API
  };

  return (
    <Card className="border border-gray-700 shadow-md rounded-md bg-gray-800 text-white">
      <CardHeader className="bg-gray-900 text-white p-4 rounded-t-md border-b border-gray-700">
        <CardTitle className="text-xl font-bold text-white">Edit Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label htmlFor="fullName" className="block text-sm font-semibold text-white">
              Full Name
            </Label>
            <Input
              id="fullName"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
                         focus:border-teal-400 focus:ring-teal-400 text-white placeholder-gray-400"
              {...register('fullName', { required: 'Full name is required' })}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-400">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email" className="block text-sm font-semibold text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
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

          <div>
            <Label htmlFor="phone" className="block text-sm font-semibold text-white">
              Phone Number
            </Label>
            <Input
              id="phone"
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
                         focus:border-teal-400 focus:ring-teal-400 text-white placeholder-gray-400"
              {...register('phone')}
            />
          </div>

          <div>
            <Label htmlFor="bio" className="block text-sm font-semibold text-white">
              Bio
            </Label>
            <Textarea
              id="bio"
              rows={4}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
                       focus:border-teal-400 focus:ring-teal-400 text-white placeholder-gray-400"
              {...register('bio')}
            />
          </div>

          <div>
            <Label htmlFor="skills" className="block text-sm font-semibold text-white">
              Skills (comma separated)
            </Label>
            <Textarea
              id="skills"
              rows={2}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
                       focus:border-teal-400 focus:ring-teal-400 text-white placeholder-gray-400"
              {...register('skills')}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-teal-600 text-white hover:bg-teal-700 border-none"
          >
            Update Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};