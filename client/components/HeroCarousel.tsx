import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Gavel, Clock } from "lucide-react";

interface HeroAuction {
  id: string;
  title: string;
  description: string;
  images: string[];
  startingPrice: number;
  currentBid: number;
  startDate: string;
  endDate: string;
  condition: "NEW" | "LIKE_NEW" | "GOOD" | "FAIR" | "POOR";
}

interface HeroCarouselProps {
  auctions: HeroAuction[];
}

export function HeroCarousel({ auctions }: HeroCarouselProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeUntilStart, setTimeUntilStart] = useState("");
  const [autoRotate, setAutoRotate] = useState(true);

  const current = auctions[currentIndex];

  useEffect(() => {
    if (!current) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const start = new Date(current.startDate).getTime();
      const distance = start - now;

      if (distance < 0) {
        setTimeUntilStart("Starts Now");
      } else {
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 0) {
          setTimeUntilStart(`Starts in ${hours}h ${minutes}m`);
        } else {
          setTimeUntilStart(`Starts in ${minutes}m`);
        }
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 30000);
    return () => clearInterval(timer);
  }, [current]);

  useEffect(() => {
    if (!autoRotate) return;

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % auctions.length);
    }, 6000);

    return () => clearTimeout(timer);
  }, [currentIndex, autoRotate, auctions.length]);

  const goToPrevious = () => {
    setAutoRotate(false);
    setCurrentIndex((prev) => (prev - 1 + auctions.length) % auctions.length);
  };

  const goToNext = () => {
    setAutoRotate(false);
    setCurrentIndex((prev) => (prev + 1) % auctions.length);
  };

  if (!current) return null;

  const conditionColors: Record<string, string> = {
    NEW: "bg-green-500",
    LIKE_NEW: "bg-blue-500",
    GOOD: "bg-cyan-500",
    FAIR: "bg-yellow-500",
    POOR: "bg-orange-500",
  };

  return (
    <div className="relative w-full h-[500px] bg-muted overflow-hidden rounded-lg">
      {/* Background Image */}
      <img
        src={current.images[0] || "/placeholder.svg"}
        alt={current.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12">
        {/* Top Section - Condition Badge */}
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <Badge
              className={`${conditionColors[current.condition] || "bg-gray-500"} text-white border-none text-sm font-medium`}
            >
              {current.condition.replace("_", " ")}
            </Badge>
          </div>

          {/* Carousel Indicators */}
          <div className="flex gap-2">
            {auctions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAutoRotate(false);
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Middle Section - Title & Description */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight max-w-2xl">
            {current.title}
          </h1>
          <p className="text-lg text-white/90 max-w-xl mb-6">
            {current.description}
          </p>

          {/* Countdown */}
          <div className="flex items-center gap-2 text-white/80 mb-6">
            <Clock size={20} />
            <span className="text-lg font-medium">{timeUntilStart}</span>
          </div>

          {/* CTA Button */}
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold"
            onClick={() => navigate(`/product/${current.id}`)}
          >
            <Gavel size={20} />
            View Auction
          </Button>
        </div>

        {/* Bottom Section - Price Info */}
        <div className="space-y-2">
          <p className="text-white/70 text-sm">Starting Bid</p>
          <p className="text-3xl font-bold text-white">
            ${current.startingPrice.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors lg:block hidden"
        aria-label="Previous auction"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors lg:block hidden"
        aria-label="Next auction"
      >
        <ChevronRight size={24} />
      </button>

      {/* Mobile Indicators */}
      <div className="absolute bottom-4 left-4 right-4 lg:hidden">
        <div className="flex gap-2">
          {auctions.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? "flex-1 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
