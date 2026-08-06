import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../../context/CurrencyContext';
import loungesData from '../../data/loungesData.json';
import globalLounges from '../../data/globalLoungesData.json';
import { getCleanLoungeImage } from '../../utils/loungeImageHelper';

const getCapacity = (id) => {
  const hash = String(id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const remainder = hash % 3;
  if (remainder === 0) return { label: 'Available', color: 'text-emerald-700 bg-emerald-100 border-emerald-200', dot: 'bg-emerald-500' };
  if (remainder === 1) return { label: 'Fast Filling', color: 'text-amber-700 bg-amber-100 border-amber-200', dot: 'bg-amber-500' };
  return { label: 'Full / Waitlist', color: 'text-rose-700 bg-rose-100 border-rose-200', dot: 'bg-rose-500' };
};

export const LoungeGuides = () => {
  const navigate = useNavigate();
  const { currentSymbol, convertPrice } = useCurrency();
  const [countryFilter, setCountryFilter] = useState('All Countries');
  const [sortVal, setSortVal] = useState('Default');
  const [visibleCount, setVisibleCount] = useState(12);

  // Combine featured lounges with a subset of global lounges and shuffle them
  const [shuffledLounges] = useState(() => {
    const combined = [...loungesData.LOUNGE_GUIDES, ...globalLounges.slice(0, 150)];
    return combined.sort(() => Math.random() - 0.5);
  });

  const countries = useMemo(() => {
    const uniqueCountries = new Set(shuffledLounges.map(l => l.country));
    return Array.from(uniqueCountries).sort();
  }, [shuffledLounges]);

  const filteredAndSorted = useMemo(() => {
    let filtered = shuffledLounges;
    if (countryFilter !== 'All Countries') {
      filtered = filtered.filter(l => l.country === countryFilter);
    }

    const sorted = [...filtered];
    if (sortVal === 'Name (a-z)') {
      sorted.sort((a, b) => a.city.localeCompare(b.city));
    } else if (sortVal === 'Name (z-a)') {
      sorted.sort((a, b) => b.city.localeCompare(a.city));
    } else if (sortVal === 'Price (low to high)') {
      sorted.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sortVal === 'Price (high to low)') {
      sorted.sort((a, b) => b.priceUSD - a.priceUSD);
    }
    return sorted;
  }, [countryFilter, sortVal, shuffledLounges]);

  const visibleLounges = filteredAndSorted.slice(0, visibleCount);

  return (
    <section id="guides-section" className="py-20 px-6 bg-bg-secondary max-w-[1440px] mx-auto relative">
      <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-accent-rose/10 rounded-full blur-[50px] z-0 pointer-events-none"></div>

      <div className="flex justify-between items-end flex-wrap gap-6 mb-12 relative z-10">
        <div>

          <h2 className="font-quicksand font-extrabold text-[clamp(36px,4.5vw,52px)] text-navy mb-3">
            International <span className="bg-gradient-to-br from-accent-rose via-[#C8102E] to-navy bg-clip-text text-transparent font-extrabold">Lounge Guides</span>
          </h2>
          <p className="text-lg text-slate-700 max-w-[640px]">
            Explore shower suite availability and premium amenities at top global transit hubs. Click any amenity to view details.
          </p>
        </div>

        <div className="flex gap-4 flex-wrap items-center">
          <div className="relative">
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="appearance-none bg-white text-navy font-bold text-[14px] py-3 pl-5 pr-10 rounded-2xl border-[1.5px] border-navy/15 cursor-pointer outline-none shadow-sm font-plus-jakarta"
            >
              <option value="All Countries">All Countries</option>
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-accent-rose text-xs">▼</div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold text-navy">Sort by:</span>
            <div className="relative">
              <select
                value={sortVal}
                onChange={(e) => setSortVal(e.target.value)}
                className="appearance-none bg-white text-navy font-bold text-[14px] py-3 pl-5 pr-10 rounded-2xl border-[1.5px] border-navy/15 cursor-pointer outline-none shadow-sm font-plus-jakarta"
              >
                <option value="Default">Default</option>
                <option value="Name (a-z)">Name (a-z)</option>
                <option value="Name (z-a)">Name (z-a)</option>
                <option value="Price (low to high)">Price (low to high)</option>
                <option value="Price (high to low)">Price (high to low)</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-accent-rose text-xs">▼</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
        {visibleLounges.map((lounge, idx) => (
          <div key={lounge.id || lounge.outletId} className="bg-white rounded-3xl overflow-hidden border border-navy/10 shadow-lg transition-all duration-400 flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:border-accent-rose/40">
              <div 
                className="relative h-[200px] overflow-hidden bg-navy group cursor-pointer"
                onClick={() => navigate(`/lounge/${lounge.id || lounge.outletId}`)}
              >
                <img
                  src={getCleanLoungeImage(lounge, idx)}
                  alt={lounge.city}
                  className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-navy/20 to-navy/80"></div>
                
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                  <span className="bg-white/95 backdrop-blur-md py-1.5 px-3 rounded-full text-[12px] font-extrabold text-navy flex items-center gap-1">
                    <span className="text-accent-rose text-sm">★</span>
                    {lounge.rating} ({lounge.reviewsCount})
                  </span>
                  
                  {(() => {
                    const cap = getCapacity(lounge.id || lounge.outletId);
                    return (
                      <span className={`py-1.5 px-3 rounded-full text-[11px] font-extrabold uppercase tracking-wide border flex items-center gap-1.5 ${cap.color}`}>
                        <span className={`w-2 h-2 rounded-full ${cap.dot} animate-pulse shadow-[0_0_8px_currentColor]`}></span>
                        {cap.label}
                      </span>
                    );
                  })()}
                </div>


                <div className="absolute bottom-4 right-4 text-white font-black text-[22px] tracking-[1px] drop-shadow-md">
                  {lounge.airportCode}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div 
                  className="cursor-pointer"
                  onClick={() => navigate(`/lounge/${lounge.id || lounge.outletId}`)}
                >
                  <div className="flex items-center gap-1.5 text-[12px] text-slate-500 font-bold mb-1.5 uppercase tracking-wider">
                    <span className="text-accent-rose">•</span>
                    {lounge.country} • {lounge.terminals[0]}
                  </div>
                  <h3 className="text-[20px] font-extrabold text-navy mb-2 leading-tight hover:text-accent-rose transition-colors">
                    {lounge.outletName || `${lounge.city} Lounge`}
                  </h3>
                  <p className="text-[13px] text-slate-600 leading-relaxed mb-4 line-clamp-2">{lounge.description}</p>
                </div>

                <div className="pt-4 border-t border-navy/10 flex items-center justify-between">
                  <button
                    className="text-[13px] font-extrabold text-slate-600 hover:text-navy cursor-pointer"
                    onClick={() => navigate(`/lounge/${lounge.id || lounge.outletId}`)}
                  >
                    View Details
                  </button>
                  <button
                    className="bg-accent-rose text-white border border-accent-rose py-2.5 px-4 rounded-full font-bold text-[13px] cursor-pointer inline-flex items-center justify-center gap-1.5 shadow-md hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-[#C8102E] transition-all"
                    onClick={() => navigate(`/lounge/${lounge.id || lounge.outletId}`)}
                  >
                    {currentSymbol}{convertPrice(lounge.priceUSD)} Pass <span>→</span>
                  </button>
                </div>
              </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredAndSorted.length && (
        <div className="mt-14 flex justify-center relative z-10">
          <button
            onClick={() => setVisibleCount(prev => prev + 12)}
            className="bg-transparent text-navy border-2 border-navy/20 py-3.5 px-8 rounded-full font-extrabold text-[15px] cursor-pointer inline-flex items-center gap-2 transition-all hover:bg-navy hover:text-white hover:border-navy shadow-sm hover:-translate-y-0.5"
          >
            Explore More Lounges
          </button>
        </div>
      )}

    </section>
  );
};
