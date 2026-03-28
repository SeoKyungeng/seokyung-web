"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/providers/ToastProvider";
import { useAnimateInView } from "@/components/common/AnimateInView";
import { SectionLabel } from "@/components/common/SectionLabel";
import { EASE_SPRING, DURATION_NORMAL } from "@/lib/motion";
import {
  createContactSchema,
  type ContactFormData,
} from "@/lib/schemas/contact";
import { submitContactForm } from "@/lib/actions/contact";

const SPRING_EASE = [...EASE_SPRING] as [number, number, number, number];

/* ─── Float Label 입력 필드 ─── */

interface FloatFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string | null;
  required?: boolean;
  autoComplete?: string;
}

function FloatField({
  id,
  label,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  required,
  autoComplete,
}: FloatFieldProps) {
  const errorId = `error-${id}`;

  return (
    <div className="group relative">
      <input
        id={id}
        type={type}
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        autoComplete={autoComplete}
        className={`peer w-full border-b-2 bg-transparent pt-6 pb-2 text-gray-950 transition-all duration-300 ${
          error
            ? "border-red-400 focus:border-red-400"
            : "border-gray-200 focus:border-primary-400"
        }`}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 top-4 text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs ${
          error
            ? "text-red-400 peer-focus:text-red-400"
            : "text-gray-500 peer-focus:text-primary-400"
        }`}
      >
        {label}
        {required && (
          <span className="ml-0.5 text-primary-400" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

interface FloatTextareaProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string | null;
  required?: boolean;
}

function FloatTextarea({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
}: FloatTextareaProps) {
  const errorId = `error-${id}`;

  return (
    <div className="group relative">
      <textarea
        id={id}
        placeholder=" "
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        rows={5}
        className={`peer w-full resize-none border-b-2 bg-transparent pt-6 pb-2 text-gray-950 transition-all duration-300 ${
          error
            ? "border-red-400 focus:border-red-400"
            : "border-gray-200 focus:border-primary-400"
        }`}
        style={{ minHeight: 120 }}
      />
      <label
        htmlFor={id}
        className={`pointer-events-none absolute left-0 top-4 text-sm transition-all duration-300 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs ${
          error
            ? "text-red-400 peer-focus:text-red-400"
            : "text-gray-500 peer-focus:text-primary-400"
        }`}
      >
        {label}
        {required && (
          <span className="ml-0.5 text-primary-400" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

/* ─── 애니메이션 ─── */

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_NORMAL,
      ease: SPRING_EASE,
    },
  },
};

const FADE_PROPS = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.4 },
} as const;

/* ─── ContactForm ─── */

type FormStatus = "idle" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("pages.contact");
  const { toast } = useToast();
  const { ref, isInView, reducedMotion } = useAnimateInView();

  const schema = useMemo(
    () => createContactSchema((key) => t(`validation.${key}`)),
    [t],
  );

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      company: "",
      person: "",
      phone: "",
      email: "",
      message: "",
    },
    mode: "onTouched",
  });

  const [status, setStatus] = useState<FormStatus>("idle");

  const onSubmit = async (data: ContactFormData) => {
    try {
      const result = await submitContactForm(data);

      if (result.success) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, messages]) => {
            setError(field as keyof ContactFormData, {
              message: messages[0],
            });
          });
        }
        toast("error", t("errorMessage"));
      }
    } catch {
      setStatus("error");
      toast("error", t("errorMessage"));
    }
  };

  const handleRetry = () => {
    setStatus("idle");
  };

  const fadeProps = reducedMotion ? {} : FADE_PROPS;

  const MotionDiv = reducedMotion ? "div" : motion.div;

  return (
    <div ref={ref}>
      <SectionLabel>{t("formLabel")}</SectionLabel>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              {...fadeProps}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <motion.div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-400/10"
                {...(reducedMotion
                  ? {}
                  : {
                      initial: { scale: 0 },
                      animate: { scale: 1 },
                      transition: { duration: 0.5, ease: SPRING_EASE },
                    })}
              >
                <CheckCircle
                  className="h-8 w-8 text-primary-400"
                  aria-hidden="true"
                />
              </motion.div>
              <h2 className="font-display text-2xl font-semibold text-gray-950">
                {t("successTitle")}
              </h2>
              <p className="mt-3 text-gray-500">{t("successMessage")}</p>
            </motion.div>
          ) : (
            <MotionDiv
              key="form-wrap"
              {...(reducedMotion
                ? {}
                : {
                    variants: staggerContainer,
                    initial: "hidden",
                    animate: isInView ? "visible" : "hidden",
                  })}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-8"
              >
                <MotionDiv {...(reducedMotion ? {} : { variants: staggerItem })}>
                  <Controller
                    name="company"
                    control={control}
                    render={({ field, fieldState }) => (
                      <FloatField
                        id="contact-company"
                        label={t("companyName")}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={fieldState.error?.message}
                        required
                        autoComplete="organization"
                      />
                    )}
                  />
                </MotionDiv>

                <MotionDiv {...(reducedMotion ? {} : { variants: staggerItem })}>
                  <Controller
                    name="person"
                    control={control}
                    render={({ field, fieldState }) => (
                      <FloatField
                        id="contact-person"
                        label={t("contactPerson")}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={fieldState.error?.message}
                        required
                        autoComplete="name"
                      />
                    )}
                  />
                </MotionDiv>

                <MotionDiv {...(reducedMotion ? {} : { variants: staggerItem })}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                      <FloatField
                        id="contact-phone"
                        label={t("phone")}
                        type="tel"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={fieldState.error?.message}
                        required
                        autoComplete="tel"
                      />
                    )}
                  />
                </MotionDiv>

                <MotionDiv {...(reducedMotion ? {} : { variants: staggerItem })}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <FloatField
                        id="contact-email"
                        label={t("email")}
                        type="email"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={fieldState.error?.message}
                        required
                        autoComplete="email"
                      />
                    )}
                  />
                </MotionDiv>

                <MotionDiv {...(reducedMotion ? {} : { variants: staggerItem })}>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field, fieldState }) => (
                      <FloatTextarea
                        id="contact-message"
                        label={t("message")}
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        error={fieldState.error?.message}
                        required
                      />
                    )}
                  />
                </MotionDiv>

                {status === "error" && (
                  <MotionDiv {...(reducedMotion ? {} : { variants: staggerItem })}>
                    <div
                      role="alert"
                      className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-sm"
                    >
                      {t("errorMessage")}
                    </div>
                  </MotionDiv>
                )}

                <MotionDiv {...(reducedMotion ? {} : { variants: staggerItem })}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-400 px-8 py-3.5 font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2
                            className="h-4 w-4 animate-spin"
                            aria-hidden="true"
                          />
                          {t("submitting")}
                        </>
                      ) : (
                        <>
                          {t("submit")}
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1"
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </button>

                    {status === "error" && (
                      <button
                        type="button"
                        onClick={handleRetry}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 px-8 py-3.5 font-semibold text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-gray-50 hover:shadow-md sm:w-auto"
                      >
                        {t("retryButton")}
                      </button>
                    )}
                  </div>
                </MotionDiv>
              </form>
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
