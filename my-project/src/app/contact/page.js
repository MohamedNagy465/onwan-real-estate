
"use client";

import { useState } from "react";
import Link from "next/link";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function update(field) {
    return (event) => {
      setForm((current) => ({
        ...current,
        [field]: event.target.value,
      }));

      setErrors((current) => ({
        ...current,
        [field]: "",
      }));
    };
  }

  function validate() {
    const next = {};

    if (form.name.trim().length < 2) {
      next.name = "من فضلك أدخل اسمًا صحيحًا.";
    }

    if (!EMAIL_PATTERN.test(form.email.trim())) {
      next.email = "من فضلك أدخل بريدًا إلكترونيًا صحيحًا.";
    }

    if (form.message.trim().length < 10) {
      next.message = "يجب ألا تقل الرسالة عن 10 أحرف.";
    }

    return next;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const next = validate();
    setErrors(next);

    if (Object.keys(next).length > 0) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: form.message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("فشل إرسال الرسالة");
      }

      setStatus("sent");
      setForm(INITIAL_FORM);
      setErrors({});
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
    }
  }

  const inputClass = (hasError) =>
    `mt-2 w-full rounded-lg border bg-white px-4 py-3 text-slate-900 shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
      hasError ? "border-rose-400" : "border-slate-300"
    }`;

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-slate-50 px-4 py-14 text-slate-900 sm:px-6"
    >
      <div className="mx-auto max-w-3xl">
        {/* Page heading */}
        <h1
          data-aos="fade-down"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          تواصل معنا
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="150"
          className="mt-3 max-w-xl leading-8 text-slate-600"
        >
          هل لديك استفسار بخصوص أحد العقارات أو خدماتنا؟
          أرسل لنا رسالتك وسنتواصل معك في أقرب وقت ممكن.
        </p>

        {/* Contact form card */}
        <div
          data-aos="fade-up"
          data-aos-delay="250"
          className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
        >
          {status === "sent" ? (
            <div role="status" className="py-8 text-center">
              <div
                data-aos="zoom-in"
                className="mb-4 text-5xl"
              >
                ✓
              </div>

              <h2
                data-aos="fade-up"
                data-aos-delay="100"
                className="text-2xl font-bold text-slate-900"
              >
                تم إرسال رسالتك بنجاح
              </h2>

              <p
                data-aos="fade-up"
                data-aos-delay="200"
                className="mx-auto mt-3 max-w-md leading-8 text-slate-600"
              >
                شكرًا لتواصلك معنا. سنقوم بالرد عليك عبر البريد
                الإلكتروني الذي أدخلته.
              </p>

              <div
                data-aos="fade-up"
                data-aos-delay="300"
                className="mt-6 flex flex-wrap justify-center gap-3"
              >
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="rounded-lg border border-slate-300 px-5 py-2.5 font-semibold text-slate-800 transition hover:border-blue-700 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  إرسال رسالة أخرى
                </button>

                <Link
                  href="/#properties"
                  className="rounded-lg bg-blue-700 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  تصفح العقارات
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-5"
            >
              {status === "error" && (
                <p
                  role="alert"
                  data-aos="fade-down"
                  className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800"
                >
                  تعذر إرسال رسالتك. تحقق من اتصال الإنترنت وحاول مرة أخرى.
                </p>
              )}

              {/* Name and Email */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div data-aos="fade-up" data-aos-delay="100">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-700"
                  >
                    الاسم بالكامل
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="أدخل اسمك"
                    value={form.name}
                    onChange={update("name")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? "name-error" : undefined
                    }
                    className={inputClass(errors.name)}
                  />

                  {errors.name && (
                    <p
                      id="name-error"
                      className="mt-1.5 text-sm text-rose-700"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div data-aos="fade-up" data-aos-delay="200">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    البريد الإلكتروني
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    dir="ltr"
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={update("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "email-error" : undefined
                    }
                    className={inputClass(errors.email)}
                  />

                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-1.5 text-sm text-rose-700"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div data-aos="fade-up" data-aos-delay="250">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-slate-700"
                >
                  رقم الهاتف{" "}
                  <span className="text-slate-500">(اختياري)</span>
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  dir="ltr"
                  placeholder="05xxxxxxxx"
                  value={form.phone}
                  onChange={update("phone")}
                  className={inputClass(false)}
                />
              </div>

              {/* Message */}
              <div data-aos="fade-up" data-aos-delay="300">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-slate-700"
                >
                  رسالتك
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="اكتب استفسارك أو رسالتك هنا..."
                  value={form.message}
                  onChange={update("message")}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  className={inputClass(errors.message)}
                />

                {errors.message && (
                  <p
                    id="message-error"
                    className="mt-1.5 text-sm text-rose-700"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <div data-aos="fade-up" data-aos-delay="400">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-lg bg-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
                >
                  {status === "sending"
                    ? "جارٍ إرسال الرسالة..."
                    : "إرسال الرسالة"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
