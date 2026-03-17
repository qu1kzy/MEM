import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { GallerySection } from '@/components/landing/GallerySection';
import { TechSpecsSection } from '@/components/landing/TechSpecsSection';
import { Constructor } from '@/components/constructor/Constructor';
import { CTASection } from '@/components/landing/CTASection';
import { PageTransition } from '@/components/motion';

export function LandingPage() {
  return (
    <PageTransition>
      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <TechSpecsSection />
      <Constructor />
      <CTASection />
    </PageTransition>
  );
}
