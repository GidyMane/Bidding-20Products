import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ProductCard } from "@/components/ProductCard";
import { HeroCarousel } from "@/components/HeroCarousel";
import { Carousel } from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { mockAuctions } from "@/lib/mockAuctions";

export default function Home() {
  const navigate = useNavigate();

  // Separate auctions by status
  const startingSoonAuctions = mockAuctions
    .filter((a) => {
      const startTime = new Date(a.startDate).getTime();
      const now = new Date().getTime();
      return startTime > now && startTime - now <= 24 * 60 * 60 * 1000; // Next 24 hours
    })
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
    .slice(0, 3);

  const endingSoonAuctions = mockAuctions
    .filter((a) => {
      const endTime = new Date(a.endDate).getTime();
      const now = new Date().getTime();
      return endTime > now && endTime - now <= 2 * 60 * 60 * 1000; // Next 2 hours
    })
    .sort(
      (a, b) =>
        new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    );

  const featuredAuctions = mockAuctions
    .filter((a) => {
      const endTime = new Date(a.endDate).getTime();
      const now = new Date().getTime();
      return endTime > now; // Still active
    })
    .sort((a, b) => b.bidsCount - a.bidsCount) // Most bids first
    .slice(0, 12);

  const newestAuctions = mockAuctions
    .filter((a) => {
      const startTime = new Date(a.startDate).getTime();
      const now = new Date().getTime();
      return startTime <= now; // Already started
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 12);

  return (
    <Layout>
      {/* Hero Carousel - Auctions Starting Soon */}
      {startingSoonAuctions.length > 0 && (
        <section className="px-4 lg:px-8 py-8">
          <HeroCarousel auctions={startingSoonAuctions} />
        </section>
      )}

      {/* Featured / Most Popular Auctions */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Featured Auctions
              </h2>
              <p className="text-muted-foreground mt-1">
                Most popular items right now
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/browse")}
              className="text-primary hover:text-primary/80 gap-2"
            >
              See all
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {featuredAuctions.length > 0 ? (
            <Carousel itemsPerView={4} gap={24} showArrows={true}>
              {featuredAuctions.map((auction) => (
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
          ) : null}
        </div>
      </section>

      {/* Ending Soon Auctions */}
      {endingSoonAuctions.length > 0 && (
        <section className="py-12 lg:py-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold">Ending Soon</h2>
                <p className="text-muted-foreground mt-1">
                  {endingSoonAuctions.length} auctions ending within 2 hours
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => navigate("/browse?filter=endingSoon")}
                className="text-primary hover:text-primary/80 gap-2"
              >
                See all
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Carousel itemsPerView={4} gap={24} showArrows={true}>
              {endingSoonAuctions.map((auction) => (
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
        </section>
      )}

      {/* Recently Added / Newest Listings */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold">Just Added</h2>
              <p className="text-muted-foreground mt-1">
                Latest auctions added to Bider
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate("/browse?sort=newest")}
              className="text-primary hover:text-primary/80 gap-2"
            >
              See all
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {newestAuctions.length > 0 ? (
            <Carousel itemsPerView={4} gap={24} showArrows={true}>
              {newestAuctions.map((auction) => (
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
          ) : null}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-12 lg:py-16 my-8">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Start Bidding?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Discover thousands of auctions and place your bids on items you
            love.
          </p>
          <Button
            size="lg"
            className="bg-foreground text-primary hover:bg-foreground/90 font-semibold"
            onClick={() => navigate("/browse")}
          >
            Browse All Auctions
          </Button>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 lg:py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-bold text-lg mb-2">Secure Bidding</h3>
              <p className="text-muted-foreground">
                Safe and secure bidding platform with buyer protection.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-bold text-lg mb-2">Real-time Auctions</h3>
              <p className="text-muted-foreground">
                Live countdown timers and instant bid notifications.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="font-bold text-lg mb-2">Trusted Sellers</h3>
              <p className="text-muted-foreground">
                Verified sellers with ratings and detailed feedback.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
