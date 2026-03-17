import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { GallerySection } from '@/components/landing/GallerySection';
import { TechSpecsSection } from '@/components/landing/TechSpecsSection';
import { Constructor } from '@/components/constructor/Constructor';
import { CTASection } from '@/components/landing/CTASection';

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <TechSpecsSection />
      <Constructor />
      <CTASection />
    </>
  );
}
