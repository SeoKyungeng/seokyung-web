"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";

interface ClientItem {
  id: string;
  name: string;
  logo: string | null;
}

interface ClientsMarqueeProps {
  clientsLabel: string;
  clientsTitle: string;
  clients: ClientItem[];
}

function LogoItem({ client }: { client: ClientItem }) {
  if (!client.logo) return null;

  return (
    <div className="flex shrink-0 items-center justify-center px-8 md:px-12">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={client.logo}
        alt={client.name}
        className="h-8 max-w-[120px] object-contain opacity-40 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 md:h-10 md:max-w-[140px]"
      />
    </div>
  );
}

function MarqueeTrack({
  clients,
  duration = 30,
  reverse = false,
}: {
  clients: ClientItem[];
  duration?: number;
  reverse?: boolean;
}) {
  const repeated = [...clients, ...clients, ...clients, ...clients];

  return (
    <div className="overflow-hidden" aria-hidden="true">
      <div
        className="flex w-max"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {repeated.map((c, i) => (
          <LogoItem key={`${c.id}-${i}`} client={c} />
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
  const logoClients = clients.filter((c) => c.logo);

  return (
    <section className="bg-smoke py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20 mb-14 md:mb-16">
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

      {reducedMotion ? (
        <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {logoClients.map((c) => (
              <LogoItem key={c.id} client={c} />
            ))}
          </div>
        </div>
      ) : (
        <MarqueeTrack clients={logoClients} duration={30} />
      )}
    </section>
  );
}
