export interface Product {
  id: string;
  title: string;
  description: string;
  categoryId: string;
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
  sellerRating: number;
  rating: number;
  reviewCount: number;
  specifications: Record<string, any>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

const now = new Date();

export const mockProducts: Product[] = [
  {
    id: "1",
    title: "iPhone 14 - Unlocked - Purple - 128 GB",
    description:
      "Excellent condition iPhone 14 with minimal signs of use. All functions work perfectly.",
    categoryId: "smartphones",
    condition: "LIKE_NEW",
    images: [
      "https://images.unsplash.com/photo-1592286927505-1dad139508b7?w=400&h=400&fit=crop",
    ],
    startingPrice: 399.99,
    currentBid: 549.99,
    bidsCount: 12,
    reservePrice: 500,
    buyNowPrice: 649.99,
    startDate: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    sellerId: "seller-1",
    sellerName: "TechHub Electronics",
    sellerRating: 4.8,
    rating: 4.5,
    reviewCount: 247,
    specifications: {
      Storage: "128GB",
      Color: "Purple",
      "Battery Health": "92%",
      "Screen Condition": "Perfect",
      Warranty: "None",
    },
    isActive: true,
    createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: 'MacBook Air M1 (13", 2020) - Space Gray',
    description:
      "Barely used MacBook Air M1 with original box and charger. Like new condition.",
    categoryId: "laptops",
    condition: "NEW",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    ],
    startingPrice: 699.99,
    currentBid: 899.99,
    bidsCount: 8,
    reservePrice: 850,
    buyNowPrice: 999.99,
    startDate: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(now.getTime() + 5 * 60 * 60 * 1000).toISOString(),
    sellerId: "seller-2",
    sellerName: "Premium Refurbished",
    sellerRating: 4.9,
    rating: 4.8,
    reviewCount: 582,
    specifications: {
      Processor: "Apple M1",
      RAM: "8GB",
      Storage: "256GB SSD",
      Display: '13" Retina',
      Condition: "Like New",
    },
    isActive: true,
    createdAt: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "iPad 9 (2021, 3rd Series) - Silver",
    description:
      "Good condition iPad with minor scratches on back. Fully functional.",
    categoryId: "tablets",
    condition: "GOOD",
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3af4abd8?w=400&h=400&fit=crop",
    ],
    startingPrice: 199.99,
    currentBid: 249.99,
    bidsCount: 5,
    buyNowPrice: 299.99,
    startDate: new Date(now.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(now.getTime() + 18 * 60 * 60 * 1000).toISOString(),
    sellerId: "seller-3",
    sellerName: "CityTech Store",
    sellerRating: 4.6,
    rating: 4.3,
    reviewCount: 156,
    specifications: {
      Storage: "64GB",
      Color: "Silver",
      "Screen Size": '10.2"',
      "Battery Health": "88%",
    },
    isActive: true,
    createdAt: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    title: "Nintendo Switch OLED - White",
    description:
      "Excellent condition Switch OLED with games and accessories included.",
    categoryId: "gaming",
    condition: "EXCELLENT",
    images: [
      "https://images.unsplash.com/photo-1535869788-e34ca9c7a7e0?w=400&h=400&fit=crop",
    ],
    startingPrice: 279.99,
    currentBid: 379.99,
    bidsCount: 15,
    reservePrice: 350,
    buyNowPrice: 449.99,
    startDate: new Date(now.getTime() - 8 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(now.getTime() + 3 * 60 * 60 * 1000).toISOString(),
    sellerId: "seller-4",
    sellerName: "GameStop Seller",
    sellerRating: 4.7,
    rating: 4.6,
    reviewCount: 324,
    specifications: {
      Type: "OLED Model",
      Color: "White",
      Included: "Games, Dock, 2 Controllers",
      "Battery Life": "Good",
    },
    isActive: true,
    createdAt: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    title: "Apple Watch Series 7 - 41mm Space Black",
    description:
      "Like new Apple Watch with minimal wear. Perfect screen and battery.",
    categoryId: "smartwatches",
    condition: "LIKE_NEW",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    ],
    startingPrice: 249.99,
    currentBid: 319.99,
    bidsCount: 9,
    buyNowPrice: 379.99,
    startDate: new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(now.getTime() + 7 * 60 * 60 * 1000).toISOString(),
    sellerId: "seller-1",
    sellerName: "TechHub Electronics",
    sellerRating: 4.8,
    rating: 4.7,
    reviewCount: 189,
    specifications: {
      Size: "41mm",
      Color: "Space Black",
      Band: "Sport Band",
      "Battery Health": "96%",
    },
    isActive: true,
    createdAt: new Date(now.getTime() - 18 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    title: "Sony WH-1000XM4 Headphones - Black",
    description:
      "Excellent condition noise-cancelling headphones. All features working perfectly.",
    categoryId: "audio",
    condition: "EXCELLENT",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    ],
    startingPrice: 199.99,
    currentBid: 299.99,
    bidsCount: 7,
    reservePrice: 280,
    buyNowPrice: 349.99,
    startDate: new Date(now.getTime() - 6 * 60 * 60 * 1000).toISOString(),
    endDate: new Date(now.getTime() + 4.5 * 60 * 60 * 1000).toISOString(),
    sellerId: "seller-5",
    sellerName: "Audio Experts",
    sellerRating: 4.9,
    rating: 4.8,
    reviewCount: 412,
    specifications: {
      "Noise Cancellation": "Yes",
      Color: "Black",
      "Battery Life": "30 hours",
      Warranty: "None",
    },
    isActive: true,
    createdAt: new Date(now.getTime() - 36 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(),
  },
];
