import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '../../context/CurrencyContext';

export const CurrencySelect = ({ className = '', style = {} }) => {
    const { currency, setCurrency, currencies, isLiveRate, currentRate, currentSymbol } = useCurrency();
    const [showLiveRate, setShowLiveRate] = useState(false);
    const timerRef = useRef(null);

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
        setShowLiveRate(true);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            setShowLiveRate(false);
        }, 5000);
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <div className="flex items-center gap-2">
            <div className="relative inline-flex items-center w-auto">
                <select
                    value={currency}
                    onChange={handleCurrencyChange}
                    className={`appearance-none bg-white text-navy border border-slate-200/90 pl-3 pr-7 py-1.5 rounded-full font-extrabold text-[12.5px] cursor-pointer outline-none shadow-sm hover:border-slate-300 transition-colors font-plus-jakarta w-auto ${className}`}
                    style={style}
                >
                    {Object.entries(currencies).map(([code, info]) => (
                        <option key={code} value={code}>
                            {info.name}
                        </option>
                    ))}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-accent-rose text-[10px] font-black">
                    ▼
                </div>
            </div>

            <div className={`transition-all duration-500 overflow-hidden ${isLiveRate && showLiveRate ? 'max-w-[300px] opacity-100 ml-1' : 'max-w-0 opacity-0 ml-0'}`}>
                <div
                    className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-xs select-none whitespace-nowrap"
                    title={`Live rate: 1 USD = ${currentSymbol}${currentRate.toFixed(2)} ${currency}`}
                >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                    <span>Live Rate (1 USD = {currentSymbol}{currency === 'USD' ? '1.00' : currentRate.toFixed(2)})</span>
                </div>
            </div>
        </div>
    );
};
