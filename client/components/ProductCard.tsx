import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

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

        // Highlight if ending soon (< 2 hours)
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

  return (
    <Link to={`/product/${id}`}>
      <div className="group bg-card rounded-lg overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted aspect-square">
          <img
            src={imageError ? '/placeholder.svg' : imageUrl}
            alt={title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-2">
            <Badge className={`${conditionInfo.color} border-none`}>
              {conditionInfo.label}
            </Badge>
            {buyNowPrice && (
              <Badge className="bg-primary text-primary-foreground border-none">
                Buy Now
              </Badge>
            )}
          </div>

          {/* Timer Badge */}
          <div
            className={`absolute bottom-3 right-3 text-xs font-semibold px-2 py-1 rounded ${
              isEnded
                ? 'bg-red-100 text-red-800'
                : 'bg-white/90 text-foreground'
            }`}
          >
            {timeLeft}
          </div>
        </div>

        {/* Content */}
        <div className="p-3 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="font-semibold text-sm line-clamp-2 mb-2 text-foreground">
            {title}
          </h3>

          {/* Seller */}
          {sellerName && (
            <p className="text-xs text-muted-foreground mb-2">
              {sellerName}
            </p>
          )}

          {/* Price Section */}
          <div className="mt-auto space-y-1">
            <div className="text-xs text-muted-foreground">
              {currentBid ? 'Current bid' : 'Starting price'}
            </div>
            <div className="text-lg font-bold text-primary">
              ${displayPrice.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            {buyNowPrice && (
              <div className="text-xs text-muted-foreground">
                Buy now: ${buyNowPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
