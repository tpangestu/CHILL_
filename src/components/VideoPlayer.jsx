import { useState, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Maximize, Minimize, ChevronLeft } from 'lucide-react';

/**
 * Component video player dengan kontrol lengkap
 * @param {Object} movie - Data film/series yang akan diputar
 * @param {Function} onBack - Handler untuk tombol kembali
 */
const VideoPlayer = ({ movie, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false); 
  const [isMuted, setIsMuted] = useState(false); // Status audio muted atau tidak
  const [showControls, setShowControls] = useState(true); // Menampilkan/menyembunyikan kontrol video

  // State untuk menu-menu pengaturan
  const [showAudioMenu, setShowAudioMenu] = useState(false); // Toggle menu pemilihan audio
  const [showSubtitleMenu, setShowSubtitleMenu] = useState(false); // Toggle menu subtitle
  const [showSpeedMenu, setShowSpeedMenu] = useState(false); // Toggle menu kecepatan playback
  const [showEpisodeMenu, setShowEpisodeMenu] = useState(false); // Toggle menu daftar episode

  // State untuk pengaturan yang dipilih user
  const [selectedAudio, setSelectedAudio] = useState('Bahasa Inggris'); // Audio track yang dipilih
  const [selectedSubtitle, setSelectedSubtitle] = useState('Bahasa Indonesia'); // Subtitle yang dipilih
  const [playbackSpeed, setPlaybackSpeed] = useState('1x'); // Kecepatan playback
  const [currentEpisode, setCurrentEpisode] = useState(1); // Episode yang sedang ditonton (untuk series)
  const [isFullscreen, setIsFullscreen] = useState(false); // Status fullscreen mode

  // Referensi ke container video untuk fullscreen functionality
  const videoContainerRef = useRef(null);

  // Sample episode data for series
  const episodes = [
    { id: 1, title: 'Pilot', duration: '45m', thumbnail: movie?.imageLandscape },
    { id: 2, title: 'Biscuits', duration: '42m', description: "It's Ted's first day of coaching, and fans aren't happy. He makes little headway but remains undeterred as the team...", thumbnail: movie?.imageLandscape },
    { id: 3, title: 'Trent Crimm: The Independent', duration: '45m', thumbnail: movie?.imageLandscape },
    { id: 4, title: 'For the Children', duration: '43m', thumbnail: movie?.imageLandscape },
  ];

  const audioOptions = ['Bahasa Inggris', 'Bahasa Inggris - Audio Description'];
  const subtitleOptions = ['Bahasa Indonesia', 'Bahasa Inggris'];
  const speedOptions = ['0.5x', '0.75x', '1x (Normal)', '1.25x', '1.5x'];

  /**
   * Handler untuk play/pause video
   */
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  /**
   * Handler untuk memilih episode (khusus series)
   * @param {number} episodeId - ID episode yang dipilih
   */
  const handleEpisodeSelect = (episodeId) => {
    setCurrentEpisode(episodeId);
    setShowEpisodeMenu(false);
  };

  /**
   * Handler untuk toggle fullscreen mode
   * Masuk atau keluar dari mode fullscreen
   */
  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;

    if (!document.fullscreenElement) {
      // Enter fullscreen
      videoContainerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      // Exit fullscreen
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.error('Error attempting to exit fullscreen:', err);
      });
    }
  };

  if (!movie) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">No movie data available</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Container utama video player */}
      <div className="w-full relative min-h-screen flex items-center justify-center" ref={videoContainerRef}>
        {/* Video Container dengan event handler untuk show/hide controls */}
        <div
          className="relative w-full h-screen flex items-center justify-center group"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(isPlaying ? false : true)}
        >
          {/* Background Image/Poster sebagai placeholder video */}
          <div className="absolute inset-0">
            <img
              src={movie.imageLandscape || movie.image}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for better control visibility */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Tombol Play/Pause besar di tengah layar */}
          <button
            onClick={handlePlayPause}
            className="relative z-10 w-20 h-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="w-10 h-10" fill="white" />
            ) : (
              <Play className="w-10 h-10 ml-1" fill="white" />
            )}
          </button>

          {/* Bar atas dengan tombol kembali dan judul video */}
          <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent p-4 md:p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="text-white hover:scale-110 transition-transform"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <div className="text-white">
                <h1 className="text-lg font-semibold">{movie.title} {movie.type === 'series' ? `Episode ${currentEpisode}: ${episodes[currentEpisode - 1]?.title}` : ''}</h1>
              </div>
            </div>
          </div>

          {/* Kontrol bawah dengan progress bar dan tombol-tombol */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 md:p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
            {/* Progress bar untuk menampilkan progres video */}
            <div className="mb-4">
              <div className="h-1 bg-gray-600 rounded-full cursor-pointer hover:h-1.5 transition-all">
                <div className="h-full bg-red-600 rounded-full" style={{ width: '33%' }}></div>
              </div>
            </div>

            {/* Tombol-tombol kontrol video */}
            <div className="flex items-center justify-between text-white">
              {/* Kontrol sisi kiri: Play/Pause, Skip, Volume */}
              <div className="flex items-center gap-3 md:gap-4 flex-1">
                <button
                  onClick={handlePlayPause}
                  className="hover:scale-110 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 md:w-8 md:h-8" />
                  ) : (
                    <Play className="w-6 h-6 md:w-8 md:h-8" />
                  )}
                </button>

                {movie.type === 'series' && (
                  <>
                    <button className="hover:scale-110 transition-transform">
                      <SkipBack className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <button className="hover:scale-110 transition-transform">
                      <SkipForward className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                  </>
                )}

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:scale-110 transition-transform"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 md:w-6 md:h-6" />
                  ) : (
                    <Volume2 className="w-5 h-5 md:w-6 md:h-6" />
                  )}
                </button>

                <span className="text-xs md:text-sm hidden md:block">
                  {movie.title} {movie.type === 'series' ? `Episode ${currentEpisode}: ${episodes[currentEpisode - 1]?.title}` : ''}
                </span>
              </div>

              {/* Kontrol sisi kanan: Audio, Subtitle, Episode, Speed, Fullscreen */}
              <div className="flex items-center gap-2 md:gap-3">
                {/* Menu pemilihan audio track */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowAudioMenu(!showAudioMenu);
                      setShowSubtitleMenu(false);
                      setShowSpeedMenu(false);
                      setShowEpisodeMenu(false);
                    }}
                    className="px-2 md:px-3 py-1.5 md:py-2 hover:bg-white/20 rounded text-xs md:text-sm font-medium transition-colors"
                  >
                    Audio
                  </button>
                  {showAudioMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-gray-900/95 backdrop-blur-sm rounded-lg p-3 min-w-[200px] md:min-w-[250px] shadow-xl border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold">Audio</p>
                      </div>
                      <div className="space-y-1">
                        {audioOptions.map((option) => (
                          <div
                            key={option}
                            onClick={() => setSelectedAudio(option)}
                            className={`p-2 rounded cursor-pointer text-sm transition-colors ${
                              selectedAudio === option ? 'bg-gray-700' : 'hover:bg-gray-800'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {selectedAudio === option && (
                                <div className="w-1 h-4 bg-white rounded"></div>
                              )}
                              <span>{option}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Menu pemilihan subtitle */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowSubtitleMenu(!showSubtitleMenu);
                      setShowAudioMenu(false);
                      setShowSpeedMenu(false);
                      setShowEpisodeMenu(false);
                    }}
                    className="px-2 md:px-3 py-1.5 md:py-2 hover:bg-white/20 rounded text-xs md:text-sm font-medium transition-colors border border-gray-500"
                  >
                    CC
                  </button>
                  {showSubtitleMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-gray-900/95 backdrop-blur-sm rounded-lg p-3 min-w-[200px] md:min-w-[250px] shadow-xl border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-sm font-semibold">Terjemahan</p>
                      </div>
                      <div className="space-y-1">
                        {subtitleOptions.map((option) => (
                          <div
                            key={option}
                            onClick={() => setSelectedSubtitle(option)}
                            className={`p-2 rounded cursor-pointer text-sm transition-colors ${
                              selectedSubtitle === option ? 'bg-gray-700' : 'hover:bg-gray-800'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {selectedSubtitle === option && (
                                <div className="w-1 h-4 bg-white rounded"></div>
                              )}
                              <span>{option}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Daftar Episode - Hanya ditampilkan untuk series */}
                {movie.type === 'series' && (
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowEpisodeMenu(!showEpisodeMenu);
                        setShowAudioMenu(false);
                        setShowSubtitleMenu(false);
                        setShowSpeedMenu(false);
                      }}
                      className="px-2 md:px-3 py-1.5 md:py-2 hover:bg-white/20 rounded transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                    {showEpisodeMenu && (
                      <div className="absolute bottom-full right-0 mb-2 bg-gray-900/95 backdrop-blur-sm rounded-lg p-4 w-[280px] md:w-[350px] max-h-[400px] overflow-y-auto shadow-xl border border-gray-700">
                        <div className="flex items-center gap-2 mb-4">
                          <button
                            onClick={() => setShowEpisodeMenu(false)}
                            className="text-gray-400 hover:text-white"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <p className="text-sm font-semibold flex-1">Episode Selanjutnya</p>
                        </div>

                        {/* Next Episode Preview */}
                        {currentEpisode < episodes.length && (
                          <div
                            onClick={() => handleEpisodeSelect(currentEpisode + 1)}
                            className="flex gap-3 p-2 bg-gray-800/50 rounded-lg mb-4 cursor-pointer hover:bg-gray-800 transition-colors"
                          >
                            <div className="w-24 md:w-32 aspect-video bg-gray-700 rounded overflow-hidden flex-shrink-0">
                              <img
                                src={episodes[currentEpisode]?.thumbnail}
                                alt={`Episode ${currentEpisode + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm mb-1">Episode {currentEpisode + 1}: {episodes[currentEpisode]?.title}</p>
                              <p className="text-xs text-gray-400 line-clamp-2">
                                {episodes[currentEpisode]?.description || "It's Ted's first day of coaching, and fans aren't happy. He makes little headway but remains undeterred as the team..."}
                              </p>
                              <button className="mt-2 px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-xs font-medium transition-colors">
                                Intro
                              </button>
                            </div>
                          </div>
                        )}

                        {/* All Episodes List */}
                        <div className="space-y-2">
                          {episodes.map((episode) => (
                            <div
                              key={episode.id}
                              onClick={() => handleEpisodeSelect(episode.id)}
                              className={`p-2 rounded-lg cursor-pointer transition-colors ${
                                currentEpisode === episode.id ? 'bg-gray-700' : 'hover:bg-gray-800'
                              }`}
                            >
                              <p className="text-sm font-semibold">Episode {episode.id}</p>
                              <p className="text-xs text-gray-400">{episode.title} • {episode.duration}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Menu pengaturan kecepatan playback */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowSpeedMenu(!showSpeedMenu);
                      setShowAudioMenu(false);
                      setShowSubtitleMenu(false);
                      setShowEpisodeMenu(false);
                    }}
                    className="px-2 md:px-3 py-1.5 md:py-2 hover:bg-white/20 rounded transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                  {showSpeedMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-gray-900/95 backdrop-blur-sm rounded-lg p-3 min-w-[150px] shadow-xl border border-gray-700">
                      <p className="text-sm font-semibold mb-3">Kecepatan</p>
                      <div className="space-y-1">
                        {speedOptions.map((speed) => (
                          <div
                            key={speed}
                            onClick={() => setPlaybackSpeed(speed)}
                            className={`p-2 rounded cursor-pointer text-sm transition-colors ${
                              playbackSpeed === speed ? 'bg-gray-700' : 'hover:bg-gray-800'
                            }`}
                          >
                            {speed}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Tombol toggle fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="hover:scale-110 transition-transform"
                  title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize className="w-5 h-5 md:w-6 md:h-6" />
                  ) : (
                    <Maximize className="w-5 h-5 md:w-6 md:h-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
