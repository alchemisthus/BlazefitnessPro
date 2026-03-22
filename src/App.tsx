import React, { useEffect, useState, useRef } from 'react';
import { Flame, Target, Activity, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BodyMapCanvas from './components/BodyMapModel';

function PrimaryButton({ onClick, text = "NEXT", icon = "arrow_forward", className = "", disabled = false }: { onClick: () => void, text?: string, icon?: string, className?: string, disabled?: boolean }) {
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`w-full border border-primary-dim bg-background hover:bg-gradient-to-r hover:from-primary-dim hover:to-[#4a0000] group active:scale-95 transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      <div className="py-5 px-8 flex items-center justify-between">
        <span className="font-headline font-black italic uppercase text-2xl tracking-tighter text-on-background">{text}</span>
        <span className="material-symbols-outlined text-3xl text-primary-dim group-hover:text-on-background transition-colors">{icon}</span>
      </div>
    </button>
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void; key?: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="min-h-screen bg-[#0f0e0e] flex flex-col items-center justify-between relative overflow-hidden font-sans selection:bg-red-500/30 absolute inset-0 z-50"
    >
      {/* Deep Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff0000]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Top Spacer */}
      <div className="flex-1" />

      {/* Main Content */}
      <div className="flex flex-col items-center z-10 w-full px-6">
        {/* Logo Box */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-32 h-32 md:w-40 md:h-40 bg-[#181818] rounded-2xl flex items-center justify-center mb-8 relative shadow-2xl shadow-black/80"
        >
          {/* Subtle inner glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-20" />
          <Flame className="w-16 h-16 md:w-20 md:h-20 text-[#f88b78]" strokeWidth={0} fill="#f88b78" />
        </motion.div>

        {/* Title */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex items-center gap-2 mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-white">
            BLAZE
          </h1>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-[#ff0000]">
            FITNESS
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-[#b0b0b0] text-[10px] md:text-xs tracking-[0.4em] font-bold uppercase"
        >
          The High-Performance Pulse
        </motion.p>
      </div>

      {/* Bottom Spacer */}
      <div className="flex-1 flex flex-col justify-end items-center pb-12 w-full max-w-sm px-8 z-10">
        
        {/* Loading Indicator */}
        <div className="flex flex-col items-center w-full mb-16">
          {/* Spinner */}
          <div className="relative w-12 h-12 mb-8">
            <div className="absolute inset-0 border-[3px] border-[#222] rounded-full" />
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border-[3px] border-transparent border-t-[#ff0000] border-r-[#ff0000] rounded-full"
            />
            {/* Spinner Glow */}
            <div className="absolute inset-0 rounded-full shadow-[0_0_20px_rgba(255,0,0,0.3)]" />
          </div>

          {/* Loading Text */}
          <p className="text-[#ff0000] text-[10px] tracking-[0.2em] font-bold mb-4 uppercase">
            Initialising Engine
          </p>

          {/* Progress Bar */}
          <div className="w-full h-[2px] bg-[#222] rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-[#ff0000] shadow-[0_0_10px_rgba(255,0,0,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Footer */}
        <p className="text-[#444] text-[8px] tracking-[0.2em] uppercase text-center font-semibold">
          Precision Engineered Performance © 2024
        </p>
      </div>
    </motion.div>
  );
}

function GenderSelectionScreen({ onNext, onBack }: { onNext: () => void, onBack: () => void; key?: string }) {
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>('male');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-background text-on-background font-body min-h-screen flex flex-col relative overflow-hidden z-40"
    >
      <header className="flex items-center justify-between p-6 z-10 relative">
        <button onClick={onBack} aria-label="Go back" className="flex items-center justify-center w-12 h-12 text-on-background hover:text-primary-dim transition-colors cursor-pointer">
          <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 0" }}>arrow_back</span>
        </button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center px-6 z-10 relative pb-24">
        <h1 className="font-headline font-black italic text-4xl md:text-5xl lg:text-6xl text-center uppercase tracking-tight mb-16 max-w-2xl leading-tight">
          SELECT YOUR GENDER
        </h1>
        <div className="flex flex-col sm:flex-row gap-8 md:gap-12 w-full max-w-lg justify-center items-center">
          <button 
            onClick={() => setSelectedGender('male')}
            aria-pressed={selectedGender === 'male'} 
            className="group flex flex-col items-center gap-6 focus:outline-none w-full sm:w-auto"
          >
            <div className={`w-40 h-40 sm:w-48 sm:h-48 rounded bg-surface-container-highest flex items-center justify-center transition-all duration-300 relative overflow-hidden ${selectedGender === 'male' ? 'halo-selected pulse-glow' : 'border border-outline-variant/10 group-hover:bg-surface-container-highest'}`}>
              <svg className={`w-24 h-24 transition-transform group-hover:scale-110 relative z-10 fill-current ${selectedGender === 'male' ? 'text-primary-dim' : 'text-on-surface-variant group-hover:text-on-surface'}`} viewBox="0 0 100 100">
                <path d="M50 20 L80 20 L80 50 L70 40 L55 55 A25 25 0 1 1 45 45 L60 30 L50 20 Z M42 58 A15 15 0 1 0 58 42 A15 15 0 0 0 42 58 Z"></path>
                <path d="M75 15 L85 15 L85 25" fill="none" stroke="currentColor" strokeWidth="2"></path>
                <path d="M20 80 L15 75 L15 65" fill="none" stroke="currentColor" strokeWidth="2"></path>
              </svg>
              {selectedGender === 'male' && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-dim/20 to-transparent opacity-100"></div>
              )}
            </div>
            <span className={`font-headline font-bold text-xl tracking-widest uppercase transition-colors ${selectedGender === 'male' ? 'text-on-background' : 'text-on-surface-variant group-hover:text-on-surface'}`}>Male</span>
          </button>
          <button 
            onClick={() => setSelectedGender('female')}
            aria-pressed={selectedGender === 'female'} 
            className="group flex flex-col items-center gap-6 focus:outline-none w-full sm:w-auto"
          >
            <div className={`w-40 h-40 sm:w-48 sm:h-48 rounded bg-surface-container-highest flex items-center justify-center transition-all duration-300 relative overflow-hidden ${selectedGender === 'female' ? 'halo-selected pulse-glow' : 'border border-outline-variant/10 group-hover:bg-surface-container-highest'}`}>
              <svg className={`w-24 h-24 transition-transform group-hover:scale-110 relative z-10 fill-none stroke-current stroke-[2.5] ${selectedGender === 'female' ? 'text-primary-dim' : 'text-on-surface-variant group-hover:text-on-surface'}`} viewBox="0 0 100 100">
                <circle cx="50" cy="40" r="22"></circle>
                <circle cx="50" cy="40" r="14" strokeDasharray="4 4"></circle>
                <path d="M50 62 L50 85 M40 75 L60 75"></path>
                <path d="M50 40 m-30 0 a30 30 0 1 0 60 0 a30 30 0 1 0 -60 0" opacity="0.4" strokeWidth="1"></path>
                <circle cx="50" cy="40" fill="currentColor" r="4" stroke="none"></circle>
              </svg>
              {selectedGender === 'female' && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-dim/20 to-transparent opacity-100"></div>
              )}
            </div>
            <span className={`font-headline font-bold text-xl tracking-widest uppercase transition-colors ${selectedGender === 'female' ? 'text-on-background' : 'text-on-surface-variant group-hover:text-on-surface'}`}>Female</span>
          </button>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 w-full p-6 bg-surface-container/70 backdrop-blur-[20px] z-20 flex justify-center">
        <PrimaryButton onClick={onNext} text="NEXT" />
      </div>
    </motion.div>
  );
}

function AgeSelectionScreen({ onNext, onBack }: { onNext: () => void, onBack: () => void; key?: string }) {
  const [selectedAge, setSelectedAge] = useState(25);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const ages = Array.from({ length: 85 }, (_, i) => i + 16); // 16 to 100

  useEffect(() => {
    if (scrollRef.current) {
      const index = ages.indexOf(25);
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = index * 80;
        }
      }, 0);
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const index = Math.round(scrollTop / 80);
    if (ages[index] && ages[index] !== selectedAge) {
      setSelectedAge(ages[index]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-background text-on-background font-body selection:bg-primary-dim selection:text-white min-h-screen flex flex-col relative z-40"
    >
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 no-border tonal-shift bg-[#0e0e0e]">
        <button onClick={onBack} className="text-white/60 hover:text-white transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <h1 className="font-headline font-black uppercase tracking-tighter text-2xl text-[#E60000] italic">BLAZE PRO</h1>
        <div className="w-10"></div> {/* Spacer */}
      </header>

      <main className="flex-grow flex flex-col items-center justify-center pt-20 pb-24 px-8 relative overflow-hidden">
        {/* Background Ambient Pulse */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-dim opacity-[0.03] blur-[120px] rounded-full"></div>
        </div>

        {/* Section Header */}
        <div className="w-full max-w-md mb-12 z-10">
          <p className="font-label text-primary-dim uppercase tracking-[0.2em] text-[10px] mb-2 font-bold">Step 02 of 05</p>
          <h2 className="font-headline font-black italic uppercase text-5xl md:text-6xl tracking-tighter leading-none mb-4">
            SELECT YOUR <br/>
            <span className="text-primary-dim">AGE.</span>
          </h2>
          <p className="font-body text-on-surface-variant text-sm max-w-[280px]">Personalize your performance metrics based on your age profile.</p>
        </div>

        {/* Central Age Picker Wheel */}
        <div className="relative w-full max-w-[200px] h-[320px] flex items-center justify-center overflow-hidden z-10">
          {/* Selection Indicator */}
          <div className="absolute inset-x-0 h-[80px] top-1/2 -translate-y-1/2 pointer-events-none z-20">
            <div className="absolute top-0 w-full h-[2px] bg-primary-dim shadow-[0_0_10px_rgba(255,0,0,0.8)]"></div>
            <div className="absolute bottom-0 w-full h-[2px] bg-primary-dim shadow-[0_0_10px_rgba(255,0,0,0.8)]"></div>
            <div className="w-full h-full bg-primary-dim/10 blur-xl"></div>
          </div>

          {/* Number List */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="w-full h-full overflow-y-auto snap-y snap-mandatory flex flex-col items-center py-[120px] scrollbar-hide"
          >
            {ages.map((age) => {
              const isSelected = age === selectedAge;
              const distance = Math.abs(ages.indexOf(age) - ages.indexOf(selectedAge));
              
              let textClass = "text-on-surface/20 text-4xl";
              if (isSelected) {
                textClass = "text-white text-7xl tracking-tighter text-glow";
              } else if (distance === 1) {
                textClass = "text-on-surface/40 text-5xl";
              } else if (distance === 2) {
                textClass = "text-on-surface/30 text-4xl";
              }

              return (
                <div key={age} className="snap-center h-[80px] flex items-center justify-center shrink-0 transition-all duration-200">
                  <span className={`font-headline font-black italic transition-all duration-200 ${textClass}`}>
                    {age}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Visual Fade Overlays */}
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-background to-transparent pointer-events-none z-10"></div>
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"></div>
        </div>

        {/* Decorative Element */}
        <div className="absolute -right-12 bottom-1/4 opacity-10 pointer-events-none rotate-12">
          <svg fill="none" height="200" viewBox="0 0 200 200" width="200" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 200C50 150 100 180 200 0" stroke="#ff0000" strokeWidth="4"></path>
            <path d="M0 180C50 130 100 160 200 -20" stroke="#ff0000" strokeWidth="1"></path>
          </svg>
        </div>
      </main>

      {/* Footer Action */}
      <footer className="fixed bottom-0 w-full px-8 pb-10 pt-6 z-50 bg-gradient-to-t from-background via-background/90 to-transparent">
        <div className="max-w-md mx-auto">
          <PrimaryButton onClick={onNext} text="NEXT" />
          <div className="mt-6 flex justify-center gap-1.5">
            <div className="h-1 w-8 bg-surface-bright rounded-full"></div>
            <div className="h-1 w-12 bg-primary-dim rounded-full shadow-[0_0_8px_rgba(255,0,0,0.5)]"></div>
            <div className="h-1 w-8 bg-surface-bright rounded-full"></div>
            <div className="h-1 w-8 bg-surface-bright rounded-full"></div>
            <div className="h-1 w-8 bg-surface-bright rounded-full"></div>
          </div>
        </div>
      </footer>

      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] z-0"></div>
    </motion.div>
  );
}

function WelcomeScreen({ onNext }: { onNext: () => void; key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-background text-on-background font-body selection:bg-primary-dim selection:text-white overflow-x-hidden min-h-screen"
    >
      <main className="relative min-h-screen w-full flex flex-col items-start justify-center">
        {/* Hero Background Section */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-surface-container-lowest">
          {/* Heat Map Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] burn-glow pointer-events-none"></div>
          {/* 3D Athlete Placeholder Image */}
          <img 
            alt="Front view of professional athlete posing in cinematic lighting" 
            className="w-full h-full object-cover object-center opacity-60 mix-blend-luminosity grayscale blur-[2px] hover:grayscale-0 hover:blur-none transition-all duration-700" 
            src="/welcom.png"
          />
          {/* Texture Overlay */}
          <div className="absolute inset-0 noise-overlay pointer-events-none"></div>
          {/* Bottom Fade to Black */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        
        {/* Welcome Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-start gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-2"
          >
            <span className="font-label text-primary-dim font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">HIGH PERFORMANCE PULSE</span>
            <h1 className="font-headline text-5xl md:text-8xl lg:text-[10rem] font-black uppercase leading-[0.85] tracking-tighter text-on-background">
              WELCOME TO<br/>
              <span className="text-primary-dim">BLAZE FITNESS</span>
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-md font-body text-on-surface-variant text-lg leading-relaxed"
          >
            Precision-engineered training protocols for the digital athlete. Ignite your potential with high-end telemetry and aggressive performance tracking.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto"
          >
            {/* Primary Action */}
            <PrimaryButton onClick={onNext} text="GET STARTED" />
          </motion.div>
          
          {/* Stats Bento Bit */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 w-full md:w-auto"
          >
            <div className="bg-surface-container-low p-6 rounded-sm border-l-2 border-primary-dim">
              <div className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Active Users</div>
              <div className="font-headline text-3xl font-bold text-on-surface">42.8K</div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-sm border-l-2 border-primary-dim">
              <div className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest">Global Rank</div>
              <div className="font-headline text-3xl font-bold text-on-surface">#04</div>
            </div>
          </motion.div>
        </div>
      </main>
      
    </motion.div>
  );
}

const onboardingData = [
  {
    title: "Find Your Perfect Fit",
    description: "Precision-engineered workouts tailored to your unique physiology and goals.",
    icon: Target
  },
  {
    title: "Track Every Metric",
    description: "High-end telemetry and aggressive performance tracking to ensure continuous progression.",
    icon: Activity
  },
  {
    title: "Join The Elite",
    description: "Compete on global leaderboards and train alongside a community of high-performance athletes.",
    icon: Trophy
  }
];

function OnboardingScreen({ onComplete }: { onComplete: () => void; key?: string }) {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < onboardingData.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const CurrentIcon = onboardingData[step].icon;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-background flex flex-col relative overflow-hidden z-40"
    >
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-dim/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="w-32 h-32 rounded-full bg-surface-container-low border border-outline-variant/30 flex items-center justify-center mb-12 shadow-[0_0_30px_rgba(255,0,0,0.15)]">
              <CurrentIcon className="w-16 h-16 text-primary-dim" strokeWidth={1.5} />
            </div>
            <h2 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter text-white mb-6">
              {onboardingData[step].title}
            </h2>
            <p className="font-body text-on-surface-variant text-lg max-w-sm leading-relaxed">
              {onboardingData[step].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="w-full px-6 md:px-12 pb-12 z-10">
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
          {/* Dots */}
          <div className="flex gap-3">
            {onboardingData.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === step 
                    ? 'w-8 bg-primary-dim shadow-[0_0_12px_rgba(255,0,0,0.8)]' 
                    : 'w-2 bg-surface-container-highest'
                }`} 
              />
            ))}
          </div>

          {/* Next Button */}
          <PrimaryButton 
            onClick={handleNext} 
            text={step === onboardingData.length - 1 ? 'ENTER' : 'NEXT'} 
            icon={step === onboardingData.length - 1 ? 'login' : 'arrow_forward'} 
          />
        </div>
      </div>
    </motion.div>
  );
}

