import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './about.module.css';

export const metadata = {
  title: "About Me | Jai Baba Tour and Travels",
  description: "Meet Mr. Shubham Rao, the founder and owner of Jai Baba Tour and Travels. Learn about our fleet of premium vehicles and our travel philosophy.",
};

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={`${styles.heroContent} container`}>
          <span className={styles.subtitle}>The Face Behind Your Travels</span>
          <h1 className={styles.title}>Meet Mr. Shubham Rao</h1>
          <p className={styles.tagline}>
            Founder, Owner & Lead Travel Companion of Jai Baba Tours & Travels
          </p>
        </div>
      </section>

      {/* Main Profile Story Section */}
      <section className={`${styles.profileSection} container`}>
        <div className={styles.profileGrid}>
          {/* Main Portrait */}
          <div className={styles.portraitColumn}>
            <div className={`${styles.portraitCard} glass-panel`}>
              <div className={styles.portraitWrapper}>
                <Image 
                  src="/images/owner_taj.jpg" 
                  alt="Shubham Rao in front of the Taj Mahal" 
                  width={500} 
                  height={625} 
                  className={styles.portraitImg}
                  priority
                />
                <div className={styles.portraitBadge}>FOUNDER & OWNER</div>
              </div>
              <div className={styles.portraitLabel}>
                <h3>Mr. Shubham Rao</h3>
                <p>Kanpur Nagar, Uttar Pradesh, India</p>
              </div>
            </div>
          </div>

          {/* Story Content */}
          <div className={styles.storyColumn}>
            <span className={styles.sectionTag}>My Travel Philosophy</span>
            <h2 className={styles.storyTitle}>Crafting Journeys, Not Just Packages</h2>
            <div className={styles.storyText}>
              <p>
                Namaste! I am <strong>Shubham Rao</strong>, the founder and active guide of Jai Baba Tours & Travels. My journey in the tourism industry began with a simple belief: <em>that travel is not just about visiting places, but about the connections we make, the comfort we enjoy, and the memories we bring back home.</em>
              </p>
              <p>
                Based in Kanpur, Uttar Pradesh, I started this agency with a focus on providing personalized, highly transparent, and premium quality cab and tour services. Unlike large travel booking portals that outsource everything to third parties, we own our fleet of vehicles and hire verified, trusted chauffeurs. This allows us to guarantee the hygiene, safety, and operational safety of every single tour.
              </p>
              <p>
                I personally oversee the maintenance of our fleet and regularly accompany our guests on special heritage and pilgrimage tours. Whether you are seeking a serene trip to the Taj Mahal, an adventure in the Himalayas, or a scenic drive along India's coastal highways, my team and I are dedicated to making your travel experience smooth, comfortable, and absolutely delightful.
              </p>
            </div>

            <div className={styles.quoteBlock}>
              <span className={styles.quoteIcon}>“</span>
              <p>
                "At Jai Baba Tours & Travels, we treat our guests like family. We guarantee honest pricing without hidden costs, top-tier vehicle upkeep, and 24/7 reliability."
              </p>
              <span className={styles.quoteAuthor}>— Shubham Rao</span>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet Gallery & Services */}
      <section className={styles.fleetSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Our Fleet in Action</span>
            <h2 className={styles.sectionTitle}>Meet Our Travel Companion Vehicles</h2>
            <p className={styles.sectionDesc}>
              A peek into our vehicles and active service snapshots, driven by our passion for safe and premium road travel.
            </p>
          </div>

          <div className={styles.galleryGrid}>
            {/* Gallery Item 1 */}
            <div className={`${styles.galleryCard} glass-panel`}>
              <div className={styles.galleryImgWrapper}>
                <Image 
                  src="/images/owner_scorpio.jpg" 
                  alt="Mahindra Scorpio SUV Tour" 
                  width={400} 
                  height={280} 
                  className={styles.galleryImg}
                  loading="lazy"
                />
              </div>
              <div className={styles.galleryInfo}>
                <h4>Mahindra Scorpio Classic</h4>
                <p>Our premium 7-seater SUV, offering robust power and great comfort on long-distance mountain tours and highway drives.</p>
              </div>
            </div>

            {/* Gallery Item 2 */}
            <div className={`${styles.galleryCard} glass-panel`}>
              <div className={styles.galleryImgWrapper}>
                <Image 
                  src="/images/owner_driving.jpg" 
                  alt="Professional Driving Comfort" 
                  width={400} 
                  height={280} 
                  className={styles.galleryImg}
                  loading="lazy"
                />
              </div>
              <div className={styles.galleryInfo}>
                <h4>Professional Chauffeur Service</h4>
                <p>Enjoy the route in peace with experienced, verified, and courteous drivers who know all shortcuts and local tourist spots.</p>
              </div>
            </div>

            {/* Gallery Item 3 */}
            <div className={`${styles.galleryCard} glass-panel`}>
              <div className={styles.galleryImgWrapper}>
                <Image 
                  src="/images/owner_beach_car.jpg" 
                  alt="Custom coastal open-air tour" 
                  width={400} 
                  height={280} 
                  className={styles.galleryImg}
                  loading="lazy"
                />
              </div>
              <div className={styles.galleryInfo}>
                <h4>Custom Open-Air Leisure Rides</h4>
                <p>Special open-top convertible rides for coastal sightseeing, beach holidays, and memorable photo shoots.</p>
              </div>
            </div>

            {/* Gallery Item 4 */}
            <div className={`${styles.galleryCard} glass-panel`}>
              <div className={styles.galleryImgWrapper}>
                <Image 
                  src="/images/owner_scorpio_night.jpg" 
                  alt="24/7 Night Tour Reliability" 
                  width={400} 
                  height={280} 
                  className={styles.galleryImg}
                  loading="lazy"
                />
              </div>
              <div className={styles.galleryInfo}>
                <h4>24/7 Travel Reliability</h4>
                <p>Our fleet operates around the clock, equipped with GPS tracking and instant support for complete peace of mind at any hour.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className={`${styles.valuesSection} container`}>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <div className={styles.valueNumber}>01</div>
            <h3>Direct Fleet Ownership</h3>
            <p>We own and maintain our vehicles directly, ensuring they are always clean, thoroughly serviced, and mechanically perfect.</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueNumber}>02</div>
            <h3>100% Price Honesty</h3>
            <p>No unexpected surcharges, fuel levies, or hidden agent commissions. You pay exactly what we agree upon, upfront.</p>
          </div>
          <div className={styles.valueCard}>
            <div className={styles.valueNumber}>03</div>
            <h3>Personal Care</h3>
            <p>Because we are a local business, we cater to your specific timing, itinerary stops, and food preferences. Your comfort is our priority.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`${styles.ctaSection} container`}>
        <div className={`${styles.ctaBox} glass-panel`}>
          <h2>Ready to Book Your Custom Tour?</h2>
          <p>
            Get in touch with Mr. Shubham Rao directly to plan your custom travel itinerary, vehicle choices, and receive a customized quote today.
          </p>
          <div className={styles.ctaBtns}>
            <Link href="/contact" className="btn-glow">
              Contact Us Today
            </Link>
            <Link href="/tours" className={styles.btnSecondary}>
              Browse Tour Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
