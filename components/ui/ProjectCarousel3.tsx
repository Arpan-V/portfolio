"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { Clock, Star } from "lucide-react";

import InfiniteCarousel from "./InfiniteCarousel";

import project1 from "./project-1.jpg";
import project2 from "./project-2.jpg";
import project3 from "./project-3.jpg";
import project4 from "./project-4.jpg";

type Showcase = {
  id: number;
  title: string;
  duration: string;
  rating: string;
  image: StaticImageData;
};

const items: Showcase[] = [
  {
    id: 1,
    title: "Neural Dashboard",
    duration: "6 weeks",
    rating: "4.9/5",
    image: project1,
  },
  {
    id: 2,
    title: "Cloud Orchestrator",
    duration: "9 weeks",
    rating: "4.8/5",
    image: project2,
  },
  {
    id: 3,
    title: "API Gateway",
    duration: "4 weeks",
    rating: "4.9/5",
    image: project3,
  },
  {
    id: 4,
    title: "ML Pipeline",
    duration: "7 weeks",
    rating: "4.7/5",
    image: project4,
  },
];

const CARD_W = 210;
const CARD_H = 290;

function ShowcaseCard({ item }: { item: Showcase }) {
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
            text-white
          "
        >
          {item.title}
        </h3>

        <div
          className="
            mt-2
            flex
            items-center
            gap-4
            text-xs
            font-medium
            text-white/90
          "
        >
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {item.duration}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-current" />
            {item.rating}
          </span>
        </div>
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
          items={items}
          speed={60}
          gap={24}
          renderItem={(item) => (
            <ShowcaseCard item={item} />
          )}
        />
      </a>
    </div>
  );
}
