import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Plus, Minus, ShieldCheck, User, Mail, Phone, Calendar, Clock, Plane, ArrowRight } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import globalLounges from '../data/globalLoungesData.json';
import loungesData from '../data/loungesData.json';
import { getCleanLoungeImage } from '../utils/loungeImageHelper';

export const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentSymbol, convertPrice } = useCurrency();

  // Combine datasets
  const allLounges = useMemo(() => {
    return [...loungesData.LOUNGE_GUIDES, ...globalLounges];
  }, []);

  const lounge = useMemo(() => {
    return allLounges.find(l => String(l.id) === String(id) || String(l.outletId) === String(id)) || allLounges[0];
  }, [id, allLounges]);

  // Passenger & Booking Form State
  const [formData, setFormData] = useState({
    date: '2026-08-10',
    timeSlot: '14:00',
    adults: 1,
    children: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    flightNumber: '',
    specialRequest: ''
  });

  const [errors, setErrors] = useState({});

  const handleGuestChange = (field, delta) => {
    setFormData(prev => {
      const current = prev[field];
      const newVal = Math.max(0, current + delta);
      if (field === 'adults' && newVal < 1) return prev;
      return { ...prev, [field]: newVal };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate(`/payment/${lounge.id || lounge.outletId}`, { 
        state: { 
          lounge, 
          bookingData: formData 
        } 
      });
    }
  };

  const basePrice = lounge?.priceUSD || 40;
  const totalGuests = formData.adults + formData.children;
  const subtotal = basePrice * totalGuests;

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-plus-jakarta flex flex-col pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 h-[68px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="text-[20px] font-extrabold tracking-wider text-navy font-outfit uppercase">
              LOUNGE<span className="text-accent-rose">PAIR</span>
            </div>
          </Link>
          <button 
            onClick={() => navigate(-1)} 
            className="text-slate-600 font-bold text-[13px] hover:text-accent-rose transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </header>

      {/* Progress Steps Header */}
      <div className="bg-white py-6 mb-8 shadow-sm border-b border-slate-100">
        <div className="max-w-[700px] mx-auto flex items-center justify-between px-6 relative">
          <div className="absolute top-[35%] left-16 right-16 h-1 bg-slate-200 -z-0 -translate-y-1/2 rounded-full"></div>
          <div className="absolute top-[35%] left-16 right-[50%] h-1 bg-accent-rose -z-0 -translate-y-1/2 rounded-full transition-all"></div>
          
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-1.5 bg-white px-3 relative z-10">
            <div className="w-8 h-8 rounded-full bg-accent-rose text-white flex items-center justify-center font-bold text-[14px] shadow-md">
              1
            </div>
            <span className="text-[12px] font-extrabold text-navy">Passenger Details</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-1.5 bg-white px-3 relative z-10">
            <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-[14px]">
              2
            </div>
            <span className="text-[12px] font-bold text-slate-400">Payment Checkout</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-[1200px] mx-auto px-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Form Column */}
          <div className="lg:col-span-2">
            <form onSubmit={handleProceedToPayment} className="flex flex-col gap-6">
              
              {/* Visit Details Section */}
              <div className="bg-white rounded-[24px] p-6 lg:p-8 border border-slate-200 shadow-sm">
                <h3 className="text-[20px] font-extrabold text-navy font-outfit mb-6 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-accent-rose" /> 1. Select Visit Date & Time
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div>
                    <label className="block text-[13px] font-bold text-navy mb-2">Visit Date *</label>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full py-3 px-4 rounded-[12px] border border-slate-300 text-[14px] font-semibold text-slate-800 outline-none focus:border-accent-rose transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-navy mb-2">Estimated Entry Time *</label>
                    <select 
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      className="w-full py-3 px-4 rounded-[12px] border border-slate-300 text-[14px] font-semibold text-slate-800 outline-none focus:border-accent-rose transition-colors bg-white"
                    >
                      <option value="08:00">08:00 AM - Morning</option>
                      <option value="11:00">11:00 AM - Midday</option>
                      <option value="14:00">02:00 PM - Afternoon</option>
                      <option value="17:00">05:00 PM - Evening</option>
                      <option value="20:00">08:00 PM - Night</option>
                      <option value="23:00">11:00 PM - Late Night</option>
                    </select>
                  </div>
                </div>

                {/* Guests Counter */}
                <div className="bg-slate-50 p-4 rounded-[16px] border border-slate-150 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="text-[15px] font-bold text-navy">Number of Guests</div>
                    <div className="text-[12px] text-slate-500">Includes access for all selected passengers</div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Adults */}
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-bold text-slate-700">Adults</span>
                      <div className="flex items-center bg-white border border-slate-300 rounded-full p-1 shadow-sm">
                        <button 
                          type="button" 
                          onClick={() => handleGuestChange('adults', -1)} 
                          className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-extrabold text-[15px] text-navy">{formData.adults}</span>
                        <button 
                          type="button" 
                          onClick={() => handleGuestChange('adults', 1)} 
                          className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-bold text-slate-700">Children</span>
                      <div className="flex items-center bg-white border border-slate-300 rounded-full p-1 shadow-sm">
                        <button 
                          type="button" 
                          onClick={() => handleGuestChange('children', -1)} 
                          className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center font-extrabold text-[15px] text-navy">{formData.children}</span>
                        <button 
                          type="button" 
                          onClick={() => handleGuestChange('children', 1)} 
                          className="w-7 h-7 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Primary Passenger Contact Info */}
              <div className="bg-white rounded-[24px] p-6 lg:p-8 border border-slate-200 shadow-sm">
                <h3 className="text-[20px] font-extrabold text-navy font-outfit mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-accent-rose" /> 2. Primary Passenger Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-[13px] font-bold text-navy mb-2">First Name *</label>
                    <input 
                      type="text" 
                      name="firstName"
                      placeholder="e.g. John"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full py-3 px-4 rounded-[12px] border text-[14px] font-semibold outline-none transition-colors ${errors.firstName ? 'border-rose-500 bg-rose-50' : 'border-slate-300 focus:border-accent-rose'}`}
                    />
                    {errors.firstName && <span className="text-[12px] font-bold text-rose-500 mt-1 block">{errors.firstName}</span>}
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-navy mb-2">Last Name *</label>
                    <input 
                      type="text" 
                      name="lastName"
                      placeholder="e.g. Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full py-3 px-4 rounded-[12px] border text-[14px] font-semibold outline-none transition-colors ${errors.lastName ? 'border-rose-500 bg-rose-50' : 'border-slate-300 focus:border-accent-rose'}`}
                    />
                    {errors.lastName && <span className="text-[12px] font-bold text-rose-500 mt-1 block">{errors.lastName}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-[13px] font-bold text-navy mb-2">Email Address (For E-Pass Delivery) *</label>
                    <input 
                      type="email" 
                      name="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full py-3 px-4 rounded-[12px] border text-[14px] font-semibold outline-none transition-colors ${errors.email ? 'border-rose-500 bg-rose-50' : 'border-slate-300 focus:border-accent-rose'}`}
                    />
                    {errors.email && <span className="text-[12px] font-bold text-rose-500 mt-1 block">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="block text-[13px] font-bold text-navy mb-2">Mobile Phone *</label>
                    <input 
                      type="tel" 
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full py-3 px-4 rounded-[12px] border text-[14px] font-semibold outline-none transition-colors ${errors.phone ? 'border-rose-500 bg-rose-50' : 'border-slate-300 focus:border-accent-rose'}`}
                    />
                    {errors.phone && <span className="text-[12px] font-bold text-rose-500 mt-1 block">{errors.phone}</span>}
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-navy mb-2">Flight Number (Optional)</label>
                  <input 
                    type="text" 
                    name="flightNumber"
                    placeholder="e.g. AI-101 / EK-505"
                    value={formData.flightNumber}
                    onChange={handleChange}
                    className="w-full py-3 px-4 rounded-[12px] border border-slate-300 text-[14px] font-semibold outline-none focus:border-accent-rose transition-colors"
                  />
                </div>
              </div>

              {/* Action Button */}
              <button 
                type="submit"
                className="w-full bg-accent-rose hover:bg-[#C8102E] text-white py-4 px-8 rounded-full font-extrabold text-[16px] flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
              >
                Continue to Payment Checkout <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm sticky top-24">
              <h4 className="text-[18px] font-extrabold text-navy font-outfit mb-4 pb-3 border-b border-slate-100">
                Booking Summary
              </h4>

              <div className="flex gap-4 mb-4">
                <img 
                  src={getCleanLoungeImage(lounge)} 
                  alt={lounge.city} 
                  className="w-20 h-20 rounded-[12px] object-cover shrink-0" 
                />
                <div>
                  <h5 className="text-[15px] font-bold text-navy leading-snug">{lounge.outletName || lounge.city}</h5>
                  <p className="text-[12px] text-slate-500">{lounge.airportName || lounge.city} ({lounge.airportCode})</p>
                  <span className="inline-block bg-slate-100 text-slate-700 text-[11px] font-bold py-0.5 px-2 rounded-md mt-1">
                    {lounge.terminals?.[0] || 'Terminal Pass'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 py-4 border-t border-slate-100 text-[13px]">
                <div className="flex justify-between text-slate-600">
                  <span>Pass Rate ({totalGuests} guest{totalGuests > 1 ? 's' : ''}):</span>
                  <span className="font-bold text-navy">{currentSymbol}{convertPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Booking Fee:</span>
                  <span className="font-bold text-emerald-600">FREE</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline mb-4">
                <span className="text-[15px] font-extrabold text-navy">Total Price:</span>
                <span className="text-[24px] font-black text-accent-rose font-outfit">
                  {currentSymbol}{convertPrice(subtotal)}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-[12px] border border-slate-200 text-[12px] text-slate-600 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant QR Pass delivered to your email.</span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
