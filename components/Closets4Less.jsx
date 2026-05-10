"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const SOFT_CLOSE = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

const DEFAULT_FORM = {
  name: "",
  phone: "",
  email: "",
  space: "",
  notes: "",
};

const FINISHES = [
  {
    id: "obsidian-walnut",
    family: "dark",
    heading: "Obsidian Walnut",
    detail: "Smoked glass wardrobes with satin brass pulls and deep storage towers.",
    image: "/1.png",
    badge: "Dark Wood",
    chips: ["Glass fronts", "Valet tray", "Bronze pulls"],
  },
  {
    id: "taupe-oak",
    family: "warm",
    heading: "Taupe Rift Oak",
    detail: "Open shelving and low drawer banks tuned for a calmer, softer morning rhythm.",
    image: "/5.png",
    badge: "Warm Grain",
    chips: ["Drawer banks", "Open stacks", "Soft-close"],
  },
  {
    id: "atelier-panel",
    family: "dark",
    heading: "Atelier Panel",
    detail: "Tall hanging bays and gallery cabinets with a tailored luxury studio presence.",
    image: "/10.png",
    badge: "Gallery Wall",
    chips: ["Tall hangs", "Display doors", "Shadow lines"],
  },
  {
    id: "ivory-oak",
    family: "light",
    heading: "Ivory Oak",
    detail: "A brighter finish palette with enough warmth to keep the room tactile, not sterile.",
    image: "/custom-closet-white-wood.webp",
    badge: "Light Finish",
    chips: ["White oak", "Integrated bench", "Mirror-ready"],
  },
  {
    id: "grand-suite",
    family: "signature",
    heading: "Grand Suite",
    detail: "A full walk-in composition with layered hanging, island storage, and soft ambient lighting.",
    image: "/large-walkin-closet.webp",
    badge: "Signature",
    chips: ["Island ready", "LED channels", "Shoe gallery"],
  },
];

const FILTERS = [
  { id: "all", label: "All Finishes" },
  { id: "dark", label: "Dark Woods" },
  { id: "warm", label: "Warm Grain" },
  { id: "light", label: "Light Oak" },
  { id: "signature", label: "Signature" },
];

const TRUST_STRIP = [
  "Free in-home consultation",
  "Custom-built to the millimeter",
  "Licensed & insured installation",
  "Maricopa County — seven days a week",
];

const PROCESS_STEPS = [
  {
    label: "01",
    title: "Measure the room",
    text: "We map traffic flow, reach zones, and accessory density in person so every module has a reason to exist.",
  },
  {
    label: "02",
    title: "Tune the finish deck",
    text: "You swipe through finish stacks, hardware, and lighting until the room feels materially correct.",
  },
  {
    label: "03",
    title: "Soft-close install",
    text: "Licensed installers protect the home, fit the system cleanly, and leave with every glide dialed in.",
  },
];

const DRAWER_LINKS = [
  { id: "hero", label: "Space Perfected" },
  { id: "finishes", label: "Finish Stacks" },
  { id: "modules", label: "Modular Grid" },
  { id: "consult", label: "Design Consult" },
];

const CONSULT_REASONS = [
  "Free in-home consult",
  "3D layout recommendations",
  "Licensed and insured installation",
  "Most installs finished in one to two days",
];

const ModularGrid = dynamic(() => import("@/components/ModularGrid"), {
  loading: () => <ModularGridSkeleton />,
});

function rotateItems(items, offset) {
  if (!items.length) {
    return items;
  }

  const safeOffset = offset % items.length;

  return [...items.slice(safeOffset), ...items.slice(0, safeOffset)];
}

