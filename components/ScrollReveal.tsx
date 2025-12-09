"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  offset?: string;
  delay?: number;
  once?: boolean;
};

export default function ScrollReveal({
  children,
  className,
  offset = "0px",
  delay = 0,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(() => {
              element.classList.add("scroll-reveal-visible");
            });
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            element.classList.remove("scroll-reveal-visible");
          }
        });
      },
      {
        root: null,
        rootMargin: offset,
        threshold: 0.1,
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [offset, once]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={clsx("scroll-reveal", className)}
    >
      {children}
    </div>
  );
}
