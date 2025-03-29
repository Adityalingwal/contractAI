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
      fullName: '',
      email: '',
      phone: '',
      bio: '',
      skills: '',
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    console.log('Profile updated:', data);
    // Here you would typically send this data to your API
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <Card className="border border-black-200 shadow-md rounded-md bg-white text-blue-900">
        <CardHeader className="text-white p-3 rounded-t-md border-b">
          <CardTitle className="text-lg font-bold text-white">Edit Your Profile</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Personal Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName" className="block text-sm font-semibold text-black">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  className="mt-1 block w-full bg-white border rounded-md shadow-sm
                           focus:border-blue-500 focus:ring-blue-500 text-blue-900 placeholder-black"
                  {...register('fullName', { required: 'Full name is required' })}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="block text-sm font-semibold text-black">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@example.com"
                  className="mt-1 block w-full bg-white border rounded-md shadow-sm
                           focus:border-blue-500 focus:ring-blue-500 text-blue-900 placeholder-black"
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
            </div>

            <div>
              <Label htmlFor="phone" className="block text-sm font-semibold text-black">
                Phone Number
              </Label>
              <Input
                id="phone"
                placeholder="+1 (555) 123-4567"
                className="mt-1 block w-full bg-white border rounded-md shadow-sm
                           focus:border-blue-500 focus:ring-blue-500 text-blue-900 placeholder-black"
                {...register('phone')}
              />
            </div>

            <div>
              <Label htmlFor="bio" className="block text-sm font-semibold text-black">
                Bio
              </Label>
              <Textarea
                id="bio"
                rows={3}
                placeholder="Tell us about yourself."
                className="mt-1 block w-full bg-white border rounded-md shadow-sm
                         focus:border-blue-500 focus:ring-blue-500 text-blue-900 placeholder-black"
                {...register('bio')}
              />
            </div>

            <div>
              <Label htmlFor="skills" className="block text-sm font-semibold text-black">
                Skills (comma separated)
              </Label>
              <Textarea
                id="skills"
                rows={2}
                placeholder="What skills do you have?"
                className="mt-1 block w-full bg-white border rounded-md shadow-sm
                         focus:border-blue-500 focus:ring-blue-500 text-blue-900 placeholder-black"
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