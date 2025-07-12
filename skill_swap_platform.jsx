import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

export default function SkillSwapPlatform() {
  const [profile, setProfile] = useState({
    name: '',
    location: '',
    photo: '',
    skillsOffered: '',
    skillsWanted: '',
    availability: '',
    isPublic: true,
  });

  const [swapRequests, setSwapRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleTogglePublic = () => {
    setProfile({ ...profile, isPublic: !profile.isPublic });
  };

  const handleSwapRequest = (user) => {
    setPendingRequests([...pendingRequests, user]);
  };

  const handleAccept = (user) => {
    setSwapRequests([...swapRequests, user]);
    setPendingRequests(pendingRequests.filter((u) => u !== user));
  };

  const handleReject = (user) => {
    setPendingRequests(pendingRequests.filter((u) => u !== user));
  };

  const handleDeleteRequest = (user) => {
    setSwapRequests(swapRequests.filter((u) => u !== user));
  };

  return (
    <div className="p-4 space-y-4">
      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-bold">Your Profile</h2>
          <Input name="name" placeholder="Name" value={profile.name} onChange={handleInputChange} />
          <Input name="location" placeholder="Location (optional)" value={profile.location} onChange={handleInputChange} />
          <Input name="photo" placeholder="Profile Photo URL (optional)" value={profile.photo} onChange={handleInputChange} />
          <Textarea name="skillsOffered" placeholder="Skills Offered" value={profile.skillsOffered} onChange={handleInputChange} />
          <Textarea name="skillsWanted" placeholder="Skills Wanted" value={profile.skillsWanted} onChange={handleInputChange} />
          <Input name="availability" placeholder="Availability (e.g., weekends, evenings)" value={profile.availability} onChange={handleInputChange} />
          <div className="flex items-center gap-2">
            <span>Public Profile:</span>
            <Switch checked={profile.isPublic} onCheckedChange={handleTogglePublic} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-bold">Search by Skill</h2>
          <Input placeholder="Search (e.g., Photoshop)" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-bold">Swap Requests</h2>
          {swapRequests.map((user, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span>{user}</span>
              <Button variant="destructive" onClick={() => handleDeleteRequest(user)}>
                Delete
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-2">
          <h2 className="text-xl font-bold">Pending Requests</h2>
          {pendingRequests.map((user, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <span>{user}</span>
              <div className="flex gap-2">
                <Button onClick={() => handleAccept(user)}>Accept</Button>
                <Button variant="destructive" onClick={() => handleReject(user)}>Reject</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
