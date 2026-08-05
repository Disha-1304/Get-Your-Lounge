import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import loungesData from '../data/loungesData.json';

export const FaqSection = () => {
  const [search, setSearch] = useState('');
  const [openIdx, setOpenIdx] = useState(0);

  const filteredFaqs = loungesData.FAQ_ITEMS.filter((faq) =>
    faq.q.toLowerCase().includes(search.toLowerCase()) ||
    faq.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-[60px] px-5 pb-[80px] max-w-[960px] mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-[clamp(28px,4vw,40px)] text-navy mb-3 font-outfit font-extrabold">
          Buying lounge access with <span className="text-accent-rose">LoungePair</span>
        </h2>
        <p className="text-[16px] text-slate-700 mb-6">
          Everything you need to know about our instant international airport lounge pass system.
        </p>

        <div className="max-w-[480px] mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search FAQs (e.g., immediate entry, refund policy, payment)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3 pr-4 pl-11 rounded-full border-[1.5px] border-slate-300 bg-white text-[14px] text-slate-900 outline-none shadow-sm font-plus-jakarta focus:border-accent-rose transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3.5">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-accent-rose shadow-[0_10px_25px_-5px_rgba(230,30,56,0.1)]' : 'border-slate-200 shadow-sm'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                  className="w-full py-5 px-6 flex items-center justify-between bg-transparent border-none text-left cursor-pointer gap-4"
                >
                  <span className={`text-[17px] font-bold font-plus-jakarta ${isOpen ? 'text-accent-rose' : 'text-navy'}`}>
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? 'bg-[#FDECEF]' : 'bg-slate-50'
                    }`}
                  >
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-accent-rose" strokeWidth={2.5} />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-500" strokeWidth={2.5} />
                    )}
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-[22px] text-[15px] text-slate-600 leading-[1.7] border-t border-slate-100 pt-4 font-plus-jakarta">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 bg-white rounded-[20px] border border-slate-200">
            <p className="text-[16px] text-slate-500 font-plus-jakarta">No matching questions found.</p>
          </div>
        )}
      </div>
    </section>
  );
};
