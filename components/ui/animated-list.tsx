"use client"

import React, {
  useEffect,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
} from "react"
import { AnimatePresence, motion, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

export function AnimatedListItem({ children }: { children: React.ReactNode }) {
  const animations: MotionProps = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  }

  return (
    <motion.div {...animations} layout className="mx-auto w-full">
      {children}
    </motion.div>
  )
}

export interface AnimatedListProps extends ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode
  delay?: number
  maxVisible?: number
}

export const AnimatedList = React.memo(
  ({
    children,
    className,
    delay = 1000,
    maxVisible = 5,
    ...props
  }: AnimatedListProps) => {
    const [index, setIndex] = useState(0)
    const childrenArray = useMemo(
      () => React.Children.toArray(children),
      [children],
    )

    useEffect(() => {
      const timeout = setTimeout(() => {
        setIndex((prev) => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    }, [index, delay])

    const itemsToShow = useMemo(() => {
      const numToShow = Math.min(index + 1, maxVisible)
      const result: { element: React.ReactNode; key: number }[] = []
      for (let i = 0; i < numToShow; i++) {
        const childIdx =
          ((index - i) % childrenArray.length + childrenArray.length) %
          childrenArray.length
        result.push({ element: childrenArray[childIdx], key: index - i })
      }
      return result
    }, [index, childrenArray, maxVisible])

    return (
      <div
        className={cn("flex flex-col items-center gap-4", className)}
        {...props}
      >
        <AnimatePresence>
          {itemsToShow.map(({ element, key }) => (
            <AnimatedListItem key={key}>{element}</AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    )
  },
)

AnimatedList.displayName = "AnimatedList"
