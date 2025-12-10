import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, Heart, Menu, X, Gavel } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setCategories([
      { id: "smartphones", name: "Smartphones", slug: "smartphones" },
      { id: "laptops", name: "Laptops", slug: "laptops" },
      { id: "tablets", name: "Tablets", slug: "tablets" },
      { id: "gaming", name: "Gaming", slug: "gaming" },
      { id: "audio", name: "Audio", slug: "audio" },
      { id: "wearables", name: "Wearables", slug: "wearables" },
      { id: "cameras", name: "Cameras", slug: "cameras" },
      { id: "electronics", name: "Electronics", slug: "electronics" },
    ]);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="w-full bg-white border-b border-border sticky top-0 z-50">
      {/* Main Header */}
      <div className="px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <div className="text-2xl font-bold text-primary">
              <Gavel size={28} className="inline mr-2" />
              Bider
            </div>
          </Link>

          {/* Center Search - Desktop Only */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="text"
                placeholder="Search auctions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 h-10 bg-muted border-0"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Browse Button */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex gap-2 text-sm font-medium"
              asChild
            >
              <Link to="/browse">Browse Auctions</Link>
            </Button>

            {/* Watchlist */}
            <Button variant="ghost" size="icon" title="Watchlist">
              <Heart size={20} />
            </Button>

            {/* Bids/Cart */}
            <Button variant="ghost" size="icon" title="My Bids">
              <ShoppingCart size={20} />
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="space-y-6 mt-6">
                  <form onSubmit={handleSearch} className="space-y-3">
                    <Input
                      type="text"
                      placeholder="Search auctions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type="submit" className="w-full" size="sm">
                      <Search size={18} className="mr-2" />
                      Search
                    </Button>
                  </form>

                  <div>
                    <h3 className="font-semibold mb-3">Categories</h3>
                    <nav className="space-y-2">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/browse?categoryId=${category.id}`}
                          onClick={() => setIsMobileOpen(false)}
                          className="block px-3 py-2 rounded hover:bg-muted text-sm"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Categories Navigation */}
        <div className="hidden lg:flex gap-6 overflow-x-auto pb-2 -mx-4 px-4">
          <Link
            to="/browse"
            className="whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            All Auctions
          </Link>
          {categories.slice(0, 7).map((cat) => (
            <Link
              key={cat.id}
              to={`/browse?categoryId=${cat.id}`}
              className="whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Search */}
      <form onSubmit={handleSearch} className="lg:hidden px-4 pb-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search auctions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-4 pr-10 h-10 bg-muted border-0"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          >
            <Search size={18} />
          </button>
        </div>
      </form>
    </header>
  );
}
