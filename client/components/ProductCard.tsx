import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

interface ProductCardProps {
  id: string;
  title: string;
  condition: 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR' | 'POOR';
  images: string[];
  startingPrice: number;
  currentBid?: number;
  buyNowPrice?: number;
  endDate: string;
  sellerName?: string;
  rating?: number;
  reviewCount?: number;
}

export function ProductCard({
  id,
  title,
  condition,
  images,
  startingPrice,
  currentBid,
  buyNowPrice,
  endDate,
  sellerName,
  rating = 4.5,
  reviewCount = 120,
}: ProductCardProps) {
  const [timeLeft, setTimeLeft] = useState('');
  const [isEnded, setIsEnded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const end = new Date(endDate).getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeLeft('Auction Ended');
        setIsEnded(true);
      } else {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m`);
        } else if (minutes > 0) {
          setTimeLeft(`${minutes}m ${seconds}s`);
        } else {
          setTimeLeft(`${seconds}s`);
        }

        if (distance < 2 * 60 * 60 * 1000) {
          setIsEnded(true);
        } else {
          setIsEnded(false);
        }
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  const conditionConfig = {
    NEW: { label: 'New', color: 'bg-green-100 text-green-800' },
    LIKE_NEW: { label: 'Like New', color: 'bg-blue-100 text-blue-800' },
    GOOD: { label: 'Good', color: 'bg-cyan-100 text-cyan-800' },
    FAIR: { label: 'Fair', color: 'bg-yellow-100 text-yellow-800' },
    POOR: { label: 'Poor', color: 'bg-orange-100 text-orange-800' },
  };

  const conditionInfo = conditionConfig[condition];
  const imageUrl = images?.[0] || '/placeholder.svg';
  const displayPrice = currentBid || startingPrice;
  const originalPrice = buyNowPrice || startingPrice * 1.2;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <Link to={`/product/${id}`}>
      <div className="group bg-white rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted aspect-square">
          <img
            src={imageError ? '/placeholder.svg' : imageUrl}
            alt={title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Condition Badge */}
          <div className="absolute top-3 left-3">
            <Badge className={`${conditionInfo.color} border-none text-xs`}>
              {conditionInfo.label}
            </Badge>
          </div>

          {/* Timer Badge */}
          {timeLeft && (
            <div
              className={`absolute bottom-3 right-3 text-xs font-semibold px-2 py-1 rounded ${
                isEnded
                  ? 'bg-red-100 text-red-800'
                  : 'bg-white text-foreground'
              }`}
            >
              {timeLeft}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 flex-1 flex flex-col">
          {/* Condition Label - smaller for BackMarket style */}
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {conditionInfo.label}
          </p>

          {/* Title */}
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 text-foreground">
            {title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={
                    i < fullStars
                      ? 'fill-yellow-400 text-yellow-400'
                      : i === fullStars && hasHalfStar
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {rating.toFixed(1)} ({reviewCount})
            </span>
          </div>

          {/* Price Section */}
          <div className="mt-auto space-y-1">
            <div className="text-sm font-bold text-foreground">
              ${displayPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className="text-xs text-muted-foreground line-through">
              ${originalPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            {sellerName && (
              <p className="text-xs text-muted-foreground mt-1">
                {sellerName}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
