// mockData.ts


// All Listing Items
export const LISTING_ITEMS = [
  {
    listerId: 'user1',
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=3036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    listing: 'Dior Backless Evening Gown',
    category: 'Red Dress',
    size: 'US 7',
    rentalPrice: 20,
    retailPrice: 100,
    rating: 1.56,
    ratingCount: 12,
    description: "This is a fantastic item that will elevate your style to the next level. Crafted from the finest materials, this piece combines both comfort and fashion. Whether youre going out with friends or attending a formal, this is the perfect choice for any occasion."
  },
  {
    listerId: 'user2',
    imageUrl: 'https://images.unsplash.com/photo-1609840170480-4c440bcd5d8f?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    listing: 'Ralph Lauren Suit',
    category: 'Gray Suit',
    size: 'US 10',
    rentalPrice: 35,
    retailPrice: 200,
    rating: 3.76,
    ratingCount: 123,
    description: "Elevate your style with this impeccably tailored three-piece gray plaid suit, perfect for making a bold yet sophisticated statement. Crafted from premium fabric, the suit features a slim-fit blazer, matching waistcoat, and tapered trousers that highlight a modern silhouette while ensuring all-day comfort. The subtle plaid pattern adds a touch of classic elegance, while the crisp white dress shirt and brown textured tie create a refined contrast. Finished with polished brown leather oxford shoes and a sleek timepiece, this ensemble is ideal for formal events, business meetings, or upscale gatherings."
  }
];

// Sample Users
export const SAMPLE_USERS = [
  {
    userId: 'user1',
    name: 'Alyssa Gray',
    username: '@alyssa.gray04',
    profileImage: 'https://i.pinimg.com/736x/2f/dd/bb/2fddbbaacd7c5c9e725e2b5f62be8b5b.jpg',
    reviews: 15,
    userRating: 4.5,
    responseRate: 96,
  },
  {
    userId: 'user2',
    name: 'James Carter',
    username: '@james.carter21',
    profileImage: 'https://randomuser.me/api/portraits/men/45.jpg',
    reviews: 22,
    userRating: 4.8,
    responseRate: 92,
  }
];


// Closet Items (ProfileScreen)
export const CLOSET_ITEMS = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1604014237744-df3c8f9305a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    brand: 'Nike',
    name: 'Air Max 2021',
    size: 'Men’s 10.5',
    price: '$35 / day',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1618354691325-68baad1f3d50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    brand: 'Levi’s',
    name: 'Denim Jacket',
    size: 'Medium',
    price: '$20 / day',
  },
];

// Explore Listings
export const EXPLORE_ITEMS = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Saugerties, New York',
    subtitle: 'Featured in Architectural Digest Jan 13 – 18',
    price: '$1,014 night',
    rating: 4.88,
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    location: 'Malibu, California',
    subtitle: 'Oceanfront Property Jan 20 – 25',
    price: '$2,200 night',
    rating: 4.95,
  },
];

// Rental Items
export const RENTAL_ITEMS = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    brand: 'Nike',
    name: 'Air Max 2022',
    dateRange: 'Feb 10 – Feb 14, 2025',
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1566753323558-f4e0952af115?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    brand: 'Levi’s',
    name: 'Vintage Denim Jacket',
    dateRange: 'Mar 01 – Mar 05, 2025',
  },
];
