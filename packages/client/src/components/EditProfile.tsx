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
      bio: 'Tell us about yourself.',
      skills: 'What Skills do you have?',
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log('Profile updated:', data);
    // Here you would typically send this data to your API
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card className="border border-blue-200 shadow-md rounded-md bg-white text-blue-900">
        <CardHeader className="bg-blue-600 text-white p-4 rounded-t-md border-b">
          <CardTitle className="text-xl font-bold text-white">Edit Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <Label htmlFor="fullName" className="block text-sm font-semibold text-black">
                Full Name
              </Label>
              <Input
                id="fullName"
                className="mt-1 block w-full bg-white border border-blue-300 rounded-md shadow-sm
                           focus:border-blue-500 focus:ring-blue-500 text-blue-900 placeholder-blue-400"
                {...register('fullName', { required: 'Full name is required' })}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-semibold text-blue-800">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="mt-1 block w-full bg-white border border-blue-300 rounded-md shadow-sm
                           focus:border-blue-500 focus:ring-blue-500 text-blue-900 placeholder-blue-400"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone" className="block text-sm font-semibold text-blue-800">
                Phone Number
              </Label>
              <Input
                id="phone"
                className="mt-1 block w-full bg-white border border-blue-300 rounded-md shadow-sm
                           focus:border-blue-500 focus:ring-blue-500 text-blue-900 placeholder-blue-400"
                {...register('phone')}
              />
            </div>

            <div>
              <Label htmlFor="bio" className="block text-sm font-semibold text-blue-800">
                Bio
              </Label>
              <Textarea
                id="bio"
                rows={4}
                className="mt-1 block w-full bg-white border border-blue-300 rounded-md shadow-sm
                         focus:border-blue-500 focus:ring-blue-500 text-blue-900 placeholder-blue-400"
                {...register('bio')}
              />
            </div>

            <div>
              <Label htmlFor="skills" className="block text-sm font-semibold text-blue-800">
                Skills (comma separated)
              </Label>
              <Textarea
                id="skills"
                rows={2}
                className="mt-1 block w-full bg-white border border-blue-300 rounded-md shadow-sm
                         focus:border-blue-500 focus:ring-blue-500 text-blue-900 placeholder-blue-400"
                {...register('skills')}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 border-none"
            >
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};