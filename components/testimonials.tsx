/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const animations = {
  featured: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
  },

  wide: {
    initial: { opacity: 0, y: -80 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 80 },
  },

  left: {
    initial: { opacity: 0, x: 80 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -80 },
  },

  right: {
    initial: { opacity: 0, y: 80 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -80 },
  },
};

const reviews = [
  {
    name: "isobelh.art",
    username: "@isobelh_art",
    body: "I've been looking everywhere and have settled on Upscayl. It's free, which is a definite bonus, but it also seems better than all the paid ones I tried the trial of!",
    img: "https://unavatar.io/twitter/isobelh_art",
  },
  {
    name: "J. Laren",
    username: "@jacoblaren",
    body: "Upscayl is free and effective if you simply want to upscale with minimal shifts.",
    img: "https://unavatar.io/twitter/jacoblaren",
  },
  {
    name: "José Julio Cuairán",
    username: "@ai_artinfocus",
    body: "I tell you one that you have not mentioned and it is excellent. Besides, it can be run locally, which is good for your security and privacy.",
    img: "https://unavatar.io/twitter/ai_artinfocus",
  },
  {
    name: "Greg Bergé",
    username: "@gregberge",
    body: "Upscayl is a free and Open Source alternative to @Magnific_AI. I tested it, and it's stunning 🤯",
    img: "https://unavatar.io/twitter/gregberge",
  },
  {
    name: "nolimitlearn",
    username: "@nolimitlearn",
    body: "Don't want to pay $40/month for Magnific? I will use Upscayl for free.",
    img: "https://unavatar.io/twitter/nolimitlearn",
  },
  {
    name: "_fw",
    username: "@_fw",
    body: "I use UpScayl pretty much every day and doing so feels like magic every time.",
    img: "https://unavatar.io/twitter/_fw",
  },
  {
    name: "Anirudh Thakur",
    username: "@Itsyopahadiboy",
    body: "There is a great Upscaler that is Open Source and Entirely free. It is called Upscayl.",
    img: "https://unavatar.io/twitter/Itsyopahadiboy",
  },
  {
    name: "Einar Petersen",
    username: "@TheEinarkist",
    body: "A super nice tool for up-scaling I've used to save some old images.",
    img: "https://unavatar.io/twitter/TheEinarkist",
  },
  {
    name: "hard-coded.xyz",
    username: "@hard_coded_xyz",
    body: "Upscayl are proper disruptors. While some people charge monthly, these guys offer it for free.",
    img: "https://unavatar.io/twitter/hard_coded_xyz",
  },
];

type Review = (typeof reviews)[number];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex size-full flex-col justify-between p-6">
      <p id="review-body" className="text-sm">
        “{review.body}”
      </p>

      <div className="flex items-center gap-3">
        <img
          src={review.img}
          alt={review.name}
          className="size-10 rounded-full"
        />

        <div>
          <p className="font-medium">{review.name}</p>
          <p className="text-sm text-muted-foreground">{review.username}</p>
        </div>
      </div>
    </div>
  );
}

type AnimationType = keyof typeof animations;

function AnimatedReview({
  review,
  type,
}: {
  review: Review;
  type: AnimationType;
}) {
  const animation = animations[type];
  return (
    <div className="relative size-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={review.username}
          className="absolute inset-0"
          initial={animation.initial}
          animate={animation.animate}
          exit={animation.exit}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <ReviewCard review={review} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Testimonials() {
  const [visibleReviews, setVisibleReviews] = useState(reviews.slice(0, 4));

  const nextIndex = useRef(4);
  const cycle = useRef(0);

  const getRandomCells = () => {
    const available = [1, 2, 3];
    const count = Math.random() < 0.5 ? 1 : 2;

    const selected: number[] = [];

    while (selected.length < count) {
      const index = Math.floor(Math.random() * available.length);

      selected.push(available[index]);
      available.splice(index, 1);
    }

    return selected;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      cycle.current++;

      setVisibleReviews((current) => {
        const next = [...current];

        // Randomly change 1 or 2 smaller cards
        const changingCells = getRandomCells();

        changingCells.forEach((cellIndex) => {
          next[cellIndex] = reviews[nextIndex.current % reviews.length];

          nextIndex.current++;
        });

        // Change featured card occasionally
        if (cycle.current % 4 === 0) {
          next[0] = reviews[nextIndex.current % reviews.length];

          nextIndex.current++;
        }

        return next;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-8 px-6">
      <h2 className="max-w-md text-center text-5xl font-bold">
        Hey, people seem to love us too!
      </h2>

      <div className="grid min-h-160 w-full grid-cols-4 gap-3">
        <div className="col-span-2 row-span-2 overflow-hidden rounded-xl border [&_#review-body]:text-2xl">
          <AnimatedReview review={visibleReviews[0]} type="featured" />
        </div>

        <div className="col-span-2 overflow-hidden rounded-xl border [&_#review-body]:text-lg">
          <AnimatedReview review={visibleReviews[1]} type="wide" />
        </div>

        <div className="overflow-hidden rounded-xl border">
          <AnimatedReview review={visibleReviews[2]} type="left" />
        </div>

        <div className="overflow-hidden rounded-xl border">
          <AnimatedReview review={visibleReviews[3]} type="right" />
        </div>
      </div>
    </section>
  );
}
