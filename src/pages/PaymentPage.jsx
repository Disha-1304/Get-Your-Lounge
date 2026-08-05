import React, { useState, useMemo } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Check, CreditCard, Smartphone, Building2, Wallet, 
  Tag, ShieldCheck, Lock, CheckCircle2, QrCode, Download, Home, Sparkles
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import globalLounges from '../data/globalLoungesData.json';
import loungesData from '../data/loungesData.json';

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

  // Booking state from previous step or default fallback
  const bookingData = location.state?.bookingData || {
    date: '2026-08-10',
    timeSlot: '14:00',
    adults: 1,
    children: 0,
    firstName: 'Guest',
    lastName: 'Passenger',
    email: 'passenger@example.com',
    phone: '+1 555-0192'
  };

  // Payment states
  const [activeTab, setActiveTab] = useState('UPI');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  // Form states
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [selectedBank, setSelectedBank] = useState('HDFC');

  // Calculation
  const basePriceUSD = lounge?.priceUSD || 40;
  const totalGuests = (bookingData.adults || 1) + (bookingData.children || 0);
  const subtotalUSD = basePriceUSD * totalGuests;
  const taxUSD = subtotalUSD * 0.05; // 5% tax

  let discountUSD = 0;
  if (appliedCoupon === 'LOUNGE10') discountUSD = subtotalUSD * 0.10;
  if (appliedCoupon === 'WELCOME20') discountUSD = 20;

  const totalUSD = Math.max(0, subtotalUSD + taxUSD - discountUSD);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'LOUNGE10' || code === 'WELCOME20') {
      setAppliedCoupon(code);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try LOUNGE10');
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentComplete(true);
    }, 2000);
  };

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
          <div className="flex items-center gap-2 text-[13px] font-bold text-emerald-700 bg-emerald-50 py-1.5 px-3 rounded-full border border-emerald-200">
            <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Encrypted Checkout
          </div>
        </div>
      </header>

      {/* Progress Steps Header */}
      <div className="bg-white py-6 mb-8 shadow-sm border-b border-slate-100">
        <div className="max-w-[700px] mx-auto flex items-center justify-between px-6 relative">
          <div className="absolute top-[35%] left-16 right-16 h-1 bg-accent-rose -z-0 -translate-y-1/2 rounded-full"></div>
          
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-1.5 bg-white px-3 relative z-10">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[14px] shadow-md">
              <Check className="w-4 h-4" strokeWidth={3} />
            </div>
            <span className="text-[12px] font-extrabold text-emerald-700">Passenger Details</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-1.5 bg-white px-3 relative z-10">
            <div className="w-8 h-8 rounded-full bg-accent-rose text-white flex items-center justify-center font-bold text-[14px] shadow-md">
              2
            </div>
            <span className="text-[12px] font-extrabold text-navy">Payment Checkout</span>
          </div>
        </div>
      </div>

      {/* Main Payment Container */}
      <main className="max-w-[1200px] mx-auto px-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Payment Options Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[24px] p-6 lg:p-8 border border-slate-200 shadow-sm">
              <h2 className="text-[22px] font-extrabold text-navy font-outfit mb-6">Select Payment Method</h2>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                <button
                  type="button"
                  onClick={() => setActiveTab('UPI')}
                  className={`p-3.5 rounded-[16px] border flex flex-col items-center gap-2 transition-all cursor-pointer ${activeTab === 'UPI' ? 'border-accent-rose bg-rose-50/50 text-accent-rose font-bold shadow-sm' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span className="text-[13px]">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('CARD')}
                  className={`p-3.5 rounded-[16px] border flex flex-col items-center gap-2 transition-all cursor-pointer ${activeTab === 'CARD' ? 'border-accent-rose bg-rose-50/50 text-accent-rose font-bold shadow-sm' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-[13px]">Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('NETBANKING')}
                  className={`p-3.5 rounded-[16px] border flex flex-col items-center gap-2 transition-all cursor-pointer ${activeTab === 'NETBANKING' ? 'border-accent-rose bg-rose-50/50 text-accent-rose font-bold shadow-sm' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                >
                  <Building2 className="w-5 h-5" />
                  <span className="text-[13px]">Netbanking</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('WALLET')}
                  className={`p-3.5 rounded-[16px] border flex flex-col items-center gap-2 transition-all cursor-pointer ${activeTab === 'WALLET' ? 'border-accent-rose bg-rose-50/50 text-accent-rose font-bold shadow-sm' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
                >
                  <Wallet className="w-5 h-5" />
                  <span className="text-[13px]">Wallets</span>
                </button>
              </div>

              {/* Payment Tab Forms */}
              <form onSubmit={handlePayment}>
                {activeTab === 'UPI' && (
                  <div className="flex flex-col gap-6">
                    <div className="bg-slate-50 p-6 rounded-[20px] border border-slate-200 flex flex-col items-center text-center">
                      <div className="w-32 h-32 bg-white p-3 rounded-[16px] border border-slate-300 shadow-sm flex items-center justify-center mb-3">
                        <QrCode className="w-full h-full text-navy" />
                      </div>
                      <p className="text-[13px] font-bold text-slate-700">Scan QR Code using Google Pay, PhonePe, Paytm or BHIM</p>
                    </div>

                    <div>
                      <label className="block text-[13px] font-bold text-navy mb-2">Or enter UPI ID / VPA</label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="username@upi / mobile@paytm"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="flex-1 py-3 px-4 rounded-[12px] border border-slate-300 text-[14px] font-semibold outline-none focus:border-accent-rose transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'CARD' && (
                  <div className="flex flex-col gap-5">
                    <div>
                      <label className="block text-[13px] font-bold text-navy mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8921"
                        maxLength="19"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        className="w-full py-3 px-4 rounded-[12px] border border-slate-300 text-[14px] font-semibold outline-none focus:border-accent-rose transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-bold text-navy mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                        className="w-full py-3 px-4 rounded-[12px] border border-slate-300 text-[14px] font-semibold outline-none focus:border-accent-rose transition-colors"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[13px] font-bold text-navy mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          maxLength="5"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="w-full py-3 px-4 rounded-[12px] border border-slate-300 text-[14px] font-semibold outline-none focus:border-accent-rose transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[13px] font-bold text-navy mb-2">CVV / CVC</label>
                        <input
                          type="password"
                          placeholder="•••"
                          maxLength="4"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          className="w-full py-3 px-4 rounded-[12px] border border-slate-300 text-[14px] font-semibold outline-none focus:border-accent-rose transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'NETBANKING' && (
                  <div className="flex flex-col gap-4">
                    <label className="block text-[13px] font-bold text-navy mb-2">Select Your Bank</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak', 'Other'].map(bank => (
                        <button
                          key={bank}
                          type="button"
                          onClick={() => setSelectedBank(bank)}
                          className={`p-3 rounded-[12px] border font-bold text-[14px] transition-colors cursor-pointer ${selectedBank === bank ? 'border-accent-rose bg-rose-50 text-accent-rose' : 'border-slate-200 text-slate-700 hover:border-slate-300'}`}
                        >
                          {bank} Bank
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'WALLET' && (
                  <div className="flex flex-col gap-3">
                    <p className="text-[13px] font-semibold text-slate-600 mb-2">Select digital wallet for fast checkout:</p>
                    {['Apple Pay / Google Pay', 'Paytm Wallet', 'Amazon Pay', 'Mobikwik'].map(w => (
                      <label key={w} className="flex items-center gap-3 p-3.5 rounded-[12px] border border-slate-200 cursor-pointer hover:border-slate-300">
                        <input type="radio" name="wallet" defaultChecked={w.includes('Apple')} />
                        <span className="text-[14px] font-bold text-navy">{w}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Submit Payment Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-8 bg-accent-rose hover:bg-[#C8102E] text-white py-4 px-8 rounded-full font-extrabold text-[16px] flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      Processing Payment Securely...
                    </span>
                  ) : (
                    <span>Pay {currentSymbol}{convertPrice(totalUSD)} Now</span>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Order Summary Box */}
            <div className="bg-white rounded-[24px] p-6 border border-slate-200 shadow-sm">
              <h3 className="text-[18px] font-extrabold text-navy font-outfit mb-4 pb-3 border-b border-slate-100">
                Order Summary
              </h3>

              <div className="flex flex-col gap-3 text-[13px] mb-4">
                <div className="flex justify-between font-bold text-navy">
                  <span>Lounge:</span>
                  <span>{lounge.outletName || lounge.city}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Location:</span>
                  <span>{lounge.city}, {lounge.airportCode}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Passenger:</span>
                  <span>{bookingData.firstName} {bookingData.lastName}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Date & Time:</span>
                  <span>{bookingData.date} @ {bookingData.timeSlot}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Guests:</span>
                  <span>{totalGuests} Person(s)</span>
                </div>
              </div>

              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="mb-4 pt-4 border-t border-slate-100">
                <label className="block text-[12px] font-bold text-slate-600 mb-1.5 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-accent-rose" /> Discount Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter LOUNGE10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 py-2 px-3 rounded-[10px] border border-slate-300 text-[13px] font-bold uppercase outline-none focus:border-accent-rose"
                  />
                  <button type="submit" className="bg-navy text-white px-4 py-2 rounded-[10px] text-[12px] font-bold hover:bg-slate-800">
                    Apply
                  </button>
                </div>
                {appliedCoupon && <span className="text-[12px] font-bold text-emerald-600 mt-1 block">✓ Coupon {appliedCoupon} applied!</span>}
                {couponError && <span className="text-[12px] font-bold text-rose-500 mt-1 block">{couponError}</span>}
              </form>

              {/* Price Calculation Breakdown */}
              <div className="flex flex-col gap-2.5 py-4 border-t border-slate-100 text-[13px]">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({totalGuests} pass):</span>
                  <span className="font-bold text-navy">{currentSymbol}{convertPrice(subtotalUSD)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxes & GST (5%):</span>
                  <span className="font-bold text-navy">{currentSymbol}{convertPrice(taxUSD)}</span>
                </div>
                {discountUSD > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount Coupon:</span>
                    <span>-{currentSymbol}{convertPrice(discountUSD)}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-[16px] font-extrabold text-navy">Final Amount:</span>
                <span className="text-[26px] font-black text-accent-rose font-outfit">
                  {currentSymbol}{convertPrice(totalUSD)}
                </span>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-[20px] border border-emerald-200 text-[12px] text-emerald-800 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold mb-0.5">Instant Digital Pass Guarantee</div>
                Your official lounge barcode pass will be generated instantly and dispatched to {bookingData.email}.
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
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
                <span className="text-slate-500 font-medium">Passenger:</span>
                <span className="font-bold text-navy">{bookingData.firstName} {bookingData.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Date & Guests:</span>
                <span className="font-bold text-navy">{bookingData.date} ({totalGuests} Guests)</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button 
                onClick={() => alert('Digital Pass downloaded successfully!')}
                className="w-full bg-navy hover:bg-slate-800 text-white py-3.5 px-6 rounded-full font-bold text-[14px] flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" /> Download E-Pass PDF
              </button>
              <button 
                onClick={() => navigate('/')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-3.5 px-6 rounded-full font-bold text-[14px] flex items-center justify-center gap-2 transition-colors"
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
