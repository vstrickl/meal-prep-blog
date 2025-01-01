"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/buttons/btn"
import { MenuCard } from "@/components/cards/menu-card"

const SCROLL_AMOUNT = 400
const SCROLL_THRESHOLD = 100

interface MenuItem {
  title: string
  category: string
  imageUrl: string
  href: string
}

const menuItems: MenuItem[] = [
  {
    title: "Holiday Treats: Gingerbread Cookies for Beginners",
    category: "Special",
    imageUrl: "/placeholder.svg?height=300&width=400",
    href: "/recipes/gingerbread-cookies",
  },
  {
    title: "Breakfast Bliss: Fluffy Pancakes 101",
    category: "Breakfast",
    imageUrl: "/placeholder.svg?height=300&width=400",
    href: "/recipes/fluffy-pancakes",
  },
  {
    title: "Mexican Fiesta: Authentic Tacos Al Pastor",
    category: "Lunch",
    imageUrl: "/placeholder.svg?height=300&width=400",
    href: "/recipes/tacos-al-pastor",
  },
]

export function MenuNav() {
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [showControls, setShowControls] = React.useState(false)
    const [canScrollLeft, setCanScrollLeft] = React.useState(false)
    const [canScrollRight, setCanScrollRight] = React.useState(false)
  
    const checkScroll = React.useCallback(() => {
      const container = containerRef.current
      if (!container) return
  
      setCanScrollLeft(container.scrollLeft > 0)
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      )
    }, [])
  
    React.useEffect(() => {
      checkScroll()
      window.addEventListener("resize", checkScroll)
      return () => window.removeEventListener("resize", checkScroll)
    }, [checkScroll])
  
    const scroll = React.useCallback((direction: "left" | "right") => {
      const container = containerRef.current
      if (!container) return
  
      const scrollAmount = direction === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }, [])
  
    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const container = containerRef.current
        if (!container) return
  
        const { left, right, width } = container.getBoundingClientRect()
        const mouseX = e.clientX
  
        if (mouseX < left + SCROLL_THRESHOLD && canScrollLeft) {
          scroll("left")
        } else if (mouseX > right - SCROLL_THRESHOLD && canScrollRight) {
          scroll("right")
        }
      },
      [canScrollLeft, canScrollRight, scroll]
    )
  
    return (
      <div
        className="group relative"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        onMouseMove={handleMouseMove}
      >
        <div
          ref={containerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-4"
          onScroll={checkScroll}
        >
          {menuItems.map((item, index) => (
            <MenuCard key={index} {...item} />
          ))}
        </div>
  
        {showControls && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 opacity-0 transition-opacity",
                "hover:bg-background/90 hover:opacity-100",
                canScrollLeft && "group-hover:opacity-100"
              )}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
            >
              <ChevronLeft className="h-8 w-8" />
              <span className="sr-only">Scroll left</span>
            </Button>
  
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 opacity-0 transition-opacity",
                "hover:bg-background/90 hover:opacity-100",
                canScrollRight && "group-hover:opacity-100"
              )}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
            >
              <ChevronRight className="h-8 w-8" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </>
        )}
      </div>
    )
  }