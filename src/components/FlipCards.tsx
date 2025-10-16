'use client';

import React from 'react';
import { ArrowRight, BarChart3, Instagram, TrendingUp } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isDark: boolean;
  delay: string;
}

function FeatureCard({ icon, title, description, isDark, delay }: FeatureCardProps) {
  return (
    <div 
      className="relative group animate-in fade-in slide-in-from-bottom duration-700"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`w-full h-full min-h-[500px] md:min-h-[550px] rounded-3xl p-6 md:p-8 flex flex-col transition-all hover:scale-[1.02] duration-300 ${
        isDark 
          ? 'bg-neutral-900 border border-neutral-800 hover:border-neutral-700' 
          : 'bg-white border border-neutral-200 hover:border-neutral-300'
      }`}>
        <div className="relative mb-6">
          <div className={`w-32 h-32 md:w-40 md:h-40 rounded-3xl flex items-center justify-center shadow-xl transition-transform group-hover:scale-105 ${
            isDark ? 'bg-neutral-800' : 'bg-neutral-100'
          }`}>
            {icon}
          </div>
        </div>
        
        <h3 className={`text-xl md:text-2xl font-bold mb-4 ${
          isDark ? 'text-white' : 'text-neutral-950'
        }`}>
          {title}
        </h3>
        
        <p className={`leading-relaxed text-justify text-sm md:text-base mb-6 ${
          isDark ? 'text-neutral-300' : 'text-neutral-600'
        }`}>
          {description}
        </p>
        
        <button className="flex items-center gap-2 group/btn mt-auto">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover/btn:scale-110 ${
            isDark ? 'bg-white' : 'bg-neutral-900'
          }`}>
            <ArrowRight className={`w-4 h-4 group-hover/btn:translate-x-1 transition-transform ${
              isDark ? 'text-neutral-950' : 'text-white'
            }`} />
          </div>
          <span className={`text-sm font-semibold ${
            isDark ? 'text-white' : 'text-neutral-950'
          }`}>Learn more</span>
        </button>
      </div>
    </div>
  );
}

interface FeatureCardsProps {
  isDark: boolean;
}

export default function FeatureCards({ isDark }: FeatureCardsProps) {
  const cardsData = [
    {
      icon: <BarChart3 className="w-16 h-16 md:w-20 md:h-20 text-neutral-400 stroke-[1.5]" />,
      title: "Strategic Research & Concept",
      description: "We begin by deeply understanding your business goals and target audience. Our team conducts comprehensive market research, competitor analysis, and consumer behavior studies. Using data-driven insights, we identify unique opportunities and craft strategic concepts that resonate with your audience."
    },
    {
      icon: <Instagram className="w-16 h-16 md:w-20 md:h-20 text-neutral-400 stroke-[1.5]" />,
      title: "Autonomous Asset Generation",
      description: "Our advanced AI technology takes your approved concept and brings it to life. We automatically generate high-quality visual assets, compelling copywriting, and cohesive brand materials. The system intelligently creates multiple variations, optimizes content for different platforms, and ensures brand consistency."
    },
    {
      icon: <TrendingUp className="w-16 h-16 md:w-20 md:h-20 text-neutral-400 stroke-[1.5]" />,
      title: "Interactive Campaign Canvas",
      description: "Review your entire campaign in our intuitive canvas interface. You have complete control to regenerate individual assets, edit copy, adjust visuals, and fine-tune every detail. Our collaborative platform allows real-time feedback and approvals for immediate deployment across your marketing channels."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cardsData.map((card, index) => (
        <FeatureCard
          key={index}
          icon={card.icon}
          title={card.title}
          description={card.description}
          isDark={isDark}
          delay={`${index * 100}`}
        />
      ))}
    </div>
  );
}