"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const SOFT_CLOSE = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

const MODULES = [
  {
    id: "gallery-towers",
    image: "/1.png",
    label: "Display module",
    title: "Gallery towers",
    text: "Tall glazed storage for handbags, shoes, or folded cashmere that deserves visible order.",
    points: ["Smoked glass", "Bronze hardware", "Even reveal lines"],
  },
  {
    id: "drawer-banks",
    image: "/5.png",
    label: "Storage density",
    title: "Soft-close drawer banks",
    text: "Deep drawer modules for accessories and layered organization with a premium close feel.",
    points: ["Jewelry trays", "Valet depth", "Silent close"],
  },
  {
    id: "reach-in-kit",
    image: "/custom-closet-white-wood.webp",
    label: "Light finish",
    title: "Reach-in rhythm kit",
    text: "A lighter oak composition that keeps small rooms open while preserving enough grain to feel bespoke.",
    points: ["Mirror ready", "Bench niche", "Daily-wear zone"],
  },
  {
    id: "design-pass",
    image: "/abstract-sketch-design-of-interior-walk-in-closet.jpg",
    label: "Planning layer",
    title: "Concept sketch pass",
    text: "Early sketching for circulation, hanging heights, and lighting channels before the room is finalized.",
    points: ["3D planning", "Hardware mapping", "Install sequencing"],
  },
];

export default function ModularGrid({ onConsult }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 [content-visibility:auto] [contain-intrinsic-size:900px]">
      {MODULES.map((module, index) => (
        <motion.article
          key={module.id}
          className="overflow-hidden rounded-[1.85rem] border border-white/55 bg-[rgba(255,250,242,0.82)] shadow-[0_30px_80px_-50px_rgba(24,18,13,0.45)] backdrop-blur-xl"
          initial={{ opacity: 0, y: 28 }}
          transition={{ ...SOFT_CLOSE, delay: index * 0.06 }}
          viewport={{ amount: 0.18, once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              alt={module.title}
              className="object-cover"
              fill
              quality={70}
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 24vw"
              src={module.image}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0)_30%,rgba(24,18,13,0.14)_100%)]" />
          </div>

          <div className="space-y-4 p-5">
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-bronze">
              {module.label}
            </p>
            <h3 className="font-serif text-3xl leading-none tracking-[-0.03em] text-ink">
              {module.title}
            </h3>
            <p className="text-sm leading-7 text-smoke">{module.text}</p>
            <div className="flex flex-wrap gap-2">
              {module.points.map((point) => (
                <span
                  key={point}
                  className="rounded-full border border-[rgba(24,18,13,0.08)] bg-white/70 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-smoke"
                >
                  {point}
                </span>
              ))}
            </div>
            <button
              className="tactile-control w-full rounded-full border border-[rgba(24,18,13,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(231,220,203,0.96))] px-4 py-3 text-sm font-semibold text-ink"
              onClick={onConsult}
              type="button"
            >
              Request this module
            </button>
          </div>
        </motion.article>
      ))}
    </div>
  );
}