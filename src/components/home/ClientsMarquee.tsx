"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";

interface ClientItem {
  id: string;
  name: string;
}

interface ClientsMarqueeProps {
  clientsLabel: string;
  clientsTitle: string;
  clients: ClientItem[];
}

function MarqueeTrack({
  clients,
  reverse = false,
  duration = 30,
  reducedMotion,
}: {
  clients: ClientItem[];
  reverse?: boolean;
  duration?: number;
  reducedMotion: boolean;
}) {
  // 화면을 넉넉히 채우도록 4배 복제
  const repeated = [...clients, ...clients, ...clients, ...clients];

  if (reducedMotion) {
    return (
      <div className="flex flex-wrap justify-center gap-3 px-5">
        {clients.map((c) => (
          <span
            key={c.id}
            className="inline-flex items-center rounded-full border border-gray-200/80 bg-white/80 px-5 py-2 text-sm font-medium text-gray-700 backdrop-blur-sm ring-1 ring-gray-200/50"
          >
            {c.name}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div
        className="flex w-max gap-4"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {repeated.map((c, i) => (
          <span
            key={`${c.id}-${i}`}
            className="inline-flex items-center whitespace-nowrap rounded-full border border-gray-200/80 bg-white/80 px-6 py-2.5 text-sm font-medium text-gray-700 backdrop-blur-sm ring-1 ring-gray-200/50 transition-colors duration-200 hover:border-primary-400/30 hover:text-primary-400"
          >
            {c.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ClientsMarquee({
  clientsLabel,
  clientsTitle,
  clients,
}: ClientsMarqueeProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section className="bg-smoke py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-10 lg:px-20 mb-10">
        <SectionLabel>{clientsLabel}</SectionLabel>
        <SectionTitle weight="normal" className="mt-3 text-2xl md:text-4xl text-midnight">
          {clientsTitle}
        </SectionTitle>
      </div>

      {/* 스크린리더용 정적 리스트 */}
      <div className="sr-only">
        <ul>
          {clients.map((c) => (
            <li key={c.id}>{c.name}</li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <MarqueeTrack clients={clients} duration={25} reducedMotion={reducedMotion} />
        <MarqueeTrack clients={clients} duration={35} reverse reducedMotion={reducedMotion} />
      </div>
    </section>
  );
}
