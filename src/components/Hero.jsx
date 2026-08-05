import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrencySelect } from './CurrencySelect';
import { Search, User, Briefcase, Globe, Train } from 'lucide-react';
import loungesData from '../data/loungesData.json';
import { getCleanLoungeImage } from '../utils/loungeImageHelper';

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
        <div className="flex items-center gap-3 cursor-pointer select-none pointer-events-auto" onClick={() => navigate('/')}>
          <img src="/loungepair-logo.png" alt="LoungePair Logo" className="h-[100px] w-auto block brightness-0" />
          <div className="flex flex-col leading-[1.1]">
            <div className="font-outfit text-[22px] font-extrabold tracking-[1px] text-navy uppercase">
              GET YOUR <span className="text-accent-rose">LOUNGE</span>
            </div>
          </div>
        </div>


        {/* Right Nav */}
        <div className="flex items-center gap-4 pointer-events-auto">
          <CurrencySelect />
        </div>
      </div>

      {/* Background Cinematic Video */}
      <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          src="/hero-video.mp4"
          className="w-full h-full object-cover object-center scale-125 brightness-110 contrast-105"
        ></video>
        {/* Soft, highly translucent White overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/65 via-white/30 to-white/75 z-[2]"></div>
      </div>

      {/* Centered Composition */}
      <div className="relative z-10 w-full max-w-[950px] text-center flex flex-col items-center mt-8">
        <h1 className="luxury-serif text-[clamp(28px,3.5vw,42px)] text-navy mb-10 drop-shadow-sm leading-[1.15]">
          Your Exclusive Gateway to 1,400+<br/>Premium Airport Lounges Worldwide.
        </h1>

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
          {showAutocomplete && (
            <div className="absolute top-[calc(100%+10px)] left-0 right-0 bg-white rounded-3xl shadow-2xl border border-accent-rose/20 max-h-[340px] overflow-y-auto text-left z-50">
              <div className="px-5 py-3 text-[11px] font-bold text-accent-rose uppercase tracking-[1px] border-b border-navy/10">
                Matching Airport Lounges ({matches.length})
              </div>
              {matches.map((l, idx) => (
                <div
                  key={idx}
                  className="px-5 py-3.5 flex items-center justify-between border-b border-navy/10 cursor-pointer hover:bg-[#F8F9FB] transition-colors"
                  onClick={() => navigate(`/search?q=${encodeURIComponent(l.city)}&id=${encodeURIComponent(l.id)}`)}
                >
                  <div className="flex items-center gap-3.5">
                    <img src={getCleanLoungeImage(l, idx)} alt={l.city} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="font-extrabold text-[15px] text-navy">{l.city} ({l.airportCode})</div>
                      <div className="text-[13px] text-slate-700">{l.terminals.join(', ')}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[13px] text-accent-rose font-bold">Select Lounge →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Subtitle Centered Between Bars */}
        <p className="text-[15px] font-extrabold text-navy my-3 opacity-90 font-plus-jakarta tracking-wide">
          No membership required. Pay as you go.
        </p>

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
              <div className="text-[34px] font-extrabold text-navy font-plus-jakarta">1022</div>
            </div>
            <div className="w-px h-12 bg-slate-200"></div>
            <div className="text-center relative z-10">
              <div className="text-[11px] font-extrabold text-navy tracking-[1.5px] uppercase mb-1.5 opacity-80">DOMESTIC</div>
              <div className="text-[34px] font-extrabold text-navy font-plus-jakarta">50</div>
            </div>
          </div>

          <div className="flex flex-1 justify-around items-center pl-6 relative z-10">
            <div className="text-center relative z-10">
              <div className="text-[11px] font-extrabold text-navy tracking-[1.5px] uppercase mb-1.5 opacity-80">RAIL</div>
              <div className="text-[34px] font-extrabold text-navy font-plus-jakarta">17</div>
            </div>
            <div className="w-px h-12 bg-slate-200"></div>
            <div className="text-center relative z-10">
              <div className="text-[11px] font-extrabold text-navy tracking-[1.5px] uppercase mb-1.5 opacity-80">COUNTRIES</div>
              <div className="text-[34px] font-extrabold text-navy font-plus-jakarta">60+</div>
            </div>
          </div>
        </div>

        {/* Terminal/Type Filter */}
        <div className="w-full flex justify-center -mt-2 mb-6 relative z-20">
          <div className="relative inline-flex items-center bg-white rounded-full py-0.5 px-1 shadow-md border border-slate-200/90 w-auto">
            <select
              onChange={(e) => {
                if (e.target.value) navigate(`/search?q=${encodeURIComponent(e.target.value)}`);
              }}
              className="appearance-none bg-transparent text-navy font-bold text-[13px] py-1.5 pl-3.5 pr-7 cursor-pointer outline-none font-plus-jakarta w-auto"
            >
              <option value="">Browse by Lounge Type...</option>
              <option value="International">International Lounges</option>
              <option value="Domestic">Domestic Lounges</option>
              <option value="Train">Train Lounges</option>
            </select>
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-accent-rose text-[11px] font-black">
              ▼
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
