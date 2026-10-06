import React, { useState, useEffect } from 'react';
import { Clock, Flame, Bell, CheckCircle2, Sparkles, Wind, ShieldCheck } from 'lucide-react';
import { BAKER_SCHEDULE } from '../data/pastriesData';

export function OvenTracker() {
  const [secondsRemaining, setSecondsRemaining] = useState(740); // 12m 20s countdown
  const [isNotified, setIsNotified] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining(prev => (prev > 0 ? prev - 1 : 1800));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleNotifyToggle = () => {
    const nextState = !isNotified;
    setIsNotified(nextState);
    if (nextState) {
      setToastMessage("🔔 Notification set! We will chime when Normandy Butter Croissants come out fresh!");
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  return (
    <div className="py-14 bg-gradient-to-b from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-secondary)] border-y border-[var(--border-light)]">
      <div className="container">
        
        {/* Notification Toast */}
        {toastMessage && (
          <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-[var(--gold-gradient)] text-white shadow-2xl flex items-center gap-3 animate-fade-in border border-white/30">
            <CheckCircle2 className="w-5 h-5 text-amber-200" />
            <span className="text-xs font-bold">{toastMessage}</span>
          </div>
        )}

        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 text-rose-500 text-xs font-black uppercase tracking-widest border border-rose-500/20">
              <Flame className="w-4 h-4 animate-bounce" />
              <span>Live Stone-Deck Furnace Tracker</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-black text-[var(--text-main)]">
              Warm Oven Live Timetable
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-lg mx-auto">
              Our master bakers bake in small artisanal batches throughout the day. Track real-time oven progress and get notified for warm pickups.
            </p>
          </div>

          {/* Live Furnace Hero Card */}
          <div className="p-8 md:p-10 rounded-3xl bg-[var(--bg-card)] border-2 border-[var(--border-light)] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Background Steam Effect */}
            <div className="absolute top-2 left-10 text-4xl opacity-30 animate-steam">
              ♨️
            </div>
            <div className="absolute top-4 left-24 text-3xl opacity-20 animate-steam" style={{ animationDelay: '1s' }}>
              ♨️
            </div>

            {/* Left Oven Status Info */}
            <div className="space-y-4 z-10 text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-extrabold uppercase">
                <Wind className="w-3.5 h-3.5 animate-pulse" />
                <span>Oven #3 Active Lamination Bake</span>
              </div>
              
              <h3 className="font-serif text-2xl md:text-3xl font-black text-[var(--text-main)] leading-tight">
                Fresh Batch: Normandy Butter Croissants
              </h3>
              
              <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-md">
                Master Pâtissier Jean-Luc just brushed the laminated honeycomb layers with Normandy AOP butter and loaded stone deck furnace #3.
              </p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold text-[var(--accent-gold)] pt-1">
                <span>🔥 210°C Deck Temp</span>
                <span>•</span>
                <span>🥐 81 Layers Honeycomb</span>
                <span>•</span>
                <span>🧈 Isigny AOP Butter</span>
              </div>
            </div>

            {/* Right Countdown Box */}
            <div className="z-10 flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-b from-[var(--accent-gold-light)] to-amber-500/10 border-2 border-[var(--border-light)] shadow-xl min-w-[220px]">
              <span className="text-[10px] text-[var(--accent-gold)] font-black uppercase tracking-widest mb-1">
                Timer Count Down
              </span>
              <span className="font-mono text-5xl font-black text-[var(--text-main)] tracking-wider my-1">
                {formatTimer(secondsRemaining)}
              </span>
              
              <button
                onClick={handleNotifyToggle}
                className={`mt-4 flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black shadow-md transition-all transform hover:scale-105 ${
                  isNotified
                    ? 'bg-amber-500 text-white'
                    : 'bg-white dark:bg-black/50 text-[var(--text-main)] border border-[var(--border-light)]'
                }`}
              >
                <Bell className={`w-4 h-4 ${isNotified ? 'fill-white' : 'text-amber-500'}`} />
                <span>{isNotified ? 'Notification Active ✓' : 'Notify Me When Ready'}</span>
              </button>
            </div>

          </div>

          {/* Full Timetable */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-2xl text-[var(--text-main)] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--accent-gold)]" />
              <span>Complete Daily Oven Schedule</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {BAKER_SCHEDULE.map((slot, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    slot.status === 'Baking Now'
                      ? 'bg-[var(--accent-gold-light)] border-[var(--accent-gold)] shadow-lg scale-102'
                      : slot.status === 'Ready'
                      ? 'bg-[var(--bg-card)] border-emerald-500/40 shadow-sm'
                      : 'bg-[var(--bg-card)] border-[var(--border-subtle)] opacity-80'
                  }`}
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-xs font-black text-[var(--accent-gold)] px-2.5 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-light)]">
                      {slot.time}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      slot.status === 'Baking Now'
                        ? 'bg-amber-500 text-white animate-pulse'
                        : slot.status === 'Ready'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-[var(--text-muted)]'
                    }`}>
                      {slot.status}
                    </span>
                  </div>
                  <p className="font-serif font-bold text-base text-[var(--text-main)] leading-snug">
                    {slot.item}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
