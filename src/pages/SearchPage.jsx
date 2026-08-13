import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Filter, X, Star, ArrowRight } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import globalLounges from '../data/globalLoungesData.json';
import loungesData from '../data/loungesData.json';
import { getCleanLoungeImage } from '../utils/loungeImageHelper';
import { AppLogo } from '../components/common/AppLogo';

export const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();

  const { currency, currentSymbol, convertPrice } = useCurrency();

  // Search input state
  const [searchInput, setSearchInput] = useState(query);

  // Filters State
  const [localBudgetInput, setLocalBudgetInput] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [selectedTerminalTypes, setSelectedTerminalTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [is24x7Open, setIs24x7Open] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');

  // Read filter param from URL (e.g., /search?filter=International)
  const filterParam = searchParams.get('filter') || '';

  const [categoryFilter, setCategoryFilter] = useState(() => {
    if (filterParam) return filterParam;
    const q = (query || '').toLowerCase();
    if (q.includes('rail') || q.includes('train')) return 'RailwayLounges';
    if (q.includes('domestic') || q.includes('indian') || q === 'india') return 'IndiaAirports';
    if (q.includes('international')) return 'International';
    return 'All';
  });

  // Sync categoryFilter when URL filter param changes
  useEffect(() => {
    if (filterParam) {
      setCategoryFilter(filterParam);
      setSearchInput('');
    } else if (!query) {
      setCategoryFilter('All');
    }
  }, [filterParam, query]);

  // Combine both local featured lounges and global lounges
  const allLounges = useMemo(() => {
    return [...loungesData.LOUNGE_GUIDES, ...globalLounges];
  }, []);

  // Base results based only on search query & category tab
  const baseResults = useMemo(() => {
    let list = allLounges;
    const q = query.toLowerCase().trim();

    // If there's a text query, filter by text first
    if (q) {
      const exactCountryMatch = allLounges.some(l => (l.country || '').toLowerCase() === q);
      if (exactCountryMatch) {
        list = allLounges.filter(l => (l.country || '').toLowerCase() === q);
      } else {
        list = allLounges.filter((l) => {
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
      }
    }

    // Apply category filter
    if (categoryFilter === 'IndiaAirports') {
      return list.filter(l => l.country === 'India' && !l.isTrainLounge);
    } else if (categoryFilter === 'RailwayLounges') {
      return list.filter(l => l.isTrainLounge || (l.type || '').toLowerCase().includes('railway') || (l.city || '').toLowerCase().includes('railway') || (l.airportCode || '').toLowerCase().includes('rail'));
    } else if (categoryFilter === 'International') {
      return list.filter(l => l.country !== 'India' && !l.isTrainLounge);
    }

    return list;
  }, [query, categoryFilter, allLounges]);

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
    const filtered = baseResults.filter(l => {
      if (localBudgetInput !== "") {
        const maxLimit = parseFloat(localBudgetInput);
        if (!isNaN(maxLimit)) {
          const loungeLocalPrice = convertPrice(l.priceUSD);
          if (loungeLocalPrice > maxLimit) return false;
        }
      }
      if (l.rating < minRating) return false;
      
      let termType = 'International';
      const termStr = ((l.terminals || []).join(' ') + ' ' + (l.description || '')).toLowerCase();
      if (termStr.includes('domestic') && termStr.includes('international')) termType = 'Domestic-International';
      else if (termStr.includes('domestic')) termType = 'Domestic';
      
      if (selectedTerminalTypes.length > 0 && !selectedTerminalTypes.includes(termType)) return false;
      
      if (selectedAmenities.length > 0) {
        const amStr = Array.isArray(l.amenities) ? l.amenities.join(' ') : (l.amenities || '');
        const hasAll = selectedAmenities.every(a => amStr.toLowerCase().includes(a.toLowerCase()));
        if (!hasAll) return false;
      }

      if (is24x7Open) {
        const text = `${l.description || ''} ${Array.isArray(l.amenities) ? l.amenities.join(' ') : ''} ${l.openingHours || ''}`.toLowerCase();
        if (!(text.includes('24x7') || text.includes('24 hours') || text.includes('24 hrs'))) return false;
      }
      
      return true;
    });

    // Apply Sorting
    return filtered.sort((a, b) => {
      if (sortBy === 'price-low-high') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price-high-low') return b.priceUSD - a.priceUSD;
      if (sortBy === 'top-rated') return (b.rating || 0) - (a.rating || 0);
      
      // relevance (default): score based on search query match
      if (sortBy === 'relevance' && query) {
        const q = query.toLowerCase().trim();
        const getScore = (l) => {
          const name = (l.outletName || '').toLowerCase();
          const city = (l.city || '').toLowerCase();
          const code = (l.airportCode || '').toLowerCase();
          const airport = (l.airportName || '').toLowerCase();
          const country = (l.country || '').toLowerCase();
          
          if (name === q) return 100;
          if (city === q) return 90;
          if (code === q) return 80;
          if (name.includes(q)) return 70;
          if (city.includes(q)) return 60;
          if (airport.includes(q)) return 50;
          if (country.includes(q)) return 40;
          return 0;
        };
        return getScore(b) - getScore(a);
      }
      
      return 0; 
    });

  }, [baseResults, localBudgetInput, minRating, selectedTerminalTypes, selectedAmenities, is24x7Open, sortBy, query, convertPrice]);

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
    setLocalBudgetInput("");
    setMinRating(0);
    setSelectedTerminalTypes([]);
    setSelectedAmenities([]);
    setIs24x7Open(false);
    setSortBy('relevance');
  };

  // Autocomplete state for header search
  const [showAutocomplete, setShowAutocomplete] = useState(false);

  const headerMatches = useMemo(() => {
    if (!searchInput || !searchInput.trim()) return [];
    const q = searchInput.toLowerCase().trim();
    return allLounges.filter(l => 
      (l.outletName || '').toLowerCase().includes(q) ||
      (l.city || '').toLowerCase().includes(q) ||
      (l.airportCode || '').toLowerCase().includes(q)
    ).slice(0, 8);
  }, [searchInput, allLounges]);

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col font-plus-jakarta overflow-x-hidden max-w-full">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-navy border-b border-accent-rose/30 shadow-xl">
        <div className="max-w-[1440px] mx-auto px-6 h-[68px] flex items-center justify-between gap-5">
          <AppLogo size="sm" isDark={true} />
          
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-[600px] relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-accent-rose z-10" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setShowAutocomplete(true);
                }}
                onFocus={() => setShowAutocomplete(true)}
                onBlur={() => setTimeout(() => setShowAutocomplete(false), 200)}
                placeholder="Search by city, airport, or lounge..."
                className="w-full bg-white text-navy font-bold text-[14px] py-2.5 pr-4 pl-10 rounded-full border-none outline-none shadow-inner"
              />

              {/* Live Autocomplete Dropdown */}
              {showAutocomplete && headerMatches.length > 0 && (
                <div 
                  className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-2xl shadow-2xl border border-accent-rose/20 max-h-[360px] overflow-y-auto z-[100] text-left divide-y divide-slate-100"
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <div className="px-4 py-2 text-[11px] font-bold text-accent-rose uppercase tracking-[1px] bg-slate-50 rounded-t-2xl flex justify-between items-center">
                    <span>Matching Lounges ({headerMatches.length})</span>
                    <span className="text-[10px] text-slate-400 font-normal">Click to open</span>
                  </div>
                  {headerMatches.map((l, idx) => (
                    <div
                      key={l.id || idx}
                      className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-rose-50/50 transition-all group"
                      onClick={() => {
                        setSearchInput(l.outletName || l.city);
                        setShowAutocomplete(false);
                        navigate(`/lounge/${l.id}`);
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <img 
                          src={getCleanLoungeImage(l, idx)} 
                          alt={l.city} 
                          className="w-10 h-10 rounded-lg object-cover border border-slate-100 shrink-0 group-hover:scale-105 transition-transform" 
                        />
                        <div className="min-w-0">
                          <div className="font-extrabold text-[14px] text-navy truncate group-hover:text-accent-rose transition-colors">
                            {l.outletName || l.city}
                          </div>
                          <div className="text-[12px] text-slate-500 font-medium truncate">
                            📍 {l.city} ({l.airportCode})
                          </div>
                        </div>
                      </div>
                      <div className="shrink-0">
                        <span className="text-[12px] bg-accent-rose text-white px-3 py-1 rounded-full font-bold shadow-2xs group-hover:bg-accent-rose-hover transition-colors">
                          Open →
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>

          <Link to="/" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[13px] py-2 px-4 rounded-full no-underline hover:text-accent-rose transition-all shrink-0 border border-white/20 hover:border-accent-rose/50 shadow-sm">
            <span>Home</span>
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
                <Filter className="w-4 h-4" /> Filters & Sort
              </h3>
              <button onClick={clearAllFilters} className="bg-transparent border-none text-[12px] font-bold text-accent-rose cursor-pointer hover:underline">
                Clear All
              </button>
            </div>

            {/* Sort By */}
            <div className="mb-8">
              <div className="font-bold text-[14px] text-navy mb-4">Sort By</div>
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 text-navy text-[14px] font-semibold py-3 px-4 rounded-xl outline-none cursor-pointer hover:border-slate-300 focus:border-accent-rose transition-colors"
                >
                  <option value="relevance">✨ Most Relevant</option>
                  <option value="top-rated">🌟 Top Rated First</option>
                  <option value="price-low-high">💎 Most Affordable (Price: Low to High)</option>
                  <option value="price-high-low">👑 Premium First (Price: High to Low)</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            {/* Budget */}
            <div className="mb-8">
              <div className="font-bold text-[14px] text-navy mb-4 flex justify-between items-end">
                <span>Max Budget</span>
                <span className="text-[12px] text-slate-500 font-normal">{currency}</span>
              </div>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">
                  {currentSymbol}
                </div>
                <input 
                  type="number"
                  min="0"
                  value={localBudgetInput}
                  onChange={(e) => setLocalBudgetInput(e.target.value)}
                  placeholder="Enter max amount"
                  className="w-full appearance-none bg-slate-50 border border-slate-200 text-navy text-[14px] font-semibold py-3 pl-10 pr-4 rounded-xl outline-none hover:border-slate-300 focus:border-accent-rose transition-colors"
                />
              </div>
            </div>

            {/* Rating */}
            <div className="mb-8">
              <div className="font-bold text-[14px] text-navy mb-4">Guest Rating</div>
              <div className="flex flex-col gap-3">
                {[
                  { val: 0, label: "All Ratings" },
                  { val: 4.5, label: "5 ★" },
                  { val: 4, label: "4 ★ & above" },
                  { val: 3, label: "3 ★ & above" },
                  { val: 2, label: "2 ★ & above" },
                  { val: 1, label: "1 ★ & above" }
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

            {/* Amenities */}
            <div className="mb-8">
              <div className="font-bold text-[14px] text-navy mb-4">Amenities</div>
              <div className="flex flex-col gap-3">
                {['Shower', 'Wi-Fi', 'Bar', 'Food'].map(amenity => (
                  <label key={amenity} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity)}
                      onChange={() => handleAmenityChange(amenity)}
                      className="hidden"
                    />
                    <div className={`w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-colors ${selectedAmenities.includes(amenity) ? 'border-accent-rose bg-accent-rose' : 'border-slate-300 group-hover:border-accent-rose/50'}`}>
                      {selectedAmenities.includes(amenity) && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span className="text-[14px] text-slate-700 font-semibold group-hover:text-navy transition-colors">{amenity}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 24x7 Open */}
            <div className="mb-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox"
                  checked={is24x7Open}
                  onChange={() => setIs24x7Open(!is24x7Open)}
                  className="hidden"
                />
                <div className={`w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-colors ${is24x7Open ? 'border-accent-rose bg-accent-rose' : 'border-slate-300 group-hover:border-accent-rose/50'}`}>
                  {is24x7Open && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <span className="text-[14px] font-bold text-navy group-hover:text-accent-rose transition-colors">24x7 Open</span>
              </label>
            </div>


          </div>
        </aside>

        {/* Results */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[24px] font-outfit font-extrabold text-navy">
              {categoryFilter === 'International' ? 'International Lounges' :
               categoryFilter === 'IndiaAirports' ? 'Domestic Lounges' :
               categoryFilter === 'RailwayLounges' ? 'Rail Lounges' :
               query ? `Results for "${query}"` : 'All Lounges'} 
              <span className="text-slate-400 text-[18px] ml-2 font-medium">({filteredResults.length})</span>
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { label: '✨ All Lounges', value: 'All' },
              { label: '✈ International', value: 'International' },
              { label: '🇮🇳 Domestic', value: 'IndiaAirports' },
              { label: '🚄 Rail Lounges', value: 'RailwayLounges' }
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => {
                  setCategoryFilter(tab.value);
                  if (tab.value === 'All') {
                    setSearchParams(query ? { q: query } : {});
                  } else {
                    setSearchParams(query ? { q: query, filter: tab.value } : { filter: tab.value });
                  }
                }}
                className={`py-2 px-5 rounded-full text-[13px] font-extrabold border transition-all cursor-pointer font-plus-jakarta ${
                  categoryFilter === tab.value
                    ? 'bg-accent-rose text-white border-accent-rose shadow-md'
                    : 'bg-white text-navy border-slate-200 hover:border-accent-rose/40 hover:text-accent-rose shadow-sm'
                }`}
              >
                {tab.label}
              </button>
            ))}
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
                    {lounge.isTrainLounge && (
                      <div className="absolute bottom-3 left-3 bg-amber-500 text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-full shadow-md">
                        🚄 Executive Rail Lounge
                      </div>
                    )}
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
