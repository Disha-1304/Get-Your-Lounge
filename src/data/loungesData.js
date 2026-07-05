export const CURRENCIES = {
  USD: { symbol: '$', rate: 1.0, name: 'USD - US Dollar' },
  EUR: { symbol: '€', rate: 0.92, name: 'EUR - Euro' },
  GBP: { symbol: '£', rate: 0.79, name: 'GBP - British Pound' },
  INR: { symbol: '₹', rate: 83.5, name: 'INR - Indian Rupee' },
  SGD: { symbol: 'S$', rate: 1.35, name: 'SGD - Singapore Dollar' },
  AED: { symbol: 'AED ', rate: 3.67, name: 'AED - UAE Dirham' },
};

export const HERO_SHOWCASE = [
  {
    title: 'Singapore Changi Rainforest Sanctuary',
    location: 'SIN • Terminal 3',
    tag: 'WORLD #1 RATED',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-hotel-lobby-with-modern-lighting-41551-large.mp4',
    price: 36
  },
  {
    title: 'Dubai First Class Champagne Concourse',
    location: 'DXB • Concourse B',
    tag: 'ULTRA LUXURY',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bartender-making-a-cocktail-in-a-bar-41618-large.mp4',
    price: 42
  },
  {
    title: 'New York JFK Sky Terrace Suite',
    location: 'JFK • Terminal 4',
    tag: 'COCKTAILS & VIEWS',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1400&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-serving-drinks-in-a-luxury-bar-41614-large.mp4',
    price: 45
  }
];

