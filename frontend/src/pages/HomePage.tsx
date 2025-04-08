import { useState, useEffect, useRef } from 'react';

// Mock data for demonstration - replace with your API calls
const mockGenres = [
  'Action',
  'Drama',
  'Comedy',
  'Horror',
  'Sci-Fi',
  'Thriller',
];

const mockMovies = {
  Action: Array(20)
    .fill()
    .map((_, i) => ({
      id: `action-${i}`,
      title: `Action Movie ${i + 1}`,
      posterUrl: '/api/placeholder/160/240',
    })),
  Drama: Array(20)
    .fill()
    .map((_, i) => ({
      id: `drama-${i}`,
      title: `Drama ${i + 1}`,
      posterUrl: '/api/placeholder/160/240',
    })),
  Comedy: Array(20)
    .fill()
    .map((_, i) => ({
      id: `comedy-${i}`,
      title: `Comedy ${i + 1}`,
      posterUrl: '/api/placeholder/160/240',
    })),
  Horror: Array(20)
    .fill()
    .map((_, i) => ({
      id: `horror-${i}`,
      title: `Horror ${i + 1}`,
      posterUrl: '/api/placeholder/160/240',
    })),
  'Sci-Fi': Array(20)
    .fill()
    .map((_, i) => ({
      id: `scifi-${i}`,
      title: `Sci-Fi ${i + 1}`,
      posterUrl: '/api/placeholder/160/240',
    })),
  Thriller: Array(20)
    .fill()
    .map((_, i) => ({
      id: `thriller-${i}`,
      title: `Thriller ${i + 1}`,
      posterUrl: '/api/placeholder/160/240',
    })),
};

// Create mock data for each section (more than 15 items to enable scrolling)
const featuredMovies = Array(20)
  .fill()
  .map((_, i) => ({
    id: `featured-${i}`,
    title: `Featured Movie ${i + 1}`,
    posterUrl: '/api/placeholder/160/240',
  }));

const trendingMovies = Array(20)
  .fill()
  .map((_, i) => ({
    id: `trending-${i}`,
    title: `Trending Movie ${i + 1}`,
    posterUrl: '/api/placeholder/160/240',
  }));

const familyMovies = Array(20)
  .fill()
  .map((_, i) => ({
    id: `family-${i}`,
    title: `Family Movie ${i + 1}`,
    posterUrl: '/api/placeholder/160/240',
  }));

const undergroundMovies = Array(20)
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
    question: 'How do I contact support?',
    answer:
      "You can reach our support team by emailing support@cineniche.com or through the 'Help' section in your account menu. We're available 24/7 to assist with any questions or concerns.",
  },
];

// CSS for hiding scrollbars
const scrollbarHideStyles = {
  msOverflowStyle: 'none', // IE and Edge
  scrollbarWidth: 'none', // Firefox
};

// Scrollable movie row component with hover effects - no visible scrollbar
const MovieRow = ({ title, movies }) => {
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Auto-scroll effect when hovering
  useEffect(() => {
    let animationId;
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
    <div className="py-6 px-6">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div
        className="relative overflow-x-auto"
        style={{
          ...scrollbarHideStyles,
          WebkitOverflowScrolling: 'touch',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        ref={scrollRef}
      >
        <style jsx>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="flex space-x-4 pb-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex-shrink-0"
              style={{ width: '160px' }}
            >
              <div className="aspect-[2/3] rounded overflow-hidden transition-all duration-300 transform hover:scale-110 hover:z-10 bg-zinc-700 cursor-pointer">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
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
  const [movies, setMovies] = useState([]);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    // Simulate API fetch based on selected genre
    setMovies(mockMovies[selectedGenre] || []);
  }, [selectedGenre]);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header */}
      <header className="py-4 px-6 flex justify-between items-center border-b border-zinc-800">
        <div className="text-4xl font-bold">
          <span className="text-teal-500">Cine</span>
          <span className="text-gray-300">Niche</span>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row">
          {/* Left Panel - Branding */}
          <div className="w-full md:w-2/5 bg-gray-200 p-8 flex flex-col justify-between text-black">
            <div>
              <div className="mt-24">
                <h1 className="text-4xl md:text-5xl font-bold text-zinc-800 mb-6">
                  Not Mainstream.
                  <br />
                  Your Niche - Stream
                </h1>

                <h2 className="text-2xl text-zinc-700 mb-6">
                  Find what the mainstream missed.
                  <br />
                  Stream your obsession
                </h2>

                <div className="border-t border-gray-400 my-8"></div>

                <div className="flex gap-4 mt-4">
                  <button className="px-6 py-2 border border-gray-500 rounded-md hover:bg-gray-300 transition">
                    Sign in
                  </button>
                  <button className="px-6 py-2 bg-zinc-800 text-white rounded-md hover:bg-zinc-700 transition">
                    Register
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <div className="flex text-sm text-zinc-700">
                <a href="#" className="hover:underline mr-4">
                  Privacy Policy
                </a>
                <span>|</span>
                <a href="#" className="hover:underline ml-4">
                  Help
                </a>
              </div>
              <div className="text-sm text-zinc-700 mt-2">
                © 2025 NicheCinema. All Rights Reserved.
              </div>
            </div>
          </div>

          {/* Right Panel - Content */}
          <div className="w-full md:w-3/5 p-6">
            {/* Genres Tab Navigation */}
            <div className="border-b border-zinc-800 mb-6">
              <nav
                className="flex space-x-8 overflow-x-auto pb-2"
                style={scrollbarHideStyles}
              >
                <style jsx>{`
                  nav::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {mockGenres.map((genre) => (
                  <button
                    key={genre}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap ${
                      selectedGenre === genre
                        ? 'border-b-2 border-teal-500 text-teal-500'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </nav>
            </div>

            {/* Scrollable Movie Row for Selected Genre - no visible scrollbar */}
            <div
              className="relative overflow-x-auto"
              style={scrollbarHideStyles}
            >
              <style jsx>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              <div className="flex space-x-4 pb-4">
                {movies.slice(0, 15).map((movie) => (
                  <div
                    key={movie.id}
                    className="flex-shrink-0"
                    style={{ width: '160px' }}
                  >
                    <div className="aspect-[2/3] rounded overflow-hidden transition-all duration-300 transform hover:scale-110 hover:z-10 bg-zinc-700 cursor-pointer">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Movie Sections with horizontal scrolling - no visible scrollbars */}
        <MovieRow title="Featured Movies" movies={featuredMovies} />
        <MovieRow title="Trending This Year" movies={trendingMovies} />
        <MovieRow title="Family Favorites" movies={familyMovies} />
        <MovieRow title="Underground Icons" movies={undergroundMovies} />

        {/* FAQ Section */}
        <div className="py-12 px-6 bg-zinc-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-zinc-700 pb-2">
                  <button
                    className="flex justify-between items-center w-full py-4 text-left text-lg font-medium hover:text-teal-400 transition"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <span className="text-2xl">
                      {expandedFaq === index ? '−' : '+'}
                    </span>
                  </button>
                  {expandedFaq === index && (
                    <div className="pb-4 text-gray-300">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 px-6 border-t border-zinc-800 text-center text-sm text-gray-400">
        <p>© 2025 CineNiche. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
