"use client";

import React from 'react';
import { processData } from '@/data/process';

const Process = () => {
  return (
    <section id="proceso" className="py-24 bg-bg-dark">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="section-badge">Metodología</span>
          <h2 className="title-main text-4xl md:text-5xl mb-6">Proceso de Desarrollo</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processData.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center p-8">
              {/* Número del paso */}
              <div className="text-primary/20 text-8xl font-black mb-4 select-none">
                {step.number}
              </div>
              
              <h3 className="text-2xl font-bold mb-4 relative z-10 -mt-16 text-white">
                {step.title}
              </h3>
              
              <p className="text-text-secondary leading-relaxed relative z-10">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;