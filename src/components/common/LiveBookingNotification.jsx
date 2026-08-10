import React, { useState, useEffect } from 'react';
import { Sparkles, CheckCircle2, X } from 'lucide-react';

const RECENT_BOOKINGS = [
  { name: 'Rahul S.', city: 'Mumbai', lounge: 'Encalm Lounge, Delhi T3', time: '2 mins ago' },
  { name: 'Sarah K.', city: 'London', lounge: 'Plaza Premium, Dubai T3', time: '4 mins ago' },
  { name: 'Amit P.', city: 'Bengaluru', lounge: '080 Lounge, Bengaluru T2', time: '1 min ago' },
  { name: 'Elena R.', city: 'Singapore', lounge: 'SATS Premier, Changi T1', time: '6 mins ago' },
  { name: 'Vikram M.', city: 'Delhi', lounge: 'Loyalty Lounge, Mumbai T2', time: '3 mins ago' },
  { name: 'David L.', city: 'New York', lounge: 'Primeclass Lounge, JFK T4', time: '8 mins ago' }
];

export const LiveBookingNotification = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Initial delayed popup
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    // Rotation interval
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % RECENT_BOOKINGS.length);
        setIsVisible(true);
      }, 500);
    }, 9000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed) return null;

  const booking = RECENT_BOOKINGS[currentIdx];

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 max-w-[340px] bg-white/95 backdrop-blur-md border border-accent-rose/30 shadow-2xl rounded-2xl p-3.5 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="flex items-start gap-3 relative">
        <div className="w-9 h-9 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
        </div>
        
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-[12px] font-bold text-navy font-outfit truncate">{booking.name}</span>
            <span className="text-[10px] text-slate-600 font-medium">from {booking.city}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block ml-auto shrink-0" />
          </div>
          <p className="text-[11.5px] font-bold text-slate-800 leading-tight truncate">
            Booked {booking.lounge}
          </p>
          <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-600 font-medium">
            <span className="text-accent-rose font-bold">Verified Booking</span>
            <span>•</span>
            <span>{booking.time}</span>
          </div>
        </div>

        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-1 -right-1 p-1 text-slate-600 hover:text-slate-600 rounded-full transition-colors cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
