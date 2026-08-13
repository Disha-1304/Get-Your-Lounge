import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrencySelect } from './Currency';
import { Search, User, Briefcase, Globe, Train } from 'lucide-react';
import loungesData from '../../data/loungesData.json';
import globalLounges from '../../data/globalLoungesData.json';
import { getCleanLoungeImage } from '../../utils/loungeImageHelper';

import { AppLogo } from '../common/AppLogo';

const allLounges = [...loungesData.LOUNGE_GUIDES, ...globalLounges];
const dynamicStats = {
  international: allLounges.filter(l => l.country !== 'India' && !l.isTrainLounge).length,
  domestic: allLounges.filter(l => l.country === 'India' && !l.isTrainLounge).length,
  rail: allLounges.filter(l => l.isTrainLounge || l.type === 'Executive Railway Lounge' || (l.city || '').toLowerCase().includes('railway')).length,
  countries: new Set(allLounges.map(l => l.country).filter(Boolean)).size
};

export const Hero = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [matches, setMatches] = useState([]);

  const handleHeroSearch = (val) => {
    setSearchValue(val);
    if (!val || val.trim() === '') {
      setMatches(loungesData.LOUNGE_GUIDES);
      setShowAutocomplete(true);
      return;
    }

    const query = val.toLowerCase().trim();

    const exactCountryMatch = loungesData.LOUNGE_GUIDES.some(l => l.country.toLowerCase() === query);

    let foundMatches = [];
    if (exactCountryMatch) {
      foundMatches = loungesData.LOUNGE_GUIDES.filter(l => l.country.toLowerCase() === query);
    } else {
      foundMatches = loungesData.LOUNGE_GUIDES.filter((l) =>
        l.city.toLowerCase().includes(query) ||
        l.airportCode.toLowerCase().includes(query) ||
        l.country.toLowerCase().includes(query) ||
        l.terminals.some((t) => t.toLowerCase().includes(query))
      );
    }

    setMatches(foundMatches);
    setShowAutocomplete(foundMatches.length > 0);
  };

  const clearHeroSearch = () => {
    setSearchValue('');
    setMatches(loungesData.LOUNGE_GUIDES);
    setShowAutocomplete(true);
  };

  const submitHeroSearch = () => {
    if (searchValue.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const handleFocus = () => {
    if (!searchValue.trim()) {
      setMatches(loungesData.LOUNGE_GUIDES);
      setShowAutocomplete(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowAutocomplete(false);
    }, 200);
  };

  return (
    <section className="relative w-full h-[80vh] min-h-[550px] flex flex-col justify-center items-center px-6 pt-[100px] pb-10 overflow-hidden">
      {/* Top Header Row */}
      <div className="absolute top-3 left-0 w-full px-10 z-20 flex items-center justify-between pointer-events-none">
        
        {/* Logo */}
        <div className="pointer-events-auto">
          <AppLogo size="md" />
        </div>


        {/* Right Nav */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <CurrencySelect />
        </div>
      </div>

      {/* Background Cover Image */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <img
          src="/lounge-pair-final-image.jpg"
          alt="Lounge Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Translucent overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/50 via-white/30 to-white/60 z-[2]"></div>
      </div>

      {/* Centered Composition */}
      <div className="relative z-10 w-full max-w-[950px] text-center flex flex-col items-center mt-8">
        


        <h1 className="font-quicksand font-extrabold text-[clamp(28px,3.5vw,42px)] text-navy mb-6 drop-shadow-sm leading-[1.15]">
          Your Exclusive Gateway to 1,400+<br/>Premium Airport Lounges Worldwide.
        </h1>

        {/* Quick Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 max-w-[750px]">
          {[
            { label: '✨ All Lounges', filter: 'All' },
            { label: '✈ International', filter: 'International' },
            { label: '🇮🇳 Domestic', filter: 'IndiaAirports' },
            { label: '🚄 Rail Lounges', filter: 'RailwayLounges' }
          ].map((pill, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSearchValue('');
                if (pill.filter === 'All') {
                  navigate('/search');
                } else {
                  navigate(`/search?filter=${encodeURIComponent(pill.filter)}`);
                }
              }}
              className="bg-white/90 hover:bg-white text-navy hover:text-accent-rose text-[12px] font-extrabold py-1.5 px-4 rounded-full border border-slate-200 shadow-2xs hover:shadow-md transition-all cursor-pointer font-plus-jakarta"
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Pill-shaped White Search Input Field */}
        <div className="relative w-full max-w-[650px] mb-3">
          <div className="bg-white rounded-full py-1.5 pr-2 pl-6 flex items-center shadow-2xl w-full">
            <Search className="w-5 h-5 text-accent-rose mr-3.5 shrink-0" strokeWidth={2} />
            <input
              type="text"
              placeholder="City, airport or lounge"
              value={searchValue}
              onChange={(e) => handleHeroSearch(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={(e) => e.key === 'Enter' && submitHeroSearch()}
              className="border-none outline-none w-full text-base text-navy font-semibold bg-transparent font-plus-jakarta"
            />
            {searchValue && (
              <button
                type="button"
                onClick={clearHeroSearch}
                className="bg-transparent border-none text-accent-rose cursor-pointer px-3 text-lg"
              >
                ✕
              </button>
            )}
            <button
              type="button"
              onClick={submitHeroSearch}
              className="bg-accent-rose hover:bg-accent-rose-hover text-white border-none rounded-full py-[13px] px-8 font-bold text-[15px] cursor-pointer shrink-0 transition-all duration-200 font-plus-jakarta"
            >
              Search
            </button>
          </div>

          {/* Autocomplete Dropdown */}
          {showAutocomplete && matches.length > 0 && (
            <div 
              className="absolute top-[calc(100%+10px)] left-0 right-0 bg-white rounded-3xl shadow-2xl border border-accent-rose/20 max-h-[380px] overflow-y-auto text-left z-[100] divide-y divide-slate-100"
              onMouseDown={(e) => e.preventDefault()}
            >
              <div className="px-5 py-3 text-[11px] font-bold text-accent-rose uppercase tracking-[1px] bg-slate-50 rounded-t-3xl flex justify-between items-center">
                <span>Matching Lounges ({matches.length})</span>
                <span className="text-[10px] text-slate-400 font-normal">Click to open</span>
              </div>
              {matches.map((l, idx) => (
                <div
                  key={l.id || idx}
                  className="px-5 py-3.5 flex items-center justify-between cursor-pointer hover:bg-rose-50/50 transition-all group"
                  onClick={() => {
                    setSearchValue(l.outletName ? `${l.city} - ${l.outletName}` : l.city);
                    setShowAutocomplete(false);
                    navigate(`/lounge/${l.id}`);
                  }}
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-2">
                    <img 
                      src={getCleanLoungeImage(l, idx)} 
                      alt={l.city} 
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100 shrink-0 group-hover:scale-105 transition-transform" 
                    />
                    <div className="min-w-0">
                      <div className="font-extrabold text-[15px] text-navy truncate group-hover:text-accent-rose transition-colors">
                        {l.outletName || l.city}
                      </div>
                      <div className="text-[13px] text-slate-500 font-medium truncate">
                        📍 {l.city} ({l.airportCode}) • {l.terminals ? l.terminals.join(', ') : 'All Terminals'}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="inline-flex items-center gap-1 text-[12px] bg-accent-rose text-white px-3 py-1.5 rounded-full font-bold shadow-xs group-hover:bg-accent-rose-hover transition-colors">
                      Open Lounge →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subtitle Centered Between Bars */}
        {/* Stats Strip Below Search Bar */}
        <div className="relative flex justify-around items-center bg-white py-5 px-10 rounded-[32px] max-w-[850px] w-full shadow-xl mb-4 overflow-hidden border border-slate-100">
          
          {/* Top Left Blue Wave */}
          <svg className="absolute top-0 left-0 w-[75px] h-[75px]" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
            <path d="M0,0 L100,0 C 95,40 30,20 0,100 Z" fill="#93C5FD" opacity="0.9" />
            <path d="M0,0 L85,0 C 85,35 35,30 0,85 Z" fill="#0A192F" />
          </svg>

          {/* Middle Red Wave */}
          <svg className="absolute bottom-0 left-[50%] w-[75px] h-[75px] -translate-x-[35px]" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
            <path d="M100,100 L0,100 C 40,95 20,30 100,0 Z" fill="#FDA4AF" opacity="0.9" />
            <path d="M100,100 L15,100 C 55,95 35,40 100,15 Z" fill="#FE2C1C" />
            <path d="M100,100 L30,100 C 70,95 50,50 100,30 Z" fill="#991B10" />
          </svg>

          {/* Bottom Right Red Wave */}
          <svg className="absolute bottom-0 right-0 w-[75px] h-[75px]" viewBox="0 0 100 100" fill="none" preserveAspectRatio="none">
            <path d="M100,100 L0,100 C 40,95 20,30 100,0 Z" fill="#FDA4AF" opacity="0.9" />
            <path d="M100,100 L15,100 C 55,95 35,40 100,15 Z" fill="#FE2C1C" />
            <path d="M100,100 L30,100 C 70,95 50,50 100,30 Z" fill="#991B10" />
          </svg>

          <div className="flex flex-1 justify-around items-center border-r border-transparent relative z-10 pr-6">
            <div className="text-center relative z-10">
              <div className="text-[11px] font-extrabold text-navy tracking-[1.5px] uppercase mb-1.5 opacity-80">INTERNATIONAL</div>
              <div className="text-[34px] font-extrabold text-navy font-plus-jakarta">{dynamicStats.international}</div>
            </div>
            <div className="w-px h-12 bg-slate-200"></div>
            <div className="text-center relative z-10">
              <div className="text-[11px] font-extrabold text-navy tracking-[1.5px] uppercase mb-1.5 opacity-80">DOMESTIC</div>
              <div className="text-[34px] font-extrabold text-navy font-plus-jakarta">{dynamicStats.domestic}</div>
            </div>
          </div>

          <div className="flex flex-1 justify-around items-center pl-6 relative z-10">
            <div className="text-center relative z-10">
              <div className="text-[11px] font-extrabold text-navy tracking-[1.5px] uppercase mb-1.5 opacity-80">RAIL</div>
              <div className="text-[34px] font-extrabold text-navy font-plus-jakarta">{dynamicStats.rail}</div>
            </div>
            <div className="w-px h-12 bg-slate-200"></div>
            <div className="text-center relative z-10">
              <div className="text-[11px] font-extrabold text-navy tracking-[1.5px] uppercase mb-1.5 opacity-80">COUNTRIES</div>
              <div className="text-[34px] font-extrabold text-navy font-plus-jakarta">{dynamicStats.countries}+</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
