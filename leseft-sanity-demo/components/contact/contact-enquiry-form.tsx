'use client';

import { useState } from 'react';

type Field = 'name' | 'email' | 'subject' | 'message';
type FormValues = Record<Field, string>;
type FormErrors = Partial<Record<Field, string>>;
type FormStatus = 'idle' | 'error' | 'ready';

const initialValues: FormValues = { name: '', email: '', subject: '', message: '' };

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Enter a name with at least 2 characters.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (values.subject.trim().length < 3) {
    errors.subject = 'Enter a subject with at least 3 characters.';
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Enter a message with at least 10 characters.';
  }

  return errors;
}

export function ContactEnquiryForm({ recipient }: { recipient: string }) {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  function update(field: Field, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus('idle');
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstInvalid = Object.keys(nextErrors)[0] as Field | undefined;
    if (firstInvalid) {
      setStatus('error');
      document.getElementById(firstInvalid)?.focus();
      return;
    }

    const subject = `Enquiry: ${values.subject.trim()}`;
    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      '',
      values.message.trim(),
    ].join('\n');

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('ready');
  }

  const fieldClass =
    'mt-2 w-full rounded-xl border border-navy-900/15 bg-white px-4 py-3 text-sm text-navy-950 focus:border-gold-500';

  return (
    <form onSubmit={handleSubmit} noValidate className="surface-card p-6 sm:p-8">
      <p className="eyebrow">Enquiry form</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-navy-950">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(event) => update('name', event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={fieldClass}
          />
          {errors.name ? <p id="name-error" className="mt-2 text-xs text-red-700">{errors.name}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-semibold text-navy-950">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={values.email}
            onChange={(event) => update('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={fieldClass}
          />
          {errors.email ? <p id="email-error" className="mt-2 text-xs text-red-700">{errors.email}</p> : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="subject" className="text-sm font-semibold text-navy-950">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            value={values.subject}
            onChange={(event) => update('subject', event.target.value)}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            className={fieldClass}
          />
          {errors.subject ? <p id="subject-error" className="mt-2 text-xs text-red-700">{errors.subject}</p> : null}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="text-sm font-semibold text-navy-950">Message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={values.message}
            onChange={(event) => update('message', event.target.value)}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
            className={`${fieldClass} resize-y`}
          />
          {errors.message ? <p id="message-error" className="mt-2 text-xs text-red-700">{errors.message}</p> : null}
        </div>
      </div>

      {status === 'error' ? (
        <div role="alert" className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          Please correct the highlighted fields and try again.
        </div>
      ) : null}

      {status === 'ready' ? (
        <div role="status" className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          <strong className="font-semibold">Enquiry prepared.</strong> Review it in your email application and send it there.
        </div>
      ) : null}

      <button
        type="submit"
        className="mt-7 w-full rounded-full bg-navy-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800 sm:w-auto"
      >
        Prepare enquiry
      </button>
    </form>
  );
}