function WeightSelectionScreen({ onNext, onBack }: { onNext: () => void, onBack: () => void; key?: string }) {
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [weight, setWeight] = useState(84.5);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = React.useRef(false);

  const minWeight = unit === 'kg' ? 40 : 88;
  const maxWeight = unit === 'kg' ? 200 : 440;
  const pixelsPerUnit = 100; // 100px per 1 kg/lb

  useEffect(() => {
    if (scrollRef.current) {
      isProgrammaticScroll.current = true;
      const targetScroll = (weight - minWeight) * pixelsPerUnit;
      scrollRef.current.scrollLeft = targetScroll;
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 50);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isProgrammaticScroll.current) return;
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const exactWeight = minWeight + (scrollLeft / pixelsPerUnit);
    setWeight(Math.round(exactWeight * 10) / 10);
  };

  const handleUnitToggle = (newUnit: 'kg' | 'lbs') => {
    if (unit === newUnit) return;
    let newWeight = weight;
    if (newUnit === 'lbs') {
      newWeight = Math.round(weight * 2.20462 * 10) / 10;
    } else {
      newWeight = Math.round(weight / 2.20462 * 10) / 10;
    }
    setWeight(newWeight);
    setUnit(newUnit);
  };

  const weightString = weight.toFixed(1);
  const [whole, decimal] = weightString.split('.');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-background text-on-background font-body min-h-screen flex flex-col relative z-40"
    >
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-[#0e0e0e]">
        <button onClick={onBack} className="text-white/60 hover:text-white transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <h1 className="font-headline font-black uppercase tracking-tighter text-2xl text-[#E60000] italic">BLAZE PRO</h1>
        <div className="w-10"></div>
      </header>

      <main className="flex-grow flex flex-col pt-24 pb-32 px-6 relative overflow-hidden">
        {/* Headline */}
        <div className="w-full max-w-md mb-8 z-10 mx-auto">
          <h2 className="font-headline font-black italic uppercase text-5xl md:text-6xl tracking-tighter leading-none mb-4">
            SELECT YOUR <br/>
            <span className="text-primary-dim text-glow">WEIGHT.</span>
          </h2>
          <p className="font-body text-on-surface-variant text-sm max-w-[280px]">Precision input for peak performance tracking.</p>
        </div>

        {/* Unit Toggle */}
        <div className="flex mb-12 z-10 mx-auto w-full max-w-md">
          <div className="flex bg-surface-container-highest rounded p-1">
            <button 
              onClick={() => handleUnitToggle('kg')}
              className={`px-8 py-2 font-headline font-bold uppercase tracking-widest text-sm rounded transition-colors ${unit === 'kg' ? 'bg-primary-dim text-white shadow-[0_0_15px_rgba(255,0,0,0.5)]' : 'text-on-surface-variant hover:text-white'}`}
            >
              KG
            </button>
            <button 
              onClick={() => handleUnitToggle('lbs')}
              className={`px-8 py-2 font-headline font-bold uppercase tracking-widest text-sm rounded transition-colors ${unit === 'lbs' ? 'bg-primary-dim text-white shadow-[0_0_15px_rgba(255,0,0,0.5)]' : 'text-on-surface-variant hover:text-white'}`}
            >
              LBS
            </button>
          </div>
        </div>

        {/* Big Number Display */}
        <div className="flex flex-col items-center justify-center mb-12 z-10">
          <div className="flex items-baseline">
            <span className="font-headline font-black text-8xl md:text-9xl tracking-tighter text-white">{whole}</span>
            <span className="font-headline font-black text-4xl md:text-5xl tracking-tighter text-primary-dim">.{decimal}</span>
          </div>
          <span className="font-label font-bold uppercase tracking-[0.2em] text-on-surface-variant mt-2">
            {unit === 'kg' ? 'Kilograms' : 'Pounds'}
          </span>
        </div>

        {/* Ruler Area */}
        <div className="relative w-screen -ml-6 h-32 mt-auto mb-12">
          {/* Central Red Cursor */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-primary-dim -translate-x-1/2 z-20 shadow-[0_0_10px_rgba(255,0,0,0.8)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary-dim rotate-45 -mt-2"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary-dim rotate-45 -mb-2"></div>
          </div>

          {/* Scrollable Ruler */}
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="w-full h-full overflow-x-auto overflow-y-hidden scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{ scrollBehavior: 'auto' }}
          >
            <div 
              className="h-full flex items-end pb-4"
              style={{ 
                width: `${(maxWeight - minWeight) * pixelsPerUnit}px`,
                paddingLeft: '50vw',
                paddingRight: '50vw',
                boxSizing: 'content-box'
              }}
            >
              {/* Ticks */}
              <div className="relative w-full h-full flex items-end">
                {Array.from({ length: maxWeight - minWeight + 1 }).map((_, i) => {
                  const val = minWeight + i;
                  const isMajor = val % 10 === 0;
                  const isMedium = val % 5 === 0 && !isMajor;
                  
                  return (
                    <div 
                      key={val} 
                      className="absolute bottom-0 flex flex-col items-center justify-end"
                      style={{ left: `${i * pixelsPerUnit}px`, transform: 'translateX(-50%)' }}
                    >
                      {/* Number for major ticks */}
                      {(isMajor || isMedium) && (
                        <span className="font-headline font-black text-2xl text-surface-container-highest mb-2">
                          {val}
                        </span>
                      )}
                      {/* Tick line */}
                      <div 
                        className={`w-1 bg-surface-container-highest ${isMajor ? 'h-12' : isMedium ? 'h-8' : 'h-6'}`}
                      ></div>
                      
                      {/* Minor ticks (0.1 to 0.9) */}
                      {i < maxWeight - minWeight && (
                        <div className="absolute bottom-0 left-0 w-[100px] h-4">
                          {[1,2,3,4,5,6,7,8,9].map(minor => (
                            <div 
                              key={minor} 
                              className={`absolute bottom-0 w-[2px] bg-surface-container-highest/50 ${minor === 5 ? 'h-4' : 'h-2'}`}
                              style={{ left: `${minor * 10}px`, transform: 'translateX(-50%)' }}
                            ></div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Athlete Range Info */}
        <div className="flex gap-4 w-full max-w-md mx-auto z-10">
          <div className="flex-1 bg-surface-container-low p-4 rounded border-l-2 border-primary-dim">
            <p className="font-label text-[10px] text-primary-dim uppercase tracking-widest font-bold mb-1">Recommended</p>
            <h3 className="font-headline font-black italic uppercase text-xl text-white leading-tight">Athlete<br/>Range</h3>
            <p className="font-body text-xs text-on-surface-variant mt-2">Based on your height:</p>
          </div>
          <div className="bg-surface-container-highest p-4 rounded flex items-center justify-center min-w-[100px]">
            <span className="font-headline font-black text-2xl text-white">
              {unit === 'kg' ? '78-86' : '170-190'}
            </span>
          </div>
        </div>
      </main>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/90 to-transparent z-20 flex justify-center">
        <PrimaryButton onClick={onNext} text="NEXT" />
      </div>
    </motion.div>
  );
}

function HeightSelectionScreen({ onNext, onBack }: { onNext: () => void, onBack: () => void; key?: string }) {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');
  const [height, setHeight] = useState(184);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = React.useRef(false);

  const minHeight = unit === 'cm' ? 100 : 40;
  const maxHeight = unit === 'cm' ? 250 : 100;
  const pixelsPerUnit = unit === 'cm' ? 10 : 25; // 10px per 1 cm, 25px per 1 inch

  useEffect(() => {
    if (scrollRef.current) {
      isProgrammaticScroll.current = true;
      const targetScroll = (maxHeight - height) * pixelsPerUnit;
      scrollRef.current.scrollTop = targetScroll;
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 50);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isProgrammaticScroll.current) return;
    if (!scrollRef.current) return;
    const scrollTop = scrollRef.current.scrollTop;
    const exactHeight = maxHeight - (scrollTop / pixelsPerUnit);
    setHeight(Math.round(exactHeight));
  };

  const handleUnitToggle = (newUnit: 'cm' | 'in') => {
    if (unit === newUnit) return;
    let newHeight = height;
    if (newUnit === 'in') {
      newHeight = Math.round(height / 2.54);
    } else {
      newHeight = Math.round(height * 2.54);
    }
    setHeight(newHeight);
    setUnit(newUnit);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="bg-background text-on-background font-body selection:bg-primary-dim selection:text-white min-h-screen flex flex-col relative z-40 overflow-hidden"
    >
      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#0e0e0e] flex items-center justify-between px-6 py-4">
        <button onClick={onBack} className="text-white/60 hover:text-white transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <h1 className="text-2xl font-black text-[#E60000] tracking-tighter italic font-headline uppercase">
          BLAZE PRO
        </h1>
        <div className="w-6"></div>
      </header>

      <main className="flex-1 flex flex-col pt-24 pb-12 px-8 max-w-xl mx-auto w-full relative">
        {/* Header Section */}
        <div className="mb-12 z-10">
          <h2 className="font-headline font-black italic uppercase text-5xl md:text-6xl tracking-tighter leading-none mb-4">
            SELECT YOUR <span className="text-primary-dim">HEIGHT</span>
          </h2>
          <p className="font-label text-on-surface-variant text-sm tracking-widest uppercase">Precision Profile Calibration</p>
        </div>

        {/* Content Area: The Ruler */}
        <div className="flex-1 flex items-center justify-between gap-12 relative z-10">
          {/* Metrics Display */}
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-headline font-black text-8xl text-glow-red italic leading-none">{height}</span>
              <span className="font-label font-bold text-2xl text-primary-dim uppercase">{unit}</span>
            </div>
            
            {/* Unit Toggle */}
            <div className="inline-flex bg-surface-container-high p-1 rounded-sm mt-8 w-fit">
              <button 
                onClick={() => handleUnitToggle('cm')}
                className={`px-6 py-2 font-label text-xs font-black uppercase transition-all duration-200 ${unit === 'cm' ? 'bg-primary-dim text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                cm
              </button>
              <button 
                onClick={() => handleUnitToggle('in')}
                className={`px-6 py-2 font-label text-xs font-black uppercase transition-all duration-200 ${unit === 'in' ? 'bg-primary-dim text-on-primary' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                in
              </button>
            </div>
          </div>

          {/* Vertical Ruler Visual Component */}
          <div className="relative w-32 h-[400px] ruler-mask flex flex-col items-end overflow-hidden">
            {/* Glowing Focus Indicator */}
            <div className="absolute top-1/2 -translate-y-1/2 right-0 w-full h-1 bg-primary-dim z-20 shadow-[0_0_15px_rgba(255,0,0,0.8)] pointer-events-none"></div>
            
            <div 
              ref={scrollRef}
              onScroll={handleScroll}
              className="w-full h-full overflow-y-auto overflow-x-hidden scrollbar-hide cursor-grab active:cursor-grabbing relative z-10"
              style={{ scrollBehavior: 'auto' }}
            >
              <div 
                className="w-full flex flex-col items-end"
                style={{ 
                  height: `${(maxHeight - minHeight) * pixelsPerUnit}px`,
                  paddingTop: '200px', // half of container height
                  paddingBottom: '200px',
                  boxSizing: 'content-box'
                }}
              >
                <div className="relative w-full h-full">
                  {Array.from({ length: maxHeight - minHeight + 1 }).map((_, i) => {
                    const val = maxHeight - i;
                    const isMajor = unit === 'cm' ? val % 10 === 0 : val % 12 === 0; // 12 inches in a foot
                    const isMedium = unit === 'cm' ? val % 5 === 0 && !isMajor : val % 6 === 0 && !isMajor;
                    const isSelected = val === height;
                    
                    return (
                      <div 
                        key={val} 
                        className={`absolute right-0 flex items-center gap-4 ${isSelected ? 'z-10' : 'z-0'}`}
                        style={{ top: `${i * pixelsPerUnit}px`, transform: 'translateY(-50%)' }}
                      >
                        {(isMajor || isMedium || isSelected) && (
                          <span className={`font-label font-black transition-all duration-200 ${isSelected ? 'text-primary-dim text-2xl scale-110' : 'text-on-surface-variant/40 text-lg'}`}>
                            {unit === 'in' && isMajor ? `${Math.floor(val/12)}'` : val}
                          </span>
                        )}
                        <div 
                          className={`transition-all duration-200 ${isSelected ? 'bg-primary-dim h-1.5 w-20' : isMajor ? 'bg-surface-container-highest h-1 w-12' : isMedium ? 'bg-surface-container-highest h-0.5 w-8' : 'bg-surface-container-highest h-0.5 w-6'}`}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Kinetic Athlete Background Image Element */}
        <div className="absolute -z-10 bottom-0 -right-20 opacity-10 w-full h-full pointer-events-none">
          <img 
            className="w-full h-full object-cover grayscale brightness-200" 
            alt="Monochrome muscular athlete silhouette in dynamic pose" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr4am_vSB5NQakRaB1lCGVkRYQSRCQC8ta8-eT3TjRaoGrt0-ema3qDR1SIMzMECrs0KomJJXywny09Xnw7Jk-QHIvknMB9Yyv_ZAKynoLXHowdW8AbOlWlMF0Ep9AVClXgRxQhcY6U7TI6c4vbsXpygSZcgtJBsXGalXmOEDHhyyP8ZImj6flDTXEhniLufP9ykLOx8buAE9gMuqNxqUy0ZkuYekn03_TQLW-uwwRJc0otopoWVJJVHesSZQgHPrGXZZoN4BvTQvY"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Footer Action */}
        <div className="mt-12 z-10">
          <PrimaryButton onClick={onNext} text="NEXT" />
          
          {/* Progress Indicator */}
          <div className="mt-8 flex justify-center gap-2">
            <div className="w-8 h-1 bg-surface-container-highest"></div>
            <div className="w-8 h-1 bg-surface-container-highest"></div>
            <div className="w-12 h-1 bg-primary-dim"></div>
            <div className="w-8 h-1 bg-surface-container-highest"></div>
          </div>
        </div>
      </main>

      {/* Background Decor Elements */}
      <div className="fixed top-1/4 -left-32 w-64 h-64 bg-primary-dim opacity-[0.03] blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-0 -right-32 w-96 h-96 bg-secondary opacity-[0.05] blur-[150px] rounded-full pointer-events-none"></div>
    </motion.div>
  );
}

function GoalSelectionScreen({ onNext, onBack }: { onNext: () => void, onBack: () => void; key?: string }) {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const goals = [
    { id: 'muscle', title: 'GAIN MUSCLE', subtitle: 'HYPERTROPHY & POWER' },
    { id: 'weight', title: 'LOSE WEIGHT', subtitle: 'METABOLIC CONDITIONING' },
    { id: 'endurance', title: 'IMPROVE ENDURANCE', subtitle: 'CARDIOVASCULAR PEAK' },
    { id: 'strength', title: 'INCREASE STRENGTH', subtitle: 'COMPOUND PERFORMANCE' },
  ];

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev => 
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen bg-background text-on-background flex flex-col font-body relative pb-32"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between p-6 max-w-2xl mx-auto w-full">
        <button onClick={onBack} className="text-primary-dim hover:text-white transition-colors">
          <span className="material-symbols-outlined text-3xl font-bold">arrow_back</span>
        </button>
        <div className="text-primary-dim font-headline font-black italic text-2xl tracking-tighter uppercase">KINETIC</div>
        <div className="w-8"></div> {/* Spacer */}
      </div>

      <main className="flex-1 px-6 md:px-12 max-w-2xl mx-auto w-full flex flex-col mt-4">
        {/* Step Indicator */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-6 bg-primary-dim"></div>
          <div className="text-primary-dim font-label font-bold tracking-[0.2em] text-sm uppercase">STEP 02 / 05</div>
        </div>

        {/* Title */}
        <div className="mb-12">
          <h1 
            className="text-6xl md:text-7xl font-headline font-black italic uppercase leading-[0.85] tracking-tighter" 
          >
            <div className="text-white" style={{ textShadow: '4px 4px 0px var(--color-on-primary-container)' }}>SELECT</div>
            <div className="text-white" style={{ textShadow: '4px 4px 0px var(--color-on-primary-container)' }}>YOUR</div>
            <div className="text-primary-dim" style={{ textShadow: '4px 4px 0px var(--color-on-primary-container)' }}>GOAL.</div>
          </h1>
        </div>

        {/* Goals List */}
        <div className="flex flex-col gap-4">
          {goals.map((goal) => {
            const isSelected = selectedGoals.includes(goal.id);
            return (
              <div 
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`relative flex items-center justify-between p-6 cursor-pointer transition-all duration-300 ${
                  isSelected ? 'bg-surface-container-highest' : 'bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                {/* Left Red Border for selected */}
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary-dim shadow-[0_0_10px_var(--color-primary-dim)]"></div>
                )}
                
                <div className="flex flex-col pl-4">
                  <span className="font-headline font-black italic text-2xl uppercase tracking-tight text-white mb-1">{goal.title}</span>
                  <span className="font-label font-bold text-[10px] tracking-widest uppercase text-primary-dim">{goal.subtitle}</span>
                </div>

                {/* Checkbox */}
                <div className={`w-8 h-8 flex items-center justify-center transition-all duration-300 ${
                  isSelected 
                    ? 'bg-primary-dim shadow-[0_0_15px_var(--color-primary-dim)]' 
                    : 'border-2 border-surface-container-highest'
                }`}>
                  {isSelected && <span className="material-symbols-outlined text-white text-xl font-bold">check</span>}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-background border-t border-surface-container-low p-6 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {/* Dots */}
          <div className="flex gap-2">
            <div className="w-6 h-1 bg-surface-container-highest"></div>
            <div className="w-8 h-1 bg-primary-dim shadow-[0_0_8px_var(--color-primary-dim)]"></div>
            <div className="w-6 h-1 bg-surface-container-highest"></div>
            <div className="w-6 h-1 bg-surface-container-highest"></div>
            <div className="w-6 h-1 bg-surface-container-highest"></div>
          </div>

          <div className="flex items-center gap-8">
            <button onClick={onBack} className="text-on-surface-variant font-label font-bold text-sm tracking-widest hover:text-white transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
              BACK
            </button>
            <PrimaryButton 
              onClick={onNext} 
              disabled={selectedGoals.length === 0} 
              text="CONTINUE" 
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SocialEntryScreen({ onSignUp, onSignIn, onBack }: { onSignUp: () => void, onSignIn: () => void, onBack: () => void; key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen bg-background text-on-background flex flex-col font-body relative pb-32"
    >
      {/* Background Face/Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-20">
        <div className="w-[600px] h-[600px] bg-primary-dim rounded-full blur-[120px]"></div>
      </div>

      {/* Top Bar */}
      <div className="flex items-center justify-between p-6 max-w-2xl mx-auto w-full relative z-10">
        <button onClick={onBack} className="text-primary-dim hover:text-white transition-colors">
          <span className="material-symbols-outlined text-3xl font-bold">arrow_back</span>
        </button>
        <div className="text-primary-dim font-headline font-black italic text-2xl tracking-tighter uppercase">KINETIC</div>
        <div className="w-8"></div> {/* Spacer */}
      </div>

      <main className="flex-1 px-6 md:px-12 max-w-2xl mx-auto w-full flex flex-col mt-4 relative z-10">
        {/* SECURE GATEWAY */}
        <div className="text-primary-dim font-label font-bold tracking-[0.2em] text-xs uppercase mb-4">
          SECURE GATEWAY
        </div>

        {/* Title */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl font-headline font-black italic uppercase leading-[0.85] tracking-tighter">
            <div className="text-white" style={{ textShadow: '4px 4px 0px var(--color-on-primary-container)' }}>LET'S</div>
            <div className="text-primary-dim" style={{ textShadow: '4px 4px 0px var(--color-on-primary-container)' }}>YOU IN.</div>
          </h1>
          <div className="w-24 h-1 bg-primary-dim mt-6 shadow-[0_0_10px_var(--color-primary-dim)]"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex flex-col gap-4 mb-8">
          <button className="flex items-center justify-between p-5 bg-[#1a1a1a] hover:bg-[#222] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="font-bold text-lg text-blue-500">f</span>
              </div>
              <span className="font-label font-bold text-xs tracking-widest uppercase text-white">CONTINUE WITH FACEBOOK</span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-sm">chevron_right</span>
          </button>
          <button className="flex items-center justify-between p-5 bg-[#1a1a1a] hover:bg-[#222] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="font-bold text-lg text-white">G</span>
              </div>
              <span className="font-label font-bold text-xs tracking-widest uppercase text-white">CONTINUE WITH GOOGLE</span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-sm">chevron_right</span>
          </button>
          <button className="flex items-center justify-between p-5 bg-[#1a1a1a] hover:bg-[#222] transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 flex items-center justify-center">
                <span className="font-bold text-lg text-white"></span>
              </div>
              <span className="font-label font-bold text-xs tracking-widest uppercase text-white">CONTINUE WITH APPLE</span>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-sm">chevron_right</span>
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-surface-container-highest"></div>
          <span className="font-label font-bold text-[10px] tracking-widest uppercase text-on-surface-variant">OR SECURE ENTRY</span>
          <div className="flex-1 h-px bg-surface-container-highest"></div>
        </div>

        {/* Sign in with password */}
        <PrimaryButton onClick={onSignIn} text="SIGN IN WITH PASSWORD" icon="bolt" />

        {/* Sign up link */}
        <div className="text-center">
          <span className="font-label font-bold text-xs tracking-widest uppercase text-on-surface-variant">DON'T HAVE AN ACCOUNT? </span>
          <button onClick={onSignUp} className="font-label font-bold text-xs tracking-widest uppercase text-primary-dim hover:text-white transition-colors">SIGN UP</button>
        </div>
      </main>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-background border-t border-surface-container-low p-6 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          {/* Dots */}
          <div className="flex gap-2">
            <div className="w-6 h-1 bg-surface-container-highest"></div>
            <div className="w-6 h-1 bg-surface-container-highest"></div>
            <div className="w-8 h-1 bg-primary-dim shadow-[0_0_8px_var(--color-primary-dim)]"></div>
            <div className="w-6 h-1 bg-surface-container-highest"></div>
            <div className="w-6 h-1 bg-surface-container-highest"></div>
          </div>

          <div className="flex items-center gap-8">
            <button onClick={onBack} className="text-on-surface-variant font-label font-bold text-sm tracking-widest hover:text-white transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
              BACK
            </button>
            <PrimaryButton onClick={onSignIn} text="CONTINUE" icon="bolt" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SignUpScreen({ onNext, onBack, onSignIn }: { onNext: () => void, onBack: () => void, onSignIn: () => void; key?: string }) {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen bg-background text-on-background flex flex-col font-body relative pb-32"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between p-6 max-w-2xl mx-auto w-full relative z-10">
        <button onClick={onBack} className="text-primary-dim hover:text-white transition-colors">
          <span className="material-symbols-outlined text-3xl font-bold">arrow_back</span>
        </button>
        <div className="text-primary-dim font-headline font-black italic text-2xl tracking-tighter uppercase">KINETIC</div>
        <div className="w-8"></div> {/* Spacer */}
      </div>

      <main className="flex-1 px-6 md:px-12 max-w-2xl mx-auto w-full flex flex-col mt-4 relative z-10">
        {/* Title */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-headline font-black italic uppercase leading-[0.85] tracking-tighter">
            <div className="text-white" style={{ textShadow: '4px 4px 0px var(--color-on-primary-container)' }}>CREATE</div>
            <div className="text-primary-dim" style={{ textShadow: '4px 4px 0px var(--color-on-primary-container)' }}>ACCOUNT.</div>
          </h1>
          <div className="w-24 h-1 bg-primary-dim mt-6 shadow-[0_0_10px_var(--color-primary-dim)]"></div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <label className="font-label font-bold text-xs tracking-widest uppercase text-on-surface-variant">EMAIL</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-[#1a1a1a] border-none text-white p-5 font-body focus:ring-2 focus:ring-primary-dim outline-none transition-all placeholder:text-on-surface-variant/50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label font-bold text-xs tracking-widest uppercase text-on-surface-variant">PASSWORD</label>
            <input 
              type="password" 
              placeholder="Create a password" 
              className="bg-[#1a1a1a] border-none text-white p-5 font-body focus:ring-2 focus:ring-primary-dim outline-none transition-all placeholder:text-on-surface-variant/50"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-3 mt-2 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
            <div className={`w-6 h-6 flex items-center justify-center transition-all duration-300 ${
              rememberMe 
                ? 'bg-primary-dim shadow-[0_0_15px_var(--color-primary-dim)]' 
                : 'border-2 border-surface-container-highest bg-[#1a1a1a]'
            }`}>
              {rememberMe && <span className="material-symbols-outlined text-white text-sm font-bold">check</span>}
            </div>
            <span className="font-label font-bold text-xs tracking-widest uppercase text-on-surface-variant">REMEMBER ME</span>
          </div>
        </div>

        {/* Sign Up Button */}
        <PrimaryButton onClick={onNext} text="SIGN UP" className="mb-8" />

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex-1 h-px bg-surface-container-highest"></div>
          <span className="font-label font-bold text-[10px] tracking-widest uppercase text-on-surface-variant">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-surface-container-highest"></div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-6 mb-8">
          <button className="w-14 h-14 bg-[#1a1a1a] flex items-center justify-center hover:bg-[#222] transition-colors rounded-full">
            <span className="font-bold text-xl text-blue-500">f</span>
          </button>
          <button className="w-14 h-14 bg-[#1a1a1a] flex items-center justify-center hover:bg-[#222] transition-colors rounded-full">
            <span className="font-bold text-xl text-white">G</span>
          </button>
          <button className="w-14 h-14 bg-[#1a1a1a] flex items-center justify-center hover:bg-[#222] transition-colors rounded-full">
            <span className="font-bold text-xl text-white"></span>
          </button>
        </div>

        {/* Sign in link */}
        <div className="text-center pb-8">
          <span className="font-label font-bold text-xs tracking-widest uppercase text-on-surface-variant">ALREADY HAVE AN ACCOUNT? </span>
          <button onClick={onSignIn} className="font-label font-bold text-xs tracking-widest uppercase text-primary-dim hover:text-white transition-colors">SIGN IN</button>
        </div>
      </main>
    </motion.div>
  );
}

function SignInScreen({ onNext, onBack, onSignUp }: { onNext: () => void, onBack: () => void, onSignUp: () => void; key?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen bg-background text-on-background flex flex-col font-body relative"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between p-6 max-w-2xl mx-auto w-full relative z-10">
        <button onClick={onBack} className="text-primary-dim hover:text-white transition-colors">
          <span className="material-symbols-outlined text-3xl font-bold">arrow_back</span>
        </button>
        <div className="text-primary-dim font-headline font-black italic text-2xl tracking-tighter uppercase">KINETIC</div>
        <div className="w-8"></div> {/* Spacer */}
      </div>

      <main className="flex-1 px-6 md:px-12 max-w-2xl mx-auto w-full flex flex-col mt-4 relative z-10 pb-8">
        {/* Title */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-headline font-black italic uppercase leading-[0.85] tracking-tighter">
            <div className="text-white" style={{ textShadow: '4px 4px 0px var(--color-on-primary-container)' }}>WELCOME</div>
            <div className="text-primary-dim" style={{ textShadow: '4px 4px 0px var(--color-on-primary-container)' }}>BACK.</div>
          </h1>
          <div className="w-24 h-1 bg-primary-dim mt-6 shadow-[0_0_10px_var(--color-primary-dim)]"></div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6 mb-8 flex-1">
          <div className="flex flex-col gap-2">
            <label className="font-label font-bold text-xs tracking-widest uppercase text-on-surface-variant">EMAIL</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-[#1a1a1a] border-none text-white p-5 font-body focus:ring-2 focus:ring-primary-dim outline-none transition-all placeholder:text-on-surface-variant/50"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-label font-bold text-xs tracking-widest uppercase text-on-surface-variant">PASSWORD</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              className="bg-[#1a1a1a] border-none text-white p-5 font-body focus:ring-2 focus:ring-primary-dim outline-none transition-all placeholder:text-on-surface-variant/50"
            />
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto pt-8">
          {/* Sign In Button */}
          <PrimaryButton onClick={onNext} text="SIGN IN" className="mb-6" />

          {/* Forgot Password */}
          <div className="text-center mb-8">
            <button className="font-label font-bold text-xs tracking-widest uppercase text-on-surface-variant hover:text-white transition-colors">FORGOT THE PASSWORD?</button>
          </div>

          {/* Sign up link */}
          <div className="text-center">
            <span className="font-label font-bold text-xs tracking-widest uppercase text-on-surface-variant">DON'T HAVE AN ACCOUNT? </span>
            <button onClick={onSignUp} className="font-label font-bold text-xs tracking-widest uppercase text-primary-dim hover:text-white transition-colors">SIGN UP</button>
          </div>
        </div>
      </main>
    </motion.div>
  );
}

function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const clamped = Math.min(Math.max(percentage, 5), 95);
    
    // Haptic feedback
    if (Math.abs(clamped - 50) < 1 && Math.abs(sliderPosition - 50) >= 1) {
      if (navigator.vibrate) navigator.vibrate(50);
    }
    if (clamped === 5 || clamped === 95) {
      if (navigator.vibrate) navigator.vibrate(20);
    }

    setSliderPosition(clamped);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    handleMove(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative flex flex-col gap-4">
      <div 
        ref={containerRef}
        className="relative w-full h-80 rounded-[24px] border border-primary-dim bg-[#0D0D0D] overflow-hidden touch-none select-none cursor-ew-resize"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* After Image (Bottom Layer) */}
        <img 
          src="/After.png" 
          alt="After" 
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
        
        {/* Before Image (Top Layer) */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img 
            src="/Before.png" 
            alt="Before" 
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Divider (The Blade) */}
        <div 
          className="absolute inset-y-0 w-[3px] bg-primary-dim shadow-[0_0_15px_var(--color-primary-dim)] z-10"
          style={{ left: `calc(${sliderPosition}% - 1.5px)` }}
        >
          {/* Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black border-2 border-primary-dim rounded-full flex items-center justify-center shadow-[0_0_20px_var(--color-primary-dim)]">
            <span className="material-symbols-outlined text-primary-dim text-xl">local_fire_department</span>
          </div>

          {/* Metric Bubble */}
          <div className="absolute top-1/2 left-6 -translate-y-1/2 bg-[#0a0a0a] border border-primary-dim px-2 py-1 rounded text-white font-label font-bold text-[10px] tracking-widest whitespace-nowrap">
            -5KG
          </div>
        </div>

        {/* Labels */}
        <div className="absolute bottom-4 left-4 z-20">
          <span className="font-label font-bold text-xs tracking-widest uppercase text-gray-400 bg-[#0a0a0a] px-3 py-1.5 rounded">BEFORE</span>
        </div>
        <div className="absolute bottom-4 right-4 z-20">
          <span className="font-label font-bold text-xs tracking-widest uppercase text-white bg-primary-dim px-3 py-1.5 rounded">AFTER</span>
        </div>
      </div>

      {/* Social Integration */}
      <button className="self-end flex items-center gap-2 bg-[#1a1a1a] hover:bg-[#222] px-4 py-2 rounded-full border border-white/10 transition-colors">
        <span className="material-symbols-outlined text-sm text-white">share</span>
        <span className="font-label font-bold text-[10px] tracking-widest uppercase text-white">CAPTURE & SHARE</span>
      </button>
    </div>
  );
}

function MainScreen() {
  const [time, setTime] = useState(new Date());
  const [selectedAdImage, setSelectedAdImage] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [1, 2, 3];
  
  const handleTestimonialScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    const itemWidth = 280 + 16; // min-w-[280px] + gap-4 (16px)
    const index = Math.round(scrollLeft / itemWidth);
    setActiveTestimonial(Math.min(Math.max(index, 0), testimonials.length - 1));
  };
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background text-on-background pb-24 font-body"
    >
      <div className="max-w-2xl mx-auto px-6 pt-8 flex flex-col gap-10">
        {/* Section 1: Header & Hero */}
        <section className="flex flex-col gap-6">
          {/* Header Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-surface-container-highest overflow-hidden border-2 border-primary-dim shadow-[0_0_10px_var(--color-primary-dim)]">
                  <img src="https://picsum.photos/seed/avatar/100/100" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-primary-dim text-white text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">PRO</div>
              </div>
              <div className="flex flex-col">
                <span className="font-headline font-black italic text-xl uppercase tracking-tight text-white">HELLO, ATHLETE</span>
                <span className="font-label text-xs text-on-surface-variant tracking-widest uppercase">Let's ignite your potential.</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-mono text-sm text-white">{formatTime(time)}</div>
              <div className="relative">
                <span className="material-symbols-outlined text-primary-dim text-2xl">notifications</span>
                <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full shadow-[0_0_5px_#fff]"></div>
              </div>
            </div>
          </div>

          {/* Hero Widget: 3D Body Map */}
          <div className="relative w-full h-[320px] rounded-3xl overflow-hidden bg-[#0a0a0a] border border-surface-container-low flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.2)_0%,transparent_70%)]"></div>
            
            {/* 3D Body Map Canvas */}
            <div className="absolute inset-0 z-10">
              <BodyMapCanvas />
            </div>
          </div>

          {/* Quick Metric Bar */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-surface-container-low rounded-2xl p-3 flex flex-col gap-2 border border-white/5">
              <div className="flex items-center gap-2 text-on-surface-variant">
                <span className="material-symbols-outlined text-sm">directions_walk</span>
                <span className="font-label text-[10px] font-bold tracking-widest uppercase">STEPS</span>
              </div>
              <div className="font-headline font-black italic text-xl text-white">7.5K</div>
              <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary-dim w-[75%] shadow-[0_0_5px_var(--color-primary-dim)]"></div>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-2xl p-3 flex flex-col gap-2 border border-white/5">
              <div className="flex items-center gap-2 text-primary-dim">
                <span className="material-symbols-outlined text-sm">local_fire_department</span>
                <span className="font-label text-[10px] font-bold tracking-widest uppercase">CALS</span>
              </div>
              <div className="font-headline font-black italic text-xl text-white">1690</div>
              <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary-dim w-[60%] shadow-[0_0_5px_var(--color-primary-dim)]"></div>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-2xl p-3 flex flex-col gap-2 border border-white/5">
              <div className="flex items-center gap-2 text-blue-400">
                <span className="material-symbols-outlined text-sm">radar</span>
                <span className="font-label text-[10px] font-bold tracking-widest uppercase">PRO SCORE</span>
              </div>
              <div className="font-headline font-black italic text-xl text-white">84</div>
              <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 w-[84%] shadow-[0_0_5px_#60a5fa]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Training & Premium Access */}
        <section className="flex flex-col gap-6">
          <button className="w-full bg-gradient-to-r from-primary-dim to-[#ff4500] text-white p-5 rounded-2xl flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(255,0,0,0.4)]">
            <span className="material-symbols-outlined text-2xl font-bold">local_fire_department</span>
            <span className="font-headline font-black italic text-2xl tracking-tight uppercase">START WORKOUT</span>
          </button>

          <div className="flex flex-col gap-6 mt-4">
            <h2 className="font-headline font-black italic text-3xl uppercase tracking-tighter text-white mb-2">PREMIUM CONTENT</h2>
            
            {/* Card 1 */}
            <div className="relative w-full h-72 rounded-3xl overflow-hidden group cursor-pointer bg-black shadow-lg">
              <img src="/members1.png" alt="Training" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500 object-top" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div className="flex flex-col gap-1 mt-4">
                  <h3 className="font-headline font-black italic text-4xl uppercase tracking-tighter text-white leading-none">MEMBERS<br/>ONLY CONTENT</h3>
                  <p className="font-body text-sm text-on-surface-variant mt-3 max-w-[220px] leading-relaxed">Get Fit Faster - Access Expert<br/>Gym Secrets Now!</p>
                </div>
                
                <div className="w-full bg-primary-dim hover:brightness-110 transition-all duration-300 rounded-2xl py-4 px-6 flex items-center justify-center gap-2 mt-auto shadow-[0_0_15px_rgba(255,0,0,0.3)]">
                  <span className="font-headline font-black italic text-2xl uppercase tracking-tight text-[#FFD700]">EXCLUSIVE</span>
                  <span className="material-symbols-outlined text-[#FFD700] text-3xl drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" style={{ fontVariationSettings: "'FILL' 1" }}>crown</span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative w-full h-72 rounded-3xl overflow-hidden group cursor-pointer bg-black shadow-lg">
              <img src="/members21.png" alt="Nutrition" className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
              
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <div className="flex flex-col gap-1 mt-4">
                  <h3 className="font-headline font-black italic text-4xl uppercase tracking-tighter text-white leading-none">MEMBERS<br/>ONLY CONTENT</h3>
                  <p className="font-body text-sm text-on-surface-variant mt-3 max-w-[220px] leading-relaxed">Get Fit Faster - Access Expert<br/>Gym Secrets Now!</p>
                </div>
                
                <div className="w-full bg-primary-dim hover:brightness-110 transition-all duration-300 rounded-2xl py-4 px-6 flex items-center justify-center gap-2 mt-auto shadow-[0_0_15px_rgba(255,0,0,0.3)]">
                  <span className="font-headline font-black italic text-2xl uppercase tracking-tight text-[#FFD700]">EXCLUSIVE</span>
                  <span className="material-symbols-outlined text-[#FFD700] text-3xl drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" style={{ fontVariationSettings: "'FILL' 1" }}>crown</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Social Proof & Elite Results */}
        <section className="flex flex-col gap-6">
          <h2 className="font-headline font-black italic text-3xl uppercase tracking-tighter text-primary-dim">ELITE RESULTS</h2>
          
          {/* Swipe Slider */}
          <BeforeAfterSlider />

          {/* Community Feedback Carousel */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary-dim shadow-[0_0_5px_var(--color-primary-dim)] animate-pulse"></div>
              <span className="font-label font-bold text-[10px] tracking-widest uppercase text-white">LIVE FROM THE COMMUNITY</span>
            </div>
            <div 
              className="flex gap-4 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              onScroll={handleTestimonialScroll}
            >
              {testimonials.map((i, index) => (
                <div key={i} className="min-w-[280px] bg-[#111] rounded-2xl p-5 snap-center border border-white/5">
                  <div className="flex items-center gap-3 mb-3">
                    <img src={`https://picsum.photos/seed/user${i}/50/50`} alt="User" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="font-label font-bold text-xs text-white uppercase tracking-wider">EyaKhoualdia</div>
                      <div className="flex text-yellow-500 text-xs drop-shadow-[0_0_2px_rgba(234,179,8,0.8)]">
                        ★★★★★
                      </div>
                    </div>
                  </div>
                  <p className="font-body text-sm text-on-surface-variant italic">"The 3D mapping changed everything. Lost 5kg in 3 weeks and feeling stronger than ever."</p>
                </div>
              ))}
            </div>
            
            {/* Red Dots Progress Bar */}
            <div className="flex justify-center gap-2 mt-2">
              {testimonials.map((_, index) => (
                <div 
                  key={index} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeTestimonial === index 
                      ? 'w-6 bg-primary-dim shadow-[0_0_8px_var(--color-primary-dim)]' 
                      : 'w-1.5 bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Advertising space */}
        <section className="flex flex-col gap-6 mb-8">
          <h2 className="font-headline font-black text-3xl text-primary-dim">Advertising space</h2>
          
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {/* Ad 1: Packages Comparison */}
            <div 
              className="min-w-[200px] w-[200px] flex-shrink-0 rounded-3xl overflow-hidden border-2 border-primary-dim cursor-pointer snap-center"
              onClick={() => setSelectedAdImage("/ad1.jpg")}
            >
              <img 
                src="/ad1.jpg" 
                alt="Packages Comparison" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://picsum.photos/seed/ad1/400/600";
                }}
              />
            </div>

            {/* Ad 2: Eid Promo */}
            <div 
              className="min-w-[200px] w-[200px] flex-shrink-0 rounded-3xl overflow-hidden border-2 border-primary-dim cursor-pointer snap-center"
              onClick={() => setSelectedAdImage("/ad2.jpg")}
            >
              <img 
                src="/ad2.jpg" 
                alt="Eid Promo" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://picsum.photos/seed/ad2/400/600";
                }}
              />
            </div>

            {/* Ad 3: Online Coaching Promo */}
            <div 
              className="min-w-[200px] w-[200px] flex-shrink-0 rounded-3xl overflow-hidden border-2 border-primary-dim cursor-pointer snap-center"
              onClick={() => setSelectedAdImage("/ad3.jpg")}
            >
              <img 
                src="/ad3.jpg" 
                alt="Online Coaching Promo" 
                className="w-full h-auto object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://picsum.photos/seed/ad3/400/600";
                }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Global Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-[#050505] border-t border-white/5 pb-safe pt-2 px-6 z-50">
        <div className="max-w-2xl mx-auto flex items-center justify-between h-16">
          {[
            { id: 'home', icon: 'home', label: 'HOME' },
            { id: 'exercises', icon: 'fitness_center', label: 'WORKOUT' },
            { id: 'store', icon: 'shopping_cart', label: 'STORE' },
            { id: 'profile', icon: 'person', label: 'PROFILE' }
          ].map((item) => (
            <button key={item.id} className="relative flex flex-col items-center justify-center w-16 h-full gap-1 group">
              {item.id === 'home' && (
                <div className="absolute -top-1 w-1 h-1 bg-primary-dim rounded-full shadow-[0_0_8px_var(--color-primary-dim)]"></div>
              )}
              <span className={`material-symbols-outlined text-2xl transition-colors ${item.id === 'home' ? 'text-primary-dim drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]' : 'text-on-surface-variant group-hover:text-white'}`}>
                {item.icon}
              </span>
              <span className={`font-label font-bold text-[8px] tracking-widest uppercase ${item.id === 'home' ? 'text-primary-dim' : 'text-on-surface-variant'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Ad Image Popup Modal */}
      <AnimatePresence>
        {selectedAdImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6"
            onClick={() => setSelectedAdImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-sm w-full bg-surface-container-low rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedAdImage(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-primary-dim text-white rounded-full flex items-center justify-center shadow-lg hover:brightness-110 transition-all"
              >
                <span className="material-symbols-outlined text-sm font-bold">close</span>
              </button>
              <img 
                src={selectedAdImage} 
                alt="Advertisement" 
                className="w-full h-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function App() {
  const [appState, setAppState] = useState<'loading' | 'welcome' | 'onboarding' | 'gender-selection' | 'age-selection' | 'weight-selection' | 'height-selection' | 'goal-selection' | 'social-entry' | 'sign-up' | 'sign-in' | 'main'>('loading');

  return (
    <AnimatePresence mode="wait">
      {appState === 'loading' && (
        <LoadingScreen key="loading" onComplete={() => setAppState('welcome')} />
      )}
      {appState === 'welcome' && (
        <WelcomeScreen key="welcome" onNext={() => setAppState('onboarding')} />
      )}
      {appState === 'onboarding' && (
        <OnboardingScreen key="onboarding" onComplete={() => setAppState('gender-selection')} />
      )}
      {appState === 'gender-selection' && (
        <GenderSelectionScreen 
          key="gender-selection" 
          onNext={() => setAppState('age-selection')} 
          onBack={() => setAppState('onboarding')} 
        />
      )}
      {appState === 'age-selection' && (
        <AgeSelectionScreen 
          key="age-selection" 
          onNext={() => setAppState('weight-selection')} 
          onBack={() => setAppState('gender-selection')} 
        />
      )}
      {appState === 'weight-selection' && (
        <WeightSelectionScreen 
          key="weight-selection" 
          onNext={() => setAppState('height-selection')} 
          onBack={() => setAppState('age-selection')} 
        />
      )}
      {appState === 'height-selection' && (
        <HeightSelectionScreen 
          key="height-selection" 
          onNext={() => setAppState('goal-selection')} 
          onBack={() => setAppState('weight-selection')} 
        />
      )}
      {appState === 'goal-selection' && (
        <GoalSelectionScreen 
          key="goal-selection" 
          onNext={() => setAppState('social-entry')} 
          onBack={() => setAppState('height-selection')} 
        />
      )}
      {appState === 'social-entry' && (
        <SocialEntryScreen 
          key="social-entry" 
          onSignUp={() => setAppState('sign-up')} 
          onSignIn={() => setAppState('sign-in')} 
          onBack={() => setAppState('goal-selection')} 
        />
      )}
      {appState === 'sign-up' && (
        <SignUpScreen 
          key="sign-up" 
          onNext={() => setAppState('main')} 
          onBack={() => setAppState('social-entry')} 
          onSignIn={() => setAppState('sign-in')} 
        />
      )}
      {appState === 'sign-in' && (
        <SignInScreen 
          key="sign-in" 
          onNext={() => setAppState('main')} 
          onBack={() => setAppState('social-entry')} 
          onSignUp={() => setAppState('sign-up')} 
        />
      )}
      {appState === 'main' && (
        <MainScreen key="main" />
      )}
    </AnimatePresence>
  );
}
