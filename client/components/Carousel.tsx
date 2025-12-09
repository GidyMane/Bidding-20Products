import { ReactNode, useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselProps {
  children: ReactNode[];
  itemsPerView?: number;
  gap?: number;
  showArrows?: boolean;
}

export function Carousel({
  children,
  itemsPerView = 4,
  gap = 16,
  showArrows = true,
}: CarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10,
      );
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      return () => container.removeEventListener("scroll", checkScroll);
    }
  }, [children]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = (container.clientWidth / itemsPerView) * 1.5;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      {showArrows && canScrollLeft && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -left-6 top-1/3 -translate-y-1/2 z-10 rounded-full bg-black text-white hover:bg-black/80"
          onClick={() => scroll("left")}
        >
          <ChevronLeft size={24} />
        </Button>
      )}

      {/* Carousel Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide"
        style={{
          display: "flex",
          gap: `${gap}px`,
          scrollBehavior: "smooth",
        }}
      >
        {children.map((child, index) => (
          <div
            key={index}
            style={{
              flex: `0 0 calc((100% - ${gap * (itemsPerView - 1)}px) / ${itemsPerView})`,
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {showArrows && canScrollRight && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-6 top-1/3 -translate-y-1/2 z-10 rounded-full bg-black text-white hover:bg-black/80"
          onClick={() => scroll("right")}
        >
          <ChevronRight size={24} />
        </Button>
      )}
    </div>
  );
}
