import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Calendar, MapPin, ChevronRight, Edit2, LogOut, ArrowLeft } from 'lucide-react';

// Assuming you add an updateUser export in apiService.js, or we fetch here directly
const API_BASE = import.meta.env.DEV ? (import.meta.env.VITE_API_URL || 'http://localhost:5000/api') : 'https://lounge-backend-npok.onrender.com/api';

export const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        if (!storedUser || !token) {
          navigate('/auth');
          return;
        }

        const res = await fetch(`${API_BASE}/users/${storedUser.id}/bookings`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          setBookings(data.bookings || []);
          setFormData({ name: data.user.name || '', phone: data.user.phone || '' });
        } else {
          // If token is invalid or expired
          navigate('/auth');
        }
      } catch (err) {
        console.error('Failed to load profile', err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_BASE}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Failed to update profile', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-navy border-t-accent-rose rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container-custom max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-navy font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
              <div className="flex justify-between items-start mb-6">
                <div className="w-20 h-20 bg-navy text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 text-slate-400 hover:text-accent-rose bg-slate-50 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              {!isEditing ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-navy">{user?.name || 'Traveler'}</h2>
                    <p className="text-slate-500 font-medium">Member</p>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Mail className="w-5 h-5 text-slate-400" />
                      <span className="font-medium">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600">
                      <Phone className="w-5 h-5 text-slate-400" />
                      <span className="font-medium">{user?.phone || 'Add phone number'}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-navy mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-rose/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-navy mb-1.5">Phone Number</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-accent-rose/20 outline-none"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button type="submit" className="flex-1 bg-navy text-white py-2 rounded-xl font-bold">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-slate-100 text-navy py-2 rounded-xl font-bold">Cancel</button>
                  </div>
                </form>
              )}

              <button
                onClick={handleLogout}
                className="w-full mt-8 flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 py-3 rounded-xl font-bold transition-colors"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>
          </div>

          {/* Bookings Area */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl font-extrabold text-navy mb-8 font-quicksand">Your Bookings</h2>
            
            {bookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">No bookings yet</h3>
                <p className="text-slate-500 mb-6">It's time to elevate your next airport experience.</p>
                <button
                  onClick={() => navigate('/search')}
                  className="bg-accent-rose text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-accent-rose-hover transition-all"
                >
                  Explore Lounges
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/4 flex-shrink-0 flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Entrance Pass</p>
                      <div className="w-24 h-24 bg-white border-2 border-dashed border-slate-300 rounded-xl flex items-center justify-center">
                        <span className="text-slate-400 text-xs font-medium text-center px-2">Show at desk</span>
                      </div>
                      <p className="text-xs font-mono font-medium text-slate-500 mt-3">{booking.confirmationCode}</p>
                    </div>
                    
                    <div className="md:w-3/4 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-navy">{booking.lounge?.name}</h3>
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 
                            booking.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-4">
                          <MapPin className="w-4 h-4" />
                          {booking.lounge?.airportCode} - {booking.lounge?.city}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                        <div>
                          <p className="text-xs text-slate-400 font-medium mb-1">Date</p>
                          <p className="font-bold text-navy">{new Date(booking.visitDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-medium mb-1">Guests</p>
                          <p className="font-bold text-navy">{booking.numberOfGuests} {booking.numberOfGuests > 1 ? 'People' : 'Person'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
