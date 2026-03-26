/**
 * 모션 상수 — Supanova Design Skill 시그니처 이징 기반
 *
 * EASE_SPRING: 임팩트 있는 등장 (히어로, 카드 reveal, 카운터)
 * EASE_SMOOTH: 부드러운 전환 (섹션 타이틀, 페이드인)
 */

// Framer Motion용 tuple
export const EASE_SPRING = [0.16, 1, 0.3, 1] as const;
export const EASE_SMOOTH = [0.25, 0.46, 0.45, 0.94] as const;

// CSS cubic-bezier 문자열
export const EASE_SPRING_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";
export const EASE_SMOOTH_CSS = "cubic-bezier(0.25, 0.46, 0.45, 0.94)";

// Duration (초)
export const DURATION_FAST = 0.3;
export const DURATION_NORMAL = 0.5;
export const DURATION_SLOW = 0.7;

// Stagger
export const STAGGER_DEFAULT = 0.1;
