import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight, Clock, Zap, TrendingUp } from 'lucide-react';

interface Product {
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
        fetch('http://localhost:4000/products/newest?limit=12'),
        fetch('http://localhost:4000/products/ending-soon?limit=12'),
        fetch('http://localhost:4000/products/newest?limit=12'),
      ]);

      if (categoriesRes.ok) {
        const catData = await categoriesRes.json();
        setCategories(catData.slice(0, 6));
      }

      if (featuredRes.ok) {
        const data = await featuredRes.json();
        setFeaturedProducts(data);
      }

      if (endingSoonRes.ok) {
        const data = await endingSoonRes.json();
        setEndingSoonProducts(data);
      }

      if (newestRes.ok) {
        const data = await newestRes.json();
        setNewestProducts(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
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
        <Skeleton className="h-6" />
      </div>
    </div>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Discover Amazing Deals
            </h1>
            <p className="text-lg lg:text-xl mb-8 opacity-95">
              Bid on thousands of quality items. Find the best prices on electronics, fashion, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => navigate('/browse')}
              >
                Browse Auctions
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-white/20"
              >
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold mb-8">
            Shop by Category
          </h2>

          {loadingCategories ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => navigate(`/browse?categoryId=${category.id}`)}
                  className="group rounded-lg bg-white border border-border p-4 hover:border-primary hover:shadow-md transition-all text-center cursor-pointer"
                >
                  <div className="text-3xl mb-2 text-primary">
                    {category.icon || '📦'}
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </button>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <a href="#view-all-categories">
                View All Categories
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 lg:py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Zap className="h-6 w-6 text-primary" />
              <h2 className="text-2xl lg:text-3xl font-bold">Featured Products</h2>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate('/browse')}
              className="text-primary hover:text-primary/80"
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ending Soon Section */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-red-500" />
              <h2 className="text-2xl lg:text-3xl font-bold">Ending Soon</h2>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate('/browse?sortBy=endDate')}
              className="text-primary hover:text-primary/80"
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {endingSoonProducts.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newest Listings Section */}
      <section className="py-12 lg:py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-2xl lg:text-3xl font-bold">Newest Listings</h2>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate('/browse?sortBy=newest')}
              className="text-primary hover:text-primary/80"
            >
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {loadingProducts ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {newestProducts.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-secondary text-secondary-foreground">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Bidding?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Create an account and place your first bid today.
          </p>
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Create Account
          </Button>
        </div>
      </section>
    </Layout>
  );
}
