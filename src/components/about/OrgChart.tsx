"use client";

import { motion, type Variants } from "framer-motion";
import { SectionLabel } from "@/components/common/SectionLabel";
import { SectionTitle } from "@/components/common/SectionTitle";
import { useAnimateInView } from "@/components/common/AnimateInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

function DeptCard({
  dept,
  locale,
  isRoot = false,
}: {
  dept: Department;
  locale: "ko" | "en";
  isRoot?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border border-steel px-5 py-4 text-center transition-[border-color] duration-250 hover:border-primary-400 ${
        isRoot ? "bg-steel/60 min-w-[140px]" : "bg-slate/60 min-w-[120px]"
      }`}
    >
      <p className={`font-display font-semibold text-white ${isRoot ? "text-base" : "text-sm"}`}>
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
      {reducedMotion ? (
        <DeptCard dept={root} locale={locale} isRoot />
      ) : (
        <motion.div variants={nodeVariants}>
          <DeptCard dept={root} locale={locale} isRoot />
        </motion.div>
      )}

      {deptGroups.length > 0 && (
        <div className="h-8 w-px bg-primary-400/40" aria-hidden="true" />
      )}

      {deptGroups.length > 0 && (
        <div className="relative flex items-start gap-6">
          <div className="absolute top-0 right-0 left-0 h-px bg-primary-400/40" aria-hidden="true" />
          {deptGroups.map(({ dept, teams }) => (
            <div key={dept.id} className="relative flex flex-col items-center">
              <div className="h-8 w-px bg-primary-400/40" aria-hidden="true" />
              {reducedMotion ? (
                <div className="flex flex-col items-center">
                  <DeptCard dept={dept} locale={locale} />
                  {teams.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {teams.map((team) => (
                        <p key={team.id} className="text-xs text-gray-500">
                          {team.name[locale]}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <motion.div variants={nodeVariants} className="flex flex-col items-center">
                  <DeptCard dept={dept} locale={locale} />
                  {teams.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {teams.map((team) => (
                        <p key={team.id} className="text-xs text-gray-500">
                          {team.name[locale]}
                        </p>
                      ))}
                    </div>
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
    return <div className="flex flex-col items-center">{content}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col items-center"
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
      {reducedMotion ? (
        <DeptCard dept={root} locale={locale} isRoot />
      ) : (
        <motion.div variants={nodeVariants}>
          <DeptCard dept={root} locale={locale} isRoot />
        </motion.div>
      )}

      <div className="ml-4 border-l-2 border-primary-400/40 pl-4">
        <div className="flex flex-col gap-3">
          {deptGroups.map(({ dept, teams }) => {
            const node = (
              <div key={dept.id} className="w-full">
                <DeptCard dept={dept} locale={locale} />
                {teams.length > 0 && (
                  <div className="mt-2 space-y-1 pl-4">
                    {teams.map((team) => (
                      <p key={team.id} className="text-xs text-gray-500">
                        {team.name[locale]}
                      </p>
                    ))}
                  </div>
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
      </div>
    </>
  );

  if (reducedMotion) {
    return <div className="flex flex-col gap-3">{content}</div>;
  }

  return (
    <motion.div
      ref={containerRef}
      className="flex flex-col gap-3"
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
    <section className="bg-slate py-24 md:py-40" aria-labelledby="org-heading">
      <div className="mx-auto max-w-7xl px-5 md:px-10 lg:px-20">
        <div className="mb-16 text-center">
          <SectionLabel>{label}</SectionLabel>
          <h2 id="org-heading" className="sr-only">{title}</h2>
          <div className="mt-4" aria-hidden="true">
            <SectionTitle as="h2" className="text-3xl text-white md:text-4xl">
              {title}
            </SectionTitle>
          </div>
        </div>

        <div className="hidden md:block">
          <DesktopTree root={root} deptGroups={deptGroups} locale={locale} reducedMotion={reducedMotion} />
        </div>

        <div className="md:hidden">
          <MobileList root={root} deptGroups={deptGroups} locale={locale} reducedMotion={reducedMotion} />
        </div>
      </div>
    </section>
  );
}
