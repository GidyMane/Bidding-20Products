import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">AuctionHub</h3>
            <p className="text-sm opacity-80">
              The modern auction marketplace for buying and selling quality items.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="opacity-80 hover:opacity-100">Electronics</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100">Fashion</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100">Home & Garden</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100">Sports</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="opacity-80 hover:opacity-100">Help Center</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100">Contact Us</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100">Shipping Info</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100">Returns</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="opacity-80 hover:opacity-100">Terms of Use</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100">Privacy Policy</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100">Cookie Policy</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100">Accessibility</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <button className="opacity-80 hover:opacity-100">
                <Facebook size={20} />
              </button>
              <button className="opacity-80 hover:opacity-100">
                <Twitter size={20} />
              </button>
              <button className="opacity-80 hover:opacity-100">
                <Instagram size={20} />
              </button>
              <button className="opacity-80 hover:opacity-100">
                <Linkedin size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm opacity-80">
            <p>&copy; 2024 AuctionHub. All rights reserved.</p>
            <p>Made with care for auction enthusiasts</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
