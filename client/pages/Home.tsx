import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Carousel } from "@/components/Carousel";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, ChevronLeft, ChevronRight as Arrow } from "lucide-react";
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
  sellerRating?: number;
  rating?: number;
  reviewCount?: number;
  specifications?: Record<string, any>;
  isActive?: boolean;
  categoryId?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export default function Home() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [startingSoonProducts, setStartingSoonProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [endingSoonProducts, setEndingSoonProducts] = useState<Product[]>([]);
  const [newestProducts, setNewestProducts] = useState<Product[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoadingCategories(true);
      setLoadingProducts(true);

      const [categoriesRes, startingSoonRes, featuredRes, endingSoonRes, newestRes] =
        await Promise.all([
          fetch("/api/categories"),
          fetch("/api/products/starting-soon?limit=6"),
          fetch("/api/products/newest?limit=20"),
          fetch("/api/products/ending-soon?limit=20"),
          fetch("/api/products/newest?limit=20"),
        ]);

      if (categoriesRes.ok) {
        const catData = await categoriesRes.json();
        setCategories(catData.slice(0, 8));
      }

      if (startingSoonRes.ok) {
        const data = await startingSoonRes.json();
        const products = Array.isArray(data) ? data : data.products || [];
        setStartingSoonProducts(
          products.length > 0 ? products : mockProducts.slice(0, 6),
        );
      } else {
        setStartingSoonProducts(mockProducts.slice(0, 6));
      }

      if (featuredRes.ok) {
        const data = await featuredRes.json();
        const products = Array.isArray(data) ? data : data.products || [];
        setFeaturedProducts(
          products.length > 0 ? products : mockProducts.slice(0, 6),
        );
      } else {
        setFeaturedProducts(mockProducts.slice(0, 6));
      }

      if (endingSoonRes.ok) {
        const data = await endingSoonRes.json();
        const products = Array.isArray(data) ? data : data.products || [];
        setEndingSoonProducts(
          products.length > 0 ? products : mockProducts.slice(0, 6),
        );
      } else {
        setEndingSoonProducts(mockProducts.slice(0, 6));
      }

      if (newestRes.ok) {
        const data = await newestRes.json();
        const products = Array.isArray(data) ? data : data.products || [];
        setNewestProducts(
          products.length > 0 ? products : mockProducts.slice(0, 6),
        );
      } else {
        setNewestProducts(mockProducts.slice(0, 6));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Use mock data on error
      setStartingSoonProducts(mockProducts.slice(0, 6));
      setFeaturedProducts(mockProducts.slice(0, 6));
      setEndingSoonProducts(mockProducts.slice(0, 6));
      setNewestProducts(mockProducts.slice(0, 6));
    } finally {
      setLoadingCategories(false);
      setLoadingProducts(false);
    }
  };

  const ProductCardSkeleton = () => (
    <div className="rounded-lg overflow-hidden">
      <Skeleton className="aspect-square" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    </div>
  );

  return (
    <Layout>
      {/* Hero Section - Auctions Starting Soon */}
      <HeroCarousel products={startingSoonProducts} loading={loadingProducts} />

      {/* Featured Products - Carousel Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold">Featured Auctions</h2>
              <p className="text-muted-foreground text-sm mt-1">Curated items ending soon</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/browse?sortBy=newest")}
              className="text-primary hover:text-primary/80"
            >
              View all
              <Arrow className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="mx-auto">
              <Carousel itemsPerView={4} gap={16} showArrows={true}>
                {featuredProducts.slice(0, 12).map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </Carousel>
            </div>
          ) : null}
        </div>
      </section>

      {/* Ending Soon - Carousel Section */}
      <section className="py-12 lg:py-16 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold">Ending Soon</h2>
              <p className="text-muted-foreground text-sm mt-1">Don't miss these deals</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/browse?sortBy=endDate")}
              className="text-primary hover:text-primary/80"
            >
              View all
              <Arrow className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : endingSoonProducts.length > 0 ? (
            <div className="mx-auto">
              <Carousel itemsPerView={4} gap={16} showArrows={true}>
                {endingSoonProducts.slice(0, 12).map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </Carousel>
            </div>
          ) : null}
        </div>
      </section>

      {/* Newest Listings - Carousel Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold">Just Added</h2>
              <p className="text-muted-foreground text-sm mt-1">Latest auctions</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/browse?sortBy=newest")}
              className="text-primary hover:text-primary/80"
            >
              View all
              <Arrow className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : newestProducts.length > 0 ? (
            <div className="mx-auto">
              <Carousel itemsPerView={4} gap={16} showArrows={true}>
                {newestProducts.slice(0, 12).map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </Carousel>
            </div>
          ) : null}
        </div>
      </section>

      {/* Trust/Info Section */}
      <section className="bg-secondary text-secondary-foreground py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
              The modern way to auction
            </h2>
            <p className="text-lg opacity-90">
              Fair pricing, transparent bidding, verified sellers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary-foreground/10 rounded-lg mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Fair Auctions</h3>
              <p className="text-sm opacity-80">
                Open bidding ensures competitive prices
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary-foreground/10 rounded-lg mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Verified Sellers</h3>
              <p className="text-sm opacity-80">
                Trust ratings and buyer protection
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-secondary-foreground/10 rounded-lg mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Real-Time Bidding</h3>
              <p className="text-sm opacity-80">
                Live countdowns and instant notifications
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center text-primary-foreground">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            Ready to start bidding?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Browse thousands of active auctions and find your next great deal.
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-semibold"
            onClick={() => navigate("/browse")}
          >
            Browse Auctions →
          </Button>
        </div>
      </section>
    </Layout>
  );
}
