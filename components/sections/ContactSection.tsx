"use client";

import React, { useState, useEffect, useRef } from "react";
import { Container } from "@/components/layout/Container";
import { ScrollReveal } from "@/components/animations";
import {
  contactInfo,
  PROJECT_TYPES,
  PROJECT_AREAS,
  ESTIMATED_BUDGETS,
} from "@/data/contact";

interface FormState {
  name: string;
  email: string;
  projectType: string;
  projectLocation: string;
  projectArea: string;
  estimatedBudget: string;
  projectBrief: string;
  honeypot: string;
}

interface ValidationErrors {
  name?: string;
  email?: string;
  projectType?: string;
  projectBrief?: string;
  projectArea?: string;
  estimatedBudget?: string;
}

const INITIAL_FORM_STATE: FormState = {
  name: "",
  email: "",
  projectType: "",
  projectLocation: "",
  projectArea: "",
  estimatedBudget: "",
  projectBrief: "",
  honeypot: "",
};

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function ContactSection() {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [setupRequired, setSetupRequired] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState<{
    name: string;
    email: string;
    projectType: string;
  } | null>(null);

  // Bot defense: track render timestamp
  const renderedAtRef = useRef<number>(0);
  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  // Live IST Clock for architectural studio status
  const [istTime, setIstTime] = useState<string>("");
  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setIstTime(formatter.format(new Date()));
      } catch {
        setIstTime("");
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific field error as user modifies input
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof ValidationErrors];
        return next;
      });
    }

    if (submitError) {
      setSubmitError(null);
    }
  };

  const validate = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name (minimum 2 characters).";
    }

    if (!formData.email.trim() || !EMAIL_REGEX.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.projectType.trim()) {
      newErrors.projectType = "Please select a project type.";
    }

    if (!formData.projectBrief.trim() || formData.projectBrief.trim().length < 20) {
      newErrors.projectBrief =
        "Please provide a project brief with at least 20 characters.";
    } else if (formData.projectBrief.trim().length > 3000) {
      newErrors.projectBrief = "Project brief cannot exceed 3,000 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSetupRequired(false);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          projectType: formData.projectType,
          projectLocation: formData.projectLocation.trim(),
          projectArea: formData.projectArea,
          estimatedBudget: formData.estimatedBudget,
          projectBrief: formData.projectBrief.trim(),
          honeypot: formData.honeypot,
          renderedAt: renderedAtRef.current,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmittedSummary({
          name: formData.name.trim(),
          email: formData.email.trim(),
          projectType: formData.projectType,
        });
        setSubmitSuccess(true);
        setFormData(INITIAL_FORM_STATE);
        renderedAtRef.current = Date.now();
      } else {
        if (data.setupRequired) {
          setSetupRequired(true);
          setSubmitError(data.error);
        } else if (data.validationErrors) {
          setErrors(data.validationErrors);
          setSubmitError(data.error || "Please correct the highlighted errors.");
        } else {
          setSubmitError(
            data.error ||
              "Unable to dispatch inquiry. Please try again or email civiarcherdesigns@gmail.com directly."
          );
        }
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Network error occurred while sending your inquiry.";
      setSubmitError(
        `${msg} Please check your connection or reach out to civiarcherdesigns@gmail.com.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmitSuccess(false);
    setSubmittedSummary(null);
    setSubmitError(null);
    setSetupRequired(false);
    setErrors({});
    renderedAtRef.current = Date.now();
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-20 sm:py-28 lg:py-32 bg-[#10110F] text-[#F2F0E9] border-t border-[#262824]"
      aria-label="Contact and Architectural Project Inquiry"
    >
      <Container>
        {/* Section Eyebrow & Framing */}
        <div className="mb-12 lg:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-[#B49A72]" aria-hidden="true" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#B49A72]">
              03 // INQUIRY &amp; COMMISSIONS
            </span>
          </div>
        </div>

        {/* Two-Column Architectural Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16 items-start">
          {/* ========================================================= */}
          {/* LEFT PANEL (5 COLS): Architect Information & Studio Specs */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal variant="horizontal" direction="left" distance={25}>
              <div className="bg-[#191A17] border border-[#2D2E2A] rounded-sm p-6 sm:p-8 lg:p-9 shadow-2xl relative overflow-hidden">
                {/* Subtle top architectural brass hairline */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#B49A72] via-[#BCA078] to-transparent"
                  aria-hidden="true"
                />

                {/* Section Heading */}
                <h2 className="font-display text-2xl sm:text-3xl text-[#F2F0E9] tracking-tight leading-tight mb-4">
                  {contactInfo.heading}
                </h2>

                {/* Description */}
                <p className="text-sm leading-relaxed text-[#AAA9A1] font-sans mb-8">
                  {contactInfo.description}
                </p>

                {/* Information Sections */}
                <div className="space-y-6 border-t border-[#2D2E2A] pt-6 font-sans">
                  {/* Direct Contact */}
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#777870] block mb-1.5">
                      {contactInfo.directEmail ? "DIRECT CONTACT" : "DIRECT CONTACT"}
                    </span>
                    <a
                      href={`mailto:${contactInfo.directEmail}`}
                      className="group inline-flex items-center gap-2 text-sm sm:text-base font-medium text-[#F2F0E9] hover:text-[#B49A72] transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#B49A72] rounded-xs"
                      aria-label={`Send direct email to ${contactInfo.directEmail}`}
                    >
                      <svg
                        className="w-4 h-4 text-[#B49A72] group-hover:translate-x-0.5 transition-transform duration-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="underline decoration-[#34352F] underline-offset-4 group-hover:decoration-[#B49A72]">
                        {contactInfo.directEmail}
                      </span>
                    </a>
                  </div>

                  {/* Operating Timezone */}
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#777870] block mb-1.5">
                      {contactInfo.operatingTimezone.label}
                    </span>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#F2F0E9]">
                          {contactInfo.operatingTimezone.display}
                        </span>
                      </div>
                      {istTime && (
                        <div className="flex items-center gap-2 text-xs font-mono text-[#AAA9A1] mt-0.5">
                          <span
                            className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"
                            aria-hidden="true"
                          />
                          <span>Live Studio Time: {istTime}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Areas of Practice */}
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#777870] block mb-2.5">
                      {contactInfo.areasOfPractice.label}
                    </span>
                    <ul className="grid grid-cols-1 gap-2">
                      {contactInfo.areasOfPractice.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-xs sm:text-sm text-[#AAA9A1]"
                        >
                          <span
                            className="h-1 w-1 rounded-full bg-[#B49A72]"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* ========================================================= */}
          {/* RIGHT PANEL (7 COLS): Architecture Project Inquiry Form  */}
          {/* ========================================================= */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="horizontal" direction="right" distance={25}>
              <div className="bg-[#191A17] border border-[#2D2E2A] rounded-sm p-6 sm:p-8 lg:p-9 shadow-2xl relative">
                {/* Header inside Form Card */}
                <div className="mb-6 pb-5 border-b border-[#2D2E2A]">
                  <h3 className="font-display text-xl sm:text-2xl text-[#F2F0E9] tracking-tight">
                    Project Inquiry
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#AAA9A1] font-sans">
                    Share your requirements, site specifications, or vision below.
                    All inquiries are directly dispatched to Ar. Tausif Raza.
                  </p>
                </div>

                {/* Success Confirmation State */}
                {submitSuccess ? (
                  <div
                    className="py-10 text-center font-sans space-y-5 animate-in fade-in duration-300"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#B49A72]/15 text-[#B49A72] mb-1 border border-[#B49A72]/30">
                      <svg
                        className="h-7 w-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>

                    <h4 className="font-display text-2xl text-[#F2F0E9]">
                      Inquiry Dispatched Successfully
                    </h4>

                    <p className="text-sm text-[#AAA9A1] max-w-md mx-auto leading-relaxed">
                      Thank you
                      {submittedSummary?.name ? `, ${submittedSummary.name}` : ""}.
                      Your inquiry regarding{" "}
                      <span className="text-[#F2F0E9] font-medium">
                        {submittedSummary?.projectType}
                      </span>{" "}
                      has been transmitted to{" "}
                      <span className="text-[#B49A72] font-mono text-xs">
                        {contactInfo.directEmail}
                      </span>
                      . A detailed response will follow shortly.
                    </p>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="inline-flex items-center justify-center px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#111210] bg-[#B49A72] hover:bg-[#C5AB83] transition-colors rounded-sm cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#B49A72]"
                      >
                        Send Another Project Inquiry &rarr;
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Project Inquiry Form */
                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-5 font-sans"
                    aria-label="Architectural Project Inquiry Form"
                  >
                    {/* Bot Honeypot field (hidden from view and assistive tech) */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        opacity: 0,
                        zIndex: -1,
                        pointerEvents: "none",
                        top: "-9999px",
                        left: "-9999px",
                      }}
                    >
                      <label htmlFor="form-honeypot">Leave blank</label>
                      <input
                        id="form-honeypot"
                        type="text"
                        name="honeypot"
                        tabIndex={-1}
                        value={formData.honeypot}
                        onChange={handleChange}
                        autoComplete="off"
                      />
                    </div>

                    {/* Server Error Alert Banner */}
                    {submitError && (
                      <div
                        role="alert"
                        className={`p-4 rounded-sm border text-xs sm:text-sm leading-relaxed ${
                          setupRequired
                            ? "bg-[#222017] border-[#7A6232] text-[#F3E5AB]"
                            : "bg-[#241515] border-[#682323] text-[#F8B4B4]"
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <svg
                            className={`w-4 h-4 mt-0.5 shrink-0 ${
                              setupRequired ? "text-[#DDB358]" : "text-[#E55353]"
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          <div>
                            <p className="font-semibold mb-0.5">
                              {setupRequired
                                ? "Email Provider Setup Notice"
                                : "Delivery Notification"}
                            </p>
                            <p>{submitError}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Field 1 & 2: Name & Email */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="inquiry-name"
                          className="block text-[11px] font-semibold uppercase tracking-wider text-[#F2F0E9] mb-1.5"
                        >
                          Your Name <span className="text-[#B49A72]">*</span>
                        </label>
                        <input
                          id="inquiry-name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Your full name"
                          aria-invalid={!!errors.name}
                          aria-describedby={
                            errors.name ? "inquiry-name-error" : undefined
                          }
                          disabled={isSubmitting}
                          className={`w-full bg-[#10110F] border rounded-xs px-3.5 py-2.5 text-sm text-[#F2F0E9] placeholder-[#777870] outline-none transition-all duration-150 ${
                            errors.name
                              ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                              : "border-[#2D2E2A] focus:border-[#B49A72] focus:ring-1 focus:ring-[#B49A72]"
                          }`}
                        />
                        {errors.name && (
                          <p
                            id="inquiry-name-error"
                            role="alert"
                            className="mt-1 text-xs text-red-400"
                          >
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label
                          htmlFor="inquiry-email"
                          className="block text-[11px] font-semibold uppercase tracking-wider text-[#F2F0E9] mb-1.5"
                        >
                          Email Address <span className="text-[#B49A72]">*</span>
                        </label>
                        <input
                          id="inquiry-email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          aria-invalid={!!errors.email}
                          aria-describedby={
                            errors.email ? "inquiry-email-error" : undefined
                          }
                          disabled={isSubmitting}
                          className={`w-full bg-[#10110F] border rounded-xs px-3.5 py-2.5 text-sm text-[#F2F0E9] placeholder-[#777870] outline-none transition-all duration-150 ${
                            errors.email
                              ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                              : "border-[#2D2E2A] focus:border-[#B49A72] focus:ring-1 focus:ring-[#B49A72]"
                          }`}
                        />
                        {errors.email && (
                          <p
                            id="inquiry-email-error"
                            role="alert"
                            className="mt-1 text-xs text-red-400"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Field 3: Project Type (Dropdown with 17 options) */}
                    <div>
                      <label
                        htmlFor="inquiry-project-type"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-[#F2F0E9] mb-1.5"
                      >
                        Project Type <span className="text-[#B49A72]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="inquiry-project-type"
                          name="projectType"
                          required
                          value={formData.projectType}
                          onChange={handleChange}
                          aria-invalid={!!errors.projectType}
                          aria-describedby={
                            errors.projectType
                              ? "inquiry-project-type-error"
                              : undefined
                          }
                          disabled={isSubmitting}
                          className={`w-full bg-[#10110F] border rounded-xs px-3.5 py-2.5 text-sm text-[#F2F0E9] outline-none appearance-none cursor-pointer transition-all duration-150 pr-10 ${
                            errors.projectType
                              ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                              : "border-[#2D2E2A] focus:border-[#B49A72] focus:ring-1 focus:ring-[#B49A72]"
                          } ${!formData.projectType ? "text-[#777870]" : "text-[#F2F0E9]"}`}
                        >
                          <option value="" disabled className="bg-[#191A17] text-[#777870]">
                            Select your project type
                          </option>
                          {PROJECT_TYPES.map((type) => (
                            <option
                              key={type}
                              value={type}
                              className="bg-[#191A17] text-[#F2F0E9] py-1"
                            >
                              {type}
                            </option>
                          ))}
                        </select>
                        <div
                          className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#AAA9A1]"
                          aria-hidden="true"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                      {errors.projectType && (
                        <p
                          id="inquiry-project-type-error"
                          role="alert"
                          className="mt-1 text-xs text-red-400"
                        >
                          {errors.projectType}
                        </p>
                      )}
                    </div>

                    {/* Field 4 & 5: Project Location & Approximate Area */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {/* Project Location */}
                      <div>
                        <label
                          htmlFor="inquiry-location"
                          className="block text-[11px] font-semibold uppercase tracking-wider text-[#F2F0E9] mb-1.5"
                        >
                          Project Location{" "}
                          <span className="text-[#777870] font-normal lowercase">
                            (optional)
                          </span>
                        </label>
                        <input
                          id="inquiry-location"
                          name="projectLocation"
                          type="text"
                          value={formData.projectLocation}
                          onChange={handleChange}
                          placeholder="City, state, or country"
                          disabled={isSubmitting}
                          className="w-full bg-[#10110F] border border-[#2D2E2A] rounded-xs px-3.5 py-2.5 text-sm text-[#F2F0E9] placeholder-[#777870] outline-none focus:border-[#B49A72] focus:ring-1 focus:ring-[#B49A72] transition-all duration-150"
                        />
                      </div>

                      {/* Approximate Project Area */}
                      <div>
                        <label
                          htmlFor="inquiry-area"
                          className="block text-[11px] font-semibold uppercase tracking-wider text-[#F2F0E9] mb-1.5"
                        >
                          Project Area{" "}
                          <span className="text-[#777870] font-normal lowercase">
                            (optional)
                          </span>
                        </label>
                        <div className="relative">
                          <select
                            id="inquiry-area"
                            name="projectArea"
                            value={formData.projectArea}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className={`w-full bg-[#10110F] border border-[#2D2E2A] rounded-xs px-3.5 py-2.5 text-sm outline-none appearance-none cursor-pointer focus:border-[#B49A72] focus:ring-1 focus:ring-[#B49A72] transition-all duration-150 pr-10 ${
                              !formData.projectArea
                                ? "text-[#777870]"
                                : "text-[#F2F0E9]"
                            }`}
                          >
                            <option
                              value=""
                              className="bg-[#191A17] text-[#777870]"
                            >
                              Select approximate area
                            </option>
                            {PROJECT_AREAS.map((area) => (
                              <option
                                key={area}
                                value={area}
                                className="bg-[#191A17] text-[#F2F0E9] py-1"
                              >
                                {area}
                              </option>
                            ))}
                          </select>
                          <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#AAA9A1]"
                            aria-hidden="true"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Field 6: Estimated Budget (Optional Dropdown in INR) */}
                    <div>
                      <label
                        htmlFor="inquiry-budget"
                        className="block text-[11px] font-semibold uppercase tracking-wider text-[#F2F0E9] mb-1.5"
                      >
                        Estimated Budget{" "}
                        <span className="text-[#777870] font-normal lowercase">
                          (optional)
                        </span>
                      </label>
                      <div className="relative">
                        <select
                          id="inquiry-budget"
                          name="estimatedBudget"
                          value={formData.estimatedBudget}
                          onChange={handleChange}
                          disabled={isSubmitting}
                          className={`w-full bg-[#10110F] border border-[#2D2E2A] rounded-xs px-3.5 py-2.5 text-sm outline-none appearance-none cursor-pointer focus:border-[#B49A72] focus:ring-1 focus:ring-[#B49A72] transition-all duration-150 pr-10 ${
                            !formData.estimatedBudget
                              ? "text-[#777870]"
                              : "text-[#F2F0E9]"
                          }`}
                        >
                          <option
                            value=""
                            className="bg-[#191A17] text-[#777870]"
                          >
                            Select estimated budget
                          </option>
                          {ESTIMATED_BUDGETS.map((budget) => (
                            <option
                              key={budget}
                              value={budget}
                              className="bg-[#191A17] text-[#F2F0E9] py-1"
                            >
                              {budget}
                            </option>
                          ))}
                        </select>
                        <div
                          className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#AAA9A1]"
                          aria-hidden="true"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Field 7: Project Brief */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="inquiry-brief"
                          className="block text-[11px] font-semibold uppercase tracking-wider text-[#F2F0E9]"
                        >
                          Tell Me About Your Project{" "}
                          <span className="text-[#B49A72]">*</span>
                        </label>
                        <span
                          className={`text-[10px] font-mono ${
                            formData.projectBrief.length > 2900
                              ? "text-red-400"
                              : "text-[#777870]"
                          }`}
                        >
                          {formData.projectBrief.length} / 3000
                        </span>
                      </div>
                      <textarea
                        id="inquiry-brief"
                        name="projectBrief"
                        rows={5}
                        required
                        value={formData.projectBrief}
                        onChange={handleChange}
                        placeholder="Describe your vision, site conditions, design preferences, requirements, and expected timeline..."
                        aria-invalid={!!errors.projectBrief}
                        aria-describedby={
                          errors.projectBrief
                            ? "inquiry-brief-error"
                            : undefined
                        }
                        disabled={isSubmitting}
                        className={`w-full bg-[#10110F] border rounded-xs px-3.5 py-2.5 text-sm text-[#F2F0E9] placeholder-[#777870] outline-none transition-all duration-150 resize-y min-h-[120px] ${
                          errors.projectBrief
                            ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-[#2D2E2A] focus:border-[#B49A72] focus:ring-1 focus:ring-[#B49A72]"
                        }`}
                      />
                      {errors.projectBrief && (
                        <p
                          id="inquiry-brief-error"
                          role="alert"
                          className="mt-1 text-xs text-red-400"
                        >
                          {errors.projectBrief}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#111210] bg-[#B49A72] hover:bg-[#C5AB83] active:bg-[#9E855F] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-xs shadow-md cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#B49A72] focus-visible:ring-offset-[#191A17]"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#111210]"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            <span>Transmitting Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Project Inquiry</span>
                            <span aria-hidden="true">&rarr;</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
