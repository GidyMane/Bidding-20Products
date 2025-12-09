import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { Carousel } from '@/components/Carousel';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight, ChevronLeft, ChevronRight as Arrow } from 'lucide-react';
import { mockProducts } from '@/lib/mockProducts';

interface Product {
  id: string;
  title: string;
  description?: string;
  condition: 'NEW' | 'LIKE_NEW' | 'GOOD' | 'FAIR' | 'POOR';
  images: string[];
  startingPrice: number;
  currentBid?: number;
  bidsCount?: number;
  reservePrice?: number;
  buyNowPrice?: number;
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

      const [categoriesRes, featuredRes, endingSoonRes, newestRes] = await Promise.all([
        fetch('http://localhost:4000/categories'),
        fetch('http://localhost:4000/products/newest?limit=20'),
        fetch('http://localhost:4000/products/ending-soon?limit=20'),
        fetch('http://localhost:4000/products/newest?limit=20'),
      ]);

      if (categoriesRes.ok) {
        const catData = await categoriesRes.json();
        setCategories(catData.slice(0, 8));
      }

      if (featuredRes.ok) {
        const data = await featuredRes.json();
        const products = Array.isArray(data) ? data : data.products || [];
        setFeaturedProducts(products.length > 0 ? products : mockProducts.slice(0, 6));
      } else {
        setFeaturedProducts(mockProducts.slice(0, 6));
      }

      if (endingSoonRes.ok) {
        const data = await endingSoonRes.json();
        const products = Array.isArray(data) ? data : data.products || [];
        setEndingSoonProducts(products.length > 0 ? products : mockProducts.slice(0, 6));
      } else {
        setEndingSoonProducts(mockProducts.slice(0, 6));
      }

      if (newestRes.ok) {
        const data = await newestRes.json();
        const products = Array.isArray(data) ? data : data.products || [];
        setNewestProducts(products.length > 0 ? products : mockProducts.slice(0, 6));
      } else {
        setNewestProducts(mockProducts.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Use mock data on error
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
      {/* Hero Section - BackMarket Style */}
      <section className="bg-primary text-foreground">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="flex flex-col justify-center">
              <h1 className="font-serif text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Just as procrastinatey
              </h1>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6 leading-tight italic">
                as the new one.
              </h2>
              <p className="text-lg mb-8 text-foreground/80">
                The MacBook Air M1, for up to 70% less than new.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-foreground text-primary hover:bg-foreground/90 font-semibold"
                  onClick={() => navigate('/browse')}
                >
                  Don't wait
                </Button>
              </div>
            </div>

            {/* Right: Product Image */}
            <div className="flex justify-center items-center">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=400&fit=crop"
                alt="MacBook Air M1"
                className="w-full max-w-md h-auto"
              />
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-between items-center mt-12">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === 0 ? 'w-8 bg-foreground' : 'w-2 bg-foreground/40'
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full bg-foreground text-primary">
                <ChevronLeft size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-foreground text-primary">
                <ChevronRight size={20} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-white py-8 lg:py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-center font-serif text-3xl font-bold mb-12">
            Where the world shops refurbished tech.
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Everything you love about new, for less.{' '}
            <a href="#" className="underline text-foreground font-semibold">
              Guaranteed by the Back Market Promise.
            </a>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <p className="font-semibold text-sm">Best-in-class refurbishment</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🔍</div>
              <p className="font-semibold text-sm">Up to 100-point quality inspection</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📦</div>
              <p className="font-semibold text-sm">Free returns until Jan 31</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🛡️</div>
              <p className="font-semibold text-sm">1-year warranty</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended for You Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold">
              Recommended for you
            </h2>
            <Button
              variant="ghost"
              onClick={() => navigate('/browse')}
              className="text-primary hover:text-primary/80"
            >
              See all
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

      {/* Shop Our Most Wanted */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold">
              Shop our most wanted
            </h2>
            <Button
              variant="ghost"
              onClick={() => navigate('/browse?sortBy=newest')}
              className="text-primary hover:text-primary/80"
            >
              See all
              <Arrow className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-lg overflow-hidden">
                  <Skeleton className="aspect-square" />
                </div>
              ))}
            </div>
          ) : endingSoonProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {endingSoonProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="rounded-lg overflow-hidden bg-primary p-4 flex items-center justify-center min-h-48">
                  <div className="text-center text-white">
                    <p className="text-3xl mb-2">📱</p>
                    <p className="font-semibold">{product.title.split(' ').slice(0, 2).join(' ')}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {/* Ending Soon - Carousel Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold">
              Ending soon
            </h2>
            <Button
              variant="ghost"
              onClick={() => navigate('/browse?sortBy=endDate')}
              className="text-primary hover:text-primary/80"
            >
              See all
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

      {/* CTA Section */}
      <section className="bg-secondary text-secondary-foreground py-12 lg:py-16">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            Ready to find your refurbished tech?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Browse thousands of high-quality refurbished products.
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => navigate('/browse')}
          >
            Start shopping
          </Button>
        </div>
      </section>
    </Layout>
  );
}
