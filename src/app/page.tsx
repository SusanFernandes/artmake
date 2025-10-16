"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { signOut, useSession } from 'next-auth/react';
import RollingGallery from '@/components/RollingGallery';
import { Sparkles, Target, Palette, TrendingUp, Users, BarChart3, Lightbulb, Zap, ArrowRight, CheckCircle, Layers, Brain, Rocket, Moon, Sun, Menu, X } from 'lucide-react';
import FadeContent from '@/components/FadeContent'; // Adjust path as needed
import LogoCloud from '@/components/logo-cloud';
import Testimonials from '@/components/Testimonials';
// import { Search,  LayoutGrid, ArrowRight } from 'lucide-react';
import FlipCards from '@/components/FlipCards';

// Flip Card Component
function FlipCard({ number, icon, title, description, isDark, delay }: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  isDark: boolean;
  delay: string;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative group animate-in fade-in slide-in-from-bottom duration-700 perspective-1000"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute -top-2 md:-top-4 -left-2 md:-left-4 text-4xl md:text-6xl font-bold z-20 ${
        isDark ? 'text-neutral-800' : 'text-neutral-200'
      }`}>/ {number}</div>
      
      <div 
        className="relative w-full h-80 md:h-96 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`absolute w-full h-full transition-all duration-500 transform-gpu ${
          isFlipped ? 'rotate-y-180 opacity-0' : 'rotate-y-0 opacity-100'
        }`}
        style={{ 
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}>
          {/* Front Side */}
          <div className={`w-full h-full border rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center transition-all hover:scale-105 duration-300 ${
            isDark 
              ? 'bg-neutral-900 border-neutral-800 hover:border-amber-500/50' 
              : 'bg-white border-neutral-200 hover:border-amber-500/50'
          }`}>
            <div className="relative mb-6">
              <div className={`w-32 h-32 md:w-40 md:h-40 rounded-3xl flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 ${
                isDark ? 'bg-gradient-to-br from-neutral-800 to-neutral-900' : 'bg-gradient-to-br from-neutral-50 to-neutral-100'
              }`}>
                {icon}
              </div>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-center">{title}</h3>
          </div>
        </div>

        <div className={`absolute w-full h-full transition-all duration-500 transform-gpu ${
          isFlipped ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0 pointer-events-none'
        }`}
        style={{ 
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}>
          {/* Back Side */}
          <div className="w-full h-full bg-amber-400 rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:scale-105 transition-all duration-300">
            <div>
              <p className="text-neutral-950 font-medium leading-relaxed text-sm md:text-base mb-6">
                {description}
              </p>
            </div>
            <button className="flex items-center gap-2 text-neutral-950 group/btn mt-auto">
              <div className="w-8 h-8 bg-neutral-950 rounded-full flex items-center justify-center transition-all group-hover/btn:scale-110">
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover/btn:translate-x-1 transition-transform" />
              </div>
              <span className="text-sm font-semibold">Learn more</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();
  // const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Add custom styles for 3D flip
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .perspective-1000 {
        perspective: 1000px;
      }
      .rotate-y-180 {
        transform: rotateY(180deg);
      }
      .rotate-y-0 {
        transform: rotateY(0deg);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-950'}`}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'py-2' : 'py-6'}`}>
        <div className="mx-4 md:mx-8">
          <div className={`rounded-2xl md:rounded-3xl border px-4 md:px-8 py-3 md:py-4 flex items-center justify-between backdrop-blur-lg transition-all duration-300 ${
            isDark ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white/80 border-neutral-200'
          } ${scrollY > 50 ? 'shadow-lg' : ''}`}>
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center transition-transform hover:scale-110 ${
                isDark ? 'bg-white' : 'bg-neutral-950'
              }`}>
                <Sparkles className={`w-4 h-4 md:w-5 md:h-5 ${isDark ? 'text-neutral-950' : 'text-white'}`} />
              </div>
              <span className="text-lg md:text-xl font-semibold">CAMPAIGNAI</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#features" className={`text-sm transition-colors hover:scale-105 ${
                isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-950'
              }`}>Features</a>
              <a href="#how-it-works" className={`text-sm transition-colors hover:scale-105 ${
                isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-950'
              }`}>How It Works</a>
              <a href="#pricing" className={`text-sm transition-colors hover:scale-105 ${
                isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-950'
              }`}>Pricing</a>
              <a href="#contact" className={`text-sm transition-colors hover:scale-105 ${
                isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-950'
              }`}>Contact</a>
            </nav>

            <div className="flex items-center gap-2 md:gap-4">
              <select className={`hidden md:block bg-transparent text-sm border-none outline-none cursor-pointer ${
                isDark ? 'text-neutral-300' : 'text-neutral-600'
              }`}>
                <option>English</option>
                <option>Hindi</option>
              </select>
              
              {/* Theme Toggle */}
              <button 
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full transition-all hover:scale-110 ${
                  isDark ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-neutral-100 hover:bg-neutral-200'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              <button
                // onClick={() => session ? router.push('/dashboard') : router.push('/sign-in')}
                className={`hidden md:flex px-4 md:px-6 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 items-center gap-2 ${
                  isDark ? 'bg-white text-neutral-950 hover:bg-neutral-100' : 'bg-neutral-950 text-white hover:bg-neutral-800'
                }`}
              >
                <Zap className="w-4 h-4" />
                Get Started
              </button>

              {/* {session?.user && (
                <button
                  // onClick={() => signOut({ callbackUrl: '/' })}
                  className="ml-2 hidden md:inline-flex px-3 py-2 rounded-md text-sm bg-destructive text-white"
                >
                  Sign out
                </button> */}
              {/* )} */}

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg transition-all hover:scale-110"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`lg:hidden mx-4 md:mx-8 mt-2 rounded-2xl border p-6 backdrop-blur-lg animate-in slide-in-from-top ${
            isDark ? 'bg-neutral-900/95 border-neutral-800' : 'bg-white/95 border-neutral-200'
          }`}>
            <nav className="flex flex-col gap-4">
              <a href="#features" className={`text-base transition-colors ${
                isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-950'
              }`} onClick={() => setIsMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className={`text-base transition-colors ${
                isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-950'
              }`} onClick={() => setIsMenuOpen(false)}>How It Works</a>
              <a href="#pricing" className={`text-base transition-colors ${
                isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-950'
              }`} onClick={() => setIsMenuOpen(false)}>Pricing</a>
              <a href="#contact" className={`text-base transition-colors ${
                isDark ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-neutral-950'
              }`} onClick={() => setIsMenuOpen(false)}>Contact</a>
              <button className={`mt-2 px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-105 flex items-center justify-center gap-2 ${
                isDark ? 'bg-white text-neutral-950 hover:bg-neutral-100' : 'bg-neutral-950 text-white hover:bg-neutral-800'
              }`} 
              // onClick={() => session ? router.push('/dashboard') : router.push('/sign-in')}
              >
                <Zap className="w-4 h-4" />
                Get Started
              </button>
            </nav>
          </div>
        )}
      </header>


{/* Hero Section */}
<section className="pt-30 md:pt-30 pb-12 md:pb-20 px-4 md:px-8">
  <div className="max-w-7xl mx-auto">
    <FadeContent 
      blur={true} 
      duration={1000} 
      easing="ease-out" 
      delay={300}
      initialOpacity={0}
      threshold={0.1}
      className="rounded-3xl md:rounded-[3rem] border overflow-hidden relative"
    >
      <div className={`bg-gradient-to-br ${
        isDark 
          ? 'from-neutral-900 to-neutral-950 border-neutral-800' 
          : 'from-white to-neutral-50 border-neutral-200'
      }`}>
        <div className={`absolute top-0 right-0 w-1/2 h-full pointer-events-none ${
          isDark ? 'bg-gradient-to-l from-amber-500/5 to-transparent' : 'bg-gradient-to-l from-amber-400/10 to-transparent'
        }`} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 p-8 md:p-16 items-center relative z-10">
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              There is a<br />
              <span className="inline-flex items-center gap-3">
                {/* <Brain className="w-8 h-8 md:w-12 md:h-12 text-amber-500 animate-pulse" /> */}
                Better Way
              </span><br />
              to Campaign.
            </h1>
            
            <button className="flex items-center gap-2 mb-8 group">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:scale-110 ${
                isDark ? 'bg-white' : 'bg-neutral-950'
              }`}>
                <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
                  isDark ? 'text-neutral-950' : 'text-white'
                }`} />
              </div>
              <span className="text-sm font-medium">Start Creating</span>
            </button>

            <p className={`text-sm md:text-base leading-relaxed max-w-md ${
              isDark ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              CampaignAI is an autonomous agent that transforms abstract marketing briefs into complete, strategically-sound campaigns, orchestrating research, creative assets, and media planning in minutes.
            </p>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Layered Papers Visual */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full max-w-xs">
                  {/* Camera/Eye Icon on top */}
                  <div className={`absolute -top-4 md:-top-8 right-8 md:right-12 w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center border-4 z-50 shadow-2xl transition-all hover:scale-110 ${
                    isDark 
                      ? 'bg-gradient-to-br from-neutral-800 to-neutral-900 border-amber-500/20' 
                      : 'bg-gradient-to-br from-neutral-100 to-neutral-200 border-amber-500/30'
                  }`}>
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-500 to-black-600 rounded-full flex items-center justify-center animate-pulse">
                      <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                  </div>

                  {/* Stacked layers with staggered animations */}
                  {/* Smaller Target Icon */}
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                    <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>

                  {/* Stacked layers - only top layer has image */}
                  <div className="absolute inset-0 rotate-6 transform-gpu transition-transform hover:rotate-16 duration-300">
                    <div className={`w-full h-full rounded-3xl shadow-2xl ${
                      isDark ? 'bg-gradient-to-br from-neutral-200 to-neutral-300' : 'bg-gradient-to-br from-neutral-100 to-neutral-200'
                    }`} />
                  </div>
                  <div className="absolute inset-0 rotate-3 transform-gpu transition-transform hover:rotate-6 duration-300">
                    <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-500 rounded-3xl shadow-2xl" />
                  </div>
                  <div className="absolute inset-0 -rotate-2 transform-gpu transition-transform hover:-rotate-4 duration-300">
                    <div className={`w-full h-full rounded-3xl shadow-2xl ${
                      isDark ? 'bg-gradient-to-br from-neutral-800 to-neutral-900' : 'bg-gradient-to-br from-neutral-700 to-neutral-800'
                    }`} />
                  </div>
                  <div className="absolute inset-0 -rotate-6 transform-gpu transition-transform hover:-rotate-12 duration-300 z-10">
                    <div className="w-full h-full bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-2xl overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=400&h=400&fit=crop"
                        alt="Campaign Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Crazy Mode Toggle */}
        <div className={`absolute bottom-2 md:bottom-8 right-4 md:right-8 rounded-full px-3 md:px-4 py-2 flex items-center gap-2 md:gap-3 transition-all hover:scale-105 ${
          isDark ? 'bg-neutral-900 border border-neutral-800' : 'bg-white border border-neutral-200'
        }`}>
          <span className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>Crazy mode:</span>
          <div className="flex gap-1 md:gap-2">
            <button className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium transition-all hover:scale-105 ${
              isDark ? 'bg-white text-neutral-950' : 'bg-neutral-950 text-white'
            }`}>On</button>
            <button className={`px-2 md:px-3 py-1 bg-transparent rounded-full text-xs font-medium transition-all hover:scale-105 ${
              isDark ? 'text-neutral-400' : 'text-neutral-500'
            }`}>Off</button>
          </div>
        </div>
      </div>
    </FadeContent>
  </div>
</section>

      {/* Partners Section */}
      <section className={`py-12 md:py-20 px-4 md:px-8 ${isDark ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
        <div className="max-w-7xl mx-auto">
          <div className={`rounded-3xl md:rounded-[3rem] border p-8 md:p-16 animate-in fade-in slide-in-from-bottom duration-700 ${
            isDark ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-neutral-200'
          }`}>
            <div className="mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted By Industry Leaders</h2>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
              <p className={`flex-1 max-w-2xl text-justify leading-relaxed text-sm md:text-base ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Our goal from day one has been to help brands navigate the complexities of modern marketing, focusing on what matters while ignoring the noise.
              </p>

              <div className="flex-1 w-full md:w-auto">
                <RollingGallery autoplay={true} pauseOnHover={true} />
              </div>
            </div>
              <button className="flex items-center gap-2 mt-6 group">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:scale-110 ${
                  isDark ? 'bg-white' : 'bg-neutral-950'
                }`}>
                  <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
                    isDark ? 'text-neutral-950' : 'text-white'
                  }`} />
                </div>
                <span className="text-sm font-medium">See Case Studies</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {['Shopify', 'Notion', 'Stripe', 'Figma'].map((company, idx) => (
                <div key={idx} className={`border rounded-xl md:rounded-2xl p-6 md:p-8 flex items-center justify-center transition-all hover:scale-105 animate-in fade-in duration-700 ${
                  isDark 
                    ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' 
                    : 'bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                }`} style={{ animationDelay: `${idx * 100}ms` }}>
                  <span className={`text-lg md:text-2xl font-bold ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`}>{company}</span>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      </section>

      <LogoCloud></LogoCloud>
      <Testimonials></Testimonials>

      {/* How It Works Section */}
      {/* How It Works Section */}
      <section id="how-it-works" className={`py-12 md:py-20 px-4 md:px-8 ${isDark ? 'bg-neutral-950' : 'bg-neutral-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How Can<br />CampaignAI Help?</h2>
            <p className={`max-w-2xl leading-relaxed text-sm md:text-base ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              With strong foundations in AI strategy, our autonomous agent handles the complete campaign lifecycle—from strategic brief analysis to asset generation.
            </p>
            <button className="flex items-center gap-2 mt-6 group">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:scale-110 ${
                isDark ? 'bg-white' : 'bg-neutral-950'
              }`}>
                <Layers className={`w-4 h-4 ${isDark ? 'text-neutral-950' : 'text-white'}`} />
              </div>
              <span className="text-sm font-medium">Explore Features</span>
            </button>
          </div>

          <FlipCards isDark={isDark} />
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className={`py-12 md:py-20 px-4 md:px-8 ${isDark ? 'bg-neutral-900' : 'bg-neutral-100'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 md:mb-16 animate-in fade-in slide-in-from-bottom duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features<br />Built for Modern Marketers</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { icon: Brain, title: 'Multi-Strategy Generation', desc: '2-3 strategic concepts with different creative directions' },
              { icon: TrendingUp, title: 'Competitive Intelligence', desc: 'Auto-analyzes competitor campaigns and suggests differentiation' },
              { icon: Sparkles, title: 'Cultural Moment Mapping', desc: 'Identifies relevant events and trending topics for campaign anchoring' },
              { icon: Target, title: 'Brand Voice Cloning', desc: 'Learns and replicates your unique tone across all assets' },
              { icon: Layers, title: 'Cross-Channel Atomization', desc: 'Generates 40+ optimized variants for every platform' },
              { icon: BarChart3, title: 'Budget Optimizer', desc: 'Allocates spend across channels with ROI predictions' },
              { icon: Users, title: 'Influencer Match-Making', desc: 'Scores influencers on brand alignment with cost estimates' },
              { icon: Lightbulb, title: 'Campaign Evolution Timeline', desc: 'Visual playback of AI strategic reasoning process' },
              { icon: Rocket, title: 'Real-Time Trend Injection', desc: 'Monitors trends and suggests live campaign adjustments' },
            ].map((feature, idx) => (
              <div key={idx} className={`border rounded-2xl md:rounded-3xl p-6 md:p-8 transition-all hover:scale-105 group animate-in fade-in slide-in-from-bottom duration-700 ${
                isDark 
                  ? 'bg-neutral-950 border-neutral-800 hover:border-amber-500/50' 
                  : 'bg-white border-neutral-200 hover:border-amber-500/50'
              }`} style={{ animationDelay: `${idx * 50}ms` }}>
                <feature.icon className="w-10 h-10 md:w-12 md:h-12 text-amber-500 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg md:text-xl font-bold mb-2">{feature.title}</h3>
                <p className={`text-xs md:text-sm leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 md:py-32 px-4 md:px-8 ${isDark ? 'bg-neutral-950' : 'bg-neutral-50'}`}>
        <div className="max-w-4xl mx-auto text-center animate-in fade-in slide-in-from-bottom duration-700">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Ready to Transform<br />Your Campaigns?</h2>
          <p className={`text-base md:text-lg mb-12 leading-relaxed px-4 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Join hundreds of marketing teams who've cut campaign creation time by 80%
          </p>
          <button className="bg-amber-500 text-neutral-950 px-8 md:px-12 py-3 md:py-4 rounded-full text-base md:text-lg font-bold hover:bg-amber-400 transition-all hover:scale-105 inline-flex items-center gap-3 group">
            Start Free Trial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 md:py-12 px-4 md:px-8 border-t ${
        isDark ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-100 border-neutral-200'
      }`}>
        <div className="max-w-7xl mx-auto text-center text-xs md:text-sm">
          <p className={isDark ? 'text-neutral-500' : 'text-neutral-600'}>© 2025 CampaignAI. All rights reserved by Enigma Solutions.</p>
        </div>
      </footer>
    </div>
  );
}