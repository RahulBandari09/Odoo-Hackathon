 
import React, { useState, useEffect } from 'react';
import { Search, User, Plus, X, Check, Clock, Star, MessageCircle, Settings, Eye, EyeOff } from 'lucide-react';

const SkillSwapPlatform = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [swapRequests, setSwapRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showSwapForm, setShowSwapForm] = useState(false);

  // Initialize with sample data
  useEffect(() => {
    const sampleUsers = [
      {
        id: 1,
        name: "Gooty",
        location: "Tirupati, AP",
        profilePhoto: null,
        skillsOffered: ["Photoshop", "Graphic Design", "UI/UX Design"],
        skillsWanted: ["React", "JavaScript", "Web Development"],
        availability: ["weekends", "evenings"],
        isPublic: true,
        rating: 4.8,
        completedSwaps: 12
      },
      {
        id: 2,
        name: "Bandari",
        location: "Hyderabad, TS",
        profilePhoto: null,
        skillsOffered: ["React", "Node.js", "JavaScript", "Python"],
        skillsWanted: ["Graphic Design", "Marketing", "Content Writing"],
        availability: ["evenings"],
        isPublic: true,
        rating: 4.9,
        completedSwaps: 8
      },
      {
        id: 3,
        name: "Srikar",
        location: "Mumbai, MH",
        profilePhoto: null,
        skillsOffered: ["Excel", "Data Analysis", "SQL"],
        skillsWanted: ["Photoshop", "Video Editing"],
        availability: ["weekends"],
        isPublic: true,
        rating: 4.7,
        completedSwaps: 15
      },
      {
        id: 4,
        name: "Sahith",
        location: "Kolkata, WB",
        profilePhoto: null,
        skillsOffered: ["ML", "DL", "SQL"],
        skillsWanted: ["Dancing", "Video Editing"],
        availability: ["midnight"],
        isPublic: true,
        rating: 4.5,
        completedSwaps: 1
      }
    ];

    setUsers(sampleUsers);
    setCurrentUser(sampleUsers[0]); // Set first user as current user for demo
  }, []);

  const ProfileForm = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      name: user?.name || '',
      location: user?.location || '',
      skillsOffered: user?.skillsOffered || [],
      skillsWanted: user?.skillsWanted || [],
      availability: user?.availability || [],
      isPublic: user?.isPublic !== false
    });
    const [newSkillOffered, setNewSkillOffered] = useState('');
    const [newSkillWanted, setNewSkillWanted] = useState('');

    const addSkill = (type) => {
      const skill = type === 'offered' ? newSkillOffered : newSkillWanted;
      if (skill.trim()) {
        setFormData(prev => ({
          ...prev,
          [type === 'offered' ? 'skillsOffered' : 'skillsWanted']:
            [...prev[type === 'offered' ? 'skillsOffered' : 'skillsWanted'], skill.trim()]
        }));
        if (type === 'offered') setNewSkillOffered('');
        else setNewSkillWanted('');
      }
    };

    const removeSkill = (type, index) => {
      setFormData(prev => ({
        ...prev,
        [type === 'offered' ? 'skillsOffered' : 'skillsWanted']:
          prev[type === 'offered' ? 'skillsOffered' : 'skillsWanted'].filter((_, i) => i !== index)
      }));
    };

    const handleAvailabilityChange = (option) => {
      setFormData(prev => ({
        ...prev,
        availability: prev.availability.includes(option)
          ? prev.availability.filter(a => a !== option)
          : [...prev.availability, option]
      }));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {user ? 'Edit Profile' : 'Create Profile'}
              </h2>
              <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location (Optional)</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City, State/Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills I Offer</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newSkillOffered}
                    onChange={(e) => setNewSkillOffered(e.target.value)}
                    placeholder="Enter a skill you can teach"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('offered'))}
                  />
                  <button
                    type="button"
                    onClick={() => addSkill('offered')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skillsOffered.map((skill, index) => (
                    <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill('offered', index)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills I Want to Learn</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newSkillWanted}
                    onChange={(e) => setNewSkillWanted(e.target.value)}
                    placeholder="Enter a skill you want to learn"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill('wanted'))}
                  />
                  <button
                    type="button"
                    onClick={() => addSkill('wanted')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.skillsWanted.map((skill, index) => (
                    <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill('wanted', index)}
                        className="text-orange-600 hover:text-orange-800"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                <div className="space-y-2">
                  {['weekends', 'weekday evenings', 'weekday mornings', 'flexible'].map(option => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.availability.includes(option)}
                        onChange={() => handleAvailabilityChange(option)}
                        className="mr-2"
                      />
                      <span className="capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPublic: e.target.checked }))}
                />
                <label htmlFor="isPublic" className="text-sm text-gray-700 flex items-center gap-1">
                  {formData.isPublic ? <Eye size={16} /> : <EyeOff size={16} />}
                  Make my profile public (others can find and contact me)
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Save Profile
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const SwapRequestForm = ({ targetUser, onSave, onCancel }) => {
    const [selectedSkillOffered, setSelectedSkillOffered] = useState('');
    const [selectedSkillWanted, setSelectedSkillWanted] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (selectedSkillOffered && selectedSkillWanted) {
        onSave({
          skillOffered: selectedSkillOffered,
          skillWanted: selectedSkillWanted,
          message
        });
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Request Skill Swap</h2>
              <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>

            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Requesting swap with:</p>
              <p className="font-semibold">{targetUser.name}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I can teach them:
                </label>
                <select
                  value={selectedSkillOffered}
                  onChange={(e) => setSelectedSkillOffered(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a skill you offer</option>
                  {currentUser?.skillsOffered?.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I want to learn:
                </label>
                <select
                  value={selectedSkillWanted}
                  onChange={(e) => setSelectedSkillWanted(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a skill they offer</option>
                  {targetUser.skillsOffered?.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (optional):
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Introduce yourself and explain what you're looking for..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Send Request
                </button>
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  const UserCard = ({ user, onRequestSwap }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="text-white" size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{user.name}</h3>
            {user.location && <p className="text-sm text-gray-500">{user.location}</p>}
            <div className="flex items-center gap-1 mt-1">
              <Star className="text-yellow-500 fill-current" size={16} />
              <span className="text-sm text-gray-600">{user.rating} ({user.completedSwaps} swaps)</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onRequestSwap(user)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
        >
          Request Swap
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Skills they offer:</p>
          <div className="flex flex-wrap gap-1">
            {user.skillsOffered?.map(skill => (
              <span key={skill} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Skills they want:</p>
          <div className="flex flex-wrap gap-1">
            {user.skillsWanted?.map(skill => (
              <span key={skill} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Available:</p>
          <p className="text-sm text-gray-600 capitalize">{user.availability?.join(', ')}</p>
        </div>
      </div>
    </div>
  );

  const SwapRequestCard = ({ request, onAccept, onReject, onDelete, onRate }) => {
    const [showRating, setShowRating] = useState(false);
    const [rating, setRating] = useState(5);
    const [feedback, setFeedback] = useState('');

    const handleRate = () => {
      onRate(request.id, rating, feedback);
      setShowRating(false);
    };

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-gray-800">
              {request.type === 'incoming' ? `${request.fromUser} wants to swap` : `Request to ${request.toUser}`}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {request.type === 'incoming'
                ? `They'll teach you ${request.skillOffered} for your ${request.skillWanted}`
                : `You'll teach them ${request.skillOffered} for their ${request.skillWanted}`
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              request.status === 'accepted' ? 'bg-green-100 text-green-800' :
              request.status === 'completed' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }`}>
              {request.status}
            </span>
            <Clock size={16} className="text-gray-400" />
          </div>
        </div>

        {request.message && (
          <div className="bg-gray-50 p-3 rounded-lg mb-4">
            <p className="text-sm text-gray-700">{request.message}</p>
          </div>
        )}

        <div className="flex gap-2">
          {request.status === 'pending' && request.type === 'incoming' && (
            <>
              <button
                onClick={() => onAccept(request.id)}
                className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-sm"
              >
                <Check size={16} />
                Accept
              </button>
              <button
                onClick={() => onReject(request.id)}
                className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm"
              >
                <X size={16} />
                Reject
              </button>
            </>
          )}

          {request.status === 'pending' && request.type === 'outgoing' && (
            <button
              onClick={() => onDelete(request.id)}
              className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm"
            >
              <X size={16} />
              Cancel Request
            </button>
          )}

          {request.status === 'accepted' && (
            <button
              onClick={() => setShowRating(true)}
              className="flex items-center gap-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              <Star size={16} />
              Complete & Rate
            </button>
          )}
        </div>

        {showRating && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Rate this swap:</h4>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  <Star size={20} fill="currentColor" />
                </button>
              ))}
            </div>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your experience..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={handleRate}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
              >
                Submit Rating
              </button>
              <button
                onClick={() => setShowRating(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const filteredUsers = users.filter(user =>
    user.id !== currentUser?.id &&
    user.isPublic &&
    (searchQuery === '' ||
     user.skillsOffered?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
     user.skillsWanted?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
     user.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSaveProfile = (profileData) => {
    if (currentUser) {
      // Update existing user
      setUsers(prev => prev.map(user =>
        user.id === currentUser.id
          ? { ...user, ...profileData }
          : user
      ));
      setCurrentUser(prev => ({ ...prev, ...profileData }));
    } else {
      // Create new user
      const newUser = {
        id: Date.now(),
        ...profileData,
        rating: 5.0,
        completedSwaps: 0
      };
      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
    }
    setShowProfileForm(false);
  };

  const handleRequestSwap = (targetUser) => {
    setSelectedUser(targetUser);
    setShowSwapForm(true);
  };

  const handleSaveSwapRequest = (swapData) => {
    const newRequest = {
      id: Date.now(),
      fromUser: currentUser.name,
      toUser: selectedUser.name,
      skillOffered: swapData.skillOffered,
      skillWanted: swapData.skillWanted,
      message: swapData.message,
      status: 'pending',
      type: 'outgoing',
      timestamp: new Date().toISOString()
    };

    // Also create the incoming request for the target user
    const incomingRequest = {
      ...newRequest,
      id: Date.now() + 1,
      fromUser: currentUser.name,
      toUser: selectedUser.name,
      type: 'incoming'
    };

    setSwapRequests(prev => [...prev, newRequest, incomingRequest]);
    setShowSwapForm(false);
    setSelectedUser(null);
  };

  const handleAcceptRequest = (requestId) => {
    setSwapRequests(prev => prev.map(req =>
      req.id === requestId || (req.fromUser === req.fromUser && req.toUser === req.toUser)
        ? { ...req, status: 'accepted' }
        : req
    ));
  };

  const handleRejectRequest = (requestId) => {
    setSwapRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const handleDeleteRequest = (requestId) => {
    setSwapRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const handleRateSwap = (requestId, rating, feedback) => {
    setSwapRequests(prev => prev.map(req =>
      req.id === requestId
        ? { ...req, status: 'completed', rating, feedback }
        : req
    ));
  };

  const myRequests = swapRequests.filter(req =>
    req.fromUser === currentUser?.name || req.toUser === currentUser?.name
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Skill Swap Platform</h1>
            <div className="flex items-center gap-4">
              {currentUser && (
                <span className="text-sm text-gray-600">
                  Welcome, {currentUser.name}
                </span>
              )}
              <button
                onClick={() => setShowProfileForm(true)}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                <Settings size={20} />
                {currentUser ? 'Edit Profile' : 'Create Profile'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-1 mb-6">
          <button
            onClick={() => setActiveTab('browse')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'browse'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Browse Skills
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'requests'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            My Requests {myRequests.length > 0 && `(${myRequests.length})`}
          </button>
        </div>

        {activeTab === 'browse' && (
          <div>
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by skill or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {!currentUser && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-yellow-800">
                  Create your profile to start requesting skill swaps!
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  onRequestSwap={currentUser ? handleRequestSwap : undefined}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div>
            {!currentUser ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Create your profile to manage swap requests.</p>
              </div>
            ) : myRequests.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600">No swap requests yet. Start browsing skills to make your first request!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-4 mb-6">
                  <div className="bg-blue-50 px-4 py-2 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Incoming:</strong> {myRequests.filter(r => r.type === 'incoming' && r.status === 'pending').length}
                    </p>
                  </div>
                  <div className="bg-green-50 px-4 py-2 rounded-lg">
                    <p className="text-sm text-green-800">
                      <strong>Accepted:</strong> {myRequests.filter(r => r.status === 'accepted').length}
                    </p>
                  </div>
                  <div className="bg-purple-50 px-4 py-2 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>Completed:</strong> {myRequests.filter(r => r.status === 'completed').length}
                    </p>
                  </div>
                </div>

                {myRequests.map(request => (
                  <SwapRequestCard
                    key={request.id}
                    request={request}
                    onAccept={handleAcceptRequest}
                    onReject={handleRejectRequest}
                    onDelete={handleDeleteRequest}
                    onRate={handleRateSwap}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {showProfileForm && (
        <ProfileForm
          user={currentUser}
          onSave={handleSaveProfile}
          onCancel={() => setShowProfileForm(false)}
        />
      )}

      {showSwapForm && selectedUser && (
        <SwapRequestForm
          targetUser={selectedUser}
          onSave={handleSaveSwapRequest}
          onCancel={() => {
            setShowSwapForm(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default SkillSwapPlatform;
