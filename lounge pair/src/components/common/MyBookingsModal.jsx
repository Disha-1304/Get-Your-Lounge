import React, { useState } from 'react';
import { X, Calendar, MapPin, Users, Ticket, AlertCircle, RefreshCw, CheckCircle, Clock } from 'lucide-react';
import { fetchUserBookings, cancelUserBooking } from '../../services/apiService';

export const MyBookingsModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [bookingsData, setBookingsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');
  const [cancellingId, setCancellingId] = useState(null);

  if (!isOpen) return null;

  const handleFetchBookings = async (e) => {
    if (e) e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    setActionSuccess('');

    try {
      const result = await fetchUserBookings({ email: email.trim() });
      setBookingsData(result.bookings || []);
      if ((result.bookings || []).length === 0) {
        setError('No bookings found for this email address.');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings.');
      setBookingsData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId, visitDate) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;

    setCancellingId(bookingId);
    setError('');
    setActionSuccess('');

    try {
      await cancelUserBooking(bookingId, { email: email.trim() });
      setActionSuccess('Booking cancelled successfully! Confirmation email has been sent.');
      // Refresh list
      handleFetchBookings();
    } catch (err) {
      setError(err.message || 'Failed to cancel booking.');
    } finally {
      setCancellingId(null);
    }
  };

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] flex items-center gap-1 border border-emerald-200"><CheckCircle className="w-3 h-3"/> Confirmed</span>;
      case 'CANCELLED':
        return <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 font-bold text-[11px] border border-rose-200">Cancelled</span>;
      case 'PENDING':
      default:
        return <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-bold text-[11px] flex items-center gap-1 border border-amber-200"><Clock className="w-3 h-3"/> Pending Review</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-xs">
      <div className="bg-white rounded-[24px] max-w-[620px] w-full p-6 sm:p-7 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-[20px] font-bold text-navy flex items-center gap-2">
              <Ticket className="w-5 h-5 text-[#FE2C1C]" /> Manage My Bookings
            </h3>
            <p className="text-[12px] text-slate-500 font-medium">View your lounge reservations or cancel an upcoming visit</p>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Email Search Form */}
        <form onSubmit={handleFetchBookings} className="pt-4 flex gap-2">
          <input
            type="email"
            placeholder="Enter your booking email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-[#F8F9FA] border border-slate-200 rounded-[12px] px-4 py-2.5 text-[14px] font-semibold text-slate-800 outline-none focus:border-[#FE2C1C]"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-[12px] bg-[#FE2C1C] hover:bg-[#E61E38] text-white font-bold text-[13px] flex items-center gap-2 transition-all shadow-xs disabled:opacity-50 cursor-pointer"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : 'Find Bookings'}
          </button>
        </form>

        {/* Messages */}
        {error && (
          <div className="mt-3 p-3 rounded-[12px] bg-rose-50 border border-rose-200 text-rose-700 text-[12px] font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" /> {error}
          </div>
        )}
        {actionSuccess && (
          <div className="mt-3 p-3 rounded-[12px] bg-emerald-50 border border-emerald-200 text-emerald-700 text-[12px] font-medium flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" /> {actionSuccess}
          </div>
        )}

        {/* Bookings List */}
        <div className="flex-1 overflow-y-auto mt-4 space-y-3 pr-1">
          {bookingsData && bookingsData.length > 0 && bookingsData.map(b => (
            <div key={b.id} className="p-4 rounded-[16px] bg-[#F8F9FA] border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-[15px] text-navy">{b.lounge?.name || 'Airport Lounge'}</span>
                  {getStatusBadge(b.status)}
                </div>
                <div className="text-[12px] text-slate-500 font-medium flex items-center gap-3">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {b.lounge?.airportCode} - {b.lounge?.city}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {formatDate(b.visitDate)}</span>
                  <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-slate-400" /> {b.numberOfGuests} Guest{b.numberOfGuests > 1 ? 's' : ''}</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono mt-1">Ref Code: <strong className="text-slate-700">{b.confirmationCode}</strong></div>
              </div>

              {b.status !== 'CANCELLED' && (
                <button
                  onClick={() => handleCancelBooking(b.id, b.visitDate)}
                  disabled={cancellingId === b.id}
                  className="px-3 py-1.5 rounded-lg border border-rose-300 text-rose-600 hover:bg-rose-50 text-[12px] font-bold self-start sm:self-center transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {cancellingId === b.id ? 'Cancelling...' : 'Cancel Booking'}
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
