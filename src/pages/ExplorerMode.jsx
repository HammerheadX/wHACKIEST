import React from 'react';
import sites from '../data/sites.json';
import HeroCarousel from '../components/HeroCarousel';
import SectionSlider from '../components/SectionSlider';
import { Bot } from 'lucide-react';

export default function ExplorerMode() {
  // Filter data into two lists
  const places = sites.filter(site => site.category === 'place');
  const activities = sites.filter(site => site.category === 'activity');

  return (
    <div className="pb-24 bg-brand-bg">

      {/* 1. HERO SECTION */}
      <div className="relative z-0">
        <HeroCarousel sites={places} />
      </div>

      {/* 2. SLIDER 1: PLACES NEARBY */}
      <SectionSlider title="Places near by" items={places} />

      {/* 3. SLIDER 2: ACTIVITIES NEARBY (New!) */}
      <SectionSlider title="Activities nearby" items={activities} isActivity={true} />

      {/* Floating Chatbot */}
      <div className="fixed bottom-6 right-6 z-40 animate-bounce-slow">
        <button className="w-14 h-14 bg-brand-dark text-brand-bg rounded-full shadow-2xl flex items-center justify-center border-2 border-brand-accent hover:scale-110 transition group">
          <Bot size={28} className="group-hover:rotate-12 transition-transform" />
        </button>
      </div>

    </div>
  );
}