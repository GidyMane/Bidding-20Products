import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { Carousel } from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockAuctions, mockCategories } from "@/lib/mockAuctions";

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("query") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categoryId") || "",
  );
  const [selectedConditions, setSelectedConditions] = useState<string[]>(
    searchParams.get("condition")?.split(",").filter(Boolean) || [],
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([
    parseInt(searchParams.get("minPrice") || "0"),
    parseInt(searchParams.get("maxPrice") || "3000"),
  ]);
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "newest");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const conditions: Array<"NEW" | "LIKE_NEW" | "GOOD" | "FAIR" | "POOR"> = [
    "NEW",
    "LIKE_NEW",
    "GOOD",
    "FAIR",
    "POOR",
  ];

  // Filter and sort auctions
  const filteredAuctions = useMemo(() => {
    let results = mockAuctions.filter((auction) => {
      // Only show active auctions
      const endTime = new Date(auction.endDate).getTime();
      const now = new Date().getTime();
      if (endTime <= now) return false;

      // Filter by search query
      if (
        searchQuery &&
        !auction.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter by category
      if (selectedCategory && auction.categoryId !== selectedCategory) {
        return false;
      }

      // Filter by condition
      if (selectedConditions.length > 0) {
        if (!selectedConditions.includes(auction.condition)) {
          return false;
        }
      }

      // Filter by price range
      const displayPrice =
        auction.currentBid > 0 ? auction.currentBid : auction.startingPrice;
      if (displayPrice < priceRange[0] || displayPrice > priceRange[1]) {
        return false;
      }

      return true;
    });

    // Sort results
    if (sortBy === "newest") {
      results.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (sortBy === "endingSoon") {
      results.sort(
        (a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime(),
      );
    } else if (sortBy === "lowest") {
      results.sort((a, b) => {
        const priceA = a.currentBid > 0 ? a.currentBid : a.startingPrice;
        const priceB = b.currentBid > 0 ? b.currentBid : b.startingPrice;
        return priceA - priceB;
      });
    } else if (sortBy === "highest") {
      results.sort((a, b) => {
        const priceA = a.currentBid > 0 ? a.currentBid : a.startingPrice;
        const priceB = b.currentBid > 0 ? b.currentBid : b.startingPrice;
        return priceB - priceA;
      });
    } else if (sortBy === "mostBids") {
      results.sort((a, b) => b.bidsCount - a.bidsCount);
    }

    return results;
  }, [searchQuery, selectedCategory, selectedConditions, priceRange, sortBy]);

  const handleConditionToggle = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition],
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedConditions([]);
    setPriceRange([0, 3000]);
    setSortBy("newest");
  };

  const activeFiltersCount = [
    searchQuery ? 1 : 0,
    selectedCategory ? 1 : 0,
    selectedConditions.length > 0 ? 1 : 0,
    priceRange[0] > 0 || priceRange[1] < 3000 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  // Filter Sidebar Component
  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 text-sm">Search</h3>
        <Input
          type="text"
          placeholder="Search auctions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-sm">Category</h3>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
        >
          <option value="">All Categories</option>
          {mockCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-sm">Condition</h3>
        <div className="space-y-2">
          {conditions.map((condition) => (
            <div key={condition} className="flex items-center gap-2">
              <Checkbox
                checked={selectedConditions.includes(condition)}
                onCheckedChange={() => handleConditionToggle(condition)}
                id={`condition-${condition}`}
              />
              <label
                htmlFor={`condition-${condition}`}
                className="text-sm cursor-pointer"
              >
                {condition.replace("_", " ")}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-sm">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </h3>
        <Slider
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as [number, number])}
          min={0}
          max={3000}
          step={50}
          className="w-full"
        />
      </div>

      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleClearFilters}
        >
          <X size={16} className="mr-2" />
          Clear Filters ({activeFiltersCount})
        </Button>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold">Browse Auctions</h1>
            <p className="text-muted-foreground mt-1">
              {filteredAuctions.length} active auctions
            </p>
          </div>

          <div className="flex gap-2">
            {/* Sort Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="endingSoon">Ending Soon</SelectItem>
                <SelectItem value="mostBids">Most Bids</SelectItem>
                <SelectItem value="lowest">Lowest Price</SelectItem>
                <SelectItem value="highest">Highest Price</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Filter Toggle */}
            <Sheet
              open={isMobileFilterOpen}
              onOpenChange={setIsMobileFilterOpen}
            >
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline" size="icon">
                  <Filter size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-3">
            {filteredAuctions.length > 0 ? (
              <div>
                <Carousel itemsPerView={3} gap={24} showArrows={true}>
                  {filteredAuctions.map((auction) => (
                    <ProductCard
                      key={auction.id}
                      id={auction.id}
                      title={auction.title}
                      condition={auction.condition}
                      images={auction.images}
                      startingPrice={auction.startingPrice}
                      currentBid={auction.currentBid}
                      bidsCount={auction.bidsCount}
                      endDate={auction.endDate}
                      sellerName={auction.sellerName}
                      sellerRating={auction.sellerRating}
                      rating={auction.rating}
                    />
                  ))}
                </Carousel>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">
                  No auctions found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={handleClearFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