function C4LMark({ className = "h-5 w-16" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 82 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 4H9.5C5.36 4 2 7.36 2 11.5S5.36 19 9.5 19H18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
      <path
        d="M36 2V22"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
      <path
        d="M27 13H44"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
      <path
        d="M45 2L29 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
      <path
        d="M58 3V21H76"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

function Label({ children }) {
  return (
    <span className="champagne-label inline-flex items-center rounded-full border border-white/50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.32em] shadow-[0_10px_30px_-20px_rgba(24,18,13,0.55)]">
      {children}
    </span>
  );
}

function ModularGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {[0, 1, 2, 3].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/55 p-4 shadow-[0_30px_60px_-40px_rgba(24,18,13,0.45)] backdrop-blur"
        >
          <div className="aspect-[4/5] animate-pulse rounded-[1.35rem] bg-[rgba(195,160,108,0.18)]" />
          <div className="mt-4 h-4 w-24 animate-pulse rounded-full bg-[rgba(138,101,67,0.18)]" />
          <div className="mt-3 h-8 w-3/4 animate-pulse rounded-full bg-[rgba(138,101,67,0.14)]" />
          <div className="mt-4 h-20 animate-pulse rounded-[1rem] bg-[rgba(103,90,75,0.08)]" />
        </div>
      ))}
    </div>
  );
}

