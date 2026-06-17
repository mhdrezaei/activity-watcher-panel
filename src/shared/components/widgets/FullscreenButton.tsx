import React from "react";
import { Maximize, Minimize } from "lucide-react";
import { useFullscreen } from "ahooks";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";

// تغییر مهم: استفاده از HTMLMotionProps برای رفع تداخل تایپ‌های onDrag و سایر انیمیشن‌ها
export interface FullscreenButtonProps extends HTMLMotionProps<"button"> {
  targetRef:
    | React.RefObject<HTMLElement | null>
    | React.MutableRefObject<HTMLElement | null>;
}

export const FullscreenButton: React.FC<FullscreenButtonProps> = ({
  targetRef,
  className = "",
  ...restProps
}) => {
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(targetRef);

  return (
    <motion.button
      type="button"
      onClick={toggleFullscreen}
      title={isFullscreen ? "خروج از تمام صفحه" : "تمام صفحه"}
      className={`h-9 px-4 py-2 has-[>svg]:px-3 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-primary hover:text-white dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-9 cursor-pointer ${className}`}
      whileTap={{ scale: 0.9 }}
      {...restProps}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isFullscreen ? "minimize" : "maximize"}
          initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
          transition={{ duration: 0.25 }}
          className="flex items-center justify-center"
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};
