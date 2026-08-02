
"use client";

import Image from "next/image";

import InfiniteCarousel from "@/lib/InfiniteCarousel";
import {
  projectShowcase,
  type ProjectShowcase,
} from "@/data/projectShowcase";

const CARD_W = 210;
const CARD_H = 290;

function ShowcaseCard({ item }: { item: ProjectShowcase }) {
  return (
    <div
      style={{
        width: CARD_W,
        height: CARD_H,
      }}
      className="
        relative
        block
        cursor-pointer
        overflow-hidden
        rounded-[9px]
        border
        bg-card
        shadow-[0_24px_50px_-28px_rgba(0,0,0,0.95)]
      "
    >
      <Image
        src={item.image}
        alt={item.title}
        width={640}
        height={800}
        loading="lazy"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-linear-to-t
          from-black/85
          via-black/25
          to-transparent
        "
      />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3
          className="
            font-display
            text-lg
            font-bold
            leading-[1.2]
            tracking-tight
            text-[#C0C0C0]/97
          "
        >
          {item.title}
        </h3>
      </div>
    </div>
  );
}

export default function ProjectCarousel() {
  return (
    <div className="w-full">
      <div
        className="
          pl-3
          font-display
          text-sm
          uppercase
          tracking-widest
          text-silver/80
        "
      >
        <span>Featured Work</span>
      </div>

      <a
        href="#projects"
        className="
          marquee-mask-x
          relative
          mt-4
          block
          overflow-hidden
          rounded-3xl
          border
          border-border/60
          bg-surface/40
          p-4
        "
      >
        <InfiniteCarousel
          items={projectShowcase}
          speed={60}
          gap={24}
          renderItem={(item) => <ShowcaseCard item={item} />}
        />
      </a>
    </div>
  );
}
