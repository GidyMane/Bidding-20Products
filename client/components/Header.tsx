import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, Menu, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:4000/categories');
      const data = await response.json();
      setCategories(data.slice(0, 8));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm">
      <div className="w-full px-4 lg:px-8">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between py-3 gap-8">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="text-2xl font-bold text-primary">
              Auction<span className="text-foreground">Hub</span>
            </div>
          </Link>

          {/* Categories Navigation */}
          <NavigationMenu className="flex-1">
            <NavigationMenuList className="gap-1">
              {categories.map((category) => (
                <NavigationMenuItem key={category.id}>
                  <NavigationMenuTrigger className="text-sm font-medium h-9">
                    {category.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-48 p-4">
                      <Link
                        to={`/browse?categoryId=${category.id}`}
                        className="block px-3 py-2 rounded hover:bg-secondary/10 text-sm"
                      >
                        All {category.name}
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xs">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 h-9"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* User Section */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="#login">Login</Link>
            </Button>
            <Button variant="ghost" size="icon">
              <Heart size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart size={20} />
            </Button>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between py-3">
          <Link to="/" className="text-lg font-bold text-primary">
            AuctionHub
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Heart size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart size={20} />
            </Button>

            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
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
                          className="block px-3 py-2 rounded hover:bg-secondary/10 text-sm"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="#login">Login</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
