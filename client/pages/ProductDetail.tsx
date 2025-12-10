import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, ChevronLeft, AlertCircle, Zap, Heart } from "lucide-react";
import { mockProducts } from "@/lib/mockProducts";

interface Product {
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
  startDate: string;
  endDate: string;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  rating: number;
  reviewCount: number;
  specifications?: Record<string, any>;
  isActive?: boolean;
  categoryId?: string;
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [timeLeft, setTimeLeft] = useState("");
  const [isEnded, setIsEnded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const updateCountdown = () => {
      const now = new Date().getTime();
      const end = new Date(product.endDate).getTime();
      const distance = end - now;

      if (distance < 0) {
        setTimeLeft("Auction Ended");
        setIsEnded(true);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h ${minutes}m`);
        } else if (hours > 0) {
          setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
        } else if (minutes > 0) {
          setTimeLeft(`${minutes}m ${seconds}s`);
        } else {
          setTimeLeft(`${seconds}s`);
        }
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [product]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      if (!id) return;

      const response = await fetch(`/api/products/${id}`);

      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        const mockProduct = mockProducts.find((p) => p.id === id);
        setProduct(mockProduct || null);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      const mockProduct = mockProducts.find((p) => p.id === id);
      setProduct(mockProduct || null);
    } finally {
      setLoading(false);
    }
  };

  const conditionConfig = {
    NEW: { label: "New", color: "bg-green-100 text-green-800" },
    LIKE_NEW: { label: "Like New", color: "bg-blue-100 text-blue-800" },
    GOOD: { label: "Good", color: "bg-cyan-100 text-cyan-800" },
    FAIR: { label: "Fair", color: "bg-yellow-100 text-yellow-800" },
    POOR: { label: "Poor", color: "bg-orange-100 text-orange-800" },
    EXCELLENT: { label: "Excellent", color: "bg-emerald-100 text-emerald-800" },
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="w-full aspect-square rounded-lg mb-4" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="w-20 h-20 rounded" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button onClick={() => navigate("/browse")}>Back to Browse</Button>
          </div>
        </div>
      </Layout>
    );
  }

  const conditionInfo = conditionConfig[product.condition];
  const currentPrice = product.currentBid || product.startingPrice;
  const imageUrl = product.images?.[selectedImage] || "/placeholder.svg";
  const hasImageError = imageErrors.has(selectedImage);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 font-medium"
        >
          <ChevronLeft size={20} />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-2">
            {/* Main Image */}
            <div className="bg-muted rounded-lg overflow-hidden aspect-square mb-4 flex items-center justify-center relative">
              <img
                src={hasImageError ? "/placeholder.svg" : imageUrl}
                alt={product.title}
                className="w-full h-full object-contain"
                onError={() => {
                  setImageErrors((prev) => new Set(prev).add(selectedImage));
                }}
              />

              {isEnded && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="bg-black text-white px-6 py-3 rounded-lg font-bold">
                    Auction Ended
                  </div>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details & Bidding */}
          <div>
            {/* Condition Badge */}
            <div className="mb-4">
              <Badge className={`${conditionInfo.color} border-none text-xs font-medium`}>
                {conditionInfo.label}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4 leading-tight">{product.title}</h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating?.toFixed(1)} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Countdown Timer */}
            <div className="bg-gradient-to-r from-primary to-accent text-white p-4 rounded-lg mb-6">
              <p className="text-xs uppercase tracking-wide mb-1 opacity-90">Time Remaining</p>
              <p className="text-2xl font-bold">{timeLeft}</p>
            </div>

            {/* Price Section */}
            <div className="border border-border rounded-lg p-4 mb-6">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1 font-medium">
                Current Bid
              </p>
              <p className="text-4xl font-bold text-foreground mb-4">
                {formatPrice(currentPrice)}
              </p>

              {product.bidsCount && product.bidsCount > 0 && (
                <p className="text-sm text-muted-foreground mb-4">
                  {product.bidsCount} bid{product.bidsCount !== 1 ? "s" : ""} placed
                </p>
              )}

              {product.reservePrice && product.currentBid && product.currentBid < product.reservePrice && (
                <div className="flex items-center gap-2 text-sm text-orange-600 mb-4">
                  <AlertCircle size={16} />
                  <span>Reserve price not met</span>
                </div>
              )}

              {product.startingPrice && product.currentBid && product.currentBid > product.startingPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  Started at {formatPrice(product.startingPrice)}
                </p>
              )}
            </div>

            {/* Bid Input */}
            {!isEnded && (
              <div className="mb-6">
                <label className="text-sm font-medium mb-2 block">
                  Place Your Bid
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Enter bid amount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(e.target.value)}
                    className="flex-1 px-4 py-3 border border-border rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                className={`w-full font-bold py-3 ${
                  isEnded
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                disabled={isEnded}
              >
                {isEnded ? "Auction Ended" : "Place Bid"}
              </Button>

              {product.buyNowPrice && !isEnded && (
                <Button variant="outline" className="w-full font-bold py-3">
                  Buy Now for {formatPrice(product.buyNowPrice)}
                </Button>
              )}

              <Button
                variant="ghost"
                className="w-full"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart
                  size={18}
                  className={isLiked ? "fill-red-500 text-red-500" : ""}
                />
                <span className="ml-2">{isLiked ? "Saved" : "Save"}</span>
              </Button>
            </div>

            {/* Seller Info */}
            <div className="border border-border rounded-lg p-4 mb-6">
              <h3 className="font-semibold mb-3">Seller Information</h3>
              <p className="text-sm font-medium mb-2">{product.sellerName}</p>
              <div className="flex items-center gap-1 mb-2">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-sm text-muted-foreground">
                  {product.sellerRating?.toFixed(1)} seller rating
                </span>
              </div>
              <Button variant="outline" className="w-full text-sm">
                View Seller Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Description & Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {/* Description */}
          {product.description && (
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-4">About this item</h2>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="border border-border rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Specifications</h2>
              <div className="space-y-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-medium">{key}</span>
                    <span className="font-semibold">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
