import React, { useState, useMemo } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Check, Shield, Lock, CheckCircle2, QrCode, Download, Home, MapPin,
  Smartphone, CreditCard, Building2, Wallet, Tag
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import globalLounges from '../data/globalLoungesData.json';
import loungesData from '../data/loungesData.json';
import { getCleanLoungeImage } from '../utils/loungeImageHelper';
import { AppLogo } from '../components/common/AppLogo';

export const PaymentPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentSymbol, convertPrice } = useCurrency();

  // Combine datasets to retrieve lounge details
  const allLounges = useMemo(() => {
    return [...loungesData.LOUNGE_GUIDES, ...globalLounges];
  }, []);

  const lounge = useMemo(() => {
    return location.state?.lounge || allLounges.find(l => String(l.id) === String(id) || String(l.outletId) === String(id)) || allLounges[0];
  }, [id, location.state, allLounges]);

  // Today fallback string
  const todayStr = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  // Booking state from previous step or default fallback
  const bookingData = location.state?.bookingData || {
    visitDate: todayStr,
    adults: 2,
    children: 0,
    email: 'passenger@example.com',
    fullPhone: '+91 98XXXXXXXX'
  };

  const [activeTab, setActiveTab] = useState('UPI');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');
  const [upiId, setUpiId] = useState('');

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Form states for Card / Netbanking / Wallet
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [selectedWallet, setSelectedWallet] = useState('Paytm');

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Calculation
  const basePriceUSD = lounge?.priceUSD || 40;
  const adults = bookingData.adults || 2;
  const children = bookingData.children || 0;
  const totalGuests = adults + children;

  const subtotalUSD = basePriceUSD * totalGuests;
  const taxUSD = subtotalUSD * 0.05; // 5% tax

  let discountUSD = 0;
  if (appliedCoupon === 'HDFC15') discountUSD = subtotalUSD * 0.15;
  else if (appliedCoupon === 'FLY200') discountUSD = 3;
  else if (appliedCoupon === 'FIRSTFLY') discountUSD = subtotalUSD * 0.10;

  const totalUSD = Math.max(0, subtotalUSD + taxUSD - discountUSD);

  const handleApplyCoupon = (codeToApply) => {
    const code = (codeToApply || couponCode).trim().toUpperCase();
    if (code === 'HDFC15' || code === 'FLY200' || code === 'FIRSTFLY') {
      setAppliedCoupon(code);
      setCouponCode(code);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
    }
  };

  const handlePayment = (e) => {
    if (e) e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-plus-jakarta flex flex-col pb-20 overflow-x-hidden max-w-full">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-[1350px] mx-auto px-6 lg:px-10 h-[68px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AppLogo size="sm" />
            <Link
              to="/"
              className="hidden sm:flex px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors items-center gap-2 text-[13px] font-bold no-underline"
            >
              Home
            </Link>
          </div>
          <div className="flex items-center gap-2 text-[13px] font-bold text-emerald-700 bg-emerald-50 py-1.5 px-3.5 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted Checkout
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-10 w-full flex-1 pt-6 space-y-5">

        {/* 1. Stepper Header Bar Card (2-Step) */}
        <div className="bg-white rounded-[20px] p-4 sm:p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between relative px-4 sm:px-12">

            {/* Step 1: Fill Your Info (Completed Green Check) */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xs">
                <Check className="w-5 h-5 stroke-[3]" />
              </div>
              <span className="text-[12px] font-bold text-emerald-600">Fill Your Info</span>
            </div>

            {/* Connecting Line (Green) */}
            <div className="flex-1 h-[2px] bg-emerald-500 mx-4 sm:mx-12"></div>

            {/* Step 2: Finalize Payment (Active Red Badge) */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-10 h-10 rounded-full bg-[#FE2C1C] text-white flex items-center justify-center shadow-md">
                <Shield className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-[12px] font-bold text-[#FE2C1C]">Finalize Payment</span>
            </div>

          </div>
        </div>



        {/* 2. Lounge Header Card */}
        <div className="bg-white rounded-[20px] p-4 sm:p-5 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
              Visiting <strong className="text-slate-600">{bookingData.visitDate}</strong>
            </span>
            <div className="text-[18px] sm:text-[20px] font-extrabold text-navy mt-0.5">
              {currentSymbol}{convertPrice(basePriceUSD)}<span className="text-[13px] font-medium text-slate-500">/person</span>
            </div>
          </div>
        </div>

        {/* 3. Review Your Booking Card */}
        <div className="bg-white rounded-[20px] p-5 sm:p-6 border border-slate-200/80 shadow-xs">
          <h4 className="text-[17px] font-bold text-navy mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#FE2C1C]" /> Review Your Booking
          </h4>

          {/* Details Table */}
          <div className="divide-y divide-slate-100 text-[14px]">

            {/* Package */}
            <div className="py-3.5 flex justify-between items-center">
              <span className="text-slate-500 font-semibold">Package</span>
              <div className="text-right">
                <span className="font-bold text-navy">{lounge.outletName || lounge.city}</span>
                <div className="text-[12px] text-slate-400">{lounge.city} • {lounge.airportCode}</div>
              </div>
            </div>

            {/* Duration */}
            <div className="py-3.5 flex justify-between items-center">
              <span className="text-slate-500 font-semibold">Duration</span>
              <span className="font-bold text-navy">3 Hours Access</span>
            </div>

            {/* Departure / Date */}
            <div className="py-3.5 flex justify-between items-center">
              <span className="text-slate-500 font-semibold">Visiting Date</span>
              <div className="text-right">
                <span className="font-bold text-navy">{bookingData.visitDate}</span>
                <div className="text-[11px] text-slate-400">Guaranteed Entry</div>
              </div>
            </div>

            {/* Travellers */}
            <div className="py-3.5 flex justify-between items-center">
              <span className="text-slate-500 font-semibold">Travellers</span>
              <span className="font-bold text-navy">
                {adults} adult{adults > 1 ? 's' : ''}{children > 0 ? `, ${children} child${children > 1 ? 'ren' : ''}` : ''}
              </span>
            </div>

            {/* Pass Delivery */}
            <div className="py-3.5 flex justify-between items-center">
              <span className="text-slate-500 font-semibold">Pass Delivery</span>
              <span className="font-bold text-navy">Instant E-Pass (Email Delivery)</span>
            </div>

          </div>

          {/* Price Breakdown Highlight Box */}
          <div className="bg-[#FFF0F0] rounded-[16px] p-4 sm:p-5 mt-5 flex flex-wrap justify-between items-center gap-4 border border-rose-100">
            <div className="flex flex-col gap-1 text-[13px] text-slate-700">
              <div>Base Rate: <span className="font-bold text-navy">{currentSymbol}{convertPrice(subtotalUSD)}</span></div>
              <div>GST (5%): <span className="font-bold text-navy">{currentSymbol}{convertPrice(taxUSD)}</span></div>
              {discountUSD > 0 && <div className="text-emerald-600 font-bold">Savings: {currentSymbol}{convertPrice(discountUSD)}</div>}
            </div>

            <div className="text-right">
              <div className="text-[12px] font-semibold text-slate-500">Total Payable</div>
              <div className="text-[26px] font-black text-navy leading-none mt-0.5">
                {currentSymbol}{convertPrice(totalUSD)}
              </div>
            </div>
          </div>
        </div>

        {/* 4. Coupon Code Box Card */}
        <div className="bg-white rounded-[20px] p-5 sm:p-6 border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-3">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full sm:flex-1 bg-[#F8F9FA] border border-slate-200 rounded-[12px] px-4 py-3 text-[14px] font-semibold text-slate-800 outline-none focus:border-[#FE2C1C] transition-colors"
            />
            <button
              type="button"
              onClick={() => handleApplyCoupon()}
              className="w-full sm:w-auto border border-[#FE2C1C] text-[#FE2C1C] hover:bg-rose-50 px-6 py-3 rounded-[12px] font-bold text-[14px] transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>

          {/* Quick Coupon Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {['HDFC15', 'FLY200', 'FIRSTFLY'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => handleApplyCoupon(code)}
                className={`border border-dashed rounded-[10px] px-3.5 py-1.5 text-[12px] font-semibold transition-all cursor-pointer ${appliedCoupon === code ? 'border-[#FE2C1C] bg-rose-50 text-[#FE2C1C] font-bold' : 'border-slate-300 text-slate-600 hover:border-[#FE2C1C]'}`}
              >
                {code}
              </button>
            ))}
          </div>

          {appliedCoupon && (
            <div className="text-[12px] font-bold text-emerald-600 mt-2.5 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Coupon <strong>{appliedCoupon}</strong> applied successfully!
            </div>
          )}
          {couponError && (
            <div className="text-[12px] font-bold text-rose-500 mt-2.5">
              {couponError}
            </div>
          )}
        </div>

        {/* 5. Payment Methods Tabs & Details Card */}
        <div className="bg-white rounded-[20px] border border-slate-200/80 shadow-xs overflow-hidden">

          {/* Payment Method Selector Tabs Header */}
          <div className="grid grid-cols-2 sm:grid-cols-4 bg-[#F8F9FA] border-b border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('UPI')}
              className={`p-4 flex flex-col items-center gap-1.5 text-[13px] font-bold transition-all cursor-pointer border-b-2 ${activeTab === 'UPI' ? 'bg-rose-50/70 text-[#FE2C1C] border-[#FE2C1C]' : 'text-slate-600 border-transparent hover:text-slate-900'}`}
            >
              <Smartphone className="w-5 h-5" />
              <span>UPI</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('CARD')}
              className={`p-4 flex flex-col items-center gap-1.5 text-[13px] font-bold transition-all cursor-pointer border-b-2 ${activeTab === 'CARD' ? 'bg-rose-50/70 text-[#FE2C1C] border-[#FE2C1C]' : 'text-slate-600 border-transparent hover:text-slate-900'}`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Credit / Debit Card</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('NETBANKING')}
              className={`p-4 flex flex-col items-center gap-1.5 text-[13px] font-bold transition-all cursor-pointer border-b-2 ${activeTab === 'NETBANKING' ? 'bg-rose-50/70 text-[#FE2C1C] border-[#FE2C1C]' : 'text-slate-600 border-transparent hover:text-slate-900'}`}
            >
              <Building2 className="w-5 h-5" />
              <span>Net Banking</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('WALLETS')}
              className={`p-4 flex flex-col items-center gap-1.5 text-[13px] font-bold transition-all cursor-pointer border-b-2 ${activeTab === 'WALLETS' ? 'bg-rose-50/70 text-[#FE2C1C] border-[#FE2C1C]' : 'text-slate-600 border-transparent hover:text-slate-900'}`}
            >
              <Wallet className="w-5 h-5" />
              <span>Wallets</span>
            </button>
          </div>

          {/* Tab Contents */}
          <div className="p-5 sm:p-6">

            {/* 1. UPI Tab Content */}
            {activeTab === 'UPI' && (
              <div>
                <label className="block text-[12px] font-bold text-slate-600 mb-1.5">UPI ID *</label>
                <div className="relative mb-6">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="yourname@paytm / @upi"
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-[12px] pl-10 pr-4 py-3 text-[14px] font-semibold text-slate-800 outline-none focus:border-[#FE2C1C] transition-colors"
                  />
                </div>

                <div className="border-t border-slate-150 my-5"></div>

                <label className="block text-[12px] font-bold text-slate-600 mb-3">Popular UPI Apps</label>

                {/* Popular UPI Apps Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
                  {/* GPay */}
                  <div
                    onClick={() => setSelectedUpiApp('gpay')}
                    className={`border rounded-[20px] p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedUpiApp === 'gpay'
                      ? 'bg-[#E3EFFD] border-[#3B82F6] ring-2 ring-[#3B82F6]/30 shadow-xs'
                      : 'bg-[#EEF5FF] border-[#C4DEFF] hover:border-[#93C5FD]'
                      }`}
                  >
                    <div className="w-12 h-12 rounded-[14px] bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center mb-2 shrink-0 p-1">
                      <img src="/payment-logos/gpay.png" alt="GPay" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[13.5px] font-bold text-slate-800">GPay</span>
                  </div>

                  {/* PhonePe */}
                  <div
                    onClick={() => setSelectedUpiApp('phonepe')}
                    className={`border rounded-[20px] p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedUpiApp === 'phonepe'
                      ? 'bg-[#F3E8FF] border-[#9333EA] ring-2 ring-[#9333EA]/30 shadow-xs'
                      : 'bg-[#F8F2FF] border-[#E9D5FF] hover:border-[#D8B4FE]'
                      }`}
                  >
                    <img src="/payment-logos/phonepe.png" alt="PhonePe" className="w-12 h-12 rounded-[14px] mb-2 object-cover shrink-0 shadow-2xs" />
                    <span className="text-[13.5px] font-bold text-slate-800">PhonePe</span>
                  </div>

                  {/* Paytm */}
                  <div
                    onClick={() => setSelectedUpiApp('paytm')}
                    className={`border rounded-[20px] p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedUpiApp === 'paytm'
                      ? 'bg-[#E0F2FE] border-[#0284C7] ring-2 ring-[#0284C7]/30 shadow-xs'
                      : 'bg-[#EEF9FF] border-[#BAE6FD] hover:border-[#7DD3FC]'
                      }`}
                  >
                    <div className="w-12 h-12 rounded-[14px] bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center mb-2 shrink-0 p-1.5">
                      <img src="/payment-logos/paytm.png" alt="Paytm" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[13.5px] font-bold text-slate-800">Paytm</span>
                  </div>

                  {/* BHIM */}
                  <div
                    onClick={() => setSelectedUpiApp('bhim')}
                    className={`border rounded-[20px] p-4 flex flex-col items-center justify-center cursor-pointer transition-all ${selectedUpiApp === 'bhim'
                      ? 'bg-[#FFEDD5] border-[#EA580C] ring-2 ring-[#EA580C]/30 shadow-xs'
                      : 'bg-[#FFF6ED] border-[#FFEDD5] hover:border-[#FDBA74]'
                      }`}
                  >
                    <div className="w-12 h-12 rounded-[14px] bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center mb-2 shrink-0 p-1.5">
                      <img src="/payment-logos/bhim.png" alt="BHIM" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[13.5px] font-bold text-slate-800">BHIM</span>
                  </div>
                </div>

                <div className="border-t border-slate-150 my-5 relative">
                  <span className="bg-white px-3 text-[12px] font-semibold text-slate-400 absolute left-1/2 -translate-x-1/2 -top-2.5">
                    Or scan QR code
                  </span>
                </div>

                {/* QR Code Container */}
                <div className="text-center pt-2">
                  <div className="inline-block border border-dashed border-slate-300 rounded-[18px] p-3 bg-white shadow-xs">
                    <QrCode className="w-36 h-36 text-navy mx-auto" />
                  </div>
                </div>
              </div>
            )}

            {/* 2. Card Tab Content */}
            {activeTab === 'CARD' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[12px] font-bold text-slate-600 mb-1.5">Card Number *</label>
                  <input
                    type="text"
                    placeholder="4532 •••• •••• 8921"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-[12px] px-4 py-3 text-[14px] font-semibold text-slate-800 outline-none focus:border-[#FE2C1C]"
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-slate-600 mb-1.5">Cardholder Name *</label>
                  <input
                    type="text"
                    placeholder="Name on card"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                    className="w-full bg-[#F8F9FA] border border-slate-200 rounded-[12px] px-4 py-3 text-[14px] font-semibold text-slate-800 outline-none focus:border-[#FE2C1C]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-slate-600 mb-1.5">Expiry Date *</label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      value={cardDetails.expiry}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-slate-200 rounded-[12px] px-4 py-3 text-[14px] font-semibold text-slate-800 outline-none focus:border-[#FE2C1C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-slate-600 mb-1.5">CVV *</label>
                    <input
                      type="password"
                      placeholder="•••"
                      maxLength="4"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="w-full bg-[#F8F9FA] border border-slate-200 rounded-[12px] px-4 py-3 text-[14px] font-semibold text-slate-800 outline-none focus:border-[#FE2C1C]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. Net Banking Tab Content */}
            {activeTab === 'NETBANKING' && (
              <div>
                <label className="block text-[12px] font-bold text-slate-600 mb-3">Select Popular Bank</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Bank', 'Other Banks'].map(bank => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      className={`p-3.5 rounded-[14px] border text-[13px] font-bold transition-all cursor-pointer ${selectedBank === bank ? 'border-[#FE2C1C] bg-rose-50 text-[#FE2C1C]' : 'border-slate-200 text-slate-700 hover:border-slate-300'}`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Wallets Tab Content */}
            {activeTab === 'WALLETS' && (
              <div className="space-y-3">
                <label className="block text-[12px] font-bold text-slate-600 mb-1">Select Digital Wallet</label>
                {['Paytm Wallet', 'PhonePe Wallet', 'Amazon Pay', 'Mobikwik'].map(w => (
                  <div
                    key={w}
                    onClick={() => setSelectedWallet(w)}
                    className={`p-3.5 rounded-[14px] border flex items-center justify-between cursor-pointer transition-all ${selectedWallet === w ? 'border-[#FE2C1C] bg-rose-50 text-[#FE2C1C] font-bold' : 'border-slate-200 text-slate-700 hover:border-slate-300'}`}
                  >
                    <span className="text-[14px]">{w}</span>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedWallet === w ? 'border-[#FE2C1C] bg-[#FE2C1C]' : 'border-slate-300'}`}>
                      {selectedWallet === w && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* 6. Security Guarantee Bar */}
        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-[14px] p-4 text-[13px] text-emerald-800 flex items-center gap-3 font-medium">
          <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Secure payment follows. Free cancellation up to 24 hours before entry. No charges until confirmed.</span>
        </div>

        {/* 7. Primary Action Button */}
        <div>
          <button
            type="button"
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-[#FE2C1C] hover:bg-[#E02415] text-white py-4 rounded-[14px] font-extrabold text-[18px] flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 transition-all cursor-pointer"
          >
            <Lock className="w-5 h-5 stroke-[2.5]" />
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing Payment Securely...
              </span>
            ) : (
              <span>Pay {currentSymbol}{convertPrice(totalUSD)} Securely →</span>
            )}
          </button>

          {/* Subtext Notice */}
          <div className="text-[12px] text-slate-400 text-center mt-3">
            By proceeding, you agree to our Terms & Conditions and Privacy Policy
          </div>
        </div>

      </main>

      {/* Instant E-Pass Confirmation Modal */}
      {paymentComplete && (
        <div className="fixed inset-0 z-50 bg-navy/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="bg-white rounded-[32px] max-w-[500px] w-full p-8 text-center shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-[26px] font-extrabold text-navy font-outfit mb-2">Payment Confirmed!</h3>
            <p className="text-slate-600 text-[14px] mb-6">
              Your lounge access pass has been successfully issued. A copy has been emailed to <strong className="text-navy">{bookingData.email}</strong>.
            </p>

            <div className="bg-slate-50 p-5 rounded-[20px] border border-slate-200 text-left mb-6 flex flex-col gap-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Booking ID:</span>
                <span className="font-extrabold text-navy font-mono">LP-2026-8941</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Lounge:</span>
                <span className="font-bold text-navy">{lounge.outletName || lounge.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Visiting Date:</span>
                <span className="font-bold text-navy">{bookingData.visitDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Guests:</span>
                <span className="font-bold text-navy">{totalGuests} Person(s)</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => alert('Digital Pass downloaded successfully!')}
                className="w-full bg-navy hover:bg-slate-800 text-white py-3.5 px-6 rounded-full font-bold text-[14px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" /> Download E-Pass PDF
              </button>
              <button
                onClick={() => navigate('/')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3.5 px-6 rounded-full font-bold text-[14px] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Home className="w-4 h-4" /> Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
