'use client';

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import SelectedWork from '@/components/SelectedWork';
import StackSpec from '@/components/StackSpec';
import AboutEducation from '@/components/AboutEducation';
import Contact from '@/components/Contact';
import BootSequence from '@/components/BootSequence';
import ScrollReveal from '@/components/ScrollReveal';

export default function Home() {
  const [isBooted, setBooted] = useState(false);

  return (
    <>
      <BootSequence onComplete={() => setBooted(true)} />
      <div className={`w-full flex flex-col transition-opacity duration-500 ${isBooted ? 'opacity-100' : 'opacity-100'}`}>
        <Hero />
        <ScrollReveal>
          <SelectedWork />
        </ScrollReveal>
        <ScrollReveal>
          <StackSpec />
        </ScrollReveal>
        <ScrollReveal>
          <AboutEducation />
        </ScrollReveal>
        <ScrollReveal>
          <Contact />
        </ScrollReveal>
      </div>
    </>
  );
}
