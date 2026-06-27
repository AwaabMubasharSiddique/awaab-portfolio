"use client";

import { useEffect } from "react";

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#";

export default function Effects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    console.log(
      "%cAwaab Mubashar Siddique\n%cHiring? gr9awaab@gmail.com",
      "color:#2e7d5b;font-weight:bold;font-size:14px",
      "color:#1d4a36"
    );

    // Reveal on scroll
    const revealEls = document.querySelectorAll("[data-reveal]");
    let reveal: IntersectionObserver | undefined;
    if (reduced) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      reveal = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              reveal?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
      );
      revealEls.forEach((el) => reveal!.observe(el));
    }
    cleanups.push(() => reveal?.disconnect());

    // Section spy for the sidebar nav
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("a[data-nav]")
    );
    const sections = links
      .map((link) => document.getElementById(link.hash.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    const spy = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const id = visible[0].target.id;
        links.forEach((link) =>
          link.classList.toggle("active", link.hash === `#${id}`)
        );
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((section) => spy.observe(section));
    cleanups.push(() => spy.disconnect());

    // Scroll progress bar + back-to-top visibility
    const progress = document.getElementById("progress");
    const toTop = document.getElementById("to-top");
    if (progress || toTop) {
      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          const max =
            document.documentElement.scrollHeight - window.innerHeight;
          progress?.style.setProperty(
            "transform",
            `scaleX(${max > 0 ? window.scrollY / max : 0})`
          );
          toTop?.classList.toggle("show", window.scrollY > 600);
        });
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanups.push(() => window.removeEventListener("scroll", onScroll));
    }

    // Decode-in effect on the hero name
    if (!reduced) {
      document
        .querySelectorAll<HTMLElement>("[data-scramble]")
        .forEach((el, i) => {
          const finalText = el.textContent ?? "";
          const start = window.setTimeout(() => {
            let frame = 0;
            const total = 16;
            const timer = window.setInterval(() => {
              frame++;
              const settled = Math.floor((finalText.length * frame) / total);
              el.textContent =
                finalText.slice(0, settled) +
                Array.from(
                  { length: finalText.length - settled },
                  () =>
                    SCRAMBLE_CHARS[
                      Math.floor(Math.random() * SCRAMBLE_CHARS.length)
                    ]
                ).join("");
              if (frame >= total) {
                clearInterval(timer);
                el.textContent = finalText;
              }
            }, 45);
            cleanups.push(() => clearInterval(timer));
          }, 200 + i * 200);
          cleanups.push(() => clearTimeout(start));
        });
    }

    // Custom cursor: instant dot + lazily trailing ring
    const dot = document.getElementById("cursor-dot");
    const ring = document.getElementById("cursor-ring");
    if (dot && ring && finePointer && !reduced) {
      let tx = -100;
      let ty = -100;
      let rx = -100;
      let ry = -100;
      let raf = 0;
      const loop = () => {
        rx += (tx - rx) * 0.16;
        ry += (ty - ry) * 0.16;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
        if (Math.abs(tx - rx) > 0.2 || Math.abs(ty - ry) > 0.2) {
          raf = requestAnimationFrame(loop);
        } else {
          raf = 0;
        }
      };
      const onMove = (event: PointerEvent) => {
        tx = event.clientX;
        ty = event.clientY;
        dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
        document.body.classList.add("cursor-active");
        if (!raf) raf = requestAnimationFrame(loop);
      };
      const onOver = (event: MouseEvent) => {
        const target = event.target as Element;
        ring.classList.toggle(
          "cursor-grow",
          !!target.closest("a, button, [data-magnet]")
        );
        const onField = !!target.closest("input, textarea");
        dot.classList.toggle("cursor-hidden", onField);
        ring.classList.toggle("cursor-hidden", onField);
      };
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("mouseover", onOver, { passive: true });
      cleanups.push(() => {
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("mouseover", onOver);
        if (raf) cancelAnimationFrame(raf);
        document.body.classList.remove("cursor-active");
      });
    }

    // Magnetic buttons + 3D tilt cards
    if (finePointer && !reduced) {
      document.querySelectorAll<HTMLElement>("[data-magnet]").forEach((el) => {
        const onMove = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          const x = (event.clientX - rect.left - rect.width / 2) * 0.3;
          const y = (event.clientY - rect.top - rect.height / 2) * 0.3;
          el.style.transform = `translate(${x}px, ${y}px)`;
        };
        const onLeave = () => {
          el.style.transform = "";
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        });
      });

      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        const onMove = (event: PointerEvent) => {
          const rect = el.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          el.style.transform = `perspective(700px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg) translateY(-2px)`;
        };
        const onLeave = () => {
          el.style.transform = "";
        };
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <>
      <div className="grid-bg" aria-hidden />
      <div className="noise" aria-hidden />
      <div id="progress" aria-hidden />
      <div id="cursor-dot" aria-hidden />
      <div id="cursor-ring" aria-hidden />
    </>
  );
}
