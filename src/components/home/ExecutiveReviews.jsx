import React from 'react';
import { Quote, CheckCircle } from 'lucide-react';

const reviews = [
  {
    quote: "Get My Lounge transformed our international corporate travel. Having instant guaranteed access to private suites and rainfall showers during 8-hour layovers in Singapore and Dubai is invaluable.",
    author: "Julianne Vance",
    title: "Managing Director, Global Wealth Partners",
    route: "Frequent Flyer • JFK ⇄ SIN",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    quote: "The zero-membership model is brilliant. I bought my digital 3D QR pass while standing right outside the Plaza Premium Concierge in Concourse B and entered within 20 seconds. Exceptional service.",
    author: "Rajesh Mehta",
    title: "Founder & CEO, Horizon Tech Labs",
    route: "First Class Club • DXB ⇄ LHR",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
  },
  {
    quote: "As a diplomatic courier, schedule flexibility is critical. Knowing my pass remains valid for 365 days across any flight delay or reschedule gives me total peace of mind. Truly 5-star airport hospitality.",
    author: "Lord Alistair Sterling",
    title: "Senior Diplomatic Advisor",
    route: "Global Ambassador • CDG ⇄ HND",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
  }
];

export const ExecutiveReviews = () => {
  return (
    <section className="py-20 px-5 bg-white relative">
      <div className="max-w-[1350px] mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FDECEF] border border-accent-rose/30 rounded-full mb-4 text-accent-rose text-[12px] font-extrabold tracking-[2px] uppercase">
            <span className="text-accent-rose">★</span> Executive Testimonials
          </div>

          <h2 className="font-quicksand font-bold text-[38px] text-navy mb-3">
            Accolades from the <span className="bg-gradient-to-br from-accent-rose to-[#C8102E] bg-clip-text text-transparent font-bold">Discerning Flyer</span>
          </h2>
          <p className="font-quicksand text-[16px] text-slate-600 max-w-[580px] mx-auto leading-relaxed font-medium">
            Read how global executives, diplomats, and frequent travelers experience effortless airport hospitality with Get My Lounge International.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="luxury-card-hover bg-white rounded-3xl p-9 border-[1.5px] border-accent-rose/20 shadow-xl flex flex-col justify-between gap-7 relative"
            >
              <Quote className="text-accent-rose/15 absolute top-7 right-8 w-10 h-10" />

              <div>
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent-rose text-sm">★</span>
                  ))}
                </div>
                <p className="font-quicksand text-[15.5px] text-slate-800 leading-[1.75] font-semibold tracking-normal">
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 border-t border-navy/10 pt-5">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-[54px] h-[54px] rounded-full object-cover border-2 border-accent-rose"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-[16px] font-extrabold text-navy">{rev.author}</h4>
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-[12px] font-semibold text-slate-700 mb-0.5">{rev.title}</div>
                  <div className="text-[11px] font-bold text-accent-rose tracking-[0.5px]">{rev.route}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
