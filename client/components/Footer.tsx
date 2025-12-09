import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">BackMarket</h3>
            <p className="text-sm opacity-80 leading-relaxed">
              Where the world shops refurbished tech. Everything you love about
              new, for less.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Smartphones
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Laptops
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Tablets
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Smartwatches
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Learn */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Back Market Promise
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="opacity-80 hover:opacity-100 transition">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-xs opacity-80">
            <p>&copy; 2025 BackMarket. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <button
                className="opacity-80 hover:opacity-100 transition"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </button>
              <button
                className="opacity-80 hover:opacity-100 transition"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </button>
              <button
                className="opacity-80 hover:opacity-100 transition"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </button>
              <button
                className="opacity-80 hover:opacity-100 transition"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