function ToastViewport({ toasts, onDismiss }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+6.5rem)] z-50 flex justify-center px-4">
      <div className="flex w-full max-w-md flex-col gap-3">
        <AnimatePresence initial={false}>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="pointer-events-auto overflow-hidden rounded-[1.3rem] border border-[rgba(24,18,13,0.12)] bg-[linear-gradient(180deg,rgba(248,239,223,0.97),rgba(224,202,160,0.96))] p-4 text-ink shadow-[0_28px_50px_-30px_rgba(24,18,13,0.65)]"
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              layout
            >
              <div className="flex items-start gap-3">
                <div className="rounded-full border border-black/10 bg-white/55 p-2 text-bronze">
                  <C4LMark className="h-4 w-10" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-smoke">
                    {toast.label}
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-5">
                    {toast.title}
                  </p>
                </div>
                <button
                  aria-label="Dismiss notification"
                  className="tactile-control flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(231,220,203,0.94))] text-sm font-semibold text-ink"
                  onClick={() => onDismiss(toast.id)}
                  type="button"
                >
                  ×
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function BottomDrawer({ open, onClose, onNavigate }) {
  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            animate={{ opacity: 1 }}
            aria-label="Close menu"
            className="fixed inset-0 z-40 bg-[rgba(24,18,13,0.32)] backdrop-blur-[2px]"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={onClose}
            type="button"
          />
          <motion.div
            animate={{ y: 0 }}
            aria-modal="true"
            className="fixed inset-x-0 bottom-0 z-50 rounded-t-[2rem] border border-white/20 bg-[linear-gradient(180deg,rgba(31,24,19,0.96),rgba(24,18,13,0.98))] px-4 pb-[calc(env(safe-area-inset-bottom)+1.25rem)] pt-3 text-ivory shadow-[0_-20px_50px_-18px_rgba(0,0,0,0.45)]"
            exit={{ y: "100%" }}
            id="bottom-drawer"
            initial={{ y: "100%" }}
            role="dialog"
          >
            <div className="mx-auto max-w-4xl">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full border border-white/10 bg-white/5 p-2 text-gold">
                    <C4LMark className="h-5 w-12" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold/70">
                      Drawer Menu
                    </p>
                    <p className="font-serif text-2xl">Tactile Wardrobe</p>
                  </div>
                </div>
                <button
                  aria-label="Close navigation drawer"
                  className="tactile-control flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] text-lg text-ivory"
                  onClick={onClose}
                  type="button"
                >
                  ×
                </button>
              </div>

              <div className="mb-6 flex justify-center">
                <div className="h-1.5 w-14 rounded-full bg-white/20" />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {DRAWER_LINKS.map((link) => (
                  <button
                    key={link.id}
                    className="tactile-control flex w-full items-center justify-between rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] px-4 py-4 text-left text-base font-semibold text-ivory"
                    onClick={() => onNavigate(link.id)}
                    type="button"
                  >
                    <span>{link.label}</span>
                    <span className="text-gold">↗</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-[1.6rem] border border-white/10 bg-white/6 p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-gold/70">
                  Service Envelope
                </p>
                <p className="mt-3 font-serif text-2xl">Maricopa County luxury installs.</p>
                <p className="mt-2 text-sm leading-6 text-ivory/70">
                  Free consults, finish planning, and licensed installation without the big-box friction.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function usePullToRefresh(containerRef, onRefresh) {
  const refreshActionRef = useRef(onRefresh);
  const refreshingRef = useRef(false);
  const armedRef = useRef(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isArmed, setIsArmed] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);

  refreshActionRef.current = onRefresh;

  useEffect(() => {
    refreshingRef.current = isRefreshing;
  }, [isRefreshing]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return undefined;
    }

    let startY = 0;
    let pulling = false;

    const resetPull = () => {
      armedRef.current = false;
      setIsArmed(false);
      setPullDistance(0);
    };

    const handleStart = (event) => {
      if (refreshingRef.current || container.scrollTop > 0) {
        return;
      }

      startY = event.touches[0]?.clientY ?? 0;
      pulling = true;
    };

    const handleMove = (event) => {
      if (!pulling) {
        return;
      }

      const currentY = event.touches[0]?.clientY ?? startY;
      const delta = currentY - startY;

      if (delta <= 0 || container.scrollTop > 0) {
        resetPull();
        return;
      }

      event.preventDefault();

      const dampedDistance = Math.min(98, delta * 0.55);
      const armed = dampedDistance >= 70;

      armedRef.current = armed;
      setIsArmed(armed);
      setPullDistance(dampedDistance);
    };

    const handleEnd = async () => {
      if (!pulling) {
        return;
      }

      pulling = false;

      if (armedRef.current && !refreshingRef.current) {
        setIsRefreshing(true);
        refreshingRef.current = true;
        setPullDistance(72);
        await refreshActionRef.current?.();
        setIsRefreshing(false);
        refreshingRef.current = false;
      }

      resetPull();
    };

    container.addEventListener("touchstart", handleStart, { passive: true });
    container.addEventListener("touchmove", handleMove, { passive: false });
    container.addEventListener("touchend", handleEnd);
    container.addEventListener("touchcancel", handleEnd);

    return () => {
      container.removeEventListener("touchstart", handleStart);
      container.removeEventListener("touchmove", handleMove);
      container.removeEventListener("touchend", handleEnd);
      container.removeEventListener("touchcancel", handleEnd);
    };
  }, [containerRef]);

  return { isRefreshing, isArmed, pullDistance };
}

function FinishCarousel({ finishes, onConsult }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    setActiveIndex(0);
  }, [finishes]);

  const goTo = (index) => {
    setActiveIndex(Math.max(0, Math.min(index, finishes.length - 1)));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    const dy = Math.abs(e.changedTouches[0].clientY - (touchStartY.current ?? 0));
    if (Math.abs(dx) > 50 && Math.abs(dx) > dy) {
      goTo(activeIndex + (dx > 0 ? 1 : -1));
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  return (
    <>
      {/* ── MOBILE: single-card swipe (< md) ── */}
      <div className="md:hidden mt-7">
        <div
          className="relative overflow-hidden rounded-[2rem]"
          style={{ height: "85vh" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Card track — all cards in a row, translateX to reveal active */}
          <div
            className="flex h-full"
            style={{
              width: `${finishes.length * 100}%`,
              transform: `translateX(${(-activeIndex * 100) / finishes.length}%)`,
              transition: "transform 300ms ease",
            }}
          >
            {finishes.map((finish) => (
              <div
                key={finish.id}
                className="relative flex flex-col overflow-hidden"
                style={{ width: `${100 / finishes.length}%`, flex: "0 0 auto" }}
              >
                {/* Top half: full-bleed image */}
                <div className="relative" style={{ height: "50%" }}>
                  <Image
                    alt={`${finish.heading} closet finish`}
                    className="object-cover"
                    fill
                    quality={75}
                    sizes="100vw"
                    src={finish.image}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,12,9,0)_55%,rgba(17,12,9,0.55)_100%)]" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold backdrop-blur-sm">
                    {finish.badge}
                  </div>
                  <div className="absolute right-4 top-4 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-gold/90">
                    {activeIndex + 1} / {finishes.length}
                  </div>
                </div>

                {/* Bottom half: dark content */}
                <div
                  className="flex flex-1 flex-col p-6"
                  style={{ background: "#1a1410" }}
                >
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-gold/80">
                    Tactile Finish
                  </p>
                  <h3 className="mt-3 font-serif leading-[0.95] tracking-[-0.03em] text-white" style={{ fontSize: "2.75rem" }}>
                    {finish.heading}
                  </h3>
                  <p className="mt-4 text-[0.95rem] leading-7 text-white/70">
                    {finish.detail}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {finish.chips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/15 bg-white/8 px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/80"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <button
                    className="tactile-control mt-auto w-full rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(250,243,232,0.95),rgba(222,199,156,0.96))] px-4 py-3.5 text-sm font-semibold text-ink"
                    onClick={onConsult}
                    type="button"
                  >
                    Book this palette
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Chevrons — vertically centered on the card boundary */}
          {activeIndex > 0 && (
            <button
              aria-label="Previous finish"
              className="tactile-control absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-2xl text-white/80 backdrop-blur-sm"
              onClick={() => goTo(activeIndex - 1)}
              type="button"
            >
              ‹
            </button>
          )}
          {activeIndex < finishes.length - 1 && (
            <button
              aria-label="Next finish"
              className="tactile-control absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-2xl text-white/80 backdrop-blur-sm"
              onClick={() => goTo(activeIndex + 1)}
              type="button"
            >
              ›
            </button>
          )}
        </div>
      </div>

      {/* ── DESKTOP: multi-card horizontal scroll (≥ md) ── */}
      <div className="-mx-4 mt-7 hidden snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 md:flex hide-scrollbar">
        {finishes.map((finish, index) => (
          <motion.article
            key={finish.id}
            className="grain-shell snap-start overflow-hidden rounded-[2rem] border border-white/10 text-white shadow-[0_38px_70px_-44px_rgba(24,18,13,0.9)]"
            initial={{ opacity: 0, y: 24 }}
            transition={{ ...SOFT_CLOSE, delay: index * 0.06 }}
            viewport={{ amount: 0.15, once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex h-full min-w-[22rem] max-w-[22rem] flex-col lg:min-w-[24rem] lg:max-w-[24rem]">
              <div className="relative aspect-[4/5]">
                <Image
                  alt={`${finish.heading} closet finish`}
                  className="object-cover"
                  fill
                  quality={70}
                  sizes="(max-width: 1024px) 22rem, 24rem"
                  src={finish.image}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,12,9,0)_0%,rgba(17,12,9,0.12)_48%,rgba(17,12,9,0.76)_100%)]" />
                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/20 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-gold backdrop-blur-sm">
                  {finish.badge}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-gold/80">
                  Tactile Finish
                </p>
                <h3 className="mt-3 font-serif text-3xl leading-none tracking-[-0.03em]">
                  {finish.heading}
                </h3>
                <p className="mt-4 text-sm leading-7 text-white/72">
                  {finish.detail}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {finish.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/14 bg-white/6 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/80"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <button
                  className="tactile-control mt-6 flex w-full items-center justify-between rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(250,243,232,0.95),rgba(222,199,156,0.96))] px-4 py-3 text-sm font-semibold text-ink"
                  onClick={onConsult}
                  type="button"
                >
                  <span>Book this palette</span>
                  <span className="text-[0.68rem] uppercase tracking-[0.28em] text-smoke">
                    Free consult
                  </span>
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
}

export default function Closets4Less() {
  const scrollRef = useRef(null);
  const modularRef = useRef(null);
  const modularInView = useInView(modularRef, {
    once: true,
    margin: "260px 0px",
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState(DEFAULT_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [refreshCycle, setRefreshCycle] = useState(0);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    if (!drawerOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [drawerOpen]);

  const pushToast = (label, title) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

    setToasts((current) => [...current, { id, label, title }]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 3400);
  };

  const { isRefreshing, isArmed, pullDistance } = usePullToRefresh(
    scrollRef,
    async () => {
      await new Promise((resolve) => {
        window.setTimeout(resolve, 700);
      });

      setRefreshCycle((current) => current + 1);
      pushToast("Finish Deck", "New finish order loaded into the tactile stack.");
    },
  );

  const visibleFinishes = rotateItems(FINISHES, refreshCycle).filter((finish) => {
    if (filter === "all") {
      return true;
    }

    return finish.family === filter;
  });

  const dismissToast = (toastId) => {
    setToasts((current) => current.filter((toast) => toast.id !== toastId));
  };

  const scrollToSection = (sectionId) => {
    const node = document.getElementById(sectionId);

    setDrawerOpen(false);
    node?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const updateField = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleConsultSubmit = (event) => {
    event.preventDefault();

    if (!form.name || !form.phone || !form.email || !form.space) {
      pushToast("Consult Form", "Add name, phone, email, and space type to continue.");
      return;
    }

    setSubmitted(true);
    setForm(DEFAULT_FORM);
    pushToast("Consult Queued", "A Closets4Less designer will confirm within one business day.");
  };

  return (
    <MotionConfig reducedMotion="user" transition={SOFT_CLOSE}>
      <div className="relative h-[100dvh] overflow-hidden bg-ivory text-ink">
        <motion.div
          animate={{
            opacity: pullDistance > 0 || isRefreshing ? 1 : 0,
            y: pullDistance > 0 || isRefreshing ? 0 : -24,
          }}
          className="pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-[calc(env(safe-area-inset-top)+0.45rem)]"
        >
          <motion.div
            className="flex items-center gap-3 rounded-full border border-white/60 bg-white/78 px-4 py-3 shadow-[0_20px_40px_-28px_rgba(24,18,13,0.6)] backdrop-blur-xl"
            style={{ y: pullDistance * 0.16 }}
          >
            <motion.div
              animate={
                isRefreshing
                  ? { rotate: 360 }
                  : { rotate: isArmed ? 18 : 0, scale: isArmed ? 1.02 : 1 }
              }
              transition={
                isRefreshing
                  ? { repeat: Infinity, duration: 1.1, ease: "linear" }
                  : SOFT_CLOSE
              }
            >
              <C4LMark className="h-5 w-14 text-bronze" />
            </motion.div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-smoke">
              {isRefreshing
                ? "Refreshing finish decks"
                : isArmed
                  ? "Release to refresh"
                  : "Pull to refresh C4L"}
            </p>
          </motion.div>
        </motion.div>

        <div
          ref={scrollRef}
          className={`relative h-full overflow-x-hidden pb-[calc(env(safe-area-inset-bottom)+7.25rem)] ${
            drawerOpen ? "overflow-hidden" : "overflow-y-auto"
          }`}
        >
          <header className="pointer-events-none fixed inset-x-0 top-0 z-30 px-4 pt-[calc(env(safe-area-inset-top)+0.75rem)]">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
              <div className="pointer-events-auto glass-panel flex items-center gap-3 rounded-full border border-white/60 px-4 py-3 shadow-[0_24px_60px_-40px_rgba(24,18,13,0.55)]">
                <C4LMark className="h-5 w-14 text-bronze" />
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-smoke">
                    Closets4Less
                  </p>
                  <p className="font-serif text-[1.05rem] leading-none">Tactile Wardrobe</p>
                </div>
              </div>

              <div className="pointer-events-auto hidden rounded-full border border-white/60 bg-white/45 px-4 py-3 text-right text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-smoke shadow-[0_24px_60px_-40px_rgba(24,18,13,0.55)] backdrop-blur-xl sm:block">
                Phoenix · Maricopa County
              </div>
            </div>
          </header>

          <main className="relative">
            <section
              className="scroll-mt-32 px-4 pb-6 pt-[calc(env(safe-area-inset-top)+6.25rem)]"
              id="hero"
            >
              <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1.15fr_0.85fr]">
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="relative order-1 overflow-hidden rounded-[2.25rem] border border-white/35 shadow-[0_40px_80px_-45px_rgba(24,18,13,0.7)]"
                  initial={{ opacity: 0, y: 24 }}
                >
                  <div className="relative min-h-[29rem] sm:min-h-[35rem] lg:min-h-[43rem]">
                    <Image
                      alt="Space Perfected luxury walk-in closet"
                      className="object-cover"
                      fill
                      priority
                      quality={78}
                      sizes="100vw"
                      src="/dressing-room-closet-room-modern-design-3d-rendering.jpg"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(24,18,13,0.12),rgba(24,18,13,0.75))]" />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-8">
                      <Label>Space Perfected</Label>
                      <h1 className="mt-4 max-w-[14ch] font-serif text-[clamp(3rem,12vw,6.75rem)] leading-[0.94] tracking-[-0.04em] text-white">
                        Space
                        <br />
                        Perfected.
                      </h1>
                      <p className="mt-4 max-w-md text-sm leading-7 text-white/78 sm:text-base">
                        Luxury custom closets designed around how you actually live — and installed in under three days.
                      </p>
                      <button
                        className="tactile-control mt-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] px-4 py-3 text-sm font-semibold text-white backdrop-blur-md"
                        onClick={() => scrollToSection("finishes")}
                        type="button"
                      >
                        Swipe the finish stacks
                        <span className="text-gold">↘</span>
                      </button>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="order-2 rounded-[2rem] border border-[rgba(24,18,13,0.08)] bg-[rgba(255,250,242,0.82)] p-5 shadow-[0_30px_80px_-50px_rgba(24,18,13,0.55)] backdrop-blur-xl sm:p-7 lg:p-8"
                  initial={{ opacity: 0, y: 32 }}
                >
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.36em] text-bronze">
                    Why Closets4Less
                  </p>
                  <h2 className="mt-4 max-w-[12ch] font-serif text-4xl leading-none tracking-[-0.03em] text-ink sm:text-5xl">
                    The closet should feel built before it is bought.
                  </h2>
                  <p className="mt-5 text-sm leading-7 text-smoke sm:text-base">
                    Every interaction is positioned for effortless reach, and every motion closes with the calm resistance of premium soft-close hardware.
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {[
                      { value: "3", unit: "day install", detail: "Most systems installed and finished in under 72 hours." },
                      { value: "±1", unit: "mm precision", detail: "Custom-measured to the millimeter. No filler panels." },
                      { value: "11", unit: "finishes", detail: "11 curated tactile finishes. Nothing off the shelf." },
                      { value: "Life", unit: "time warranty", detail: "Every system backed by our full structural guarantee." },
                    ].map((item) => (
                      <div
                        key={item.unit}
                        className="rounded-[1.45rem] border border-[rgba(24,18,13,0.08)] bg-white/55 p-4"
                      >
                        <p className="font-serif text-4xl leading-none text-ink">
                          {item.value}
                          <span className="ml-1 text-xl text-bronze">{item.unit}</span>
                        </p>
                        <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-smoke">
                          {item.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            <section className="px-4 py-3">
              <div className="mx-auto flex max-w-6xl gap-3 overflow-x-auto pb-2 hide-scrollbar">
                {TRUST_STRIP.map((item) => (
                  <div
                    key={item}
                    className="shrink-0 rounded-full border border-[rgba(24,18,13,0.08)] bg-white/60 px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-smoke shadow-[0_16px_30px_-24px_rgba(24,18,13,0.38)] backdrop-blur"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="scroll-mt-28 px-4 py-8 sm:py-12" id="finishes">
              <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <Label>Finish Gallery</Label>
                    <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-0.03em] text-ink sm:text-5xl">
                      Closet finishes that snap like a modular rail.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-smoke sm:text-base">
                      Swipe through our curated finish families — dark woods, warm grain, light oak, and signature walk-ins. Find the one that feels right.
                    </p>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
                    {FILTERS.map((item) => {
                      const active = filter === item.id;

                      return (
                        <button
                          key={item.id}
                          className={`tactile-control shrink-0 rounded-full border px-4 py-3 text-sm font-semibold ${
                            active
                              ? "border-[rgba(24,18,13,0.1)] bg-[linear-gradient(180deg,rgba(241,227,197,0.95),rgba(198,159,96,0.98))] text-ink"
                              : "border-[rgba(24,18,13,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(231,220,203,0.94))] text-smoke"
                          }`}
                          onClick={() => setFilter(item.id)}
                          type="button"
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <FinishCarousel
                  finishes={visibleFinishes}
                  onConsult={() => scrollToSection("consult")}
                />

                <p className="mt-4 text-sm leading-6 text-smoke">
                  Pull down from the top to shuffle the deck and discover new finish combinations.
                </p>
              </div>
            </section>

            <section className="scroll-mt-28 px-4 py-8 sm:py-12" id="modules" ref={modularRef}>
              <div className="mx-auto max-w-6xl">
                <div className="mb-7 max-w-2xl">
                  <Label>Modular Systems</Label>
                  <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-0.03em] text-ink sm:text-5xl">
                    Your Wardrobe, Loaded the Way You Live.
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-smoke sm:text-base">
                    Every finish, every configuration — surfaced the moment you want it. Fast to browse, built to last.
                  </p>
                </div>

                {modularInView ? (
                  <ModularGrid onConsult={() => scrollToSection("consult")} />
                ) : (
                  <ModularGridSkeleton />
                )}
              </div>
            </section>

            <section className="scroll-mt-28 px-4 py-8 sm:py-12" id="consult">
              <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <motion.div
                  className="overflow-hidden rounded-[2rem] border border-[rgba(24,18,13,0.08)] bg-[rgba(255,250,242,0.82)] shadow-[0_30px_80px_-50px_rgba(24,18,13,0.55)] backdrop-blur-xl"
                  initial={{ opacity: 0, y: 32 }}
                  viewport={{ amount: 0.15, once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      alt="Closets4Less design consult environment"
                      className="object-cover"
                      fill
                      quality={72}
                      sizes="(max-width: 1024px) 100vw, 46vw"
                      src="/new-luxury-home.webp"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(24,18,13,0.08),rgba(24,18,13,0.74))]" />
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                      <Label>Soft-Close Workflow</Label>
                      <h2 className="mt-4 max-w-[12ch] font-serif text-4xl leading-none tracking-[-0.03em] text-white">
                        The consult should move with the same calm resistance as the product.
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-5 p-5 sm:p-6">
                    {PROCESS_STEPS.map((step) => (
                      <div
                        key={step.label}
                        className="rounded-[1.4rem] border border-[rgba(24,18,13,0.08)] bg-white/62 p-4"
                      >
                        <div className="flex gap-4">
                          <div className="font-serif text-4xl leading-none text-bronze">
                            {step.label}
                          </div>
                          <div>
                            <p className="font-serif text-2xl leading-none text-ink">
                              {step.title}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-smoke">
                              {step.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className="overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(29,22,17,0.96),rgba(24,18,13,0.98))] text-ivory shadow-[0_30px_80px_-50px_rgba(24,18,13,0.75)]"
                  initial={{ opacity: 0, y: 32 }}
                  viewport={{ amount: 0.15, once: true }}
                  whileInView={{ opacity: 1, y: 0 }}
                >
                  <div className="border-b border-white/10 p-5 sm:p-6">
                    <Label>Design Consult</Label>
                    <h2 className="mt-4 font-serif text-4xl leading-none tracking-[-0.03em] text-white">
                      Book the free consult from the bar below, or fill in the form right here.
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-white/68 sm:text-base">
                      No pressure, no obligation. Just a clean request and a fast callback from our design team.
                    </p>
                  </div>

                  <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[0.72fr_1fr]">
                    <div className="space-y-3">
                      {CONSULT_REASONS.map((reason) => (
                        <div
                          key={reason}
                          className="rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-4 text-sm font-semibold text-white/82"
                        >
                          {reason}
                        </div>
                      ))}
                    </div>

                    <div>
                      {submitted ? (
                        <motion.div
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-[1.6rem] border border-white/10 bg-white/6 p-5"
                          initial={{ opacity: 0, y: 14 }}
                        >
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-gold/75">
                            Consult queued
                          </p>
                          <h3 className="mt-3 font-serif text-3xl leading-none text-white">
                            A designer will reach out within one business day.
                          </h3>
                          <p className="mt-4 text-sm leading-7 text-white/68">
                            Your request is staged. Use the finish stacks to refine the mood before the call.
                          </p>
                          <button
                            className="tactile-control mt-6 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(250,243,232,0.95),rgba(222,199,156,0.96))] px-4 py-3 text-sm font-semibold text-ink"
                            onClick={() => scrollToSection("finishes")}
                            type="button"
                          >
                            Review finish stacks
                          </button>
                        </motion.div>
                      ) : (
                        <form className="space-y-4" onSubmit={handleConsultSubmit}>
                          <input
                            autoComplete="name"
                            className="min-h-12 w-full rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-3 text-base text-white placeholder:text-white/36 outline-none transition focus:border-gold/70 focus:bg-white/10"
                            onChange={(event) => updateField("name", event.target.value)}
                            placeholder="First and last name"
                            type="text"
                            value={form.name}
                          />
                          <div className="grid gap-4 sm:grid-cols-2">
                            <input
                              autoComplete="tel"
                              className="min-h-12 w-full rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-3 text-base text-white placeholder:text-white/36 outline-none transition focus:border-gold/70 focus:bg-white/10"
                              inputMode="tel"
                              onChange={(event) => updateField("phone", event.target.value)}
                              placeholder="Phone number"
                              type="tel"
                              value={form.phone}
                            />
                            <input
                              autoComplete="email"
                              className="min-h-12 w-full rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-3 text-base text-white placeholder:text-white/36 outline-none transition focus:border-gold/70 focus:bg-white/10"
                              onChange={(event) => updateField("email", event.target.value)}
                              placeholder="Email address"
                              type="email"
                              value={form.email}
                            />
                          </div>
                          <select
                            className="min-h-12 w-full rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-3 text-base text-white outline-none transition focus:border-gold/70 focus:bg-white/10"
                            onChange={(event) => updateField("space", event.target.value)}
                            value={form.space}
                          >
                            <option className="text-ink" value="">
                              Space type
                            </option>
                            <option className="text-ink" value="Walk-In Closet">
                              Walk-In Closet
                            </option>
                            <option className="text-ink" value="Reach-In Closet">
                              Reach-In Closet
                            </option>
                            <option className="text-ink" value="Primary Wardrobe">
                              Primary Wardrobe
                            </option>
                            <option className="text-ink" value="Pantry or Laundry">
                              Pantry or Laundry
                            </option>
                          </select>
                          <textarea
                            className="min-h-32 w-full rounded-[1.35rem] border border-white/10 bg-white/6 px-4 py-3 text-base text-white placeholder:text-white/36 outline-none transition focus:border-gold/70 focus:bg-white/10"
                            onChange={(event) => updateField("notes", event.target.value)}
                            placeholder="Project notes, finish preferences, or installation timing"
                            value={form.notes}
                          />
                          <button
                            className="tactile-control flex w-full items-center justify-between rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(250,243,232,0.95),rgba(222,199,156,0.96))] px-5 py-4 text-sm font-semibold text-ink"
                            type="submit"
                          >
                            <span>Book free consult</span>
                            <span className="text-[0.68rem] uppercase tracking-[0.3em] text-smoke">
                              No obligation
                            </span>
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </section>

            <footer className="px-4 pb-10 pt-2">
              <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-[2rem] border border-[rgba(24,18,13,0.08)] bg-white/58 p-5 shadow-[0_30px_80px_-55px_rgba(24,18,13,0.5)] backdrop-blur-xl sm:flex-row sm:items-end sm:justify-between sm:p-6">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-smoke">
                    Closets4Less
                  </p>
                  <p className="mt-2 font-serif text-3xl leading-none text-ink">
                    Luxury closet systems for Maricopa County.
                  </p>
                </div>
                <p className="max-w-xl text-sm leading-6 text-smoke">
                  Serving all of Maricopa County. No-obligation consults, licensed installation, and a product line built to live as long as the home does.
                </p>
              </div>
            </footer>
          </main>
        </div>

        <ToastViewport onDismiss={dismissToast} toasts={toasts} />

        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
          <div className="pointer-events-auto flex w-full max-w-4xl items-center gap-3 rounded-[1.75rem] border border-white/12 bg-[rgba(24,18,13,0.9)] p-3 shadow-[0_26px_50px_-18px_rgba(24,18,13,0.7)] backdrop-blur-xl">
            <button
              aria-controls="bottom-drawer"
              aria-expanded={drawerOpen}
              className="tactile-control flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] text-base font-semibold text-white"
              onClick={() => setDrawerOpen(true)}
              type="button"
            >
              ≡
            </button>
            <button
              className="tactile-control flex-1 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] px-4 py-3 text-sm font-semibold text-white"
              onClick={() => scrollToSection("finishes")}
              type="button"
            >
              Browse finish stacks
            </button>
            <button
              className="tactile-control flex-1 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(250,243,232,0.96),rgba(222,199,156,0.96))] px-4 py-3 text-sm font-semibold text-ink"
              onClick={() => scrollToSection("consult")}
              type="button"
            >
              Book free consult
            </button>
          </div>
        </div>

        <BottomDrawer
          onClose={() => setDrawerOpen(false)}
          onNavigate={scrollToSection}
          open={drawerOpen}
        />
      </div>
    </MotionConfig>
  );
}