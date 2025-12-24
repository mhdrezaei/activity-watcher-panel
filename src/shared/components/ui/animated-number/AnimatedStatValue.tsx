"use client";

import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  value?: number;
  suffix?: string;
  isLoading?: boolean;
}

export function AnimatedStatValue({ value, suffix = "", isLoading }: Props) {
  return (
    <div className="min-h-5 flex items-center">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-1 text-primary"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
          </motion.div>
        ) : (
          <motion.span
            key="value"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-primary text-sm font-bold"
          >
            {value}
            {suffix}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
