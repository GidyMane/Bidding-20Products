export interface AuctionProduct {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  condition: "NEW" | "LIKE_NEW" | "GOOD" | "FAIR" | "POOR";
  images: string[];
  startingPrice: number;
  currentBid: number;
  bidsCount: number;
  reservePrice?: number;
  buyNowPrice?: number;
  startDate: string;
  endDate: string;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  rating: number;
  reviewCount: number;
  specifications: Record<string, any>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const now = new Date();

// Helper to create dates
const inHours = (hours: number) =>
  new Date(now.getTime() + hours * 60 * 60 * 1000).toISOString();
const inMinutes = (minutes: number) =>
  new Date(now.getTime() + minutes * 60 * 1000).toISOString();
const agoHours = (hours: number) =>
  new Date(now.getTime() - hours * 60 * 60 * 1000).toISOString();

export const mockAuctions: AuctionProduct[] = [
  // STARTING SOON (Hero Carousel)
  {
    id: "auction-1",
    title: 'MacBook Pro 16" M2 Max - Space Gray - 32GB RAM',
    description:
      "Pristine condition MacBook Pro with latest specs. Never used.",
    categoryId: "laptops",
    condition: "NEW",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&h=600&fit=crop",
    ],
    startingPrice: 1200,
    currentBid: 0,
    bidsCount: 0,
    reservePrice: 1500,
    buyNowPrice: 2800,
    startDate: inMinutes(15),
    endDate: inHours(24 + 15 / 60),
    sellerId: "seller-premium-1",
    sellerName: "TechWorld Elite",
    sellerRating: 4.9,
    rating: 5.0,
    reviewCount: 542,
    specifications: {
      Processor: "Apple M2 Max",
      RAM: "32GB",
      Storage: "512GB SSD",
      Display: "16-inch Liquid Retina XDR",
      Battery: "100%",
    },
    isActive: true,
    createdAt: agoHours(2),
    updatedAt: agoHours(1),
  },
  {
    id: "auction-2",
    title: "PlayStation 5 Console - White - Complete Bundle",
    description: "Brand new PS5 with 2 controllers and 3 games.",
    categoryId: "gaming",
    condition: "NEW",
    images: [
      "https://images.unsplash.com/photo-1606841837239-c5a626a1b8d2?w=800&h=600&fit=crop",
    ],
    startingPrice: 450,
    currentBid: 0,
    bidsCount: 0,
    reservePrice: 480,
    buyNowPrice: 649,
    startDate: inMinutes(45),
    endDate: inHours(24 + 45 / 60),
    sellerId: "seller-gaming-1",
    sellerName: "GameStop Reseller",
    sellerRating: 4.7,
    rating: 4.8,
    reviewCount: 328,
    specifications: {
      Storage: "825GB SSD",
      Color: "White",
      Included: "2 Controllers, 3 Games",
    },
    isActive: true,
    createdAt: agoHours(1),
    updatedAt: agoHours(0.5),
  },
  {
    id: "auction-3",
    title: "Sony WH-1000XM5 Wireless Headphones - Black",
    description: "Premium noise-canceling headphones. Sealed box.",
    categoryId: "audio",
    condition: "NEW",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
    ],
    startingPrice: 280,
    currentBid: 0,
    bidsCount: 0,
    reservePrice: 320,
    buyNowPrice: 399,
    startDate: inMinutes(30),
    endDate: inHours(24 + 30 / 60),
    sellerId: "seller-audio-1",
    sellerName: "Audio Paradise",
    sellerRating: 4.8,
    rating: 4.9,
    reviewCount: 1205,
    specifications: {
      "Noise Canceling": "Industry Leading ANC",
      "Battery Life": "12+ hours",
      Color: "Black",
      Features: "Multipoint connection, Ambient mode",
    },
    isActive: true,
    createdAt: agoHours(1.5),
    updatedAt: agoHours(1),
  },

  // ENDING SOON (Next 2 hours)
  {
    id: "auction-4",
    title: "iPhone 14 Pro Max - Deep Purple - 256GB",
    description: "Excellent condition. Minimal scratches on back glass.",
    categoryId: "smartphones",
    condition: "LIKE_NEW",
    images: [
      "https://images.unsplash.com/photo-1592286927505-1dad139508b7?w=800&h=600&fit=crop",
    ],
    startingPrice: 500,
    currentBid: 780,
    bidsCount: 23,
    reservePrice: 750,
    buyNowPrice: 899,
    startDate: agoHours(20),
    endDate: inMinutes(90),
    sellerId: "seller-2",
    sellerName: "Mobile Experts",
    sellerRating: 4.6,
    rating: 4.5,
    reviewCount: 412,
    specifications: {
      Storage: "256GB",
      Color: "Deep Purple",
      "Battery Health": "94%",
      Warranty: "AppleCare+",
    },
    isActive: true,
    createdAt: agoHours(22),
    updatedAt: agoHours(0.2),
  },
  {
    id: "auction-5",
    title: "Apple iPad Air 5 - Space Gray - 256GB - WiFi",
    description: "Like new condition with original packaging.",
    categoryId: "tablets",
    condition: "LIKE_NEW",
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop",
    ],
    startingPrice: 450,
    currentBid: 620,
    bidsCount: 15,
    reservePrice: 600,
    buyNowPrice: 749,
    startDate: agoHours(18),
    endDate: inMinutes(75),
    sellerId: "seller-3",
    sellerName: "Premium Tech Store",
    sellerRating: 4.8,
    rating: 4.9,
    reviewCount: 789,
    specifications: {
      Storage: "256GB",
      Color: "Space Gray",
      RAM: "8GB",
      Connectivity: "WiFi",
    },
    isActive: true,
    createdAt: agoHours(20),
    updatedAt: agoHours(0.1),
  },

  // FEATURED / POPULAR
  {
    id: "auction-6",
    title: "Samsung Galaxy Z Fold 5 - Phantom Black",
    description: "Newest foldable phone. Perfect condition.",
    categoryId: "smartphones",
    condition: "NEW",
    images: [
      "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=800&h=600&fit=crop",
    ],
    startingPrice: 900,
    currentBid: 1450,
    bidsCount: 34,
    reservePrice: 1400,
    buyNowPrice: 1799,
    startDate: agoHours(6),
    endDate: inHours(18),
    sellerId: "seller-premium-2",
    sellerName: "Electronics Hub",
    sellerRating: 4.9,
    rating: 4.8,
    reviewCount: 654,
    specifications: {
      Storage: "512GB",
      Color: "Phantom Black",
      RAM: "12GB",
    },
    isActive: true,
    createdAt: agoHours(8),
    updatedAt: agoHours(0.5),
  },
  {
    id: "auction-7",
    title: "DJI Air 3S Drone with Controller - Complete Set",
    description: "Professional drone. Like new with all accessories.",
    categoryId: "electronics",
    condition: "LIKE_NEW",
    images: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    ],
    startingPrice: 700,
    currentBid: 980,
    bidsCount: 28,
    reservePrice: 950,
    buyNowPrice: 1299,
    startDate: agoHours(12),
    endDate: inHours(12),
    sellerId: "seller-4",
    sellerName: "Drone Specialists",
    sellerRating: 4.9,
    rating: 4.9,
    reviewCount: 423,
    specifications: {
      Camera: "48MP",
      "Flight Time": "46 minutes",
      Range: "15km",
    },
    isActive: true,
    createdAt: agoHours(14),
    updatedAt: agoHours(0.3),
  },
  {
    id: "auction-8",
    title: "Apple Watch Series 9 - Titanium - 45mm",
    description: "Premium smartwatch. Excellent condition.",
    categoryId: "wearables",
    condition: "LIKE_NEW",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
    ],
    startingPrice: 280,
    currentBid: 420,
    bidsCount: 18,
    reservePrice: 400,
    buyNowPrice: 499,
    startDate: agoHours(8),
    endDate: inHours(16),
    sellerId: "seller-5",
    sellerName: "Wearable Hub",
    sellerRating: 4.7,
    rating: 4.6,
    reviewCount: 567,
    specifications: {
      Size: "45mm",
      Material: "Titanium",
      Storage: "64GB",
    },
    isActive: true,
    createdAt: agoHours(10),
    updatedAt: agoHours(0.4),
  },

  // RECENTLY ADDED / NEWEST
  {
    id: "auction-9",
    title: "Canon EOS R6 Mirrorless Camera - Body Only",
    description: "Professional grade camera. Mint condition.",
    categoryId: "cameras",
    condition: "NEW",
    images: [
      "https://images.unsplash.com/photo-1606933248051-5ce41e29fe5d?w=800&h=600&fit=crop",
    ],
    startingPrice: 1800,
    currentBid: 0,
    bidsCount: 0,
    reservePrice: 2100,
    buyNowPrice: 2499,
    startDate: agoHours(0.5),
    endDate: inHours(24),
    sellerId: "seller-6",
    sellerName: "Pro Photo Equipment",
    sellerRating: 4.8,
    rating: 4.9,
    reviewCount: 289,
    specifications: {
      Megapixels: "20.1MP",
      Video: "8K Recording",
      "ISO Range": "100-102400",
    },
    isActive: true,
    createdAt: agoHours(1),
    updatedAt: agoHours(0.5),
  },
  {
    id: "auction-10",
    title: "Nintendo Switch OLED - White - Bundle",
    description: "Latest model with game included.",
    categoryId: "gaming",
    condition: "NEW",
    images: [
      "https://images.unsplash.com/photo-1609708536965-29b4a5258c56?w=800&h=600&fit=crop",
    ],
    startingPrice: 280,
    currentBid: 0,
    bidsCount: 0,
    reservePrice: 300,
    buyNowPrice: 379,
    startDate: agoHours(2),
    endDate: inHours(22),
    sellerId: "seller-gaming-2",
    sellerName: "Game Central",
    sellerRating: 4.6,
    rating: 4.7,
    reviewCount: 445,
    specifications: {
      Storage: "64GB",
      Screen: "OLED Display",
      Color: "White",
    },
    isActive: true,
    createdAt: agoHours(2.5),
    updatedAt: agoHours(2),
  },
  {
    id: "auction-11",
    title: "GoPro Hero 11 Black - Action Camera",
    description: "Latest action camera. Waterproof to 33ft.",
    categoryId: "cameras",
    condition: "LIKE_NEW",
    images: [
      "https://images.unsplash.com/photo-1617638924702-92f37fcb0f6d?w=800&h=600&fit=crop",
    ],
    startingPrice: 350,
    currentBid: 0,
    bidsCount: 0,
    reservePrice: 380,
    buyNowPrice: 499,
    startDate: agoHours(1),
    endDate: inHours(23),
    sellerId: "seller-7",
    sellerName: "Action Sports Gear",
    sellerRating: 4.7,
    rating: 4.8,
    reviewCount: 312,
    specifications: {
      "Video Resolution": "5.3K60",
      Waterproof: "33ft",
      Stabilization: "HyperSmooth 6.0",
    },
    isActive: true,
    createdAt: agoHours(1.5),
    updatedAt: agoHours(1),
  },
  {
    id: "auction-12",
    title: "Bose QuietComfort 45 Headphones - Black",
    description: "Legendary comfort and sound quality.",
    categoryId: "audio",
    condition: "GOOD",
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop",
    ],
    startingPrice: 220,
    currentBid: 0,
    bidsCount: 0,
    reservePrice: 250,
    buyNowPrice: 379,
    startDate: agoHours(0.25),
    endDate: inHours(23.75),
    sellerId: "seller-8",
    sellerName: "Audio Experts",
    sellerRating: 4.5,
    rating: 4.6,
    reviewCount: 234,
    specifications: {
      "Battery Life": "24 hours",
      "Noise Canceling": "True noise canceling",
      Color: "Black",
    },
    isActive: true,
    createdAt: agoHours(0.75),
    updatedAt: agoHours(0.25),
  },
];

export const mockCategories = [
  { id: "smartphones", name: "Smartphones", slug: "smartphones" },
  { id: "laptops", name: "Laptops", slug: "laptops" },
  { id: "tablets", name: "Tablets", slug: "tablets" },
  { id: "gaming", name: "Gaming", slug: "gaming" },
  { id: "audio", name: "Audio & Headphones", slug: "audio" },
  { id: "wearables", name: "Wearables", slug: "wearables" },
  { id: "cameras", name: "Cameras & Video", slug: "cameras" },
  { id: "electronics", name: "Electronics", slug: "electronics" },
];
