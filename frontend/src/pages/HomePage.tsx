import { useState, useEffect, useRef } from 'react';
import './HomePage.css';

// Mock data for demonstration - replace with your API calls
const mockGenres = [
  'Action',
  'Drama',
  'Comedy',
  'Horror',
  'Sci-Fi',
  'Thriller',
  'Anime',
];

// Updated mock data with featured hero images for each genre
const mockGenreHeroImages = {
  Action: {
    id: 'action-hero',
    title: 'Action',
    imageUrl: '/api/placeholder/800/1000', // Larger placeholder for hero section
    description:
      'Explosive action content for thrill-seekers and adrenaline junkies.',
  },
  Drama: {
    id: 'drama-hero',
    title: 'Drama',
    imageUrl: '/api/placeholder/800/1000',
    description: 'Compelling stories of human emotion and struggle.',
  },
  Comedy: {
    id: 'comedy-hero',
    title: 'Comedy',
    imageUrl: '/api/placeholder/800/1000',
    description: 'Laugh-out-loud entertainment for the whole family.',
  },
  Horror: {
    id: 'horror-hero',
    title: 'Horror',
    imageUrl: '/api/placeholder/800/1000',
    description: 'Terrifying tales that will keep you up at night.',
  },
  'Sci-Fi': {
    id: 'scifi-hero',
    title: 'Sci-Fi',
    imageUrl: '/api/placeholder/800/1000',
    description: 'Mind-bending journeys through space, time and imagination.',
  },
  Thriller: {
    id: 'thriller-hero',
    title: 'Thriller',
    imageUrl: '/api/placeholder/800/1000',
    description: 'Edge-of-your-seat suspense and unexpected twists.',
  },
  Anime: {
    id: 'anime-hero',
    title: 'Anime',
    imageUrl: '/api/placeholder/800/1000',
    description:
      'Where epic battles, and endless imagination collide — feel the adrenaline, live the saga',
  },
};

// Keep other movie data for the carousel rows
const featuredMovies = Array(13)
  .fill()
  .map((_, i) => ({
    id: `featured-${i}`,
    title: `Featured Movie ${i + 1}`,
    posterUrl: '/api/placeholder/160/240',
  }));

const trendingMovies = Array(13)
  .fill()
  .map((_, i) => ({
    id: `trending-${i}`,
    title: `Trending Movie ${i + 1}`,
    posterUrl: '/api/placeholder/160/240',
  }));

const familyMovies = Array(13)
  .fill()
  .map((_, i) => ({
    id: `family-${i}`,
    title: `Family Movie ${i + 1}`,
    posterUrl: '/api/placeholder/160/240',
  }));

const undergroundMovies = Array(13)
  .fill()
  .map((_, i) => ({
    id: `underground-${i}`,
    title: `Underground Movie ${i + 1}`,
    posterUrl: '/api/placeholder/160/240',
  }));
const faqs = [
  {
    question: 'What is CineNiche?',
    answer:
      'CineNiche is a streaming platform dedicated to offering unique, curated content that mainstream services often overlook. We focus on independent films, international cinema, and niche genres that passionate movie lovers appreciate.',
  },
  {
    question: 'How do I sign up?',
    answer:
      "Signing up is easy! Click the 'Register' button at the top of the page, fill in your information, select a subscription plan, and start streaming your favorite niche content immediately.",
  },
  {
    question: 'What devices does CineNiche support?', // ← ADD THIS
    answer:
      'CineNiche supports Windows, Mac, iOS, Android, Roku, AppleTV, GoogleTV, and more.',
  },
  {
    question: 'How do I contact support?',
    answer:
      "You can reach our support team by emailing support@cineniche.com or through the 'Help' section in your account menu. We're available 24/7 to assist with any questions or concerns.",
  },
];

// Scrollable movie row component with hover effects
const MovieRow = ({ title, movies }) => {
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Auto-scroll effect when hovering
  useEffect(() => {
    let animationId: number;
    const scrollSpeed = 0.5; // pixels per frame - adjust for faster/slower scrolling

    const autoScroll = () => {
      if (isHovering && scrollRef.current) {
        const maxScroll =
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth;

        if (scrollPosition < maxScroll) {
          setScrollPosition((prev) => prev + scrollSpeed);
          scrollRef.current.scrollLeft = scrollPosition;
        } else {
          // Reset to beginning when reaching the end
          setScrollPosition(0);
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    if (isHovering) {
      animationId = requestAnimationFrame(autoScroll);
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isHovering, scrollPosition]);

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div
        className="movie-scroll-container"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        ref={scrollRef}
      >
        <div className="movie-items">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-item">
              <div className="movie-poster">
                <img src={movie.posterUrl} alt={movie.title} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState(mockGenres[0]);
  const [currentHero, setCurrentHero] = useState(
    mockGenreHeroImages[mockGenres[0]]
  );
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    // Update hero image when genre changes
    setCurrentHero(
      mockGenreHeroImages[selectedGenre] || mockGenreHeroImages[mockGenres[0]]
    );
  }, [selectedGenre]);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <div className="brand">
          <span className="brand-cine">Cine</span>
          <span className="brand-niche">Niche</span>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <div className="hero-section">
          {/* Left Panel - Branding */}
          <div className="hero-left">
            <div className="hero-content">
              <h1 className="hero-title">
                Not Mainstream.
                <br />
                Your Niche - Stream
              </h1>

              <h2 className="hero-subtitle">
                Find what the mainstream missed.
                <br />
                Stream your obsession
              </h2>

              <div className="hero-divider"></div>

              <div className="hero-buttons">
                <button className="btn-signin">Sign in</button>
                <button className="btn-register">Register</button>
              </div>
            </div>

            <div className="hero-footer">
              <div className="hero-links">
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
                <span>|</span>
                <a href="#" className="footer-link">
                  Help
                </a>
              </div>
            </div>
          </div>

          {/* Right Panel - Hero Image */}
          <div className="hero-right">
            {/* Genres Tab Navigation */}
            <div className="genre-nav-container">
              <nav className="genre-nav">
                {mockGenres.map((genre) => (
                  <button
                    key={genre}
                    className={`genre-btn ${selectedGenre === genre ? 'active' : ''}`}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </nav>
            </div>

            {/* Hero Image for Selected Genre */}
            <div className="hero-image-container">
              <div className="genre-overlay">
                <h3 className="genre-title">{currentHero.title}</h3>
                <p className="genre-description">{currentHero.description}</p>
              </div>
              <img
                src={currentHero.imageUrl}
                alt={currentHero.title}
                className="hero-image"
              />
            </div>
          </div>
        </div>

        {/* Movie Sections with horizontal scrolling */}
        <MovieRow title="Featured Movies" movies={featuredMovies} />
        <MovieRow title="Trending This Year" movies={trendingMovies} />
        <MovieRow title="Family Favorites" movies={familyMovies} />
        <MovieRow title="Underground Icons" movies={undergroundMovies} />

        {/* FAQ Section */}
        <div className="faq-section">
          <div className="faq-container">
            <h2 className="faq-title">
              Niche Questions?{' '}
              <span style={{ fontStyle: 'italic', fontWeight: 'normal' }}>
                We've got niche answers
              </span>
            </h2>

            <div className="faq-items">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-toggle">
                      {expandedFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {expandedFaq === index && (
                    <div className="faq-answer">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="main-footer">
        <p>© 2025 CineNiche. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
