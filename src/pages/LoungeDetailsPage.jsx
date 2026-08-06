import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Star, Clock, ShieldCheck, 
  Users, Plane, CheckCircle2, ArrowRight, Share2, Heart,
  Info, Wifi, Coffee, Utensils, Tv, Zap, Check
} from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import globalLounges from '../data/globalLoungesData.json';
import loungesData from '../data/loungesData.json';
import { Footer } from '../components/home/Footer';
import { getCleanLoungeImage } from '../utils/loungeImageHelper';

export const LoungeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentSymbol, convertPrice } = useCurrency();
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  // Combine datasets
  const allLounges = useMemo(() => {
    return [...loungesData.LOUNGE_GUIDES, ...globalLounges];
  }, []);

  const lounge = useMemo(() => {
    return allLounges.find(l => String(l.id) === String(id) || String(l.outletId) === String(id)) || allLounges[0];
  }, [id, allLounges]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const amenitiesList = [
    { icon: Wifi, name: 'High-Speed Wi-Fi', desc: 'Unlimited high-speed internet access' },
    { icon: Coffee, name: 'Premium Beverages', desc: 'Espresso, teas, juices & soft drinks' },
    { icon: Utensils, name: 'Hot & Cold Buffet', desc: 'Chef-crafted international cuisine' },
    { icon: Tv, name: 'Flight Information', desc: 'Live flight tracking displays' },
    { icon: Zap, name: 'Charging Stations', desc: 'Universal power outlets & USB ports' },
    { icon: Clock, name: 'Air Conditioning', desc: 'Climate controlled relaxation area' },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F9] font-plus-jakarta flex flex-col">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-6 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-navy hover:bg-slate-100 transition-colors"
              title="Go Back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center gap-2 no-underline">
              <div className="text-[20px] font-extrabold tracking-wider text-navy font-outfit uppercase">
                GET MY <span className="text-accent-rose">LOUNGE</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleShare} 
              className="p-2.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 text-[13px] font-bold"
            >
              <Share2 className="w-4 h-4 text-slate-600" />
              {copied ? 'Copied Link!' : 'Share'}
            </button>
            <button 
              onClick={() => setIsLiked(!isLiked)} 
              className={`p-2.5 rounded-full border transition-colors ${isLiked ? 'border-rose-300 bg-rose-50 text-accent-rose' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-accent-rose text-accent-rose' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1440px] mx-auto px-6 py-8 flex-1 w-full">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-[13px] text-slate-500 font-semibold mb-6">
          <Link to="/" className="hover:text-accent-rose transition-colors">Home</Link>
          <span>/</span>
          <Link to="/search" className="hover:text-accent-rose transition-colors">Lounges</Link>
          <span>/</span>
          <span className="text-navy font-bold truncate max-w-[300px]">{lounge.outletName || lounge.city}</span>
        </div>

        {/* Hero Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8 rounded-[24px] overflow-hidden shadow-sm">
          <div className="lg:col-span-2 h-[380px] lg:h-[480px] relative bg-slate-900 group overflow-hidden">
            <img 
              src={getCleanLoungeImage(lounge)} 
              alt={lounge.city} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-accent-rose text-white text-[12px] font-extrabold uppercase py-1 px-3 rounded-full tracking-wider">
                  {lounge.terminals?.[0] || 'Terminal Pass'}
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white text-[12px] font-bold py-1 px-3 rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {lounge.rating || 4.8} ({lounge.reviewsCount || 124} Reviews)
                </span>
              </div>
              <h1 className="text-[28px] lg:text-[40px] font-extrabold font-outfit leading-tight mb-2">
                {lounge.outletName || `${lounge.city} International Airport Lounge`}
              </h1>
              <p className="text-slate-200 text-[15px] flex items-center gap-2 font-medium">
                <MapPin className="w-4 h-4 text-accent-rose shrink-0" />
                {lounge.airportName || `${lounge.city} Airport`}, {lounge.city}, {lounge.country} ({lounge.airportCode})
              </p>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-4 h-[380px] lg:h-[480px]">
            <div className="relative overflow-hidden rounded-[16px] bg-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80" 
                alt="Lounge Seating" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold py-1 px-2.5 rounded-full">
                Relaxation Zone
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[16px] bg-slate-800">
              <img 
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" 
                alt="Dining Area" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold py-1 px-2.5 rounded-full">
                Gourmet Dining
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Lounge Overview & Amenities */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Overview Card */}
            <div className="bg-white rounded-[24px] p-6 lg:p-8 border border-slate-200/80 shadow-sm">
              <h2 className="text-[24px] font-extrabold font-outfit text-navy mb-4">About This Lounge</h2>
              <p className="text-slate-600 text-[15px] leading-relaxed mb-6">
                {lounge.description || 'Experience premium hospitality before your flight. Enjoy comfortable plush seating, high-speed Wi-Fi, chef-prepared hot and cold dining options, refreshing drinks, and quiet relaxation zones away from airport noise.'}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
                <div className="bg-slate-50 p-4 rounded-[16px] border border-slate-150">
                  <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1">Gate Access</div>
                  <div className="text-[16px] font-extrabold text-navy">{lounge.gateType || 'Airside (After Security)'}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-[16px] border border-slate-150">
                  <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1">Max Stay</div>
                  <div className="text-[16px] font-extrabold text-navy">up to 3 Hours</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-[16px] border border-slate-150 col-span-2 sm:col-span-1">
                  <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1">Opening Hours</div>
                  <div className="text-[16px] font-extrabold text-emerald-600">24/7 Open</div>
                </div>
              </div>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-[24px] p-6 lg:p-8 border border-slate-200/80 shadow-sm">
              <h2 className="text-[24px] font-extrabold font-outfit text-navy mb-6">Included Amenities</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {amenitiesList.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-[16px] bg-slate-50 border border-slate-150/80 hover:border-slate-300 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-accent-rose/10 flex items-center justify-center text-accent-rose shrink-0">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-navy">{item.name}</h4>
                        <p className="text-[13px] text-slate-500">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Entry Guidelines & Policies */}
            <div className="bg-white rounded-[24px] p-6 lg:p-8 border border-slate-200/80 shadow-sm">
              <h2 className="text-[24px] font-extrabold font-outfit text-navy mb-4">Entry Guidelines</h2>
              <ul className="flex flex-col gap-3 text-[14px] text-slate-600">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Digital pass sent instantly via email & SMS upon booking confirmation.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Valid boarding pass and passport/ID required at the lounge reception desk.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Children under 2 years enter for free with a paying adult.</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Free cancellation up to 24 hours prior to scheduled entry date.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Booking Card Sticky */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[24px] p-6 border-2 border-navy/10 shadow-lg sticky top-24">
              <div className="flex justify-between items-baseline mb-4">
                <div>
                  <span className="text-[12px] font-extrabold uppercase text-slate-400 tracking-wider">Pass Price</span>
                  <div className="text-[32px] font-black text-navy font-outfit">
                    {currentSymbol}{convertPrice(lounge.priceUSD || 40)}
                    <span className="text-[14px] font-semibold text-slate-500"> / guest</span>
                  </div>
                </div>
                <div className="bg-emerald-100 text-emerald-800 text-[11px] font-extrabold py-1 px-3 rounded-full border border-emerald-200 uppercase tracking-wide">
                  Instant Access
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-[16px] border border-slate-200 mb-6 flex flex-col gap-2 text-[13px] text-slate-700">
                <div className="flex justify-between font-semibold">
                  <span>Location:</span>
                  <span className="text-navy font-bold">{lounge.city} ({lounge.airportCode})</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Terminal:</span>
                  <span className="text-navy font-bold">{lounge.terminals?.[0] || 'International'}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Confirmation:</span>
                  <span className="text-emerald-600 font-bold">100% Guaranteed</span>
                </div>
              </div>

              <button 
                onClick={() => navigate(`/book/${lounge.id || lounge.outletId}`)}
                className="w-full bg-accent-rose hover:bg-[#C8102E] text-white py-4 px-6 rounded-full font-bold text-[16px] flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 transition-all cursor-pointer mb-4"
              >
                Proceed to Book <ArrowRight className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[12px] text-slate-500 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>256-Bit Encrypted & Instant Pass Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
