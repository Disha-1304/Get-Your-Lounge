import React from 'react';
import { useCurrency } from '../context/CurrencyContext';

export const CurrencySelect = ({ className = '', style = {} }) => {
  const { currency, setCurrency, currencies } = useCurrency();

  return (
    <div className="relative inline-flex items-center w-auto">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className={`appearance-none bg-white text-navy border border-slate-200/90 pl-3 pr-6 py-1 rounded-full font-extrabold text-[12.5px] cursor-pointer outline-none shadow-sm hover:border-slate-300 transition-colors font-plus-jakarta w-auto ${className}`}
        style={style}
      >
        {Object.entries(currencies).map(([code, info]) => (
          <option key={code} value={code}>
            {info.name}
          </option>
        ))}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-accent-rose text-[11px] font-black">
        ▼
      </div>
    </div>
  );
};
