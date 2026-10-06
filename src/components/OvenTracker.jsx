import React, { useState, useEffect } from 'react';
import { Clock, Flame, Bell, CheckCircle2, Sparkles } from 'lucide-react';
import { BAKER_SCHEDULE } from '../data/pastriesData';

export function OvenTracker() {
  const [secondsRemaining, setSecondsRemaining] = useState(765); // 12m 45s countdown
  const [isNotified, setIsNotified] = useState(false);

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

  return (
    <div className="py-12 bg-[var(--bg-secondary)] border-y border-[var(--border-subtle)]">
      <div className="container">
        
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Live Oven Hero Box */}
          <div className="p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border-light)] shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left Info */}
            <div className="space-y-3 z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-500 text-xs font-bold uppercase tracking-wider">
                <Flame className="w-4 h-4 animate-bounce" />
                <span>Live Bakery Oven Tracker</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-[var(--text-main)]">
                Next Fresh Batch: Normandy Butter Croissants
              </h3>
              <p className="text-xs text-[var(--text-muted)]">
                Our bakers just brushed the laminations with Normandy AOP butter and slid the trays into Oven #3.
              </p>
            </div>

            {/* Timer Box */}
            <div className="z-10 flex flex-col items-center justify-center p-6 rounded-2xl bg-[var(--accent-gold-light)] border border-[var(--border-light)] shadow-inner min-w-[200px]">
              <span className="text-xs text-[var(--accent-gold)] font-bold uppercase tracking-widest mb-1">
                Timer Count Down
              </span>
              <span className="font-mono text-4xl font-extrabold text-[var(--text-main)] tracking-wider">
                {formatTimer(secondsRemaining)}
              </span>
              <button
                onClick={() => setIsNotified(!isNotified)}
                className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-black/40 text-[var(--text-main)] text-xs font-bold shadow-sm hover:scale-105 transition-transform"
              >
                <Bell className={`w-3.5 h-3.5 ${isNotified ? 'text-amber-500 fill-amber-500' : ''}`} />
                <span>{isNotified ? 'Notified when Ready!' : 'Notify Me'}</span>
              </button>
            </div>

          </div>

          {/* Bakery Daily Schedule */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-xl text-[var(--text-main)] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--accent-gold)]" />
              <span>Full Daily Oven Timetable</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {BAKER_SCHEDULE.map((slot, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    slot.status === 'Baking Now'
                      ? 'bg-[var(--accent-gold-light)] border-[var(--accent-gold)] shadow-md'
                      : slot.status === 'Ready'
                      ? 'bg-[var(--bg-card)] border-emerald-500/30'
                      : 'bg-[var(--bg-card)] border-[var(--border-subtle)] opacity-80'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-xs font-bold text-[var(--accent-gold)]">{slot.time}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      slot.status === 'Baking Now'
                        ? 'bg-amber-500 text-white animate-pulse'
                        : slot.status === 'Ready'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-[var(--text-muted)]'
                    }`}>
                      {slot.status}
                    </span>
                  </div>
                  <p className="font-serif font-bold text-sm text-[var(--text-main)]">{slot.item}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
