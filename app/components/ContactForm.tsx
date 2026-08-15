"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      company: String(formData.get("company") ?? ""), // honeypot
    };

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error?.message ?? "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="footer-three-form">
        <div className="tw-p-705 tw-rounded-lg bg-main-600 bg-opacity-10 border border-main-600">
          <h3 className="tw-text-xl text-white tw-mb-2">Message sent</h3>
          <p className="text-white">Thanks for reaching out — I&apos;ll get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="footer-three-form">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Honeypot field: hidden from real users via CSS, bots often fill it in */}
          <div style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }} aria-hidden="true">
            <label>
              Company
              <input type="text" name="company" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="col-xl-12">
            <div className="position-relative tw-mb-7">
              <input
                type="text"
                name="name"
                required
                className="form-control bg-transparent shadow-none tw-rounded-lg text-white tw-ps-7 tw-pe-13 tw-placeholder-text-neutral-100 focus-border-main-600 tw-h-18 focus-tw-placeholder-text-hidden tw-placeholder-transition-2"
                placeholder="Your Name"
              />
            </div>
          </div>
          <div className="col-xl-12">
            <div className="position-relative tw-mb-7">
              <input
                type="email"
                name="email"
                required
                className="form-control bg-transparent shadow-none tw-rounded-lg text-white tw-ps-7 tw-pe-13 tw-placeholder-text-neutral-100 focus-border-main-600 tw-h-18 focus-tw-placeholder-text-hidden tw-placeholder-transition-2"
                placeholder="Email Address"
              />
            </div>
          </div>
          <div className="col-xl-12">
            <div className="position-relative tw-mb-7">
              <textarea
                name="message"
                required
                minLength={10}
                className="form-control bg-transparent shadow-none tw-h-196-px tw-rounded-lg text-white tw-ps-7 tw-pe-13 tw-placeholder-text-neutral-100 focus-border-main-600 focus-tw-placeholder-text-hidden tw-placeholder-transition-2"
                placeholder="Message"
              ></textarea>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="contact-button">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="tw-hover-btn bg-main-600 text-heading tw-text-xl fw-bold tw-py-4 tw-px-10 d-inline-flex justify-content-center w-100 hover-text-heading hover-bg-white tw-transition-3 tw-rounded-lg"
              >
                {status === "submitting" ? "sending..." : "submit message"}
              </button>
            </div>
          </div>
          {status === "error" && (
            <div className="col-xl-12">
              <p className="tw-text-sm tw-mt-4" style={{ color: "#ff8080" }}>
                {errorMessage}
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
