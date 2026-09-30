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
    <div className="min-h-screen relative pb-12 overflow-hidden">
      {/* Full-screen Blurred Background Image */}
      <div className="fixed inset-0 z-0">
        <img src="/lounge-pair-final-image.jpg" alt="Premium Lounge Background" className="w-full h-full object-cover blur-md scale-105 opacity-80" />
        {/* Subtle dark overlay so the white cards pop beautifully */}
        <div className="absolute inset-0 bg-[#0A192F]/20 mix-blend-multiply"></div>
      </div>
      
      <div className="container-custom max-w-6xl mx-auto relative z-10 pt-28">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white hover:text-white font-bold mb-8 transition-colors bg-navy/60 hover:bg-navy/80 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 w-fit"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white relative overflow-hidden group">
              {/* Clean white aesthetic - Removed the dark gradient top bar */}
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-accent-rose to-orange-400 shadow-xl shadow-accent-rose/20">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-3xl font-extrabold text-navy border-4 border-white">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2.5 text-navy hover:text-white bg-white hover:bg-accent-rose rounded-full transition-all shadow-sm border border-slate-100 hover:border-transparent"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              {!isEditing ? (
                <div className="space-y-6 relative z-10">
                  <div>
                    <h2 className="text-3xl font-extrabold text-navy font-quicksand">{user?.name || 'Traveler'}</h2>
                    <button className="flex items-center gap-2 mt-3 px-4 py-2 bg-slate-900 text-white text-[12px] font-bold rounded-xl shadow-lg hover:bg-[#162C46] transition-all border border-slate-700 hover:-translate-y-0.5 group">
                      <span className="w-5 h-5 bg-gradient-to-tr from-amber-200 to-amber-500 rounded-full flex items-center justify-center text-slate-900 shadow-inner group-hover:scale-110 transition-transform">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      </span>
                      Link Priority Pass
                    </button>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-slate-100/60">
                    <div className="flex items-center gap-4 text-slate-600 bg-slate-50/50 p-3 rounded-2xl">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                        <Mail className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-navy text-[15px]">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-600 bg-slate-50/50 p-3 rounded-2xl">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                        <Phone className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-navy text-[15px]">{user?.phone || 'Add phone number'}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdate} className="space-y-5 relative z-10 pt-4">
                  <div>
                    <label className="block text-[13px] font-extrabold text-navy mb-1.5 uppercase tracking-wide">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl focus:border-accent-rose focus:ring-4 focus:ring-accent-rose/10 outline-none transition-all font-bold text-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-extrabold text-navy mb-1.5 uppercase tracking-wide">Phone Number</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-100 rounded-xl focus:border-accent-rose focus:ring-4 focus:ring-accent-rose/10 outline-none transition-all font-bold text-navy"
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button type="submit" className="flex-1 bg-navy hover:bg-[#162C46] text-white py-3 rounded-xl font-bold shadow-lg shadow-navy/20 transition-all">Save Changes</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-navy py-3 rounded-xl font-bold transition-all">Cancel</button>
                  </div>
                </form>
              )}

              <button
                onClick={handleLogout}
                className="w-full mt-8 flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white py-3.5 rounded-xl font-bold transition-all relative z-10 group"
              >
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Log Out
              </button>
            </div>
          </div>

          {/* Bookings Area */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-4xl font-extrabold text-white mb-8 font-quicksand flex items-center gap-3 drop-shadow-md">
              Your Bookings
              <span className="bg-white/20 text-white backdrop-blur-md border border-white/30 text-sm px-3 py-1 rounded-full">{bookings.length}</span>
            </h2>
            
            {bookings.length === 0 ? (
              <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-12 text-center border border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <Calendar className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-extrabold text-navy mb-3 font-quicksand">No bookings yet</h3>
                <p className="text-slate-500 mb-8 max-w-sm mx-auto font-medium text-lg">It's time to elevate your next airport experience. Discover premium lounges worldwide.</p>
                <button
                  onClick={() => navigate('/search')}
                  className="bg-accent-rose text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-accent-rose/20 hover:shadow-xl hover:bg-accent-rose-hover hover:-translate-y-1 transition-all"
                >
                  Explore Lounges
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {bookings.map((booking) => (
                  <div key={booking.id} className="bg-white/90 backdrop-blur-xl rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.18)] transition-all flex flex-col md:flex-row overflow-hidden group">
                    {/* Ticket Stub (Left Side) */}
                    <div className="md:w-[28%] flex-shrink-0 flex flex-col items-center justify-center p-6 bg-navy relative">
                      {/* Ticket Perforation edge */}
                      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-4 overflow-hidden">
                        <div className="absolute right-[-8px] top-[-10px] bottom-[-10px] w-4 border-l-4 border-dotted border-white"></div>
                      </div>

                      <p className="text-[10px] font-extrabold text-white/50 uppercase tracking-[2px] mb-4">Entrance Pass</p>
                      
                      <div className="w-24 h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center p-2 mb-4 group-hover:scale-105 transition-transform">
                        <div className="w-full h-full border border-dashed border-white/30 rounded-xl flex items-center justify-center">
                          <span className="text-white text-[11px] font-bold text-center px-1 uppercase tracking-widest">Show At Desk</span>
                        </div>
                      </div>
                      
                      <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md">
                        <p className="text-sm font-mono font-bold text-white tracking-wider">{booking.confirmationCode}</p>
                      </div>
                    </div>
                    
                    {/* Booking Details (Right Side) */}
                    <div className="md:w-[72%] p-8 flex flex-col justify-between bg-white relative">
                      {/* Status Badge */}
                      <div className="absolute top-8 right-8">
                        <span className={`px-4 py-1.5 text-[11px] font-extrabold rounded-full uppercase tracking-wider shadow-sm ${
                          booking.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 
                          booking.status === 'CANCELLED' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                          {booking.status}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-2xl font-extrabold text-navy pr-24 mb-2 font-quicksand group-hover:text-accent-rose transition-colors">{booking.lounge?.name}</h3>
                        <div className="flex items-center gap-2 text-slate-500 font-medium mb-8">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <MapPin className="w-3.5 h-3.5" />
                          </div>
                          {booking.lounge?.airportCode} - {booking.lounge?.city}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
                        <div>
                          <p className="text-[11px] text-slate-400 font-extrabold uppercase tracking-wider mb-1">Date</p>
                          <p className="font-extrabold text-navy text-[15px]">{new Date(booking.visitDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                        </div>
                        <div>
                          <p className="text-[11px] text-slate-400 font-extrabold uppercase tracking-wider mb-1">Guests</p>
                          <p className="font-extrabold text-navy text-[15px]">{booking.numberOfGuests} {booking.numberOfGuests > 1 ? 'People' : 'Person'}</p>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-[11px] text-slate-400 font-extrabold uppercase tracking-wider mb-1">Total Paid</p>
                          <p className="font-extrabold text-navy text-[15px]">${booking.totalPrice}</p>
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
