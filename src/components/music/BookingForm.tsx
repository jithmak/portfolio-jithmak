"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, AlertCircle, Send, Mail, Loader2 } from "lucide-react";
import { site } from "@/content/site";
import { projectTypes, budgetBands } from "@/content/music";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

interface FormState {
  name: string;
  email: string;
  project: string;
  budget: string;
  timeline: string;
  links: string;
  message: string;
  /** Honeypot — bots fill it, humans never see it. */
  website: string;
}

const EMPTY: FormState = {
  name: "",
  email: "",
  project: projectTypes[0],
  budget: budgetBands[0],
  timeline: "",
  links: "",
  message: "",
  website: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function BookingForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Please tell me your name.";
    if (!form.email.trim()) e.email = "I need an email to reply to.";
    else if (!EMAIL_RE.test(form.email.trim()))
      e.email = "That email address does not look right.";
    if (form.message.trim().length < 20)
      e.message = "A couple of sentences about the project, at least.";
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const set =
    (key: keyof FormState) =>
    (
      ev: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [key]: ev.target.value }));

  const blur = (key: keyof FormState) => () =>
    setTouched((t) => ({ ...t, [key]: true }));

  /** Everything the visitor typed, formatted for either transport. */
  const buildBody = () =>
    [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Project type: ${form.project}`,
      `Budget: ${form.budget}`,
      `Timeline: ${form.timeline || "Not specified"}`,
      `Links: ${form.links || "None"}`,
      "",
      "About the project:",
      form.message,
    ].join("\n");

  /**
   * Fallback when no form endpoint is configured (or the request fails):
   * open the visitor's mail client with everything pre-filled. Nothing they
   * typed is ever lost.
   */
  const mailtoHref = () =>
    `mailto:${site.email}?subject=${encodeURIComponent(
      `Booking enquiry — ${form.project}`,
    )}&body=${encodeURIComponent(buildBody())}`;

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    // Honeypot tripped — pretend it worked, drop it silently.
    if (form.website) {
      setStatus("sent");
      return;
    }

    if (!site.formEndpoint) {
      window.location.href = mailtoHref();
      setStatus("sent");
      return;
    }

    setStatus("sending");
    setServerError(null);
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          projectType: form.project,
          budget: form.budget,
          timeline: form.timeline,
          links: form.links,
          message: form.message,
          _subject: `Booking enquiry — ${form.project}`,
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("sent");
      setForm(EMPTY);
    } catch {
      setStatus("error");
      setServerError(
        "The form could not send. Use the email button below — everything you typed is already in it.",
      );
    }
  }

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
        className="card-hairline flex flex-col items-start gap-6 p-10 md:p-14"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full border border-[var(--accent)] text-[var(--accent)]">
          <Check size={22} />
        </span>
        <div>
          <h3 className="display text-[length:var(--text-3xl)]">
            {site.formEndpoint ? "Enquiry sent." : "Your email is ready."}
          </h3>
          <p className="mt-4 max-w-[46ch] text-[length:var(--text-base)] leading-relaxed text-[var(--color-muted)]">
            {site.formEndpoint
              ? "Thank you — I read every enquiry personally and usually reply within two working days. If it is urgent, email me directly."
              : "Your mail client should have opened with the details filled in. Press send and I will get back to you within two working days."}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-6 py-3 text-[length:var(--text-sm)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <Mail size={14} />
            {site.email}
          </a>
          <button
            onClick={() => setStatus("idle")}
            className="rounded-full px-6 py-3 text-[length:var(--text-sm)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-bone)]"
          >
            Send another
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7">
      {/* Honeypot */}
      <div aria-hidden className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor="website">Leave this field empty</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={set("website")}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="name"
          label="Your name"
          required
          value={form.name}
          onChange={set("name")}
          onBlur={blur("name")}
          error={touched.name ? errors.name : undefined}
          placeholder="Who am I speaking with?"
          autoComplete="name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={set("email")}
          onBlur={blur("email")}
          error={touched.email ? errors.email : undefined}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField
          id="project"
          label="What do you need?"
          value={form.project}
          onChange={set("project")}
          options={projectTypes}
        />
        <SelectField
          id="budget"
          label="Budget range"
          value={form.budget}
          onChange={set("budget")}
          options={budgetBands}
          hint="Rough is fine — it helps me scope honestly."
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id="timeline"
          label="Timeline"
          value={form.timeline}
          onChange={set("timeline")}
          placeholder="e.g. release in March, or no fixed date"
        />
        <Field
          id="links"
          label="Links"
          value={form.links}
          onChange={set("links")}
          placeholder="Demos, references, previous work"
        />
      </div>

      <TextareaField
        id="message"
        label="About the project"
        required
        value={form.message}
        onChange={set("message")}
        onBlur={blur("message")}
        error={touched.message ? errors.message : undefined}
        placeholder="What are you making, what does it need to sound like, and where are you in the process? References are welcome."
      />

      <AnimatePresence>
        {status === "error" && serverError && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-start gap-2.5 rounded-lg border border-[#7c2d3a] bg-[#7c2d3a]/12 px-4 py-3 text-[length:var(--text-sm)] text-[#f0a5a5]"
            role="alert"
          >
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            {serverError}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap items-center gap-5 pt-2">
        <MagneticButton
          type="submit"
          variant="solid"
          disabled={status === "sending"}
          icon={
            status === "sending" ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Send size={15} />
            )
          }
        >
          {status === "sending" ? "Sending" : "Send enquiry"}
        </MagneticButton>

        {status === "error" && (
          <a
            href={mailtoHref()}
            className="inline-flex items-center gap-2 text-[length:var(--text-sm)] text-[var(--accent)] underline underline-offset-4"
          >
            <Mail size={14} />
            Send it by email instead
          </a>
        )}

        <p className="text-[length:var(--text-xs)] text-[var(--color-faint)]">
          Usually replies within two working days.
        </p>
      </div>
    </form>
  );
}

/* -------------------------------------------------------------------------- */
/* Field primitives                                                           */
/* -------------------------------------------------------------------------- */

const fieldBase =
  "w-full rounded-lg border bg-[var(--color-ink-2)] px-4 py-3.5 text-[length:var(--text-sm)] " +
  "text-[var(--color-bone)] placeholder:text-[var(--color-faint)] transition-colors duration-200 " +
  "focus:outline-none focus:border-[var(--accent)]";

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="eyebrow flex items-center gap-1.5">
      {children}
      {required && (
        <span className="text-[var(--accent)]" aria-hidden>
          *
        </span>
      )}
    </label>
  );
}

function ErrorText({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p
      id={id}
      role="alert"
      className="flex items-center gap-1.5 text-[length:var(--text-xs)] text-[#e08585]"
    >
      <AlertCircle size={12} />
      {children}
    </p>
  );
}

function Field({
  id,
  label,
  error,
  required,
  hint,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(
          fieldBase,
          error ? "border-[#8e3b46]" : "border-[var(--color-line)]",
        )}
        {...rest}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="text-[length:var(--text-xs)] text-[var(--color-faint)]">
          {hint}
        </p>
      )}
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

function TextareaField({
  id,
  label,
  error,
  required,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea
        id={id}
        name={id}
        rows={6}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          fieldBase,
          "resize-y leading-relaxed",
          error ? "border-[#8e3b46]" : "border-[var(--color-line)]",
        )}
        {...rest}
      />
      {error && <ErrorText id={`${id}-error`}>{error}</ErrorText>}
    </div>
  );
}

function SelectField({
  id,
  label,
  options,
  hint,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  options: readonly string[];
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        name={id}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={cn(fieldBase, "border-[var(--color-line)] cursor-pointer appearance-none")}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%2385858f' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 1rem center",
        }}
        {...rest}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[var(--color-ink-2)]">
            {o}
          </option>
        ))}
      </select>
      {hint && (
        <p id={`${id}-hint`} className="text-[length:var(--text-xs)] text-[var(--color-faint)]">
          {hint}
        </p>
      )}
    </div>
  );
}
