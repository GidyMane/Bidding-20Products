import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
  HelpCircle,
  Zap,
} from "lucide-react";
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
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:4000/categories");
      const data = await response.json();
      setCategories(data.slice(0, 10));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="w-full bg-white border-b border-border sticky top-0 z-50">
      {/* Top Bar */}
      <div className="border-b border-border text-xs py-2 px-4 lg:px-8 flex justify-end gap-4 text-muted-foreground">
        <a href="#" className="hover:text-foreground">
          The Back Market Promise
        </a>
        <a href="#" className="hover:text-foreground">
          Repair & Care
        </a>
        <a href="#" className="hover:text-foreground">
          End bad tech
        </a>
        <a href="#" className="hover:text-foreground">
          Tech Journal
        </a>
        <select className="bg-transparent text-sm">
          <option>🇺🇸 US</option>
        </select>
      </div>

      {/* Main Header */}
      <div className="px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4 mb-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="text-xl font-bold text-foreground">
              🔙 BackMarket
            </div>
          </Link>

          {/* Center Search - Desktop Only */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="text"
                placeholder="What are you looking for?"
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
            {/* Trade-in Button */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex gap-2 text-sm"
              asChild
            >
              <a href="#trade-in">
                <Zap size={16} />
                Trade-in
              </a>
            </Button>

            {/* Help */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex gap-2 text-sm"
              asChild
            >
              <a href="#help">
                <HelpCircle size={16} />
                Need help?
              </a>
            </Button>

            {/* Account/Login */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex"
              asChild
            >
              <Link to="#login">👤</Link>
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon">
              <Heart size={20} />
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon">
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
                      placeholder="Search products..."
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
          {[
            "All products",
            "Smartphones",
            "Laptops",
            "Tablets",
            "Gaming consoles",
            "Smartwatches",
            "Audio",
            "Home appliances",
            "More",
          ].map((cat) => (
            <button
              key={cat}
              className="whitespace-nowrap text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Search */}
      <form onSubmit={handleSearch} className="lg:hidden px-4 pb-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="What are you looking for?"
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
