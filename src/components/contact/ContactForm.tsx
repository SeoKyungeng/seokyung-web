"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Loader2, CheckCircle, ArrowRight } from "lucide-react";
import { useToast } from "@/providers/ToastProvider";
import { useAnimateInView } from "@/components/common/AnimateInView";
import { SectionLabel } from "@/components/common/SectionLabel";
import { EASE_SPRING, DURATION_NORMAL } from "@/lib/motion";

const SPRING_EASE = [...EASE_SPRING] as [number, number, number, number];

interface FormFields {
  company: string;
  person: string;
  phone: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const INITIAL_FIELDS: FormFields = {
  company: "",
  person: "",
  phone: "",
  email: "",
  message: "",
};

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
        {required && <span className="ml-0.5 text-primary-400" aria-hidden="true">*</span>}
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
        {required && <span className="ml-0.5 text-primary-400" aria-hidden="true">*</span>}
      </label>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

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

export function ContactForm() {
  const t = useTranslations("pages.contact");
  const { toast } = useToast();
  const { ref, isInView, reducedMotion } = useAnimateInView();

  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string | null>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const validateField = useCallback(
    (name: keyof FormFields, value: string): string | null => {
      switch (name) {
        case "company":
          if (!value.trim()) return t("validation.companyRequired");
          if (value.length < 2 || value.length > 50) return t("validation.companyLength");
          return null;
        case "person":
          if (!value.trim()) return t("validation.personRequired");
          if (value.length < 2 || value.length > 20) return t("validation.personLength");
          return null;
        case "phone":
          if (!value.trim()) return t("validation.phoneRequired");
          if (!/^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(value)) return t("validation.phoneFormat");
          return null;
        case "email":
          if (!value.trim()) return t("validation.emailRequired");
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return t("validation.emailFormat");
          return null;
        case "message":
          if (!value.trim()) return t("validation.messageRequired");
          if (value.length < 10) return t("validation.messageLength");
          return null;
        default:
          return null;
      }
    },
    [t],
  );

  const handleChange = (name: keyof FormFields) => (value: string) => {
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name: keyof FormFields) => () => {
    const error = validateField(name, fields[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = (): boolean => {
    const newErrors: Partial<Record<keyof FormFields, string | null>> = {};
    let valid = true;
    (Object.keys(fields) as (keyof FormFields)[]).forEach((name) => {
      const error = validateField(name, fields[name]);
      newErrors[name] = error;
      if (error) valid = false;
    });
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateAll()) return;

    setStatus("submitting");

    // 모의 전송 (API 미연동)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 임시로 항상 성공 처리
    const success = true;

    if (success) {
      setStatus("success");
    } else {
      setStatus("error");
      toast("error", t("errorMessage"));
    }
  };

  const handleRetry = () => {
    setStatus("idle");
  };

  const fadeProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -16 },
        transition: { duration: 0.4 },
      };

  const Wrap = reducedMotion ? "div" : motion.div;
  const Item = reducedMotion ? "div" : motion.div;

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
                <CheckCircle className="h-8 w-8 text-primary-400" aria-hidden="true" />
              </motion.div>
              <h2 className="font-display text-2xl font-semibold text-gray-950">
                {t("successTitle")}
              </h2>
              <p className="mt-3 text-gray-500">{t("successMessage")}</p>
            </motion.div>
          ) : (
            <Wrap
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
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-8"
              >
                <Item {...(reducedMotion ? {} : { variants: staggerItem })}>
                  <FloatField
                    id="contact-company"
                    label={t("companyName")}
                    value={fields.company}
                    onChange={handleChange("company")}
                    onBlur={handleBlur("company")}
                    error={errors.company}
                    required
                    autoComplete="organization"
                  />
                </Item>

                <Item {...(reducedMotion ? {} : { variants: staggerItem })}>
                  <FloatField
                    id="contact-person"
                    label={t("contactPerson")}
                    value={fields.person}
                    onChange={handleChange("person")}
                    onBlur={handleBlur("person")}
                    error={errors.person}
                    required
                    autoComplete="name"
                  />
                </Item>

                <Item {...(reducedMotion ? {} : { variants: staggerItem })}>
                  <FloatField
                    id="contact-phone"
                    label={t("phone")}
                    type="tel"
                    value={fields.phone}
                    onChange={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    error={errors.phone}
                    required
                    autoComplete="tel"
                  />
                </Item>

                <Item {...(reducedMotion ? {} : { variants: staggerItem })}>
                  <FloatField
                    id="contact-email"
                    label={t("email")}
                    type="email"
                    value={fields.email}
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    error={errors.email}
                    required
                    autoComplete="email"
                  />
                </Item>

                <Item {...(reducedMotion ? {} : { variants: staggerItem })}>
                  <FloatTextarea
                    id="contact-message"
                    label={t("message")}
                    value={fields.message}
                    onChange={handleChange("message")}
                    onBlur={handleBlur("message")}
                    error={errors.message}
                    required
                  />
                </Item>

                {status === "error" && (
                  <Item {...(reducedMotion ? {} : { variants: staggerItem })}>
                    <div role="alert" className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600 shadow-sm">
                      {t("errorMessage")}
                    </div>
                  </Item>
                )}

                <Item {...(reducedMotion ? {} : { variants: staggerItem })}>
                  <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group/btn inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary-400 px-8 py-3.5 font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-300 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-sm"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          {t("submitting")}
                        </>
                      ) : (
                        <>
                          {t("submit")}
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" aria-hidden="true" />
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
                </Item>
              </form>
            </Wrap>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
