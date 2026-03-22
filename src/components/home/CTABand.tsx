import { GlowBlob } from "@/components/common/GlowBlob";
import { CTAButton } from "@/components/common/CTAButton";

interface CTABandProps {
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
}

export function CTABand({ ctaTitle, ctaSubtitle, ctaButton }: CTABandProps) {
  return (
    <section className="relative overflow-hidden bg-midnight py-24 md:py-32">
      {/* 시안 GlowBlob 중앙 */}
      <GlowBlob
        className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        size={600}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 lg:px-20 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
          {ctaTitle}
        </h2>
        <p className="text-lg text-white/60 mb-10">{ctaSubtitle}</p>
        <CTAButton href="/contact" variant="solid">
          {ctaButton}
        </CTAButton>
      </div>
    </section>
  );
}
