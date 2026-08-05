import React from 'react';
import { Hero } from '../components/Hero';
import { LoungeGuides } from '../components/LoungeGuides';
import { ExecutiveReviews } from '../components/ExecutiveReviews';
import { FaqSection } from '../components/FaqSection';
import { Footer } from '../components/Footer';

export const HomePage = () => {
  return (
    <div className="w-full">
      <Hero />
      <LoungeGuides />
      <ExecutiveReviews />
      <FaqSection />
      <Footer />
    </div>
  );
};
