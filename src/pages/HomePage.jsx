import React from 'react';
import { Hero } from '../components/home/Hero';
import { LoungeGuides } from '../components/home/LoungeGuides';
import { ExecutiveReviews } from '../components/home/ExecutiveReviews';
import { FaqSection } from '../components/home/FaqSection';
import { Footer } from '../components/home/Footer';

export const HomePage = () => {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <Hero />
      <LoungeGuides />
      <ExecutiveReviews />
      <FaqSection />
      <Footer />
    </div>
  );
};
