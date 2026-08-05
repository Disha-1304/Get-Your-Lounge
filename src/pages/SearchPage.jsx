import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Filter, X, Star, ArrowRight } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import globalLounges from '../data/globalLoungesData.json';
import loungesData from '../data/loungesData.json';
import { getCleanLoungeImage } from '../utils/loungeImageHelper';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();

  const { currentSymbol, convertPrice } = useCurrency();

  // Search input state
  const [searchInput, setSearchInput] = useState(query);

  // Filters State
  const [priceMax, setPriceMax] = useState(200);
  const [minRating, setMinRating] = useState(0);
  const [selectedTerminalTypes, setSelectedTerminalTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Combine both local featured lounges and global lounges
  const allLounges = useMemo(() => {
    return [...loungesData.LOUNGE_GUIDES, ...globalLounges];
  }, []);

  // Base results based only on search query
  const baseResults = useMemo(() => {
    if (!query.trim()) return allLounges;
    const q = query.toLowerCase().trim();

    // Check if query matches a country exactly
    const exactCountryMatch = allLounges.some(l => (l.country || '').toLowerCase() === q);
    
    if (exactCountryMatch) {
      return allLounges.filter(l => (l.country || '').toLowerCase() === q);
    }

    return allLounges.filter((l) => {
      const terms = l.terminals || [];
      return (
        (l.city || '').toLowerCase().includes(q) ||
        (l.airportCode || '').toLowerCase().includes(q) ||
        (l.airportName || '').toLowerCase().includes(q) ||
        (l.outletName || '').toLowerCase().includes(q) ||
        (l.country || '').toLowerCase().includes(q) ||
        (l.region || '').toLowerCase().includes(q) ||
        terms.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query]);

  // Derive filter options from base results
  const filterOptions = useMemo(() => {
    const termTypes = new Set();
    const amenities = new Set();
    
    baseResults.forEach(l => {
      // Determine Terminal Type based on terminals string + description
      let termType = 'International';
      const termStr = ((l.terminals || []).join(' ') + ' ' + (l.description || '')).toLowerCase();
      if (termStr.includes('domestic') && termStr.includes('international')) {
        termType = 'Domestic-International';
      } else if (termStr.includes('domestic')) {
        termType = 'Domestic';
      }
      termTypes.add(termType);
      
      // Collect amenities
      if (l.amenities) {
        l.amenities.forEach(a => amenities.add(a));
      }
    });

    return {
      terminalTypes: Array.from(termTypes).sort(),
      amenities: Array.from(amenities).sort()
    };
  }, [baseResults]);

  // Final Filtered Results
  const filteredResults = useMemo(() => {
    return baseResults.filter(l => {
      if (l.priceUSD > priceMax) return false;
      if (l.rating < minRating) return false;
      
      let termType = 'International';
      const termStr = ((l.terminals || []).join(' ') + ' ' + (l.description || '')).toLowerCase();
      if (termStr.includes('domestic') && termStr.includes('international')) termType = 'Domestic-International';
      else if (termStr.includes('domestic')) termType = 'Domestic';
      
      if (selectedTerminalTypes.length > 0 && !selectedTerminalTypes.includes(termType)) return false;
      
      if (selectedAmenities.length > 0) {
        const hasAll = selectedAmenities.every(a => (l.amenities || []).includes(a));
        if (!hasAll) return false;
      }
      
      return true;
    });
  }, [baseResults, priceMax, minRating, selectedTerminalTypes, selectedAmenities]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchParams(searchInput.trim() ? { q: searchInput.trim() } : {});
  };

  const handleTerminalChange = (t) => {
    setSelectedTerminalTypes(prev => 
      prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]
    );
  };

  const handleAmenityChange = (a) => {
    setSelectedAmenities(prev => 
      prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
    );
  };

  const clearAllFilters = () => {
    setPriceMax(200);
    setMinRating(0);
    setSelectedTerminalTypes([]);
    setSelectedAmenities([]);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-plus-jakarta">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-navy border-b border-accent-rose/30 shadow-xl">
        <div className="max-w-[1440px] mx-auto px-6 h-[68px] flex items-center justify-between gap-5">
          <Link to="/" className="flex items-center gap-2.5 shrink-0 no-underline">
            <img src="/logo.png" alt="LoungePair" className="h-[52px] w-auto" />
            <div className="flex flex-col leading-[1.1]">
              <div className="font-outfit text-[18px] font-extrabold tracking-[0.5px] text-white uppercase">
                Lounge<span className="text-accent-rose">Pair</span>
              </div>
              <div className="text-[8px] font-bold tracking-[2.5px] text-white/55 uppercase">
                International
              </div>
            </div>
          </Link>
          
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-[600px]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent-rose" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by city, airport, or lounge..."
                className="w-full bg-white text-navy font-bold text-[14px] py-2.5 pr-4 pl-10 rounded-full border-none outline-none shadow-inner"
              />
            </div>
          </form>

          <Link to="/" className="text-white font-bold text-[13px] no-underline hover:text-accent-rose transition-colors shrink-0">
            Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-[1440px] mx-auto px-6 py-8 w-full flex flex-col lg:flex-row gap-8 flex-1">
        
        {/* Sidebar */}
        <aside className="w-full lg:w-[320px] shrink-0">
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-[0_12px_36px_rgba(10,25,47,0.06)] p-6 sticky top-[100px]">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
              <h3 className="font-outfit font-extrabold text-[18px] text-navy flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </h3>
              <button onClick={clearAllFilters} className="bg-transparent border-none text-[12px] font-bold text-accent-rose cursor-pointer hover:underline">
                Clear All
              </button>
            </div>

            {/* Budget */}
            <div className="mb-8">
              <div className="font-bold text-[14px] text-navy mb-4 flex justify-between items-end">
                <span>Max Budget</span>
                <span className="text-[12px] text-slate-500 font-normal">USD</span>
              </div>
              <div className="flex items-center gap-3 mb-3 text-[14px] font-bold text-navy">
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-center">
                  $0
                </div>
                <span className="text-slate-400">—</span>
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-center">
                  ${priceMax}
                </div>
              </div>
              <input 
                type="range" 
                min="0" 
                max="200" 
                value={priceMax} 
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-accent-rose cursor-pointer h-[4px] bg-slate-200 rounded-lg appearance-none"
              />
            </div>

            {/* Rating */}
            <div className="mb-8">
              <div className="font-bold text-[14px] text-navy mb-4">Guest Rating</div>
              <div className="flex flex-col gap-3">
                {[
                  { val: 0, label: "Any" },
                  { val: 4, label: "4.0 & above" },
                  { val: 4.5, label: "4.5 & above" },
                  { val: 4.9, label: "Exceptional 4.9+" }
                ].map(r => (
                  <label key={r.val} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="rating" 
                      checked={minRating === r.val}
                      onChange={() => setMinRating(r.val)}
                      className="hidden"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${minRating === r.val ? 'border-accent-rose' : 'border-slate-300 group-hover:border-accent-rose/50'}`}>
                      {minRating === r.val && <div className="w-2.5 h-2.5 bg-accent-rose rounded-full"></div>}
                    </div>
                    <span className="text-[14px] text-slate-700 font-semibold group-hover:text-navy transition-colors">{r.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Terminal Types */}
            {filterOptions.terminalTypes.length > 0 && (
              <div className="mb-8">
                <div className="font-bold text-[14px] text-navy mb-4">Terminal Type</div>
                <div className="flex flex-col gap-3">
                  {filterOptions.terminalTypes.map(tt => (
                    <label key={tt} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={selectedTerminalTypes.includes(tt)}
                        onChange={() => handleTerminalChange(tt)}
                        className="hidden"
                      />
                      <div className={`w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-colors ${selectedTerminalTypes.includes(tt) ? 'border-accent-rose bg-accent-rose' : 'border-slate-300 bg-white group-hover:border-accent-rose/50'}`}>
                        {selectedTerminalTypes.includes(tt) && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className="text-[14px] text-slate-700 font-semibold group-hover:text-navy">{tt}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[24px] font-outfit font-extrabold text-navy">
              {query ? `Results for "${query}"` : 'All Lounges'} 
              <span className="text-slate-400 text-[18px] ml-2 font-medium">({filteredResults.length})</span>
            </h2>
          </div>

          <div className="flex flex-col gap-6">
            {filteredResults.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-[24px] border border-slate-200">
                <h3 className="text-[20px] font-bold text-navy mb-2">No lounges found</h3>
                <p className="text-slate-500">Try adjusting your filters or search criteria.</p>
                <button onClick={clearAllFilters} className="mt-6 bg-accent-rose text-white py-2 px-6 rounded-full font-bold">
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredResults.map((lounge, idx) => (
                <div key={lounge.id} className="bg-white rounded-[24px] border border-slate-150 shadow-sm p-4 lg:p-6 flex flex-col lg:flex-row gap-6 transition-all hover:shadow-[0_12px_36px_rgba(10,25,47,0.08)] hover:-translate-y-1">
                  
                  <div 
                    className="w-full lg:w-[280px] h-[200px] shrink-0 rounded-[16px] overflow-hidden relative bg-slate-100 cursor-pointer group"
                    onClick={() => navigate(`/lounge/${lounge.id || lounge.outletId}`)}
                  >
                    <img src={getCleanLoungeImage(lounge, idx)} alt={lounge.city} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md py-1 px-2.5 rounded-full text-[12px] font-bold text-navy flex items-center gap-1 shadow-sm">
                      <span className="text-accent-rose">★</span> {lounge.rating}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500 mb-2 uppercase tracking-wide">
                        <MapPin className="w-3.5 h-3.5 text-accent-rose" />
                        {lounge.city}, {lounge.country} • {lounge.airportCode}
                      </div>
                      <h3 
                        className="text-[22px] font-extrabold text-navy mb-2 leading-tight cursor-pointer hover:text-accent-rose transition-colors"
                        onClick={() => navigate(`/lounge/${lounge.id || lounge.outletId}`)}
                      >
                        {lounge.outletName || `${lounge.city} Lounge`}
                      </h3>
                      <p className="text-[14px] text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                        {lounge.description || 'Premium airport lounge offering exclusive amenities and comfort for global travelers.'}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(lounge.terminals || []).map((t, i) => (
                          <span key={i} className="bg-slate-50 border border-slate-200 text-slate-600 py-1 px-2.5 rounded-[8px] text-[12px] font-semibold">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[12px] text-slate-500 font-bold uppercase tracking-wider">Per Person</span>
                        <div className="text-[24px] font-extrabold text-navy">
                          {currentSymbol}{convertPrice(lounge.priceUSD)}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => navigate(`/lounge/${lounge.id || lounge.outletId}`)}
                          className="bg-slate-100 hover:bg-slate-200 text-navy py-3 px-5 rounded-full font-bold text-[14px] transition-colors cursor-pointer"
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => navigate(`/lounge/${lounge.id || lounge.outletId}`)}
                          className="bg-accent-rose hover:bg-[#C8102E] text-white py-3 px-6 rounded-full font-bold text-[14px] flex items-center gap-2 transition-all cursor-pointer shadow-md"
                        >
                          Book Access <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </main>
    </div>
  );
};

// Quick missing icon implementation
const Check = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
);
