"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [note, setNote] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    setNote("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("sent");
        setNote(json.message || "Message sent. I'll get back to you soon.");
        form.reset();
      } else {
        setStatus("error");
        setNote(json.message || "Something went wrong. Try emailing me directly.");
      }
    } catch {
      setStatus("error");
      setNote("Network error. Try emailing me directly.");
    }
  }

  const field =
    "w-full border-[1.5px] border-ink bg-card px-4 py-3 text-ink placeholder:text-mute/70 outline-none shadow-[3px_3px_0_rgba(23,28,23,0.15)] transition-shadow focus:shadow-[3px_3px_0_#2e7d5b]";

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
      <input
        name="name"
        placeholder="Name"
        aria-label="Name"
        required
        className={field}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        aria-label="Email"
        required
        className={field}
      />
      <textarea
        name="message"
        placeholder="Tell me about it…"
        aria-label="Message"
        rows={4}
        required
        className={`${field} resize-none sm:col-span-2`}
      />
      <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
        <button
          data-magnet
          type="submit"
          disabled={status === "sending"}
          className="btn-ink px-7 py-3 font-mono text-xs font-semibold uppercase tracking-[0.25em] disabled:pointer-events-none disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {note && (
          <p
            role="status"
            className={`font-hand text-xl ${status === "error" ? "text-red-700" : "text-forest"}`}
          >
            {note}
          </p>
        )}
      </div>
    </form>
  );
}
