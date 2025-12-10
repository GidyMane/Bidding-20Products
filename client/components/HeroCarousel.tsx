import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AuctionProduct {
  id: string;
  title: string;
  description?: string;
  images: string[];
  startingPrice: number;
  startDate: string;
  sellerName: string;
}

interface HeroCarouselProps {
  products: AuctionProduct[];
  loading?: boolean;
}

export function HeroCarousel({ products, loading = false }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<Record<string, string>>({});
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);

  useEffect(() => {
    if (!autoplayEnabled || products.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [autoplayEnabled, products.length]);

  useEffect(() => {
    const updateCountdowns = () => {
      const newTimeLeft: Record<string, string> = {};

      products.forEach((product) => {
        const now = new Date().getTime();
        const start = new Date(product.startDate).getTime();
        const distance = start - now;

        if (distance < 0) {
          newTimeLeft[product.id] = "Starting now";
        } else {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

          if (days > 0) {
            newTimeLeft[product.id] = `${days}d ${hours}h`;
          } else if (hours > 0) {
            newTimeLeft[product.id] = `${hours}h ${minutes}m`;
          } else {
            newTimeLeft[product.id] = `${minutes}m`;
          }
        }
      });

      setTimeLeft(newTimeLeft);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [products]);

  if (loading || products.length === 0) {
    return (
      <div className="bg-gradient-to-r from-primary to-accent h-96 lg:h-screen max-h-[600px] flex items-center justify-center">
        <div className="text-center text-primary-foreground">
          <div className="animate-pulse">
            <div className="h-12 w-48 bg-primary-foreground/20 rounded mb-4 mx-auto" />
            <div className="h-6 w-64 bg-primary-foreground/20 rounded mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  const currentProduct = products[currentIndex];
  const imageUrl = currentProduct.images?.[0] || "/placeholder.svg";

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 8000);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    setAutoplayEnabled(false);
    setTimeout(() => setAutoplayEnabled(true), 8000);
  };

  return (
    <div className="relative w-full bg-gradient-to-b from-primary via-primary to-accent overflow-hidden h-96 lg:h-[500px]">
      {/* Carousel Container */}
      <div className="relative w-full h-full flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={imageUrl}
            alt={currentProduct.title}
            className="w-full h-full object-cover opacity-40 blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="flex flex-col justify-center py-8 lg:py-0">
              {/* Badge */}
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full w-fit mb-4">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Auction Starting Soon
                </span>
              </div>

              {/* Main Title */}
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {currentProduct.title}
              </h1>

              {/* Description */}
              {currentProduct.description && (
                <p className="text-lg text-white/90 mb-6 line-clamp-2">
                  {currentProduct.description}
                </p>
              )}

              {/* Price & Timer Section */}
              <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-8">
                <div>
                  <p className="text-sm text-white/70 uppercase tracking-wide mb-2 font-medium">
                    Starting Price
                  </p>
                  <p className="text-3xl lg:text-4xl font-bold text-white">
                    ${currentProduct.startingPrice.toFixed(2)}
                  </p>
                </div>

                <div className="flex-1">
                  <p className="text-sm text-white/70 uppercase tracking-wide mb-2 font-medium">
                    Starts In
                  </p>
                  <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg w-fit font-bold text-xl">
                    {timeLeft[currentProduct.id] || "Loading..."}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link to={`/product/${currentProduct.id}`}>
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-bold w-full sm:w-fit"
                >
                  View Auction →
                </Button>
              </Link>
            </div>

            {/* Right: Product Image */}
            <div className="relative hidden lg:flex justify-center items-center h-full">
              <div className="relative w-full max-w-md aspect-square">
                <img
                  src={imageUrl}
                  alt={currentProduct.title}
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Indicators */}
        <div className="flex gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setAutoplayEnabled(false);
                setTimeout(() => setAutoplayEnabled(true), 8000);
              }}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-2 ml-4">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Seller Info Badge - Bottom Right */}
      {currentProduct.sellerName && (
        <div className="absolute bottom-6 right-6 z-20 bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-lg max-w-xs hidden sm:block">
          <p className="text-xs text-white/70 mb-1">Seller</p>
          <p className="font-semibold text-sm">{currentProduct.sellerName}</p>
        </div>
      )}
    </div>
  );
}
