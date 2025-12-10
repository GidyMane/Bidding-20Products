import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Star, TrendingUp, AlertCircle, Clock } from "lucide-react";

interface ProductCardProps {
  id: string;
  title: string;
  condition: "NEW" | "LIKE_NEW" | "GOOD" | "FAIR" | "POOR";
  images: string[];
  startingPrice: number;
  currentBid: number;
  bidsCount: number;
  endDate: string;
  sellerName: string;
  sellerRating: number;
  rating?: number;
}

export function ProductCard({
  id,
  title,
  condition,
  images,
  startingPrice,
  currentBid,
  bidsCount,
  endDate,
  sellerName,
  sellerRating,
  rating = 4.5,
}: ProductCardProps) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isEnded, setIsEnded] = useState(false);
  const [imageError, setImageError] = useState(false);
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
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h`);
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m`);
        } else {
          setTimeLeft(`${minutes}m`);
        }

        // Check if ending soon (< 2 hours)
        if (distance < 2 * 60 * 60 * 1000) {
          setIsEndingSoon(true);
        } else {
          setIsEndingSoon(false);
        }
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [endDate]);

  const conditionConfig: Record<string, { label: string; color: string }> = {
    NEW: { label: "New", color: "bg-green-100 text-green-800" },
    LIKE_NEW: { label: "Like New", color: "bg-blue-100 text-blue-800" },
    GOOD: { label: "Good", color: "bg-cyan-100 text-cyan-800" },
    FAIR: { label: "Fair", color: "bg-yellow-100 text-yellow-800" },
    POOR: { label: "Poor", color: "bg-orange-100 text-orange-800" },
  };

  const conditionInfo =
    (condition && conditionConfig[condition]) || conditionConfig.GOOD;
  const imageUrl = images?.[0] || "/placeholder.svg";

  // Display current bid or starting price
  const displayPrice = currentBid > 0 ? currentBid : startingPrice;
  const priceLabel = currentBid > 0 ? "Current Bid" : "Starting Bid";

  const fullStars = Math.floor(rating || 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link to={`/product/${id}`}>
      <div className="group bg-white rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted aspect-square">
          <img
            src={imageError ? "/placeholder.svg" : imageUrl}
            alt={title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Condition Badge */}
          <div className="absolute top-3 left-3">
            <Badge
              className={`${conditionInfo.color} border-none text-xs font-medium`}
            >
              {conditionInfo.label}
            </Badge>
          </div>

          {/* Ending Soon Badge */}
          {isEndingSoon && !isEnded && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-red-100 text-red-800 border-none text-xs font-medium flex gap-1 items-center">
                <Clock size={12} />
                Ending Soon
              </Badge>
            </div>
          )}

          {/* Auction Ended Badge */}
          {isEnded && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Badge className="bg-gray-800 text-white border-none text-sm font-medium">
                Auction Ended
              </Badge>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="flex-1 p-3 flex flex-col justify-between">
          {/* Title */}
          <h3 className="text-sm font-semibold line-clamp-2 text-foreground mb-2">
            {title}
          </h3>

          {/* Bid Information */}
          <div className="space-y-2">
            {/* Current Bid */}
            <div>
              <p className="text-xs text-muted-foreground">{priceLabel}</p>
              <p className="text-lg font-bold text-primary">
                {formatPrice(displayPrice)}
              </p>
            </div>

            {/* Bids Count */}
            {bidsCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {bidsCount} {bidsCount === 1 ? "bid" : "bids"}
              </p>
            )}

            {/* Time Remaining */}
            <div className="flex items-center gap-1 text-xs font-medium text-foreground">
              <Clock size={12} />
              {isEnded ? "Ended" : timeLeft}
            </div>
          </div>

          {/* Seller Info */}
          <div className="mt-2 pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">Seller: {sellerName}</p>
            <div className="flex items-center gap-1 mt-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{sellerRating}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