export const LOUNGE_GUIDES = [
  {
    id: 'sin-changi',
    city: 'Singapore Changi',
    country: 'Singapore',
    airportCode: 'SIN',
    terminals: ['Terminal 1', 'Terminal 2', 'Terminal 3', 'Terminal 4'],
    rating: 4.9,
    reviewsCount: 1420,
    priceUSD: 36,
    status: 'Quiet & Spacious',
    statusColor: '#10b981',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=85',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
    description: 'Experience world-class luxury overlooking Changi’s indoor rainforest and Jewel waterfall. Features live chef noodle bars, private rainfall shower suites, and sleep suites.',
    amenities: ['Buffet & Live Chef', 'Private Showers', 'Nap Suites', 'High-Speed Wi-Fi', 'Premium Bar', 'Workstation Cubicles'],
    virtualTour: [
      { title: 'The Grand Lounge Saloon & Indoor Foliage', url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85' },
      { title: 'Artisanal Cocktail & Champagne Bar', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85' },
      { title: 'Private Rainfall Spa & Shower Suites', url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=85' },
      { title: 'Ergonomic Work Pods & Quiet Zone', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85' }
    ],
    region: 'Asia',
    coordinates: { x: 78, y: 55 }
  },
  {
    id: 'hkg-hongkong',
    city: 'Hong Kong SAR',
    country: 'Hong Kong',
    airportCode: 'HKG',
    terminals: ['Terminal 1 - Near Gate 1', 'Terminal 1 - Near Gate 35'],
    rating: 4.8,
    reviewsCount: 980,
    priceUSD: 38,
    status: 'Moderate',
    statusColor: '#3b82f6',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=85',
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85',
    description: 'An architectural masterpiece featuring bespoke teak furnishings, dim sum trolley service, signature teahouse bars, and panoramic runway views.',
    amenities: ['Authentic Dim Sum Bar', 'Signature Teahouse', 'Luxury Showers', 'Quiet Zone', 'Fast Wi-Fi', 'Runway Views'],
    virtualTour: [
      { title: 'Panoramic Tarmac Seating Area', url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=85' },
      { title: 'Signature Teahouse Sanctuary', url: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85' }
    ],
    region: 'Asia',
    coordinates: { x: 79, y: 44 }
  },
  {
    id: 'dxb-dubai',
    city: 'Dubai International',
    country: 'United Arab Emirates',
    airportCode: 'DXB',
    terminals: ['Terminal 1 (Concourse D)', 'Terminal 3 (Concourse A, B, C)'],
    rating: 4.9,
    reviewsCount: 2150,
    priceUSD: 42,
    status: 'High Demand',
    statusColor: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=85',
    description: 'Palatial luxury spanning two levels featuring international gourmet spreads, live cigar lounges, private duty-free shopping assistance, and snoozecubes.',
    amenities: ['Gourmet International Dining', 'Cigar & Cognac Bar', 'Hydrotherapy Showers', 'Sleep Pods', 'Kid Play Zone', 'VIP Concierge'],
    virtualTour: [
      { title: 'Concourse VIP Royal Atrium', url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85' },
      { title: 'Gourmet International Dining Buffet', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85' }
    ],
    region: 'Middle East',
    coordinates: { x: 63, y: 45 }
  },
  {
    id: 'jfk-newyork',
    city: 'New York JFK',
    country: 'USA',
    airportCode: 'JFK',
    terminals: ['Terminal 1', 'Terminal 4', 'Terminal 7', 'Terminal 8'],
    rating: 4.7,
    reviewsCount: 1120,
    priceUSD: 45,
    status: 'Quiet & Spacious',
    statusColor: '#10b981',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=900&q=85',
    heroImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1400&q=85',
    description: 'Sleek Manhattan speakeasy-inspired lounge with craft mixologists, local NY bagel spreads, private soundproof phone booths, and work desks.',
    amenities: ['Craft Speakeasy Bar', 'NY Deli Spread', 'Soundproof Phone Booths', 'Ultra-Fast Fiber Wi-Fi', 'Luxury Showers'],
    virtualTour: [
      { title: 'Manhattan Skyline Lounge Bar', url: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=1200&q=85' }
    ],
    region: 'Americas',
    coordinates: { x: 26, y: 35 }
  },
  {
    id: 'bkk-bangkok',
    city: 'Bangkok Don Mueang',
    country: 'Thailand',
    airportCode: 'DMK / BKK',
    terminals: ['International Terminal 1', 'Domestic Terminal 2'],
    rating: 4.8,
    reviewsCount: 840,
    priceUSD: 30,
    status: 'Quiet & Spacious',
    statusColor: '#10b981',
    image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=900&q=85',
    heroImage: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1400&q=85',
    description: 'Contemporary Thai hospitality with live Pad Thai cooking stations, traditional foot massage chairs, and tranquil bamboo garden views.',
    amenities: ['Traditional Thai Cuisine', 'Massage Chairs', 'Rainfall Showers', 'Family Lounge', 'Barista Coffee Bar'],
    virtualTour: [
      { title: 'Teak Lounge & Garden Dining', url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=1200&q=85' }
    ],
    region: 'Asia',
    coordinates: { x: 75, y: 50 }
  },
  {
    id: 'ist-istanbul',
    city: 'Istanbul',
    country: 'Türkiye',
    airportCode: 'IST',
    terminals: ['International Terminal - Mezzanine Level'],
    rating: 4.9,
    reviewsCount: 1670,
    priceUSD: 40,
    status: 'Moderate',
    statusColor: '#3b82f6',
    image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=900&q=85',
    heroImage: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1400&q=85',
    description: 'Spanning over 6,000 sqm of Ottoman luxury. Includes grand piano lounges, live pide and baklava bakeries, golf simulators, and private rest suites.',
    amenities: ['Live Bakery & Baklava Bar', 'Grand Piano & Library', 'Golf Simulator', 'Private Rest Cabins', 'Luxury Showers'],
    virtualTour: [
      { title: 'The Bosphorus Hallway & Library', url: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=85' }
    ],
    region: 'Europe',
    coordinates: { x: 57, y: 38 }
  },
  {
    id: 'del-delhi',
    city: 'Delhi Indira Gandhi',
    country: 'India',
    airportCode: 'DEL',
    terminals: ['Terminal 3 International', 'Terminal 3 Domestic', 'Terminal 2'],
    rating: 4.8,
    reviewsCount: 1890,
    priceUSD: 28,
    status: 'Moderate',
    statusColor: '#3b82f6',
    image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=900&q=85',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1400&q=85',
    description: 'Spacious sanctuary with rich Indian royal decor, live chaat & tandoori counters, Ayurvedic spa therapists, and dedicated nap cubicles.',
    amenities: ['Live Tandoori & Chaat Bar', 'Ayurvedic Spa Treatments', 'Dedicated Nap Rooms', 'High-Speed Wi-Fi', 'Cocktail Lounge'],
    virtualTour: [
      { title: 'Royal Heritage Seating Atrium', url: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=1200&q=85' }
    ],
    region: 'Asia',
    coordinates: { x: 70, y: 44 }
  },
  {
    id: 'fra-frankfurt',
    city: 'Frankfurt',
    country: 'Germany',
    airportCode: 'FRA',
    terminals: ['Terminal 1 Concourse Z', 'Terminal 2 Concourse D & E'],
    rating: 4.7,
    reviewsCount: 1040,
    priceUSD: 39,
    status: 'Quiet & Spacious',
    statusColor: '#10b981',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=85',
    heroImage: 'https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1400&q=85',
    description: 'Precision engineering meets relaxation. Enjoy German pretzel stations, premium Bavarian beer taps, ergonomic workstations, and spa showers.',
    amenities: ['Bavarian Draft Beers', 'Ergonomic Work Suites', 'Refreshment Showers', 'Flight Information Screens', 'Warm Buffet'],
    virtualTour: [
      { title: 'Skyline Business Club & Tarmac Views', url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85' }
    ],
    region: 'Europe',
    coordinates: { x: 50, y: 34 }
  },
  {
    id: 'lhr-london',
    city: 'London Heathrow',
    country: 'United Kingdom',
    airportCode: 'LHR',
    terminals: ['Terminal 2', 'Terminal 3', 'Terminal 4', 'Terminal 5'],
    rating: 4.9,
    reviewsCount: 2310,
    priceUSD: 44,
    status: 'High Demand',
    statusColor: '#f59e0b',
    image: '/heathrow-t2.png',
    heroImage: '/heathrow-t2.png',
    description: 'Sophisticated British elegance featuring complimentary champagne bars, afternoon tea towers, cinema screening rooms, and luxury spa suites in Terminal 2.',
    amenities: ['Afternoon Tea & Champagne Bar', 'Luxury Spa treatments', 'Private Cinema Room', 'Shower Suites', 'Dedicated Business Club'],
    virtualTour: [
      { title: 'Terminal 2 Plaza & Luxury Lounge Suite', url: '/heathrow-t2.png' }
    ],
    region: 'Europe',
    coordinates: { x: 47, y: 32 }
  },
  {
    id: 'hnd-tokyo',
    city: 'Tokyo Haneda',
    country: 'Japan',
    airportCode: 'HND',
    terminals: ['Terminal 3 International'],
    rating: 5.0,
    reviewsCount: 1950,
    priceUSD: 42,
    status: 'Quiet & Spacious',
    statusColor: '#10b981',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=900&q=85',
    heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1400&q=85',
    description: 'Immaculate Zen minimalist sanctuary offering live ramen and sushi bars, sake tasting flights, private Hinoki wood shower stalls, and meditation pods.',
    amenities: ['Live Ramen & Sushi Chef', 'Sake & Whisky Tasting Bar', 'Hinoki Wood Showers', 'Private Meditation Pods', 'High-Speed Fiber'],
    virtualTour: [
      { title: 'Zen Meditation Atrium & Sushi Bar', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=85' }
    ],
    region: 'Asia',
    coordinates: { x: 86, y: 38 }
  }
];

export const FEATURED_PARTNERS = [
  { name: 'Plaza Premium Lounge', logo: '/partner-logo-1.png' },
  { name: 'Lounge Me', logo: '/partner-logo-2.png' },
  { name: 'The Coral', logo: '/partner-logo-3.png' },
  { name: 'Zero Eight Zero', logo: '/partner-logo-4.png' },
  { name: 'W Premium Group', logo: '/partner-logo-5.png' },
  { name: 'Goldair Handling', logo: '/partner-logo-6.png' },
  { name: 'Aspire Airport Lounges', logo: '/partner-logo-8.png' },
  { name: 'Ahlan Lounge DXB', logo: '/partner-logo-9.png' },
  { name: 'NASCO', logo: '/partner-logo-10.png' },
  { name: 'Bidvest Premier Lounge', logo: '/partner-logo-11.png' },
  { name: 'Travel Club Lounge', logo: '/partner-logo-12.png' }
];

export const FEATURED_AIRLINES = [
  { name: 'Air France KLM Group', logo: '/airline-logo-1.png' },
  { name: 'Air India', logo: '/airline-logo-2.png' },
  { name: 'Avianca', logo: '/airline-logo-3.png' },
  { name: 'Bangkok Airways', logo: '/airline-logo-4.png' },
  { name: 'Star Alliance', logo: '/airline-logo-5.png' },
  { name: 'Turkish Airlines', logo: '/airline-logo-6.png' },
  { name: 'Vietnam Airlines', logo: '/airline-logo-7.png' }
];

export const FAQ_ITEMS = [
  {
    q: 'What exactly do I get with a LoungePair Pass?',
    a: 'A LoungePair Pass gives you full, guaranteed entry to premium airport lounges worldwide without requiring an annual airline or credit card membership. Your pass includes complimentary gourmet food, alcoholic and non-alcoholic beverages, high-speed Wi-Fi, comfortable reclining workstations, and access to luxury amenities like showers and nap pods (subject to lounge availability).'
  },
  {
    q: 'What makes the LoungePair Pass flexible?',
    a: 'We understand travel plans change! With LoungePair, your pass is valid for any flight delay or reschedule up to 365 days from purchase. If your flight arrives early or late, your access window automatically adjusts. Plus, you get 100% money-back cancellation up to 2 hours before your scheduled entry time.'
  },
  {
    q: 'How do LoungePair passes work?',
    a: 'Simply search your departure airport or layover city on our app, select your preferred lounge, and complete a 30-second checkout. You will instantly receive a digital 3D QR boarding pass on your phone and email. Just scan your phone screen at the lounge front desk—no printing or paperwork required!'
  },
  {
    q: 'Can I use my LoungePair Lounge Pass immediately?',
    a: 'Yes! Instant digital issuance means you can buy your pass while standing right outside the lounge doors at the airport terminal and enter immediately within seconds.'
  },
  {
    q: 'Is my payment secure?',
    a: 'Absolutely. All transactions are encrypted with enterprise-grade 256-bit SSL encryption and processed through PCI-DSS Level 1 certified international payment gateways (Stripe & Apple/Google Pay).'
  },
  {
    q: 'Can I cancel or change my booking?',
    a: 'Yes. You can manage, reschedule, or cancel your booking directly from your LoungePair account dashboard with zero penalty fees up to 2 hours prior to check-in.'
  },
  {
    q: 'What if a lounge is full when I arrive?',
    a: 'Unlike walk-in travelers who get turned away during peak hours, LoungePair pass holders receive Priority Guaranteed Capacity Allocation at over 92% of our partner network. In the rare event of temporary maximum capacity, you will either receive priority front-of-line VIP access or an instant voucher for an alternative lounge terminal plus a 20% credit.'
  }
];

export const SOCIAL_GALLERY = [
  {
    id: 1,
    user: '@alex_globetrotter',
    location: 'Singapore Changi T3 Sanctuary',
    likes: '1,420',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=85',
    comment: 'Nothing beats starting a 14-hour flight with a rainfall shower and laksa chef bar overlooking the indoor rainforest thanks to @LoungePair! #Ilovemylounge'
  },
  {
    id: 2,
    user: '@sarah.jetset',
    location: 'Dubai International DXB VIP Concourse',
    likes: '2,890',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=900&q=85',
    comment: 'No membership? No problem! Bought my LoungePair digital pass 5 mins before boarding. Total lifesaver during a 5-hour layover.'
  },
  {
    id: 3,
    user: '@tech_nomad_marcus',
    location: 'London Heathrow LHR Royal Club',
    likes: '945',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85',
    comment: 'Ultra high-speed Wi-Fi and quiet cubicles. Closed 3 deals before my transatlantic flight. Highly recommend @LoungePair!'
  },
  {
    id: 4,
    user: '@priya_wanderlust',
    location: 'Delhi IGIA T3 Heritage Atrium',
    likes: '1,680',
    image: 'https://images.unsplash.com/photo-1563911302283-d2bc129e7570?auto=format&fit=crop&w=900&q=85',
    comment: 'Fresh tandoori paneer tikka and spa chairs before flying to Europe. Best airport experience ever! #Ilovemylounge'
  }
];

export const VIP_COMPARISON = [
  {
    feature: 'Seating & Atmosphere',
    terminal: 'Crowded plastic gate chairs, loud announcements, nowhere to rest.',
    terminalImage: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=600&q=80',
    loungePair: 'Plush ergonomic recliners, quiet soundproof serenity, ambient lighting.',
    loungeImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80'
  },
  {
    feature: 'Food & Dining',
    terminal: 'Overpriced stale airport sandwiches ($18+) and long fast-food lines.',
    terminalImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
    loungePair: 'Unlimited hot gourmet buffets, live chef stations, fresh pastries included.',
    loungeImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80'
  },
  {
    feature: 'Drinks & Cocktails',
    terminal: '$12 water bottles and expensive airport bars.',
    terminalImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    loungePair: 'Complimentary barista espresso, premium wines, craft beer & spirits.',
    loungeImage: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80'
  },
  {
    feature: 'Refreshment & Showers',
    terminal: 'Crowded public terminal restrooms.',
    terminalImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    loungePair: 'Private luxury shower suites with organic towels and luxury toiletries.',
    loungeImage: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80'
  },
  {
    feature: 'Work & Productivity',
    terminal: 'Hunting on the floor for working power sockets.',
    terminalImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
    loungePair: 'Dedicated high-speed fiber Wi-Fi, desk pods, and universal charging ports at every seat.',
    loungeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80'
  }
];
