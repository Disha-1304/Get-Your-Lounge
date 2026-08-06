import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Star, Shield, Phone, Mail, Plus, Minus, ArrowRight, MapPin, Calendar } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import globalLounges from '../data/globalLoungesData.json';
import loungesData from '../data/loungesData.json';
import { getCleanLoungeImage } from '../utils/loungeImageHelper';

export const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentSymbol, convertPrice } = useCurrency();

  // Combine datasets to find target lounge
  const allLounges = useMemo(() => {
    return [...loungesData.LOUNGE_GUIDES, ...globalLounges];
  }, []);

  const lounge = useMemo(() => {
    return allLounges.find(l => String(l.id) === String(id) || String(l.outletId) === String(id)) || allLounges[0];
  }, [id, allLounges]);

  const todayStr = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  // Form State
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [formData, setFormData] = useState({
    countryCode: '+91',
    phone: '',
    email: '',
    visitDate: todayStr
  });

  const [errors, setErrors] = useState({});

  const handleAdultsChange = (delta) => {
    setAdults(prev => Math.max(1, prev + delta));
  };

  const handleChildrenChange = (delta) => {
    setChildren(prev => Math.max(0, prev + delta));
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
    if (!formData.phone.trim()) errs.phone = 'Mobile number is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (validateForm()) {
      navigate(`/payment/${lounge.id || lounge.outletId}`, { 
        state: { 
          lounge, 
          bookingData: {
            ...formData,
            adults,
            children,
            fullPhone: `${formData.countryCode} ${formData.phone}`
          } 
        } 
      });
    }
  };

  const basePrice = lounge?.priceUSD || 40;

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-plus-jakarta flex flex-col pb-20">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-[1350px] mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="text-[20px] font-extrabold tracking-wider text-navy font-outfit uppercase">
              GET MY <span className="text-accent-rose">LOUNGE</span>
            </div>
          </Link>
          <button 
            onClick={() => navigate(-1)} 
            className="text-slate-600 font-bold text-[13px] hover:text-accent-rose transition-colors flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Go Back
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-10 w-full flex-1 pt-6">
        
        {/* 1. Stepper Header Bar Card (2-Step) */}
        <div className="bg-white rounded-[20px] p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-5">
          <div className="flex items-center justify-between relative px-4 sm:px-12">
            
            {/* Step 1: Fill Your Info */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-10 h-10 rounded-full bg-[#FE2C1C] text-white flex items-center justify-center shadow-md">
                <User className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-[12px] font-bold text-[#FE2C1C]">Fill Your Info</span>
            </div>

            {/* Connecting Line */}
            <div className="flex-1 h-[2px] bg-slate-200 mx-4 sm:mx-12"></div>

            {/* Step 2: Finalize Payment */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-10 h-10 rounded-full border-2 border-slate-300 bg-white text-slate-400 flex items-center justify-center">
                <Shield className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-[12px] font-bold text-slate-400">Finalize Payment</span>
            </div>

          </div>
        </div>

        {/* 2. Lounge Information Header Card */}
        <div className="bg-white rounded-[20px] p-4 sm:p-5 border border-slate-200/80 shadow-xs mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={getCleanLoungeImage(lounge)} 
              alt={lounge.outletName || lounge.city} 
              className="w-[100px] sm:w-[110px] h-[75px] rounded-[14px] object-cover shrink-0 border border-slate-100 shadow-xs" 
            />
            <div>
              <h3 className="text-[18px] sm:text-[20px] font-bold text-navy leading-snug">
                {lounge.outletName || `${lounge.city} Executive Lounge`}
              </h3>
              <p className="text-[13px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {lounge.city} • {lounge.airportName || lounge.airportCode} {lounge.terminals?.[0] ? `(${lounge.terminals[0]})` : ''}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                  3 Hours Access
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
                  Lounge Pass
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col items-baseline sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
            <span className="text-[12px] text-slate-400 font-medium">
              Visiting <strong className="text-slate-600">{formData.visitDate}</strong>
            </span>
            <div className="text-[18px] sm:text-[20px] font-extrabold text-navy mt-0.5">
              {currentSymbol}{convertPrice(basePrice)}<span className="text-[13px] font-medium text-slate-500">/person</span>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <form onSubmit={handleProceedToPayment} className="space-y-5">

          {/* 3. Visit Date Selection Card */}
          <div className="bg-white rounded-[20px] p-5 sm:p-6 border border-slate-200/80 shadow-xs">
            <h4 className="text-[16px] font-bold text-navy mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#FE2C1C]" /> Select Visit Date
            </h4>
            <div>
              <label className="block text-[12px] font-bold text-slate-600 mb-1.5">Visit Date *</label>
              <input 
                type="date"
                name="visitDate"
                min={todayStr}
                value={formData.visitDate}
                onChange={handleChange}
                className="w-full bg-[#F8F9FA] border border-slate-200 rounded-[12px] px-4 py-3 text-[14px] font-semibold text-slate-800 outline-none focus:border-[#FE2C1C] transition-colors"
                required
              />
            </div>
          </div>

          {/* 4. Contact Information & Travelers Card */}
          <div className="bg-white rounded-[20px] p-5 sm:p-6 border border-slate-200/80 shadow-xs">
            <h4 className="text-[17px] font-bold text-navy mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#FE2C1C]" /> Contact Information
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Mobile Number */}
              <div>
                <label className="block text-[12px] font-bold text-slate-600 mb-1.5">Mobile Number *</label>
                <div className="flex">
                  <select 
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="bg-[#F8F9FA] border border-r-0 border-slate-200 rounded-l-[12px] px-3 py-3 text-[14px] font-semibold text-slate-800 outline-none cursor-pointer"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+971">+971</option>
                    <option value="+65">+65</option>
                  </select>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="98XXXXXXXX"
                    className={`flex-1 bg-[#F8F9FA] border border-slate-200 rounded-r-[12px] px-4 py-3 text-[14px] font-semibold text-slate-800 outline-none focus:border-[#FE2C1C] transition-colors ${errors.phone ? 'border-rose-500 bg-rose-50' : ''}`}
                  />
                </div>
                {errors.phone && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.phone}</span>}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-[12px] font-bold text-slate-600 mb-1.5">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    className={`w-full bg-[#F8F9FA] border border-slate-200 rounded-[12px] pl-10 pr-4 py-3 text-[14px] font-semibold text-slate-800 outline-none focus:border-[#FE2C1C] transition-colors ${errors.email ? 'border-rose-500 bg-rose-50' : ''}`}
                  />
                </div>
                {errors.email && <span className="text-[11px] font-bold text-rose-500 mt-1 block">{errors.email}</span>}
              </div>
            </div>

            {/* Integrated Number of Travelers (Adults & Children) */}
            <div className="border-t border-slate-150 pt-5">
              <label className="block text-[13px] font-bold text-navy mb-3">Number of Travelers</label>
              <div className="flex flex-wrap items-center gap-8">
                {/* Adults Counter */}
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-semibold text-slate-600">Adults</span>
                  <div className="flex items-center gap-2">
                    <button 
                      type="button" 
                      onClick={() => handleAdultsChange(-1)} 
                      className="w-9 h-9 rounded-[10px] border border-slate-200 bg-white flex items-center justify-center font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-extrabold text-[16px] text-[#FE2C1C]">{adults}</span>
                    <button 
                      type="button" 
                      onClick={() => handleAdultsChange(1)} 
                      className="w-9 h-9 rounded-[10px] border border-slate-200 bg-white flex items-center justify-center font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children Counter */}
                <div className="flex items-center gap-3">
                  <span className="text-[13px] font-semibold text-slate-600">Children</span>
                  <div className="flex items-center gap-2">
                    <button 
                      type="button" 
                      onClick={() => handleChildrenChange(-1)} 
                      className="w-9 h-9 rounded-[10px] border border-slate-200 bg-white flex items-center justify-center font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-6 text-center font-extrabold text-[16px] text-[#FE2C1C]">{children}</span>
                    <button 
                      type="button" 
                      onClick={() => handleChildrenChange(1)} 
                      className="w-9 h-9 rounded-[10px] border border-slate-200 bg-white flex items-center justify-center font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 5. Primary Action Button */}
          <button 
            type="submit"
            className="w-full bg-[#FE2C1C] hover:bg-[#E02415] text-white py-4 rounded-[14px] font-extrabold text-[17px] flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            Continue <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>

        </form>

      </main>
    </div>
  );
};
