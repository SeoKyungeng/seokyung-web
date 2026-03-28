"use client";

import { motion, type Variants } from "framer-motion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { useAnimateInView } from "@/components/common/AnimateInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE_SPRING } from "@/lib/motion";
import type { Department } from "@/lib/types";

interface OrgChartProps {
  departments: Department[];
  locale: "ko" | "en";
  label: string;
  title: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const nodeVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_SPRING },
  },
};

function RootCard({
  dept,
  locale,
}: {
  dept: Department;
  locale: "ko" | "en";
}) {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white px-8 py-5 text-center min-w-[160px] ring-1 ring-gray-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-primary-400/30 hover:shadow-sm">
      <p className="break-keep-all font-display text-lg font-semibold text-gray-950 md:text-xl">
        {dept.name[locale]}
      </p>
    </div>
  );
}

function DeptCard({
  dept,
  locale,
}: {
  dept: Department;
  locale: "ko" | "en";
}) {
  return (
    <div className="min-w-[120px] rounded-xl border border-gray-200 border-l-2 border-l-primary-400 bg-white px-5 py-4 ring-1 ring-gray-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-primary-400/30 hover:shadow-sm">
      <p className="break-keep-all font-display text-left text-base font-semibold text-gray-950">
        {dept.name[locale]}
      </p>
    </div>
  );
}

function DesktopTree({
  root,
  deptGroups,
  locale,
  reducedMotion,
}: {
  root: Department;
  deptGroups: { dept: Department; teams: Department[] }[];
  locale: "ko" | "en";
  reducedMotion: boolean;
}) {
  const { ref: containerRef, isInView } = useAnimateInView();

  const content = (
    <>
      <div className="flex justify-center">
        {reducedMotion ? (
          <RootCard dept={root} locale={locale} />
        ) : (
          <motion.div variants={nodeVariants}>
            <RootCard dept={root} locale={locale} />
          </motion.div>
        )}
      </div>

      {deptGroups.length > 0 && (
        <div className="flex justify-center">
          <div className="h-8 w-px bg-gray-300" aria-hidden="true" />
        </div>
      )}

      {deptGroups.length > 0 && (
        <div className="grid grid-cols-5 gap-4 md:gap-6">
          {deptGroups.map(({ dept, teams }, index) => (
            <div key={dept.id} className="relative flex flex-col items-center">
              <div
                className={`absolute top-0 h-px bg-gray-300 ${
                  index === 0 ? "left-1/2" : "-left-2 md:-left-3"
                } ${
                  index === deptGroups.length - 1 ? "right-1/2" : "-right-2 md:-right-3"
                }`}
                aria-hidden="true"
              />
              <div className="h-8 w-px bg-gray-300" aria-hidden="true" />
                {reducedMotion ? (
                  <div className="flex w-full flex-col items-center">
                    <DeptCard dept={dept} locale={locale} />
                    {teams.length > 0 && (
                      <ul className="mt-3 min-w-[120px] space-y-1 px-5">
                        {teams.map((team) => (
                          <li key={team.id} className="text-left text-sm text-gray-500">
                            {team.name[locale]}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <motion.div variants={nodeVariants} className="flex w-full flex-col items-center">
                    <DeptCard dept={dept} locale={locale} />
                    {teams.length > 0 && (
                      <ul className="mt-3 min-w-[120px] space-y-1 px-5">
                        {teams.map((team) => (
                          <li key={team.id} className="text-left text-sm text-gray-500">
                            {team.name[locale]}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
      )}
    </>
  );

  if (reducedMotion) {
    return <div className="flex flex-col gap-0">{content}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col gap-0"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {content}
    </motion.div>
  );
}

function MobileList({
  root,
  deptGroups,
  locale,
  reducedMotion,
}: {
  root: Department;
  deptGroups: { dept: Department; teams: Department[] }[];
  locale: "ko" | "en";
  reducedMotion: boolean;
}) {
  const { ref: containerRef, isInView } = useAnimateInView();

  const content = (
    <>
      {/* CEO — 대형 타이포 (카드 없음) */}
      {reducedMotion ? (
        <p className="break-keep-all font-display text-lg font-semibold text-gray-950">
          {root.name[locale]}
        </p>
      ) : (
        <motion.p variants={nodeVariants} className="break-keep-all font-display text-lg font-semibold text-gray-950">
          {root.name[locale]}
        </motion.p>
      )}

      {/* 부서 + 팀 — 들여쓰기 리스트 */}
      <div className="mt-4 ml-4 border-l-2 border-primary-400/40 pl-4 space-y-4">
        {deptGroups.map(({ dept, teams }) => {
          const node = (
            <div key={dept.id}>
              <p className="break-keep-all font-display text-base font-semibold text-gray-950">
                {dept.name[locale]}
              </p>
              {teams.length > 0 && (
                <ul className="mt-1.5 space-y-1 pl-3">
                  {teams.map((team) => (
                    <li key={team.id} className="break-keep-all text-sm text-gray-500">
                      {team.name[locale]}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );

          return reducedMotion ? (
            <div key={dept.id}>{node}</div>
          ) : (
            <motion.div key={dept.id} variants={nodeVariants}>
              {node}
            </motion.div>
          );
        })}
      </div>
    </>
  );

  if (reducedMotion) {
    return <div>{content}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {content}
    </motion.div>
  );
}

export function OrgChart({ departments, locale, label, title }: OrgChartProps) {
  const reducedMotion = useReducedMotion();

  const root = departments.find((d) => d.parent === null);
  const deptLevel = departments.filter((d) => d.parent === root?.id);
  const deptGroups = deptLevel.map((dept) => ({
    dept,
    teams: departments.filter((d) => d.parent === dept.id),
  }));

  if (!root) return null;

  return (
    <section
      className="border-t border-gray-200 bg-smoke py-24 md:py-40"
      aria-labelledby="org-heading"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
        <div className="mb-16 grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel>{label}</SectionLabel>
            <h2 id="org-heading" className="sr-only">
              {title}
            </h2>
            <div className="mt-4" aria-hidden="true">
              <SectionTitle as="h2" className="text-4xl text-midnight md:text-5xl">
                {title}
              </SectionTitle>
            </div>
          </div>
          <div className="hidden md:col-span-7 md:block" />
        </div>

        <div className="hidden md:block">
          <DesktopTree
            root={root}
            deptGroups={deptGroups}
            locale={locale}
            reducedMotion={reducedMotion}
          />
        </div>

        <div className="md:hidden">
          <MobileList
            root={root}
            deptGroups={deptGroups}
            locale={locale}
            reducedMotion={reducedMotion}
          />
        </div>
      </div>
    </section>
  );
}
