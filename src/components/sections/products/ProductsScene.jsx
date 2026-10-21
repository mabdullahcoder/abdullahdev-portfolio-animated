"use client";

import { motion } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { TIMELINE } from "@/lib/timeline";
import { useVisibility } from "@/hooks/useSceneMotion";
import ProductCard from "./ProductCard";

/** Stacked product deck: each card slides up over the last, which recedes and dims behind it. */
export default function ProductsScene({ shots = {} }) {
  const { enter, exit } = TIMELINE.products;
  const visibility = useVisibility(enter[0], exit[1]);

  return (
    <motion.section aria-label="Projects" style={{ visibility }} className="absolute inset-0">
      {PRODUCTS.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          count={PRODUCTS.length}
          shot={shots[product.id.toLowerCase()]}
        />
      ))}
    </motion.section>
  );
}
