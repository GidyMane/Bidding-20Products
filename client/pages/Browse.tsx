import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Filter, X, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  children?: Category[];
}

const CONDITIONS = ["NEW", "LIKE_NEW", "GOOD", "FAIR", "POOR"] as const;

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter states
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categoryId") || "",
  );
  const [selectedConditions, setSelectedConditions] = useState<string[]>(
    searchParams.get("condition")?.split(",") || [],
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    parseInt(searchParams.get("minPrice") || "0"),
    parseInt(searchParams.get("maxPrice") || "10000"),
  ]);
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "newest");
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [
    searchQuery,
    selectedCategory,
    selectedConditions,
    priceRange,
    sortBy,
    page,
  ]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (searchQuery) params.append("query", searchQuery);
      if (selectedCategory) params.append("categoryId", selectedCategory);
      if (selectedConditions.length > 0)
        params.append("condition", selectedConditions.join(","));
      params.append("minPrice", priceRange[0].toString());
      params.append("maxPrice", priceRange[1].toString());
      params.append("sortBy", sortBy);
      params.append("page", page.toString());
      params.append("limit", "20");

      const response = await fetch(
        `http://localhost:4000/products/search?${params}`,
      );

      if (response.ok) {
        const data = await response.json();
        const products = Array.isArray(data) ? data : data.products || [];
        setProducts(products.length > 0 ? products : mockProducts.slice(0, 20));
      } else {
        setProducts(mockProducts.slice(0, 20));
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // Use mock data on error
      setProducts(mockProducts.slice(0, 20));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    const params = new URLSearchParams();
    if (searchQuery) params.append("query", searchQuery);
    if (selectedCategory) params.append("categoryId", selectedCategory);
    if (selectedConditions.length > 0)
      params.append("condition", selectedConditions.join(","));
    setSearchParams(params);
  };

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition],
    );
    setPage(1);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedConditions([]);
    setPriceRange([0, 10000]);
    setSortBy("newest");
    setPage(1);
    setSearchParams({});
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h3 className="font-semibold mb-3">Search</h3>
        <form onSubmit={handleSearch}>
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-2"
          />
          <Button type="submit" className="w-full" size="sm">
            Search
          </Button>
        </form>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="font-semibold mb-3">Category</h3>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setPage(1);
          }}
          className="w-full px-3 py-2 border border-border rounded-md text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Condition Filter */}
      <div>
        <h3 className="font-semibold mb-3">Condition</h3>
        <div className="space-y-2">
          {CONDITIONS.map((condition) => (
            <div key={condition} className="flex items-center gap-2">
              <Checkbox
                id={condition}
                checked={selectedConditions.includes(condition)}
                onCheckedChange={() => toggleCondition(condition)}
              />
              <label
                htmlFor={condition}
                className="text-sm cursor-pointer flex-1"
              >
                {condition.replace("_", " ")}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-3">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            min={0}
            max={10000}
            step={100}
            className="w-full"
          />
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-xs text-muted-foreground">Min</label>
              <Input
                type="number"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])
                }
                className="h-8"
              />
            </div>
            <div className="flex-1">
              <label className="text-xs text-muted-foreground">Max</label>
              <Input
                type="number"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([
                    priceRange[0],
                    parseInt(e.target.value) || 10000,
                  ])
                }
                className="h-8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      {(searchQuery ||
        selectedCategory ||
        selectedConditions.length > 0 ||
        sortBy !== "newest") && (
        <Button
          variant="outline"
          className="w-full"
          onClick={handleClearFilters}
        >
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  );

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
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Auctions</h1>
          <p className="text-muted-foreground">
            {products.length} products found
          </p>
        </div>

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <h2 className="font-bold text-lg mb-6">Filters</h2>
              <FilterContent />
            </SheetContent>
          </Sheet>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-20 space-y-6">
              <div>
                <h2 className="font-bold text-lg mb-4">Filters</h2>
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full">
                    <h3 className="font-semibold">Sort By</h3>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pt-3">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="mb-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="endDate">Ending Soon</SelectItem>
                        <SelectItem value="priceAsc">Lowest Price</SelectItem>
                        <SelectItem value="priceDesc">Highest Price</SelectItem>
                      </SelectContent>
                    </Select>
                  </CollapsibleContent>
                </Collapsible>
              </div>
              <FilterContent />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(12)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No products match your filters.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    disabled={page === 1}
                    onClick={() => setPage(Math.max(1, page - 1))}
                  >
                    Previous
                  </Button>
                  <Badge variant="outline" className="px-3 py-2">
                    Page {page}
                  </Badge>
                  <Button
                    variant="outline"
                    disabled={products.length < 20}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
