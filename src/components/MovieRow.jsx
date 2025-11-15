import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import LandscapeMovieCard from './LandscapeMovieCard';

/**
 * Component untuk menampilkan row/baris movie cards dengan horizontal scroll
 * @param {string} title - Judul row (contoh: "Melanjutkan Tonton Film")
 * @param {Array} movies - Array data movie yang akan ditampilkan
 * @param {Function} onMovieClick - Handler ketika movie card diklik
 * @param {Function} onPlayClick - Handler ketika tombol play diklik
 * @param {string} layout - Layout card (portrait/landscape)
 * @param {boolean} isCompact - Mode compact untuk modal (grid layout)
 */
const MovieRow = ({ title, movies, onMovieClick, onPlayClick, layout = 'portrait', isCompact = false }) => {
  // Referensi ke scroll container
  const scrollContainerRef = useRef(null);

  // State untuk show/hide tombol scroll
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  /**
   * Fungsi untuk cek apakah tombol scroll perlu ditampilkan
   * Berdasarkan posisi scroll saat ini
   */
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 10);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  /**
   * Handler untuk scroll horizontal
   * @param {string} direction - Arah scroll (left/right)
   */
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const containerWidth = container.clientWidth;

      // Kalkulasi scroll amount berdasarkan jumlah cards yang ditampilkan
      // Container width dibagi cards per view = lebar per card + gap
      const scrollAmount = direction === 'left' ? -containerWidth : containerWidth;

      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  const isLandscape = layout === 'landscape';
  const CardComponent = isLandscape ? LandscapeMovieCard : MovieCard;

  // Kalkulasi lebar card berdasarkan jumlah cards per view
  // Mobile landscape: 1 card, Mobile portrait: 3 cards
  // Tablet (2 cards): (100% - 1 gap) / 2 = ~48%
  // Desktop landscape: 4 cards, Desktop portrait: 5 cards
  let cardWidthClass, gapClass;

  if (isCompact) {
    // Compact mode for modal - show 3 cards in grid
    cardWidthClass = 'w-[calc((100%)/3)] px-1 md:px-2';
    gapClass = 'gap-1 md:gap-2';
  } else if (isLandscape) {
    // Untuk landscape cards (continue watching)
    // Mobile: 1 card, Tablet: 2 cards, Desktop: 4 cards
    cardWidthClass = 'w-full md:w-[calc((100%-2rem)/2))] lg:w-[calc((100%-2rem)/4)] px-3';
    gapClass = 'gap-2';
  } else {
    // Untuk portrait cards
    // Mobile: 3 cards, Tablet: 2 cards, Desktop: 5 cards
    cardWidthClass = 'w-[calc((100%)/3)] md:w-[calc((100%)/4)] lg:w-[calc((100%-4rem)/5)] px-2';
    gapClass = 'gap-1 md:gap-2 lg:gap-3';
  }

  return (
    <div className={`group/row bg-transparent ${isCompact ? 'mt-0' : 'mt-[-4rem] md:mt-[-8rem]'}`}>
      {/* Judul row */}
      <h2 className={`text-white font-bold mb-2 md:mb-3 ${isCompact ? 'text-base md:text-xl px-4 md:px-6' : 'text-xl md:text-2xl px-4 md:px-8 lg:px-12'}`}>
        {title}
      </h2>

      <div
        className={`relative w-full md:w-auto mx-auto pt-0 ${isCompact ? 'px-4 md:px-6 pb-0 overflow-hidden' : 'px-4 md:px-8 lg:px-12 pb-4 md:pb-8 overflow-visible'}`}
        style={{ contain: isCompact ? 'layout' : 'none' }}
      >
        {/* Tombol scroll kiri - hidden di mobile dan mode compact */}
        {!isCompact && showLeftButton && (
          <button
            onClick={() => scroll('left')}
            className={`hidden md:flex absolute left-0 md:left-2 lg:left-6 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-black/90 hover:bg-black text-white rounded-full items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 shadow-2xl hover:scale-110 border-2 border-white/20 ${
              isLandscape
                ? 'top-40 -translate-y-20' // Landscape: center vertically
                : 'top-70 -translate-y-20' // Portrait: slightly higher due to taller cards
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}

        {/* Tombol scroll kanan - hidden di mobile dan mode compact */}
        {!isCompact && showRightButton && (
          <button
            onClick={() => scroll('right')}
            className={`hidden md:flex absolute right-0 md:right-2 lg:right-6 z-[10000] w-10 h-10 md:w-12 md:h-12 bg-black/90 hover:bg-black text-white rounded-full items-center justify-center opacity-0 group-hover/row:opacity-100 transition-all duration-300 shadow-2xl hover:scale-110 border-2 border-white/20 ${
              isLandscape
                ? 'top-40 -translate-y-20' // Landscape: center vertically
                : 'top-70 -translate-y-20' // Portrait: slightly higher due to taller cards
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        )}

        {/* Container scroll horizontal untuk cards */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          className={`scrollbar-hide scroll-smooth mx-auto ${
            isCompact
              ? 'py-0 pb-0 mb-0 overflow-x-hidden overflow-y-hidden'
              : isLandscape
              ? 'py-0 md:py-8 pb-24 md:pb-48 mb-0 md:mb-8 lg:mb-12 overflow-x-auto overflow-y-hidden'
              : 'py-0 md:py-16 pb-20 md:pb-56 w-full mb-4 md:mb-8 lg:mb-12 overflow-x-auto overflow-y-hidden'
          }`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            scrollSnapType: isCompact ? 'none' : 'x mandatory'
          }}
        >
          <div className={`flex ${gapClass} ${isCompact ? 'flex-wrap justify-start' : ''}`}>
            {movies.map((movie, index) => (
              <div
                key={movie.id || index}
                className={`${isCompact ? '' : 'flex-shrink-0'} ${cardWidthClass}`}
                style={{ scrollSnapAlign: isCompact ? 'none' : 'start' }}
              >
                <CardComponent
                  {...movie}
                  image={isLandscape ? movie.imageLandscape : movie.image}
                  onClick={() => onMovieClick && onMovieClick(movie)}
                  onPlayClick={() => onPlayClick && onPlayClick(movie)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRow;
