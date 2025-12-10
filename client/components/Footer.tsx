import { Link } from "react-router-dom";
import { Gavel, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Gavel size={24} />
              <h3 className="font-bold text-lg">Bider</h3>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              The modern auction marketplace where you can bid on products you
              love. Secure, fast, and transparent.
            </p>
          </div>

          {/* Browse */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Browse</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/browse"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  All Auctions
                </a>
              </li>
              <li>
                <a
                  href="/browse?sort=endingSoon"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Ending Soon
                </a>
              </li>
              <li>
                <a
                  href="/browse?sort=newest"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Just Added
                </a>
              </li>
              <li>
                <a
                  href="/browse?sort=featured"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Featured
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/browse?categoryId=smartphones"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Smartphones
                </a>
              </li>
              <li>
                <a
                  href="/browse?categoryId=laptops"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Laptops
                </a>
              </li>
              <li>
                <a
                  href="/browse?categoryId=gaming"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Gaming
                </a>
              </li>
              <li>
                <a
                  href="/browse?categoryId=audio"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Audio
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#help"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#safety"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Safety Tips
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#terms"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#cookies"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#accessibility"
                  className="opacity-80 hover:opacity-100 transition"
                >
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-xs opacity-80">
            <p>&copy; 2025 Bider. All rights reserved.</p>
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
