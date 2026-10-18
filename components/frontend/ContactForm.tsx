'use client';

import { FormEvent, useState } from 'react';

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialForm: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof ContactFormData, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitted(false);
  }

  function validateForm() {
    const nextErrors: typeof errors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Please enter your name.';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!form.subject.trim()) {
      nextErrors.subject = 'Please enter a subject.';
    }

    if (!form.message.trim()) {
      nextErrors.message = 'Please enter your message.';
    } else if (form.message.trim().length < 10) {
      nextErrors.message = 'Your message must be at least 10 characters.';
    }

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateForm();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    // Frontend demonstration only.
    // Connect an email service or backend before production.
    setSubmitted(true);
    setForm(initialForm);
    setErrors({});
  }

  const inputClass =
    'mt-2 w-full border border-[#271522]/15 bg-white/60 px-4 py-3.5 text-sm text-[#271522] outline-none transition-colors placeholder:text-[#171719]/35 focus:border-[#C5A46D] focus:ring-1 focus:ring-[#C5A46D]';

  const labelClass = 'block text-xs font-semibold uppercase tracking-[0.16em] text-[#271522]';

  return (
    <div>
      {submitted && (
        <div role="status" className="mb-7 border border-[#C5A46D]/60 bg-[#C5A46D]/10 p-5">
          <p className="font-semibold text-[#271522]">Thank you for reaching out.</p>
          <p className="mt-2 text-sm leading-6 text-[#171719]/70">
            This is a frontend demonstration. Your message has not been sent. Please use the direct
            contact details for now.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Your name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(event) => updateField('name', event.target.value)}
              placeholder="Enter your full name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={inputClass}
            />
            {errors.name && (
              <p id="name-error" className="mt-2 text-sm text-red-700">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(event) => updateField('email', event.target.value)}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={inputClass}
            />
            {errors.email && (
              <p id="email-error" className="mt-2 text-sm text-red-700">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="subject" className={labelClass}>
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={form.subject}
            onChange={(event) => updateField('subject', event.target.value)}
            placeholder="What would you like to discuss?"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className={inputClass}
          />
          {errors.subject && (
            <p id="subject-error" className="mt-2 text-sm text-red-700">
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Your message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={form.message}
            onChange={(event) => updateField('message', event.target.value)}
            placeholder="Tell me about your project, idea, or enquiry..."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`${inputClass} resize-y`}
          />
          {errors.message && (
            <p id="message-error" className="mt-2 text-sm text-red-700">
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-3 bg-[#271522] px-7 py-4 text-sm font-semibold text-[#F6F0E8] transition-colors hover:bg-[#C5A46D] hover:text-[#271522] sm:w-auto"
        >
          Send enquiry
          <span aria-hidden="true">↗</span>
        </button>

        <p className="text-xs leading-6 text-[#171719]/50">
          Please note: the form is not connected to an email service yet. No information is
          transmitted or stored.
        </p>
      </form>
    </div>
  );
}
