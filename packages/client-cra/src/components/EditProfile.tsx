import { dummyContractorProfile } from "../dummy-data/dummyData";
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export const EditProfile: React.FC = () => {
    const [profile, setProfile] = useState(dummyContractorProfile);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert("Profile updated successfully!");
    };
  
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">Edit Profile</CardTitle>
            <p className="text-muted-foreground">Update your contractor profile information below</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={profile.name} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={profile.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={profile.phone} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Input 
                    id="specialty" 
                    name="specialty" 
                    value={profile.specialty} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input 
                    id="experience" 
                    name="experience" 
                    value={profile.experience} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate</Label>
                  <Input 
                    id="hourlyRate" 
                    name="hourlyRate" 
                    value={profile.hourlyRate} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Input 
                    id="availability" 
                    name="availability" 
                    value={profile.availability} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio / Description</Label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  value={profile.bio} 
                  onChange={handleChange} 
                  rows={4} 
                  required 
                />
              </div>
              
              <div className="flex justify-end">
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };