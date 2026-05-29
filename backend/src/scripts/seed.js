import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Tour from '../models/Tour.js';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';

dotenv.config();

const users = [
  {
    name: 'Shubham Admin',
    email: 'shubham@123456',
    password: '009524', // Will be hashed by User model pre-save hook
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'user@jaibaba.com',
    password: 'userpassword', // Will be hashed by User model pre-save hook
    role: 'user',
  },
];

const tours = [
  {
    title: 'Bali Tropical Paradise & Temples',
    description: 'Immerse yourself in the tropical allure of Bali. Explore the cultural heart of Ubud, witness stunning cliffside temples at sunset, walk through lush emerald rice terraces, and relax on pristine white-sand beaches. This trip offers a perfect balance of cultural immersion and ultimate relaxation.',
    destination: 'Bali, Indonesia',
    price: 899,
    duration: 7,
    maxGroupSize: 15,
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1528181304800-2f1738b24a79?auto=format&fit=crop&w=1000&q=80',
    ],
    highlights: [
      'Guided cultural tour of Ubud Sacred Monkey Forest and Royal Palace',
      'Scenic hike through Tegallalang Rice Terraces',
      'Sunset at Tanah Lot Cliff Temple',
      'Traditional Balinese spa treatment',
      'Snorkeling excursion in crystal-clear waters of Nusa Penida',
    ],
    included: [
      '6 nights in 4-star boutique hotels',
      'Daily breakfast, 3 lunches, and 2 dinners',
      'Private air-conditioned airport transfers',
      'All entrance fees to attractions listed in itinerary',
      'Certified English-speaking local tour guide',
    ],
    excluded: [
      'International flights',
      'Travel insurance (highly recommended)',
      'Personal expenses & tipping',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Bali & Welcome Dinner',
        description: 'Arrive at Denpasar Airport. Meet your private driver and check in to your Ubud hotel. Spend the afternoon resting. In the evening, enjoy a welcome dinner with traditional Balinese dance performances.',
      },
      {
        day: 2,
        title: 'Ubud Sacred Forests & Rice Terraces',
        description: 'Explore the Sacred Monkey Forest in Ubud. Afterward, head to the famous Tegallalang Rice Terraces for photos and a swing experience. Have lunch overlooking the valleys, and visit the Ubud Art Market in the afternoon.',
      },
      {
        day: 3,
        title: 'Batur Volcano Sunrise Trek & Hot Springs',
        description: 'An early start (3:00 AM) for a rewarding sunrise trek up Mount Batur. Enjoy breakfast at the summit with stunning views. On the descent, soak in natural hot springs to soothe tired muscles.',
      },
      {
        day: 4,
        title: 'Temple Trail: Ulun Danu & Tanah Lot',
        description: 'Visit the iconic floating temple, Pura Ulun Danu Beratan, on Lake Bratan. Proceed to the southwest coast in the afternoon to witness a majestic sunset at the wave-crashed Tanah Lot Temple.',
      },
      {
        day: 5,
        title: 'Transfer to Seminyak & Beach Day',
        description: 'Transfer from Ubud to Seminyak, the chic beachside hub. Check in to your beach resort. Spend the day sunbathing, swimming, or exploring trendy boutique shops and beach clubs.',
      },
      {
        day: 6,
        title: 'Nusa Penida Island Snorkeling Adventure',
        description: 'Board a fast boat to Nusa Penida. Snorkel at Manta Bay, Crystal Bay, and visit the jaw-dropping cliffs of Kelingking Beach. Return to Seminyak in the late afternoon.',
      },
      {
        day: 7,
        title: 'Departure from Bali',
        description: 'Enjoy a leisurely breakfast and some last-minute souvenir shopping. Your private transfer will take you back to Denpasar Airport for your return flight home.',
      },
    ],
    averageRating: 4.8,
    featured: true,
  },
  {
    title: 'Swiss Alps Hiking & Scenic Railways',
    description: 'Experience the breathtaking beauty of Switzerland. Walk through charming car-free villages, ride historic mountain trains to the "Top of Europe," and hike trails surrounding the majestic Matterhorn. Ideal for nature lovers and outdoor enthusiasts looking for comfort and scenery.',
    destination: 'Zermatt, Switzerland',
    price: 1699,
    duration: 8,
    maxGroupSize: 12,
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1531310197839-ccf54634509e?auto=format&fit=crop&w=1000&q=80',
    ],
    highlights: [
      'Glacier Express panoramic railway ride from St. Moritz to Zermatt',
      'Ascent to Jungfraujoch, the highest railway station in Europe',
      'Guided hiking tour around the scenic Riffelsee with Matterhorn reflections',
      'Explore the medieval old town of Lucerne and its Chapel Bridge',
    ],
    included: [
      '7 nights accommodation in traditional Alpine lodges',
      'Swiss Travel Pass (8 Days) for unlimited train, bus, and boat rides',
      'Daily Swiss breakfast buffets and 3-course dinners',
      'Mountain guide for hiking trails',
      'Cable car and cogwheel railway passes',
    ],
    excluded: [
      'Lunch and drinks during daytime excursions',
      'Flight connections to Zurich or Geneva',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Zurich & Transfer to Lucerne',
        description: 'Arrive in Zurich, activate your Swiss Travel Pass, and take the train to Lucerne. Walk the historic Chapel Bridge and enjoy a lakefront dinner.',
      },
      {
        day: 2,
        title: 'Mt. Pilatus Golden Roundtrip',
        description: 'Take a boat ride to Alpnachstad, ascend Mt. Pilatus on the world\'s steepest cogwheel railway. Take in panoramic alpine views. Descend via cable cars.',
      },
      {
        day: 3,
        title: 'Glacier Express Scenic Journey to Zermatt',
        description: 'Board the world-famous Glacier Express. Enjoy a 3-course meal served at your seat as you glide past dramatic gorges, snowy peaks, and mountain streams, arriving in car-free Zermatt.',
      },
      {
        day: 4,
        title: 'Matterhorn Views & Riffelsee Hiking',
        description: 'Ride the Gornergrat cogwheel train up to 3,089 meters. Hike down to Riffelsee lake to capture the iconic Matterhorn reflection in the alpine waters.',
      },
      {
        day: 5,
        title: 'Zermatt to Interlaken Transfer',
        description: 'Travel by train north to Interlaken, nestled between Lake Thun and Lake Brienz. Explore the town and try paragliding over the meadow.',
      },
      {
        day: 6,
        title: 'Jungfraujoch: Top of Europe',
        description: 'Journey up the Eiger Express cable car and cogwheel train to Jungfraujoch (3,454m). Explore the Ice Palace, Sphinx Observatory, and play in the snow.',
      },
      {
        day: 7,
        title: 'Lauterbrunnen Valley of 72 Waterfalls',
        description: 'Walk through the jaw-dropping Lauterbrunnen U-shaped valley. Visit Trümmelbach Falls, a series of subterranean waterfalls inside the mountain.',
      },
      {
        day: 8,
        title: 'Zurich Departure',
        description: 'Take a direct scenic train back to Zurich Airport for your flight home.',
      },
    ],
    averageRating: 4.9,
    featured: true,
  },
  {
    title: 'Tokyo & Kyoto Imperial Explorer',
    description: 'Witness the fascinating blend of ancient traditions and futuristic innovation in Japan. Navigate the bright lights and neon towers of Tokyo, then board the bullet train to Kyoto, the historic heartland filled with wooden shrines, bamboo groves, and geisha districts.',
    destination: 'Tokyo, Japan',
    price: 1399,
    duration: 9,
    maxGroupSize: 16,
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1000&q=80',
    ],
    highlights: [
      'Walk across Shibuya Crossing, the world\'s busiest pedestrian intersection',
      'Bullet train (Shinkansen) ride from Tokyo to Kyoto',
      'Explore Fushimi Inari Shrine\'s famous thousands of vermilion torii gates',
      'Interactive sushi-making class with a professional chef',
      'Wander through the towering Arashiyama Bamboo Grove',
    ],
    included: [
      '8 nights in premium central hotels',
      '7-day JR Pass for unlimited Shinkansen and local trains',
      'Daily breakfast and 4 specialized lunches/dinners',
      'All local temple, shrine, and observatory entrance fees',
      'Bilingual guide for city tours',
    ],
    excluded: [
      'Airfare to Tokyo',
      'Travel visa fees if applicable',
      'Luggage forwarding services (optional)',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Konnichiwa Tokyo!',
        description: 'Arrive in Tokyo. Check in to your Shinjuku hotel. In the evening, join a neon food tour through Golden Gai and Omoide Yokocho.',
      },
      {
        day: 2,
        title: 'Modern Tokyo: Shibuya, Harajuku & Meiji Shrine',
        description: 'Walk through the peaceful Meiji Shrine, then plunge into the youth culture of Takeshita Street in Harajuku. Cross Shibuya Crossing and view the city from Shibuya Sky observatory.',
      },
      {
        day: 3,
        title: 'Historic Asakusa & Sushi Workshop',
        description: 'Visit Senso-ji, Tokyo\'s oldest temple, in Asakusa. In the afternoon, learn the art of preparing sushi with a sushi master, and feast on your creations.',
      },
      {
        day: 4,
        title: 'Mt. Fuji & Lake Ashi Day Trip',
        description: 'Take a luxury bus to Mt. Fuji 5th Station. Cruise across the volcanic crater lake of Lake Ashi in Hakone and ride the Komagatake Ropeway cable car.',
      },
      {
        day: 5,
        title: 'Bullet Train to Kyoto & Gion Evening Walk',
        description: 'Board the Shinkansen, reaching Kyoto in 2.5 hours. Check in to a traditional ryokan. In the evening, take a guided walk through Gion in search of Geishas.',
      },
      {
        day: 6,
        title: 'Kyoto Icons: Kinkaku-ji & Fushimi Inari',
        description: 'Visit Kinkaku-ji (Golden Pavilion). Head south to hike through the tunnels of vermilion gates at Fushimi Inari Shrine before sunset.',
      },
      {
        day: 7,
        title: 'Bamboo Groves & Nara Deer Park',
        description: 'Stroll through Arashiyama Bamboo Grove in the morning. Take a short train ride to Nara to feed friendly free-roaming bowing deer and see the Giant Buddha.',
      },
      {
        day: 8,
        title: 'Kyoto Tea Ceremony & Free Afternoon',
        description: 'Participate in an authentic, tranquil Japanese Tea Ceremony. Spend the afternoon shopping for matcha, ceramics, and textiles.',
      },
      {
        day: 9,
        title: 'Depart Kyoto / Kansai Airport',
        description: 'Leisurely morning. Transfer to Kansai Airport (KIX) or back to Tokyo for your flight home.',
      },
    ],
    averageRating: 4.9,
    featured: true,
  },
  {
    title: 'Amalfi Coast & Southern Italy Getaway',
    description: 'Savor the sweetness of "La Dolce Vita" along Italy\'s Amalfi Coast. Climb the pastel-colored cliffs of Positano, walk through lemon orchards in Sorrento, and boat into the magical Blue Grotto of Capri. A rich journey through Mediterranean views, rich cuisine, and Roman history.',
    destination: 'Sorrento, Italy',
    price: 1199,
    duration: 6,
    maxGroupSize: 14,
    images: [
      'https://images.unsplash.com/photo-1486016006115-74a41448aea2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1000&q=80',
    ],
    highlights: [
      'Scenic Amalfi Coast drive stopping in Positano, Amalfi, and Ravello',
      'Boat cruise to the island of Capri and swimming in sea caves',
      'Exclusive Neapolitan pizza-making masterclass and wine tasting',
      'Private guided history tour of the ancient ruins of Pompeii',
    ],
    included: [
      '5 nights in a boutique sea-view hotel in Sorrento',
      'Daily buffet breakfasts and 3 authentic multi-course dinners',
      'Private luxury minibus for all coastal transit',
      'Boat charter for Capri cruise',
      'All tour guides and skip-the-line Pompeii tickets',
    ],
    excluded: [
      'Airfare to Naples Airport',
      'City tourist taxes (approx. €4/night)',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Benvenuti in Sorrento',
        description: 'Arrive in Naples, transfer to Sorrento. Check in to your hotel overlooking the Bay of Naples. Welcome dinner featuring fresh seafood and local Limoncello.',
      },
      {
        day: 2,
        title: 'Amalfi Coast Road: Positano & Ravello',
        description: 'Travel the winding coastal road. Stop in Positano to explore steep streets and shops. Have lunch in Amalfi town, and finish with a visit to the gardens of Ravello.',
      },
      {
        day: 3,
        title: 'Capri Island Boat Cruise',
        description: 'Board a private boat to Capri. Circle the island, admire the Faraglioni rock formations, swim in emerald waters, and explore Capri town at your leisure.',
      },
      {
        day: 4,
        title: 'Pompeii Ruins & Volcano Vineyards',
        description: 'Walk the excavated streets of Pompeii with an archaeologist. Afterward, visit a organic vineyard on the slopes of Mt. Vesuvius for lunch and wine tasting.',
      },
      {
        day: 5,
        title: 'Sorrentine Lemon Trails & Pizza Class',
        description: 'Walk through lemon groves and taste fresh citrus marmalades. In the evening, learn the secrets of wood-fired Neapolitan pizza from an expert pizzaiolo.',
      },
      {
        day: 6,
        title: 'Ciao Italia! Departure',
        description: 'After breakfast, take a private shuttle back to Naples Airport for your flight home.',
      },
    ],
    averageRating: 4.7,
    featured: false,
  },
  {
    title: 'Historic Wonders of Cairo & Nile',
    description: 'Travel back in time to the land of Pharaohs and Pyramids. Stand before the Great Pyramid of Giza, look into the eyes of the Sphinx, and sail down the legendary Nile River. This tour is packed with archaeological marvels and historic storytelling.',
    destination: 'Cairo, Egypt',
    price: 799,
    duration: 5,
    maxGroupSize: 20,
    images: [
      'https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1000&q=80',
    ],
    highlights: [
      'Guided tour of Giza Plateau, Pyramids, and Sphinx with an Egyptologist',
      'Visit the Egyptian Museum housing King Tutankhamun\'s gold treasures',
      'Felucca sailboat ride on the Nile River at sunset',
      'Bargain hunting in the historical Khan el-Khalili bazaar',
    ],
    included: [
      '4 nights in a 5-star hotel in Cairo overlooking the Nile',
      'All ground transportation in air-conditioned vehicles',
      'Daily breakfast, 3 traditional Egyptian lunches',
      'All monument entry tickets',
      'Private certified Egyptologist guide',
    ],
    excluded: [
      'Egypt Entry Visa ($25 USD, available at airport)',
      'Entry tickets inside the pyramid chambers',
      'Dinner and personal tips',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Cairo',
        description: 'Arrive at Cairo International Airport. Meet your guide, transfer to your hotel, and check in. Rest up for the adventure ahead.',
      },
      {
        day: 2,
        title: 'Pyramids of Giza & Great Sphinx',
        description: 'Marvel at the ancient Pyramids of Giza. Visit the Great Sphinx and the Valley Temple. Stop for lunch at a scenic restaurant facing the Pyramids. Visit Sakkara Step Pyramid in the afternoon.',
      },
      {
        day: 3,
        title: 'Grand Egyptian Museum & Nile Cruise',
        description: 'Explore the Egyptian Museum and see the treasures of King Tut. In the evening, enjoy a sunset ride on a traditional Felucca boat down the Nile.',
      },
      {
        day: 4,
        title: 'Coptic Cairo & Khan el-Khalili Bazaar',
        description: 'Visit the Hanging Church and Ben Ezra Synagogue in Coptic Cairo. Walk through the bustling alleys of the Khan el-Khalili bazaar to shop for spices, brass lanterns, and jewelry.',
      },
      {
        day: 5,
        title: 'Cairo Departure',
        description: 'Enjoy breakfast and a view of the Nile. Check out and transfer to Cairo Airport for your departure flight.',
      },
    ],
    averageRating: 4.6,
    featured: false,
  },
  {
    title: 'Icelandic Lights & Arctic Glaciers',
    description: 'Explore a landscape of ice and fire. Walk behind roaring waterfalls, step onto blue glacier ice, witness steam escaping black sands, and scan the dark night skies for the dance of the Northern Lights. This trip takes you along the famous Ring Road and Golden Circle.',
    destination: 'Reykjavik, Iceland',
    price: 1799,
    duration: 7,
    maxGroupSize: 10,
    images: [
      'https://images.unsplash.com/photo-1504893524553-ac55fce698be?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=80',
    ],
    highlights: [
      'Soak in the geothermal waters of the world-famous Blue Lagoon',
      'Search for the Aurora Borealis on a guided night safari',
      'Walk behind the veil of the Seljalandsfoss waterfall',
      'Glacier hike with crampons on Solheimajokull Glacier tongue',
      'Watch erupting geysers at Geysir Geothermal Area',
    ],
    included: [
      '6 nights in premium wilderness cabins and hotels',
      'Daily Nordic buffet breakfast',
      'Expert driver-guide in a 4x4 Super Jeep suitable for ice roads',
      'Glacier hiking gear (harness, crampons, ice axe)',
      'Admission ticket to the Blue Lagoon Comfort Package',
    ],
    excluded: [
      'Flights to Keflavik Airport (KEF)',
      'Lunches and dinners',
    ],
    itinerary: [
      {
        day: 1,
        title: 'Blue Lagoon Welcome & Reykjavik',
        description: 'Arrive in Iceland, transfer to the Blue Lagoon for a relaxing soak in silica-rich waters. Check in to your hotel in Reykjavik.',
      },
      {
        day: 2,
        title: 'Golden Circle Wonders & Northern Lights Hunt',
        description: 'Visit Thingvellir National Park, Geysir, and Gullfoss Golden Waterfall. In the evening, head out into the dark countryside to search for the Northern Lights.',
      },
      {
        day: 3,
        title: 'Waterfalls & Black Sand Beaches of South Coast',
        description: 'Visit Seljalandsfoss and Skogafoss waterfalls. Walk along the black sand beach of Reynisfjara, looking out at basalt columns rising from the Atlantic waves.',
      },
      {
        day: 4,
        title: 'Solheimajokull Glacier Hike & Vik Village',
        description: 'Strap on crampons for a guided walk across the crevasses of Solheimajokull Glacier. Spend the night in the coastal village of Vik.',
      },
      {
        day: 5,
        title: 'Jokulsarlon Glacier Lagoon & Diamond Beach',
        description: 'Explore Jokulsarlon Glacier Lagoon, where icebergs drift toward the ocean. Cross the road to Diamond Beach to see glistening ice blocks on black sand.',
      },
      {
        day: 6,
        title: 'Return to Reykjavik & Capital Explorations',
        description: 'Drive back along the south coast. Enjoy a free afternoon in Reykjavik visiting Hallgrimskirkja Church and shopping for wool sweaters.',
      },
      {
        day: 7,
        title: 'Iceland Departure',
        description: 'Take the airport shuttle back to Keflavik Airport for your return flight home.',
      },
    ],
    averageRating: 4.9,
    featured: true,
  },
];

const seedDatabase = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jaibaba';
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany();
    await Tour.deleteMany();
    await Booking.deleteMany();
    await Review.deleteMany();
    console.log('Cleared existing database entries.');

    // Seed Users
    const seededUsers = await User.create(users);
    console.log(`Seeded ${seededUsers.length} users successfully.`);

    // Find the regular user ID for dummy reviews
    const regularUser = seededUsers.find((u) => u.role === 'user');

    // Seed Tours
    const seededTours = await Tour.create(tours);
    console.log(`Seeded ${seededTours.length} tour packages successfully.`);

    // Add 1-2 dummy reviews for featured tours to test ratings calculation
    const baliTour = seededTours.find((t) => t.title.includes('Bali'));
    const swissTour = seededTours.find((t) => t.title.includes('Swiss'));

    if (baliTour && regularUser) {
      await Review.create({
        tour: baliTour._id,
        user: regularUser._id,
        reviewText: 'This was an absolute dream trip! Highly recommend the sunrise hike up Mount Batur. The guides were extremely friendly and everything was taken care of seamlessly.',
        rating: 5,
      });
      console.log('Seeded review for Bali Tour.');
    }

    if (swissTour && regularUser) {
      await Review.create({
        tour: swissTour._id,
        user: regularUser._id,
        reviewText: 'Beautiful trains and spectacular views. The hiking paths were slightly challenging but fully worth the esfuerzo. The hotels were wonderful.',
        rating: 5,
      });
      console.log('Seeded review for Swiss Tour.');
    }

    console.log('Database Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error.message);
    process.exit(1);
  }
};

seedDatabase();
