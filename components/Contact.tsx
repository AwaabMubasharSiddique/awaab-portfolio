"use client";

import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });
    const data = await res.json();
    setStatus(data.message || (res.ok ? "Message sent!" : "Something went wrong"));
    if (res.ok) form.reset();
  }

  return (
    <section id="contact" className="container-section">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 gradient-text">Contact</h2>
      <form onSubmit={handleSubmit} className="grid gap-4 max-w-xl">
        <input
          name="name"
          placeholder="Name"
          required
          className="w-full rounded-md bg-zinc-900/50 border border-white/10 px-4 py-2.5 outline-none focus:border-white/30 transition"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full rounded-md bg-zinc-900/50 border border-white/10 px-4 py-2.5 outline-none focus:border-white/30 transition"
        />
        <textarea
          name="message"
          placeholder="Message"
          rows={5}
          required
          disabled={false}
          className="w-full rounded-md bg-zinc-900/50 border border-white/10 px-4 py-2.5 outline-none focus:border-white/30 transition resize-none"
        />
        <button
          type="submit"
          className="justify-self-start px-5 py-2.5 rounded-md bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 text-white font-medium glow transition-transform hover:scale-[1.02] active:scale-[.99]"
        >
          Send
        </button>
        {status && <p className="text-sm text-zinc-400">{status}</p>}
      </form>
    </section>
  );
}


