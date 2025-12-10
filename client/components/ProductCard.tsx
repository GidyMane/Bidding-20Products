import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, AlertCircle, Zap } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  description?: string;
  condition: "NEW" | "LIKE_NEW" | "GOOD" | "FAIR" | "POOR" | "EXCELLENT";
  images: string[];
  startingPrice: number;
  currentBid?: number;
  bidsCount?: number;
  reservePrice?: number;
  buyNowPrice?: number;
  endDate: string;
  sellerName: string;
  sellerRating?: number;
  rating?: number;
  reviewCount?: number;
  specifications?: Record<string, any>;
  isActive?: boolean;
  categoryId?: string;
}

export function ProductCard({
  id,
  title,
  condition,
  images,
  startingPrice,
  currentBid,
  bidsCount = 0,
  reservePrice,
  buyNowPrice,
  endDate,
  sellerName,
  sellerRating = 4.5,
  rating = 4.5,
  reviewCount = 0,
  specifications,
  isActive = true,
}: ProductCardProps) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isEnded, setIsEnded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [reserveNotMet, setReserveNotMet] = useState(false);
  const [isEndingSoon, setIsEndingSoon] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeLeft("Ended");
        setIsEnded(true);
      } else {
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m`);
        } else if (minutes > 0) {
          setTimeLeft(`${minutes}m`);
        } else {
          setTimeLeft(`${seconds}s`);
        }

        // Check if ending soon (< 2 hours)
        if (distance < 2 * 60 * 60 * 1000) {
          setIsEndingSoon(true);
        } else {
          setIsEndingSoon(false);
        }
      }

      // Check if reserve not met
      if (reservePrice && currentBid && currentBid < reservePrice) {
        setReserveNotMet(true);
      } else {
        setReserveNotMet(false);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [endDate, reservePrice, currentBid]);

  const conditionConfig = {
    NEW: { label: "New", color: "bg-green-100 text-green-800" },
    LIKE_NEW: { label: "Like New", color: "bg-blue-100 text-blue-800" },
    GOOD: { label: "Good", color: "bg-cyan-100 text-cyan-800" },
    FAIR: { label: "Fair", color: "bg-yellow-100 text-yellow-800" },
    POOR: { label: "Poor", color: "bg-orange-100 text-orange-800" },
    EXCELLENT: { label: "Excellent", color: "bg-emerald-100 text-emerald-800" },
  };

  const conditionInfo = conditionConfig[condition];
  const imageUrl = images?.[0] || "/placeholder.svg";

  // Use current bid if available, otherwise starting price
  const displayPrice =
    currentBid !== undefined && currentBid > 0 ? currentBid : startingPrice;
  const priceLabel =
    currentBid !== undefined && currentBid > 0
      ? "Current Bid"
      : "Starting Price";

  const fullStars = Math.floor(rating || 0);
  const hasHalfStar = (rating || 0) % 1 !== 0;

  // Format price with proper decimals
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link to={`/product/${id}`} className="h-full">
      <div className="group bg-white rounded-lg overflow-hidden border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted aspect-square">
          <img
            src={imageError ? "/placeholder.svg" : imageUrl}
            alt={title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badges - Top Left */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <Badge
              className={`${conditionInfo.color} border-none text-xs font-medium`}
            >
              {conditionInfo.label}
            </Badge>

            {isEndingSoon && !isEnded && (
              <Badge className="bg-red-100 text-red-800 border-none text-xs font-medium flex gap-1">
                <Zap size={12} />
                Ending Soon
              </Badge>
            )}

            {reserveNotMet && currentBid && (
              <Badge className="bg-gray-200 text-gray-800 border-none text-xs font-medium flex gap-1">
                <AlertCircle size={12} />
                Reserve Not Met
              </Badge>
            )}

            {buyNowPrice && !isEnded && (
              <Badge className="bg-primary text-primary-foreground border-none text-xs font-medium">
                Buy Now
              </Badge>
            )}
          </div>

          {/* Timer Badge - Bottom Right */}
          {!isEnded && (
            <div
              className={`absolute bottom-3 right-3 text-xs font-bold px-2 py-1 rounded transition-colors ${
                isEndingSoon
                  ? "bg-red-500 text-white"
                  : "bg-white text-foreground"
              }`}
            >
              {timeLeft}
            </div>
          )}

          {/* Ended Badge */}
          {isEnded && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="bg-black text-white px-4 py-2 rounded font-bold text-sm">
                Auction Ended
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 flex-1 flex flex-col">
          {/* Condition Label */}
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1 font-medium">
            {conditionInfo.label}
          </p>

          {/* Title - Truncate to 2 lines */}
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 text-foreground leading-snug">
            {title}
          </h3>

          {/* Rating & Reviews */}
          {(rating || 0) > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < fullStars
                        ? "fill-yellow-400 text-yellow-400"
                        : i === fullStars && hasHalfStar
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {rating?.toFixed(1)} ({reviewCount})
              </span>
            </div>
          )}

          {/* Bid Count - Auction Indicator */}
          {bidsCount > 0 && (
            <div className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <TrendingUp size={12} />
              <span>
                {bidsCount} bid{bidsCount !== 1 ? "s" : ""}
              </span>
            </div>
          )}

          {/* Price Section - Auction Focused */}
          <div className="mt-auto space-y-1">
            <div className="text-xs text-muted-foreground uppercase font-medium tracking-wide">
              {priceLabel}
            </div>

            <div className="text-lg font-bold text-foreground">
              {formatPrice(displayPrice)}
            </div>

            {/* Show Buy Now Price if different from current bid */}
            {buyNowPrice && buyNowPrice !== currentBid && (
              <div className="text-xs text-muted-foreground">
                Buy now: {formatPrice(buyNowPrice)}
              </div>
            )}

            {/* Show starting price if current bid exists and is different */}
            {currentBid && currentBid > startingPrice && (
              <div className="text-xs text-muted-foreground line-through">
                Started at {formatPrice(startingPrice)}
              </div>
            )}

            {/* Reserve Price Info */}
            {reservePrice && currentBid && currentBid < reservePrice && (
              <div className="text-xs text-orange-600 font-medium">
                Reserve: {formatPrice(reservePrice)}
              </div>
            )}

            {/* Seller Info */}
            {sellerName && (
              <div className="mt-2 pt-2 border-t border-border space-y-1">
                <p className="text-xs text-muted-foreground">
                  Sold by:{" "}
                  <span className="font-medium text-foreground">
                    {sellerName}
                  </span>
                </p>
                {sellerRating && (
                  <div className="flex items-center gap-1">
                    <Star
                      size={11}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-xs text-muted-foreground">
                      {sellerRating.toFixed(1)} seller rating
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
